"use server";

import { refresh } from "next/cache";
import { z } from "zod";
import { site } from "@/data/content/site";
import { getAuthorizedUser, isUuid } from "@/lib/auth/dal";
import { createAdminClient } from "@/lib/supabase/admin";
import { ROLES, type Role } from "@/lib/auth/roles";
import { LEAD_STATUSES, TUTOR_APPLICATION_STATUSES, isRecordId } from "@/lib/auth/admin-constants";
import { getClientIp, rateLimit } from "@/lib/auth/rate-limit";

/**
 * Admin Server Actions. Each is a public POST endpoint, so each one re-checks the admin role
 * (never trusting that the form was only rendered for admins), validates input with zod,
 * uses the service-role client only after that check, and writes an audit log line.
 */

export type AdminFormState = { status: "idle" | "error" | "success"; message?: string };

const FORBIDDEN: AdminFormState = { status: "error", message: "You need to be signed in as an admin to do that." };
const NOT_CONFIGURED: AdminFormState = {
  status: "error",
  message: "Admin actions need SUPABASE_SERVICE_ROLE_KEY on the server.",
};

type AdminContext =
  | { ok: true; actor: NonNullable<Awaited<ReturnType<typeof getAuthorizedUser>>>; db: NonNullable<ReturnType<typeof createAdminClient>> }
  | { ok: false; error: AdminFormState };

async function adminContext(): Promise<AdminContext> {
  const actor = await getAuthorizedUser("admin");
  if (!actor) return { ok: false, error: FORBIDDEN };
  const db = createAdminClient();
  if (!db) return { ok: false, error: NOT_CONFIGURED };
  return { ok: true, actor, db };
}

function audit(action: string, actorId: string, details: Record<string, unknown>) {
  // Structured audit line (OWASP A09). Ship these logs off-box in production.
  console.info(JSON.stringify({ type: "audit", action, actorId, at: new Date().toISOString(), ...details }));
}

const leadSchema = z.object({
  leadId: z.string().refine(isRecordId),
  status: z.enum(LEAD_STATUSES),
  notes: z.string().max(4000).optional(),
});

export async function updateLead(_prev: AdminFormState, formData: FormData): Promise<AdminFormState> {
  const ctx = await adminContext();
  if (!ctx.ok) return ctx.error;

  const parsed = leadSchema.safeParse({
    leadId: formData.get("leadId"),
    status: formData.get("status"),
    notes: formData.get("notes") ?? undefined,
  });
  if (!parsed.success) return { status: "error", message: "Choose a valid status. Notes must be under 4,000 characters." };

  const { leadId, status, notes } = parsed.data;
  const update: Record<string, string> = { status };
  if (notes !== undefined) update.notes = notes.trim();
  const { error } = await ctx.db.from("leads").update(update).eq("id", leadId);
  if (error) return { status: "error", message: "We couldn't save that lead. Please try again." };

  audit("lead.update", ctx.actor.id, { leadId, status });
  refresh();
  return { status: "success", message: "Lead updated." };
}

const tutorAppSchema = z.object({
  applicationId: z.string().refine(isRecordId),
  status: z.enum(TUTOR_APPLICATION_STATUSES),
});

export async function updateTutorApplication(_prev: AdminFormState, formData: FormData): Promise<AdminFormState> {
  const ctx = await adminContext();
  if (!ctx.ok) return ctx.error;

  const parsed = tutorAppSchema.safeParse({ applicationId: formData.get("applicationId"), status: formData.get("status") });
  if (!parsed.success) return { status: "error", message: "Choose a valid status." };

  const { error } = await ctx.db.from("tutor_applications").update({ status: parsed.data.status }).eq("id", parsed.data.applicationId);
  if (error) return { status: "error", message: "We couldn't save that application. Please try again." };

  audit("tutor_application.update", ctx.actor.id, parsed.data);
  refresh();
  return { status: "success", message: "Saved." };
}

const roleSchema = z.object({ userId: z.string().refine(isUuid), role: z.enum(ROLES) });

export async function changeUserRole(_prev: AdminFormState, formData: FormData): Promise<AdminFormState> {
  const ctx = await adminContext();
  if (!ctx.ok) return ctx.error;

  const parsed = roleSchema.safeParse({ userId: formData.get("userId"), role: formData.get("role") });
  if (!parsed.success) return { status: "error", message: "Choose a valid role." };
  const { userId, role } = parsed.data;

  // Prevent locking yourself out: another admin must change your role.
  if (userId === ctx.actor.id) return { status: "error", message: "You can't change your own role. Ask another admin." };

  const { data: before } = await ctx.db.from("profiles").select("role").eq("id", userId).maybeSingle();
  if (!before) return { status: "error", message: "That user doesn't exist." };

  const { error } = await ctx.db.from("profiles").update({ role }).eq("id", userId);
  if (error) return { status: "error", message: "We couldn't change that role. Please try again." };

  // Remove links that no longer make sense for the new role.
  if (role !== "parent") await ctx.db.from("guardianships").delete().eq("parent_id", userId);
  if (role !== "tutor") await ctx.db.from("tutor_students").delete().eq("tutor_id", userId);
  if (role !== "student") {
    await ctx.db.from("guardianships").delete().eq("student_id", userId);
    await ctx.db.from("tutor_students").delete().eq("student_id", userId);
  }

  audit("user.role_change", ctx.actor.id, { userId, from: before.role, to: role });
  refresh();
  return { status: "success", message: "Role updated." };
}

const inviteSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email().max(254)),
  fullName: z.string().trim().min(1).max(120),
  role: z.enum(ROLES),
});

export async function inviteUser(_prev: AdminFormState, formData: FormData): Promise<AdminFormState> {
  const ctx = await adminContext();
  if (!ctx.ok) return ctx.error;

  const ip = await getClientIp();
  if (!rateLimit(`admin-invite:${ctx.actor.id}:${ip}`, 30, 60 * 60_000).ok) {
    return { status: "error", message: "Too many invites in an hour. Please wait and try again." };
  }

  const parsed = inviteSchema.safeParse({
    email: formData.get("email"),
    fullName: formData.get("fullName"),
    role: formData.get("role"),
  });
  if (!parsed.success) return { status: "error", message: "Enter a name, a valid email and a role." };
  const { email, fullName, role } = parsed.data;

  const redirectTo = new URL("/auth/confirm", site.url);
  redirectTo.searchParams.set("next", "/reset-password");
  const { data, error } = await ctx.db.auth.admin.inviteUserByEmail(email, {
    data: { full_name: fullName },
    redirectTo: redirectTo.toString(),
  });
  if (error || !data.user) {
    return { status: "error", message: "We couldn't send that invite. The email may already have an account." };
  }

  // The on_auth_user_created trigger made a 'student' profile; set the chosen role server-side.
  const { error: roleError } = await ctx.db
    .from("profiles")
    .upsert({ id: data.user.id, full_name: fullName, role }, { onConflict: "id" });
  if (roleError) return { status: "error", message: "Invite sent, but the role wasn't saved. Set it in the table below." };

  audit("user.invite", ctx.actor.id, { userId: data.user.id, role });
  refresh();
  return { status: "success", message: `Invite sent to ${email}.` };
}

const linkSchema = z.object({
  kind: z.enum(["guardian", "tutor"]),
  adultId: z.string().refine(isUuid),
  studentId: z.string().refine(isUuid),
});

export async function linkStudent(_prev: AdminFormState, formData: FormData): Promise<AdminFormState> {
  const ctx = await adminContext();
  if (!ctx.ok) return ctx.error;

  const parsed = linkSchema.safeParse({
    kind: formData.get("kind"),
    adultId: formData.get("adultId"),
    studentId: formData.get("studentId"),
  });
  if (!parsed.success) return { status: "error", message: "Choose an adult and a student." };
  const { kind, adultId, studentId } = parsed.data;

  // Re-read roles from the database; never trust the form about who is a parent/tutor/student.
  const { data: rows } = await ctx.db.from("profiles").select("id, role").in("id", [adultId, studentId]);
  const roleOf = new Map(((rows ?? []) as { id: string; role: Role }[]).map((r) => [r.id, r.role]));
  const expectedAdult: Role = kind === "guardian" ? "parent" : "tutor";
  if (roleOf.get(adultId) !== expectedAdult || roleOf.get(studentId) !== "student") {
    return { status: "error", message: `Link a ${expectedAdult} account to a student account.` };
  }

  const { error } =
    kind === "guardian"
      ? await ctx.db.from("guardianships").upsert({ parent_id: adultId, student_id: studentId }, { onConflict: "parent_id,student_id" })
      : await ctx.db.from("tutor_students").upsert({ tutor_id: adultId, student_id: studentId }, { onConflict: "tutor_id,student_id" });
  if (error) return { status: "error", message: "We couldn't save that link. Please try again." };

  audit("link.create", ctx.actor.id, { kind, adultId, studentId });
  refresh();
  return { status: "success", message: "Linked." };
}

export async function unlinkStudent(_prev: AdminFormState, formData: FormData): Promise<AdminFormState> {
  const ctx = await adminContext();
  if (!ctx.ok) return ctx.error;

  const parsed = linkSchema.safeParse({
    kind: formData.get("kind"),
    adultId: formData.get("adultId"),
    studentId: formData.get("studentId"),
  });
  if (!parsed.success) return { status: "error", message: "That link isn't valid." };
  const { kind, adultId, studentId } = parsed.data;

  const { error } =
    kind === "guardian"
      ? await ctx.db.from("guardianships").delete().eq("parent_id", adultId).eq("student_id", studentId)
      : await ctx.db.from("tutor_students").delete().eq("tutor_id", adultId).eq("student_id", studentId);
  if (error) return { status: "error", message: "We couldn't remove that link. Please try again." };

  audit("link.delete", ctx.actor.id, { kind, adultId, studentId });
  refresh();
  return { status: "success", message: "Link removed." };
}
