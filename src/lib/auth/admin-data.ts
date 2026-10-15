import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { isRole, type Role } from "./roles";
import { isRecordId } from "./admin-constants";
import { requireRole } from "./dal";

/**
 * Admin reads. EVERY function calls requireRole("admin") itself (not just the layout), then uses
 * the service-role client, which bypasses RLS. Return narrow DTOs, never raw clients.
 * Not cached: admin data must always be fresh and is per-request.
 */

function db() {
  const admin = createAdminClient();
  if (!admin) throw new AdminNotConfiguredError();
  return admin;
}

export class AdminNotConfiguredError extends Error {
  constructor() {
    super("SUPABASE_SERVICE_ROLE_KEY is not configured");
  }
}

type CountFilter = { column: string; op: "eq" | "gte"; value: string };

async function count(table: string, filter?: CountFilter): Promise<number | null> {
  let query = db().from(table).select("*", { count: "exact", head: true });
  if (filter) query = filter.op === "eq" ? query.eq(filter.column, filter.value) : query.gte(filter.column, filter.value);
  const { count: n, error } = await query;
  return error ? null : (n ?? 0);
}

export type AdminOverview = {
  leadsTotal: number | null;
  leadsNew: number | null;
  leadsLast7Days: number | null;
  tutorApplicationsTotal: number | null;
  tutorApplicationsNew: number | null;
  users: Record<Role, number | null>;
};

export async function getAdminOverview(): Promise<AdminOverview> {
  await requireRole("admin");
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const [leadsTotal, leadsNew, leadsLast7Days, tutorApplicationsTotal, tutorApplicationsNew, student, parent, tutor, admin] =
    await Promise.all([
      count("leads"),
      count("leads", { column: "status", op: "eq", value: "new" }),
      count("leads", { column: "created_at", op: "gte", value: weekAgo }),
      count("tutor_applications"),
      count("tutor_applications", { column: "status", op: "eq", value: "new" }),
      count("profiles", { column: "role", op: "eq", value: "student" }),
      count("profiles", { column: "role", op: "eq", value: "parent" }),
      count("profiles", { column: "role", op: "eq", value: "tutor" }),
      count("profiles", { column: "role", op: "eq", value: "admin" }),
    ]);
  return {
    leadsTotal,
    leadsNew,
    leadsLast7Days,
    tutorApplicationsTotal,
    tutorApplicationsNew,
    users: { student, parent, tutor, admin },
  };
}

export type LeadRow = {
  id: string;
  created_at: string;
  parent_name: string | null;
  curriculum: string | null;
  subject: string | null;
  mode: string | null;
  city: string | null;
  status: string | null;
};

export async function listLeads(status?: string): Promise<LeadRow[] | null> {
  await requireRole("admin");
  let query = db()
    .from("leads")
    .select("id, created_at, parent_name, curriculum, subject, mode, city, status")
    .order("created_at", { ascending: false })
    .limit(200);
  if (status) query = query.eq("status", status);
  const { data, error } = await query;
  if (error) return null;
  return (data ?? []).map((r) => ({ ...r, id: String(r.id) })) as LeadRow[];
}

export type LeadDetail = LeadRow & {
  level: string | null;
  challenge: string | null;
  preferred_times: unknown;
  whatsapp: string | null;
  email: string | null;
  consent: boolean | null;
  source_path: string | null;
  plan: string | null;
  tutor_slug: string | null;
  notes: string | null;
};

export async function getLead(id: string): Promise<LeadDetail | null> {
  await requireRole("admin");
  if (!isRecordId(id)) return null;
  const { data, error } = await db()
    .from("leads")
    .select(
      "id, created_at, curriculum, subject, level, challenge, mode, city, preferred_times, parent_name, whatsapp, email, consent, source_path, plan, tutor_slug, status, notes",
    )
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return null;
  return { ...data, id: String(data.id) } as LeadDetail;
}

export type TutorApplicationRow = {
  id: string;
  created_at: string;
  name: string | null;
  email: string | null;
  whatsapp: string | null;
  subjects: unknown;
  curricula: unknown;
  qualifications: string | null;
  experience_years: number | null;
  city: string | null;
  modes: unknown;
  about: string | null;
  status: string | null;
};

export async function listTutorApplications(): Promise<TutorApplicationRow[] | null> {
  await requireRole("admin");
  const { data, error } = await db()
    .from("tutor_applications")
    .select("id, created_at, name, email, whatsapp, subjects, curricula, qualifications, experience_years, city, modes, about, status")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) return null;
  return (data ?? []).map((r) => ({ ...r, id: String(r.id) })) as TutorApplicationRow[];
}

export type AdminUser = { id: string; email: string; fullName: string; role: Role; createdAt: string; lastSignIn: string | null };
export type Link = { kind: "guardian" | "tutor"; adultId: string; studentId: string };

export async function listUsers(): Promise<{ users: AdminUser[]; links: Link[] }> {
  await requireRole("admin");
  const admin = db();
  const [{ data: profiles }, authUsers, { data: guardianships }, { data: tutorStudents }] = await Promise.all([
    admin.from("profiles").select("id, role, full_name, created_at").order("created_at", { ascending: false }).limit(500),
    admin.auth.admin.listUsers({ page: 1, perPage: 500 }),
    admin.from("guardianships").select("parent_id, student_id").limit(2000),
    admin.from("tutor_students").select("tutor_id, student_id").limit(2000),
  ]);

  const authById = new Map((authUsers.data?.users ?? []).map((u) => [u.id, u]));
  const users: AdminUser[] = ((profiles ?? []) as { id: string; role: string; full_name: string | null; created_at: string }[]).map((p) => {
    const a = authById.get(p.id);
    return {
      id: p.id,
      email: a?.email ?? "",
      fullName: p.full_name ?? "",
      role: isRole(p.role) ? p.role : "student",
      createdAt: p.created_at,
      lastSignIn: a?.last_sign_in_at ?? null,
    };
  });
  const links: Link[] = [
    ...((guardianships ?? []) as { parent_id: string; student_id: string }[]).map((g) => ({
      kind: "guardian" as const,
      adultId: g.parent_id,
      studentId: g.student_id,
    })),
    ...((tutorStudents ?? []) as { tutor_id: string; student_id: string }[]).map((t) => ({
      kind: "tutor" as const,
      adultId: t.tutor_id,
      studentId: t.student_id,
    })),
  ];
  return { users, links };
}
