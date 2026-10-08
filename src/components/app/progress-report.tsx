import Link from "next/link";
import type { LinkedStudent, StudentReport } from "@/lib/auth/data";
import { curriculumName, subjectName } from "@/lib/auth/data";
import { Badge, Mark, Note, Panel, SheetCard } from "@/components/ui/primitives";
import { Star, Tick } from "@/components/brand/marks";
import { MathText } from "./math-text";

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });
export function formatDate(iso: string | null) {
  if (!iso) return "Not yet";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : dateFmt.format(d);
}

function percent(got: number, max: number) {
  return max > 0 ? Math.round((got / max) * 100) : 0;
}

export function ProgressReport({ report, emptyAction }: { report: StudentReport; emptyAction?: React.ReactNode }) {
  const { totals, topics, recent } = report;

  if (totals.attempts === 0) {
    return (
      <Panel className="mt-8">
        <h2 className="text-h3">No marked questions yet</h2>
        <p className="mt-2 text-muted-foreground">Marked practice questions will show up here with examiner notes.</p>
        {emptyAction ? <div className="mt-4">{emptyAction}</div> : null}
      </Panel>
    );
  }

  const overall = percent(totals.marksAwarded, totals.marksAvailable);
  const strong = topics.filter((t) => t.attempts >= 3 && percent(t.marksAwarded, t.marksAvailable) >= 80);
  const focus = [...topics]
    .filter((t) => t.marksAvailable > 0)
    .sort((a, b) => percent(a.marksAwarded, a.marksAvailable) - percent(b.marksAwarded, b.marksAvailable))
    .slice(0, 3);

  return (
    <div className="mt-8 flex flex-col gap-10">
      <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Questions marked" value={String(totals.attempts)} />
        <Stat label="Full marks" value={String(totals.correct)} />
        <Stat label="Marks scored" value={`${overall}%`} detail={`${totals.marksAwarded} of ${totals.marksAvailable}`} />
        <Stat label="Last 7 days" value={String(totals.last7Days)} />
      </dl>

      {strong.length > 0 || focus.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {strong.length > 0 ? (
            <Panel>
              <h2 className="flex items-center gap-2 text-h3">
                <Star className="size-5" />
                Strong topics
              </h2>
              <ul className="mt-3 flex flex-col gap-1">
                {strong.slice(0, 4).map((t) => (
                  <li key={t.key}>
                    {t.topic} <span className="text-muted-foreground">({subjectName(t.subject)})</span>
                  </li>
                ))}
              </ul>
            </Panel>
          ) : null}
          {focus.length > 0 ? (
            <Panel>
              <h2 className="text-h3">Worth more practice</h2>
              <ul className="mt-3 flex flex-col gap-1">
                {focus.map((t) => (
                  <li key={t.key} className="flex justify-between gap-4">
                    <span>
                      {t.topic} <span className="text-muted-foreground">({subjectName(t.subject)})</span>
                    </span>
                    <Mark>{percent(t.marksAwarded, t.marksAvailable)}%</Mark>
                  </li>
                ))}
              </ul>
            </Panel>
          ) : null}
        </div>
      ) : null}

      <section aria-labelledby="by-topic">
        <h2 id="by-topic" className="text-h3">
          By topic
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-lg text-left text-small">
            <thead className="text-muted-foreground">
              <tr className="border-b border-rule">
                <th scope="col" className="py-2 pr-4 font-semibold">Topic</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Subject</th>
                <th scope="col" className="py-2 pr-4 text-right font-semibold">Questions</th>
                <th scope="col" className="py-2 text-right font-semibold">Marks</th>
              </tr>
            </thead>
            <tbody>
              {topics.map((t) => (
                <tr key={t.key} className="border-b border-rule">
                  <td className="py-2 pr-4 text-body">{t.topic}</td>
                  <td className="py-2 pr-4">
                    {subjectName(t.subject)} <Badge className="ml-1">{curriculumName(t.curriculum)}</Badge>
                  </td>
                  <td className="py-2 pr-4 text-right tabular-nums">{t.attempts}</td>
                  <td className="py-2 text-right tabular-nums">
                    {t.marksAwarded}/{t.marksAvailable}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="recent">
        <h2 id="recent" className="text-h3">
          Recent questions
        </h2>
        <ol className="mt-4 flex flex-col gap-4">
          {recent.map((a) => (
            <li key={a.id}>
              <SheetCard>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2 text-small text-muted-foreground">
                    <Badge>{curriculumName(a.curriculum)}</Badge>
                    <span>
                      {subjectName(a.subject)}: {a.topic}
                    </span>
                    <time dateTime={a.createdAt}>{formatDate(a.createdAt)}</time>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    {a.correct ? <Tick className="size-6" /> : null}
                    {a.feedback ? (
                      <Mark aria-label={`${a.feedback.marksAwarded} out of ${a.feedback.marksAvailable} marks`}>
                        {a.feedback.marksAwarded}/{a.feedback.marksAvailable}
                      </Mark>
                    ) : null}
                  </div>
                </div>
                <p className="mt-3">
                  <MathText text={a.question} />
                </p>
                <details className="mt-3">
                  <summary className="cursor-pointer text-small font-semibold">Answer and examiner notes</summary>
                  <div className="mt-3 flex flex-col gap-3">
                    <p className="answer-line whitespace-pre-line pb-2 text-small">{a.answer}</p>
                    {a.feedback ? (
                      <Note>
                        <MathText text={a.feedback.feedback} />
                      </Note>
                    ) : null}
                  </div>
                </details>
              </SheetCard>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function Stat({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="rounded-container border border-border p-4">
      <dt className="text-small text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-h3 font-bold tabular-nums">{value}</dd>
      {detail ? <dd className="text-small text-muted-foreground tabular-nums">{detail}</dd> : null}
    </div>
  );
}

export function StudentList({ students, basePath, empty }: { students: LinkedStudent[]; basePath: string; empty: string }) {
  if (students.length === 0) {
    return (
      <Panel className="mt-8">
        <p className="text-muted-foreground">{empty}</p>
      </Panel>
    );
  }
  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-2">
      {students.map((s) => (
        <li key={s.id}>
          <SheetCard className="flex h-full flex-col gap-3">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-h3">
                <Link href={`${basePath}/${s.id}`} className="underline-offset-4 hover:underline">
                  {s.fullName}
                </Link>
              </h2>
              {s.marksAvailable > 0 ? <Mark>{percent(s.marksAwarded, s.marksAvailable)}%</Mark> : null}
            </div>
            <p className="text-small text-muted-foreground">
              {s.attempts} {s.attempts === 1 ? "question" : "questions"} marked
            </p>
            <p className="text-small text-muted-foreground">Last active: {formatDate(s.lastActive)}</p>
          </SheetCard>
        </li>
      ))}
    </ul>
  );
}
