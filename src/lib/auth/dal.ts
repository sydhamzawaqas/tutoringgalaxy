import "server-only";
import { cache } from "react";
import { notFound, redirect } from "next/navigation";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isRole, type Role } from "./roles";

/**
 * Data Access Layer: the ONLY place that decides who the user is and what they may access.
 * Call it close to the data, in every page, Server Action and Route Handler.
 * Layout checks and the proxy are conveniences, not security boundaries.
 *
 * Never wrap these in "use cache": they read cookies and return per-user data.
 * React `cache()` only de-duplicates calls within a single request.
 */

/** A narrow DTO: only what the UI needs. No tokens, no raw auth objects. */
export type SessionUser = {
  id: string;
  email: string;
  role: Role;
  fullName: string;
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export function isUuid(value: unknown): value is string {
  return typeof value === "string" && UUID_RE.test(value);
}

/** The signed-in user, or null. Verifies the token with Supabase Auth (getUser), not just the cookie. */
export const getSession = cache(async (): Promise<SessionUser | null> => {
  const supabase = await createClient();
  if (!supabase) {
    // Not configured: still defer to request time so no auth decision is baked in at build.
    await connection();
    return null;
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return null;

  const { data: profile } = await supabase.from("profiles").select("role, full_name").eq("id", user.id).maybeSingle();

  // Missing or unknown role falls back to the least-privileged role.
  const role: Role = isRole(profile?.role) ? profile.role : "student";
  return {
    id: user.id,
    email: user.email ?? "",
    role,
    fullName: typeof profile?.full_name === "string" ? profile.full_name : "",
  };
});

/** The signed-in user, or a redirect to /login. */
export async function verifySession(): Promise<SessionUser> {
  const user = await getSession();
  if (!user) redirect("/login");
  return user;
}

/**
 * The signed-in user if they hold one of `roles`. Otherwise 404, so the area's existence isn't
 * confirmed to people who can't use it (forbidden() is still experimental in Next.js 16).
 */
export async function requireRole(...roles: Role[]): Promise<SessionUser> {
  const user = await verifySession();
  if (!roles.includes(user.role)) notFound();
  return user;
}

/** For Server Actions, which should return an error instead of redirecting/404ing mid-form. */
export async function getAuthorizedUser(...roles: Role[]): Promise<SessionUser | null> {
  const user = await getSession();
  if (!user) return null;
  if (roles.length > 0 && !roles.includes(user.role)) return null;
  return user;
}

/**
 * Can `user` see `studentId`'s practice data? Students: themselves. Parents: linked children
 * (guardianships). Tutors: assigned students (tutor_students). Admins: everyone.
 * RLS enforces the same rule in the database (can_view_student), so this is defence in depth.
 */
export const canAccessStudent = cache(async (user: SessionUser, studentId: string): Promise<boolean> => {
  if (!isUuid(studentId)) return false;
  if (user.id === studentId) return user.role === "student" || user.role === "admin";
  if (user.role === "admin") return true;

  const supabase = await createClient();
  if (!supabase) return false;

  if (user.role === "parent") {
    const { data } = await supabase
      .from("guardianships")
      .select("student_id")
      .eq("parent_id", user.id)
      .eq("student_id", studentId)
      .maybeSingle();
    return Boolean(data);
  }
  if (user.role === "tutor") {
    const { data } = await supabase
      .from("tutor_students")
      .select("student_id")
      .eq("tutor_id", user.id)
      .eq("student_id", studentId)
      .maybeSingle();
    return Boolean(data);
  }
  return false;
});

/** 404 unless the current user may see this student. Returns the user for convenience. */
export async function requireStudentAccess(studentId: string): Promise<SessionUser> {
  const user = await verifySession();
  if (!(await canAccessStudent(user, studentId))) notFound();
  return user;
}
