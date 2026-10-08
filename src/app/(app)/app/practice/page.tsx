import { Suspense } from "react";
import { withBase } from "@/lib/base-path";
import Link from "next/link";
import { Check } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { requireRole } from "@/lib/auth/dal";
import { isAiConfigured } from "@/lib/ai/config";
import { DIFFICULTIES, practiceCurricula, practiceSubjects } from "@/lib/ai/catalog";
import { Label, Select } from "@/components/ui/form";
import { QNum, SheetCard } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { LoadingLines, PageHeader } from "@/components/app/page-header";
import { NotConfigured } from "@/components/app/not-configured";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Practice",
  description: "Choose a curriculum, subject and topic for AI-marked practice questions.",
  path: "/app/practice",
  noindex: true,
});

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default function PracticePage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <>
      <PageHeader title="Practice" lead="Choose what to practise. Each question is marked like an exam, with notes on what to do next." />
      <Suspense fallback={<LoadingLines label="Loading topics" />}>
        <Picker searchParams={searchParams} />
      </Suspense>
    </>
  );
}

function one(v: string | string[] | undefined) {
  return typeof v === "string" ? v : undefined;
}

const chip =
  "inline-flex h-10 items-center gap-2 rounded-control border px-3 text-button font-semibold transition-colors duration-150";

async function Picker({ searchParams }: { searchParams: SearchParams }) {
  await requireRole("student", "admin");
  const params = await searchParams;
  const all = practiceCurricula();
  const curriculum = all.find((c) => c.slug === one(params.curriculum));
  const subjects = curriculum ? practiceSubjects(curriculum.slug) : [];
  const subject = subjects.find((s) => s.slug === one(params.subject));

  return (
    <div className="mt-8 flex flex-col gap-10">
      {!isAiConfigured() ? (
        <NotConfigured title="AI practice isn't configured yet">
          You can look around, but questions can&apos;t be generated or marked until the AI examiner is switched on.
        </NotConfigured>
      ) : null}

      <section aria-labelledby="step-curriculum" className="flex gap-4">
        <QNum aria-hidden>1</QNum>
        <div className="min-w-0 flex-1">
          <h2 id="step-curriculum" className="text-h3">
            Curriculum
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {all.map((c) => {
              const active = c.slug === curriculum?.slug;
              return (
                <li key={c.slug}>
                  <Link
                    href={`/app/practice?curriculum=${c.slug}`}
                    aria-current={active ? "true" : undefined}
                    className={cn(chip, active ? "border-foreground bg-primary text-primary-foreground" : "border-border hover:bg-surface")}
                  >
                    {active ? <Check aria-hidden className="size-4" strokeWidth={1.5} /> : null}
                    {c.short}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {curriculum ? (
        <section aria-labelledby="step-subject" className="flex gap-4">
          <QNum aria-hidden>2</QNum>
          <div className="min-w-0 flex-1">
            <h2 id="step-subject" className="text-h3">
              Subject
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {subjects.map((s) => {
                const active = s.slug === subject?.slug;
                return (
                  <li key={s.slug}>
                    <Link
                      href={`/app/practice?curriculum=${curriculum.slug}&subject=${s.slug}`}
                      aria-current={active ? "true" : undefined}
                      className={cn(chip, active ? "border-foreground bg-primary text-primary-foreground" : "border-border hover:bg-surface")}
                    >
                      {active ? <Check aria-hidden className="size-4" strokeWidth={1.5} /> : null}
                      {s.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ) : null}

      {curriculum && subject ? (
        <section aria-labelledby="step-topic" className="flex gap-4">
          <QNum aria-hidden>3</QNum>
          <div className="min-w-0 flex-1">
            <h2 id="step-topic" className="text-h3">
              Topic and difficulty
            </h2>
            <SheetCard className="mt-4">
              {/* A plain GET form: works without JavaScript, and the session page re-validates everything. */}
              <form action={withBase("/app/practice/session")} method="get" className="flex flex-col gap-6">
                <input type="hidden" name="curriculum" value={curriculum.slug} />
                <input type="hidden" name="subject" value={subject.slug} />
                <fieldset>
                  <legend className="text-button font-semibold">Topic</legend>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {subject.topics.map((topic, i) => (
                      <label
                        key={topic}
                        className="flex cursor-pointer items-center gap-3 rounded-control border border-border px-3 py-2.5 has-checked:border-foreground has-checked:bg-surface"
                      >
                        <input type="radio" name="topic" value={topic} defaultChecked={i === 0} className="size-4 accent-current" />
                        {topic}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="flex max-w-xs flex-col gap-1.5">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select id="difficulty" name="difficulty" defaultValue="standard">
                    {DIFFICULTIES.map((d) => (
                      <option key={d.value} value={d.value}>
                        {d.label}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Button type="submit">Start practice</Button>
                </div>
              </form>
            </SheetCard>
          </div>
        </section>
      ) : null}
    </div>
  );
}
