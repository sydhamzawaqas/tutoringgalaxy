import { Suspense } from "react";
import { RequestTime } from "@/components/app/request-time";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { requireRole, requireStudentAccess } from "@/lib/auth/dal";
import { getStudentReport } from "@/lib/auth/data";
import { LoadingLines, PageHeader } from "@/components/app/page-header";
import { ProgressReport } from "@/components/app/progress-report";

export const metadata = pageMetadata({
  title: "Student report",
  description: "Practice report for a student.",
  path: "/app/students",
  noindex: true,
});

export default function StudentReportPage({ params }: { params: Promise<{ studentId: string }> }) {
  return (
    <>
      <Suspense>
        <RequestTime />
      </Suspense>
      <p className="mb-4 text-small">
        <Link href="/app/students" className="font-semibold underline underline-offset-4">
          All students
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
  // Tutors only for assigned students (tutor_students); admins for anyone. 404 otherwise.
  await requireRole("tutor", "admin");
  await requireStudentAccess(studentId);
  const report = await getStudentReport(studentId);
  return (
    <>
      <PageHeader title={report.student.fullName} lead="AI practice: topics, marks and examiner's notes. Use it to plan the next lesson." />
      <ProgressReport report={report} />
    </>
  );
}
