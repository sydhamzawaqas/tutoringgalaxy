import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import { requireRole } from "@/lib/auth/dal";
import { getLinkedStudents } from "@/lib/auth/data";
import { LoadingLines, PageHeader } from "@/components/app/page-header";
import { StudentList } from "@/components/app/progress-report";

export const metadata = pageMetadata({
  title: "Students",
  description: "Your students' practice and progress.",
  path: "/app/students",
  noindex: true,
});

export default function StudentsPage() {
  return (
    <>
      <PageHeader title="Students" lead="See what each student practised and where they lost marks." />
      <Suspense fallback={<LoadingLines label="Loading your students" />}>
        <Students />
      </Suspense>
    </>
  );
}

async function Students() {
  await requireRole("tutor", "admin");
  const students = await getLinkedStudents();
  return (
    <StudentList
      students={students}
      basePath="/app/students"
      empty="No students are assigned to you yet. The admin team assigns students after enrolment."
    />
  );
}
