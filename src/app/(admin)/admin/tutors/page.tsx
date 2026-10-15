import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import { listTutorApplications } from "@/lib/auth/admin-data";
import { statusLabel } from "@/lib/auth/admin-constants";
import { Badge, Panel, SheetCard } from "@/components/ui/primitives";
import { LoadingLines, PageHeader } from "@/components/app/page-header";
import { TutorApplicationStatusForm } from "@/components/app/admin-forms";
import { formatDate } from "@/components/app/progress-report";

export const metadata = pageMetadata({
  title: "Tutor applications",
  description: "Applications from tutors.",
  path: "/admin/tutors",
  noindex: true,
});

export default function TutorsPage() {
  return (
    <>
      <PageHeader title="Tutor applications" lead="Newest first. Check qualifications before an interview." />
      <Suspense fallback={<LoadingLines label="Loading applications" />}>
        <Applications />
      </Suspense>
    </>
  );
}

function list(value: unknown): string {
  if (Array.isArray(value)) return value.map((v) => String(v)).join(", ");
  if (value === null || value === undefined || value === "") return "Not given";
  return String(value);
}

async function Applications() {
  const apps = await listTutorApplications();
  if (apps === null) {
    return (
      <Panel className="mt-8">
        <p className="text-muted-foreground">The tutor_applications table isn&apos;t available yet. Run its migration first.</p>
      </Panel>
    );
  }
  if (apps.length === 0) {
    return (
      <Panel className="mt-8">
        <p className="text-muted-foreground">No tutor applications yet.</p>
      </Panel>
    );
  }
  return (
    <ul className="mt-8 flex flex-col gap-4">
      {apps.map((a) => (
        <li key={a.id}>
          <SheetCard>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-h3">{a.name || "Unnamed applicant"}</h2>
                <p className="text-small text-muted-foreground">
                  Applied <time dateTime={a.created_at}>{formatDate(a.created_at)}</time>
                </p>
              </div>
              <Badge>{statusLabel(a.status ?? "new")}</Badge>
            </div>
            <dl className="mt-4 grid gap-x-6 gap-y-2 text-small sm:grid-cols-[10rem_1fr]">
              <dt className="text-muted-foreground">Subjects</dt>
              <dd>{list(a.subjects)}</dd>
              <dt className="text-muted-foreground">Curricula</dt>
              <dd>{list(a.curricula)}</dd>
              <dt className="text-muted-foreground">Experience</dt>
              <dd>{a.experience_years === null ? "Not given" : `${a.experience_years} years`}</dd>
              <dt className="text-muted-foreground">City</dt>
              <dd>{list(a.city)}</dd>
              <dt className="text-muted-foreground">Modes</dt>
              <dd>{list(a.modes)}</dd>
              <dt className="text-muted-foreground">Contact</dt>
              <dd className="break-all">
                {list(a.email)}, {list(a.whatsapp)}
              </dd>
            </dl>
            {a.qualifications || a.about ? (
              <details className="mt-4">
                <summary className="cursor-pointer text-small font-semibold">Qualifications and about</summary>
                <div className="mt-2 flex flex-col gap-2 text-small whitespace-pre-line">
                  {a.qualifications ? <p>{a.qualifications}</p> : null}
                  {a.about ? <p>{a.about}</p> : null}
                </div>
              </details>
            ) : null}
            <div className="mt-4 border-t border-rule pt-4">
              <TutorApplicationStatusForm applicationId={a.id} status={a.status ?? "new"} name={a.name ?? "applicant"} />
            </div>
          </SheetCard>
        </li>
      ))}
    </ul>
  );
}
