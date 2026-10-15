import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { requireRole } from "@/lib/auth/dal";
import { isAiConfigured } from "@/lib/ai/config";
import { isServiceRoleConfigured } from "@/lib/supabase/admin";
import { resolveSelection } from "@/lib/ai/catalog";
import { Badge } from "@/components/ui/primitives";
import { LoadingLines } from "@/components/app/page-header";
import { NotConfigured } from "@/components/app/not-configured";
import { PracticeSession } from "@/components/app/practice-session";

export const metadata = pageMetadata({
  title: "Practice session",
  description: "Answer exam-style questions and get examiner-style feedback.",
  path: "/app/practice/session",
  noindex: true,
});

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default function PracticeSessionPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<LoadingLines label="Loading practice" />}>
      <Session searchParams={searchParams} />
    </Suspense>
  );
}

async function Session({ searchParams }: { searchParams: SearchParams }) {
  await requireRole("student", "admin");
  const params = await searchParams;
  const selection = resolveSelection({
    curriculum: params.curriculum,
    subject: params.subject,
    topic: params.topic,
    difficulty: params.difficulty,
  });
  if (!selection) redirect("/app/practice");

  const configured = isAiConfigured() && isServiceRoleConfigured();
  const difficultyLabel = selection.difficulty[0].toUpperCase() + selection.difficulty.slice(1);

  return (
    <>
      <div className="flex flex-col gap-3 border-b border-rule pb-6">
        <p className="text-small">
          <Link
            href={`/app/practice?curriculum=${selection.curriculum.slug}&subject=${selection.subject.slug}`}
            className="font-semibold underline underline-offset-4"
          >
            Change topic
          </Link>
        </p>
        <h1 className="text-h2-sm sm:text-h2">{selection.topic}</h1>
        <div className="flex flex-wrap gap-2">
          <Badge>{selection.curriculum.short}</Badge>
          <Badge>{selection.subject.name}</Badge>
          <Badge>{difficultyLabel}</Badge>
        </div>
      </div>
      <div className="mt-8">
        {configured ? (
          <PracticeSession
            selection={{
              curriculum: selection.curriculum.slug,
              subject: selection.subject.slug,
              topic: selection.topic,
              difficulty: selection.difficulty,
            }}
          />
        ) : (
          <NotConfigured title="AI practice isn't configured yet">
            Questions can&apos;t be generated or marked until the AI examiner is switched on. Please check back soon.
          </NotConfigured>
        )}
      </div>
    </>
  );
}
