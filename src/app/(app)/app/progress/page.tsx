import { Suspense } from "react";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { requireRole } from "@/lib/auth/dal";
import { getStudentReport } from "@/lib/auth/data";
import { Button } from "@/components/ui/button";
import { LoadingLines, PageHeader } from "@/components/app/page-header";
import { ProgressReport } from "@/components/app/progress-report";

export const metadata = pageMetadata({
  title: "Progress",
  description: "Your marked practice questions by topic.",
  path: "/app/progress",
  noindex: true,
});

export default function ProgressPage() {
  return (
    <>
      <PageHeader title="Progress" lead="Every marked question, grouped by topic, with the examiner's notes." />
      <Suspense fallback={<LoadingLines label="Loading your progress" />}>
        <MyProgress />
      </Suspense>
    </>
  );
}

async function MyProgress() {
  // Students (and admins trying the app) see their own attempts; parents and tutors use their lists.
  const user = await requireRole("student", "admin");
  const report = await getStudentReport(user.id);
  return (
    <ProgressReport
      report={report}
      emptyAction={
        <Button asChild>
          <Link href="/app/practice">Start practice</Link>
        </Button>
      }
    />
  );
}
