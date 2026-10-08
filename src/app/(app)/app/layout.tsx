import { Suspense } from "react";
import type { Metadata } from "next";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getSession } from "@/lib/auth/dal";
import { navForRole } from "@/lib/auth/roles";
import { AppShell } from "@/components/app/app-shell";
import { AppNav } from "@/components/app/app-nav";
import { AccountBox } from "@/components/app/account-box";
import { NotConfigured } from "@/components/app/not-configured";
import { RequestTime } from "@/components/app/request-time";

export const metadata: Metadata = { robots: { index: false, follow: false } };

/**
 * /app shell. The session read lives in small components behind <Suspense> so the shell can
 * prerender (Cache Components). This layout is NOT a security boundary: layouts don't re-run on
 * client navigation, so every page calls the DAL (verifySession / requireRole) itself.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured()) {
    return (
      <AppShell nav={null}>
        <NotConfigured />
        {/* Private area: always rendered per request, even when sign-in isn't configured. */}
        <Suspense>
          <RequestTime />
        </Suspense>
      </AppShell>
    );
  }
  return (
    <AppShell
      nav={
        <Suspense fallback={null}>
          <SidebarNav />
        </Suspense>
      }
      account={
        <Suspense fallback={null}>
          <Account />
        </Suspense>
      }
    >
      {children}
    </AppShell>
  );
}

async function SidebarNav() {
  const user = await getSession();
  if (!user) return null;
  return <AppNav label="App" items={navForRole(user.role)} />;
}

async function Account() {
  const user = await getSession();
  if (!user) return null;
  return <AccountBox user={user} />;
}
