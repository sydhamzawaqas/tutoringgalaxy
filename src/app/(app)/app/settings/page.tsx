import { Suspense } from "react";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { verifySession } from "@/lib/auth/dal";
import { roleLabel } from "@/lib/auth/roles";
import { SheetCard } from "@/components/ui/primitives";
import { LoadingLines, PageHeader } from "@/components/app/page-header";
import { ProfileForm } from "@/components/app/auth-forms";

export const metadata = pageMetadata({
  title: "Settings",
  description: "Your Tutoring Galaxy account settings.",
  path: "/app/settings",
  noindex: true,
});

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" />
      <Suspense fallback={<LoadingLines label="Loading settings" />}>
        <Settings />
      </Suspense>
    </>
  );
}

async function Settings() {
  const user = await verifySession();
  return (
    <div className="mt-8 grid max-w-measure gap-6">
      <SheetCard>
        <h2 className="text-h3">Profile</h2>
        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-small">
          <dt className="text-muted-foreground">Email</dt>
          <dd className="break-all">{user.email}</dd>
          <dt className="text-muted-foreground">Account type</dt>
          <dd>{roleLabel[user.role]}</dd>
        </dl>
        <div className="mt-6">
          <ProfileForm fullName={user.fullName} />
        </div>
      </SheetCard>
      <SheetCard>
        <h2 className="text-h3">Password</h2>
        <p className="mt-2 text-muted-foreground">
          Choose a new password at any time. If you&apos;ve forgotten it, sign out and use &ldquo;Forgot your password?&rdquo;.{" "}
          <Link href="/reset-password" className="font-semibold text-foreground underline underline-offset-4">
            Change password
          </Link>
        </p>
        <p className="mt-4 text-small text-muted-foreground">
          Need to change your email or account type? WhatsApp us and the team will update it.
        </p>
      </SheetCard>
    </div>
  );
}
