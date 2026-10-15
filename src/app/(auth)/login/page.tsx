import { Suspense } from "react";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { safeNextPath } from "@/lib/auth/roles";
import { LoginForm } from "@/components/app/auth-forms";
import { NotConfigured } from "@/components/app/not-configured";

export const metadata = pageMetadata({
  title: "Sign in",
  description: "Sign in to Tutoring Galaxy for AI practice, progress and reports.",
  path: "/login",
  noindex: true,
});

export default function LoginPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return (
    <>
      <h1 className="text-h2-sm">Sign in</h1>
      <p className="mt-2 text-muted-foreground">For students, parents and tutors with a Tutoring Galaxy account.</p>
      <div className="mt-6">
        {isSupabaseConfigured() ? (
          <Suspense fallback={<LoginForm next="/app" />}>
            <LoginWithParams searchParams={searchParams} />
          </Suspense>
        ) : (
          <NotConfigured />
        )}
      </div>
      <p className="mt-6 border-t border-rule pt-4 text-small text-muted-foreground">
        No account yet? Accounts are created after a free trial.{" "}
        <Link href="/signup" className="font-semibold text-foreground underline underline-offset-4">
          How to get one
        </Link>
      </p>
    </>
  );
}

async function LoginWithParams({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const next = safeNextPath(typeof params.next === "string" ? params.next : undefined);
  const linkError = params.error === "link";
  return <LoginForm next={next} linkError={linkError} />;
}
