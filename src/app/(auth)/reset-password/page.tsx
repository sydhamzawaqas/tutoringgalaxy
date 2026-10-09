import { Suspense } from "react";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getSession } from "@/lib/auth/dal";
import { RequestResetForm, UpdatePasswordForm } from "@/components/app/auth-forms";
import { NotConfigured } from "@/components/app/not-configured";
import { LoadingLines } from "@/components/app/page-header";

export const metadata = pageMetadata({
  title: "Reset your password",
  description: "Reset or choose a password for your Tutoring Galaxy account.",
  path: "/reset-password",
  noindex: true,
});

export default function ResetPasswordPage() {
  return (
    <>
      {isSupabaseConfigured() ? (
        <Suspense fallback={<LoadingLines label="Loading" />}>
          <ResetContent />
        </Suspense>
      ) : (
        <>
          <h1 className="text-h2-sm">Reset your password</h1>
          <div className="mt-6">
            <NotConfigured />
          </div>
        </>
      )}
      <p className="mt-6 border-t border-rule pt-4 text-small text-muted-foreground">
        Remembered it?{" "}
        <Link href="/login" className="font-semibold text-foreground underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </>
  );
}

/** Signed in (e.g. arrived from a recovery or invite link): choose a new password. Otherwise: request a link. */
async function ResetContent() {
  const user = await getSession();
  if (user) {
    return (
      <>
        <h1 className="text-h2-sm">Choose a password</h1>
        <p className="mt-2 text-muted-foreground">
          For {user.email}. Use at least 12 characters; a short sentence is easy to remember and hard to guess.
        </p>
        <div className="mt-6">
          <UpdatePasswordForm />
        </div>
      </>
    );
  }
  return (
    <>
      <h1 className="text-h2-sm">Reset your password</h1>
      <p className="mt-2 text-muted-foreground">Enter your email and we&apos;ll send you a link to choose a new password.</p>
      <div className="mt-6">
        <RequestResetForm />
      </div>
    </>
  );
}
