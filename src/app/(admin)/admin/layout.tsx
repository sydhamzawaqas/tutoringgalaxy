import { Suspense } from "react";
import type { Metadata } from "next";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isServiceRoleConfigured } from "@/lib/supabase/admin";
import { requireRole } from "@/lib/auth/dal";
import { AppShell } from "@/components/app/app-shell";
import { AppNav, type ShellNavItem } from "@/components/app/app-nav";
import { AccountBox } from "@/components/app/account-box";
import { NotConfigured } from "@/components/app/not-configured";
import { RequestTime } from "@/components/app/request-time";
import { LoadingLines } from "@/components/app/page-header";

export const metadata: Metadata = { robots: { index: false, follow: false } };

const items: ShellNavItem[] = [
  { href: "/admin", label: "Overview", icon: "admin" },
  { href: "/admin/leads", label: "Leads", icon: "leads" },
  { href: "/admin/tutors", label: "Tutor applications", icon: "tutors" },
  { href: "/admin/users", label: "Users", icon: "users" },
  { href: "/app", label: "Back to app", icon: "back" },
];

/**
 * Admin area. requireRole("admin") runs here (so non-admins get a 404 and the admin UI is never
 * rendered for them) AND inside every admin data function and Server Action, because layouts
 * don't re-run on client navigation and actions are reachable directly.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured()) {
    return (
      <AppShell nav={null} homeHref="/admin">
        <NotConfigured />
        {/* Private area: always rendered per request, even when sign-in isn't configured. */}
        <Suspense>
          <RequestTime />
        </Suspense>
      </AppShell>
    );
  }
  return (
    <Suspense fallback={<LoadingLines label="Checking access" />}>
      <AdminGate>{children}</AdminGate>
    </Suspense>
  );
}

async function AdminGate({ children }: { children: React.ReactNode }) {
  const user = await requireRole("admin");
  return (
    <AppShell homeHref="/admin" nav={<AppNav label="Admin" items={items} />} account={<AccountBox user={user} />}>
      {isServiceRoleConfigured() ? (
        children
      ) : (
        <NotConfigured title="Admin isn't configured yet">
          Set SUPABASE_SERVICE_ROLE_KEY on the server to manage leads, tutor applications and users.
        </NotConfigured>
      )}
    </AppShell>
  );
}
