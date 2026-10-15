import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import { requireRole } from "@/lib/auth/dal";
import { getLinkedStudents } from "@/lib/auth/data";
import { LoadingLines, PageHeader } from "@/components/app/page-header";
import { StudentList } from "@/components/app/progress-report";

export const metadata = pageMetadata({
  title: "Children",
  description: "Your children's practice and progress.",
  path: "/app/children",
  noindex: true,
});

export default function ChildrenPage() {
  return (
    <>
      <PageHeader title="Children" lead="Open a report to see topics practised, marks and the examiner's notes." />
      <Suspense fallback={<LoadingLines label="Loading your children" />}>
        <Children />
      </Suspense>
    </>
  );
}

async function Children() {
  await requireRole("parent");
  const students = await getLinkedStudents();
  return (
    <StudentList
      students={students}
      basePath="/app/children"
      empty="No children are linked to your account yet. WhatsApp us and we'll link them for you."
    />
  );
}
