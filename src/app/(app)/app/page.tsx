import { Suspense } from "react";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { verifySession, type SessionUser } from "@/lib/auth/dal";
import { getLinkedStudents, getStudentReport } from "@/lib/auth/data";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/primitives";
import { LoadingLines, PageHeader } from "@/components/app/page-header";
import { StudentList } from "@/components/app/progress-report";

export const metadata = pageMetadata({
  title: "Dashboard",
  description: "Your Tutoring Galaxy dashboard.",
  path: "/app",
  noindex: true,
});

/**
 * One /app URL, role-specific content. A plain switch on the verified role is simpler than
 * @student/@parent/@tutor parallel-route slots here: slots would all render (and need default.tsx
 * files) on every request, while the switch only runs the view the user is allowed to see.
 */
export default function DashboardPage() {
  return (
    <Suspense fallback={<LoadingLines label="Loading your dashboard" />}>
      <Dashboard />
    </Suspense>
  );
}

async function Dashboard() {
  const user = await verifySession();
  switch (user.role) {
    case "parent":
      return <ParentDashboard user={user} />;
    case "tutor":
      return <TutorDashboard user={user} />;
    case "admin":
      return <AdminDashboard user={user} />;
    default:
      return <StudentDashboard user={user} />;
  }
}

function firstName(user: SessionUser) {
  return user.fullName.split(" ")[0] || "there";
}

async function StudentDashboard({ user }: { user: SessionUser }) {
  const report = await getStudentReport(user.id);
  const { totals } = report;
  const pct = totals.marksAvailable > 0 ? Math.round((totals.marksAwarded / totals.marksAvailable) * 100) : null;
  return (
    <>
      <PageHeader title={`Hello, ${firstName(user)}`} lead="Pick a topic and answer exam-style questions. The AI examiner marks your working and tells you what to try next.">
        <Button asChild>
          <Link href="/app/practice">Start practice</Link>
        </Button>
      </PageHeader>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Panel>
          <p className="text-small text-muted-foreground">Questions marked</p>
          <p className="mt-1 text-h3 font-bold tabular-nums">{totals.attempts}</p>
        </Panel>
        <Panel>
          <p className="text-small text-muted-foreground">This week</p>
          <p className="mt-1 text-h3 font-bold tabular-nums">{totals.last7Days}</p>
        </Panel>
        <Panel>
          <p className="text-small text-muted-foreground">Marks scored</p>
          <p className="mt-1 text-h3 font-bold tabular-nums">{pct === null ? "None yet" : `${pct}%`}</p>
        </Panel>
      </div>
      {report.topics.length > 0 ? (
        <p className="mt-6">
          <Link href="/app/progress" className="font-semibold underline underline-offset-4">
            See your progress by topic
          </Link>
        </p>
      ) : null}
    </>
  );
}

async function ParentDashboard({ user }: { user: SessionUser }) {
  const students = await getLinkedStudents();
  return (
    <>
      <PageHeader title={`Hello, ${firstName(user)}`} lead="See what your children have practised and how they're doing, topic by topic." />
      <StudentList
        students={students}
        basePath="/app/children"
        empty="No children are linked to your account yet. WhatsApp us and we'll link them for you."
      />
    </>
  );
}

async function TutorDashboard({ user }: { user: SessionUser }) {
  const students = await getLinkedStudents();
  return (
    <>
      <PageHeader title={`Hello, ${firstName(user)}`} lead="Your students' AI practice, so you can plan the next lesson around what they found hard." />
      <StudentList students={students} basePath="/app/students" empty="No students are assigned to you yet. The admin team assigns students after enrolment." />
    </>
  );
}

function AdminDashboard({ user }: { user: SessionUser }) {
  return (
    <>
      <PageHeader title={`Hello, ${firstName(user)}`} lead="You're signed in as an admin. Manage leads, tutor applications and accounts in the admin area.">
        <Button asChild>
          <Link href="/admin">Open admin</Link>
        </Button>
      </PageHeader>
      <ul className="mt-8 flex flex-col gap-2">
        <li>
          <Link href="/app/students" className="font-semibold underline underline-offset-4">
            All students&apos; progress
          </Link>
        </li>
        <li>
          <Link href="/app/practice" className="font-semibold underline underline-offset-4">
            Try AI practice
          </Link>
        </li>
      </ul>
    </>
  );
}
