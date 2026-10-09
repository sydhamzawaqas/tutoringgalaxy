import { Suspense } from "react";
import { RequestTime } from "@/components/app/request-time";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { requireRole, requireStudentAccess } from "@/lib/auth/dal";
import { getStudentReport } from "@/lib/auth/data";
import { LoadingLines, PageHeader } from "@/components/app/page-header";
import { ProgressReport } from "@/components/app/progress-report";

export const metadata = pageMetadata({
  title: "Child report",
  description: "Practice report for your child.",
  path: "/app/children",
  noindex: true,
});

export default function ChildReportPage({ params }: { params: Promise<{ studentId: string }> }) {
  return (
    <>
      <Suspense>
        <RequestTime />
      </Suspense>
      <p className="mb-4 text-small">
        <Link href="/app/children" className="font-semibold underline underline-offset-4">
          All children
        </Link>
      </p>
      <Suspense fallback={<LoadingLines label="Loading report" />}>
        <Report params={params} />
      </Suspense>
    </>
  );
}

async function Report({ params }: { params: Promise<{ studentId: string }> }) {
  const { studentId } = await params;
  // Parents only, and only for children linked to them (guardianships). 404 otherwise.
  await requireRole("parent");
  await requireStudentAccess(studentId);
  const report = await getStudentReport(studentId);
  return (
    <>
      <PageHeader title={report.student.fullName} lead="AI practice report: topics practised, marks and examiner's notes." />
      <ProgressReport report={report} />
    </>
  );
}
