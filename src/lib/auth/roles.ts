/** Roles and role-based navigation. Safe for server and client (no secrets, no data access). */
export const ROLES = ["student", "parent", "tutor", "admin"] as const;
export type Role = (typeof ROLES)[number];

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && (ROLES as readonly string[]).includes(value);
}

export const roleLabel: Record<Role, string> = {
  student: "Student",
  parent: "Parent",
  tutor: "Tutor",
  admin: "Admin",
};

export type NavIcon = "dashboard" | "practice" | "progress" | "children" | "students" | "settings" | "admin";
export type NavItem = { href: string; label: string; icon: NavIcon };

/** Sidebar items per role. UI only: every page re-checks access on the server. */
export function navForRole(role: Role): NavItem[] {
  const items: NavItem[] = [{ href: "/app", label: "Dashboard", icon: "dashboard" }];
  if (role === "student" || role === "admin") {
    items.push({ href: "/app/practice", label: "Practice", icon: "practice" });
    items.push({ href: "/app/progress", label: "Progress", icon: "progress" });
  }
  if (role === "parent") items.push({ href: "/app/children", label: "Children", icon: "children" });
  if (role === "tutor" || role === "admin") items.push({ href: "/app/students", label: "Students", icon: "students" });
  items.push({ href: "/app/settings", label: "Settings", icon: "settings" });
  if (role === "admin") items.push({ href: "/admin", label: "Admin", icon: "admin" });
  return items;
}

/** Only allow same-site, in-app redirect targets after sign-in (prevents open redirects). */
export function safeNextPath(raw: unknown, fallback = "/app"): string {
  if (typeof raw !== "string" || raw.length === 0 || raw.length > 512) return fallback;
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.includes("\\")) return fallback;
  // Reject control characters and anything that isn't a plain path + query.
  if (/[\u0000-\u001f\u007f]/.test(raw)) return fallback;
  const allowed = ["/app", "/admin", "/reset-password"];
  const path = raw.split(/[?#]/)[0];
  if (!allowed.some((p) => path === p || path.startsWith(`${p}/`))) return fallback;
  return raw;
}
