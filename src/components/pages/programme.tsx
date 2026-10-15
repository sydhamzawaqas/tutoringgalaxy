import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Avatar, Stars, tint } from "@/components/home/parts";
import { SUBJECT_BY_SLUG } from "@/data/legacy/seo";
import { TUTORS } from "@/data/legacy/tutors";
import { getSubject } from "@/data/content/subjects";
import { studyPlan } from "@/data/content/exam-prep";
import { cn } from "@/lib/utils";

/** Pieces shared by the exam-prep and academy pages. */

/** Subjects for a curriculum. Links to /subjects/<slug> where that page exists. */
export function SubjectGrid({ subjects, prefix, cta }: { subjects: string[]; prefix: string; cta: string }) {
  const list = subjects.map((s) => SUBJECT_BY_SLUG[s]).filter((s) => s !== undefined);
  return (
    <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((s, i) => {
        const hasPage = getSubject(s.slug)?.page === true;
        const inner = (
          <>
            <span className={cn("grid size-10 shrink-0 place-items-center rounded-container text-small font-bold", tint(i))}>{s.name.slice(0, 2)}</span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold">{prefix} {s.name}</span>
              <span className="block truncate text-label text-muted-foreground">{s.blurb}</span>
            </span>
            {hasPage ? <span className="hidden shrink-0 text-label font-semibold text-navy-soft group-hover:underline sm:inline">{cta}</span> : null}
          </>
        );
        return (
          <li key={s.slug}>
            {hasPage ? (
              <Link href={`/subjects/${s.slug}`} className="group flex h-full items-center gap-3 rounded-container border border-border bg-background p-3 transition-shadow hover:shadow-card">
                {inner}
              </Link>
            ) : (
              <div className="flex h-full items-center gap-3 rounded-container border border-border bg-background p-3">{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** Tutors from the legacy roster who teach this curriculum. */
export function tutorsFor(curriculum: string, limit: number) {
  return TUTORS.filter((t) => t.curricula.includes(curriculum)).slice(0, limit);
}

export function TutorMiniCards({ curriculum, limit, dark = false }: { curriculum: string; limit: number; dark?: boolean }) {
  const list = tutorsFor(curriculum, limit);
  if (!list.length) return null;
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2", limit >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
      {list.map((t, i) => (
        <li key={t.slug} className={cn("flex flex-col rounded-panel border p-5", dark ? "border-on-dark/10 bg-on-dark/5" : "border-border bg-background shadow-card")}>
          <div className="flex items-center gap-3">
            <Avatar initials={t.initials} i={i} />
            <div className="min-w-0">
              <h3 className={cn("truncate font-bold", dark && "text-on-dark")}>{t.name}</h3>
              <p className={cn("truncate text-label", dark ? "text-on-dark-muted" : "text-muted-foreground")}>{t.title}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Stars rating={t.rating} />
            <span className={cn("text-label tabular-nums", dark ? "text-on-dark-muted" : "text-muted-foreground")}>{t.rating.toFixed(2)}</span>
          </div>
          <p className={cn("mt-2 text-small", dark ? "text-on-dark-muted" : "text-muted-foreground")}>{t.bio}</p>
        </li>
      ))}
    </ul>
  );
}

/** Compact 12-week plan for hero asides. */
export function PlanTimeline() {
  return (
    <div className="rounded-panel border border-on-dark/10 bg-on-dark/5 p-6 backdrop-blur">
      <p className="flex items-center gap-2 text-label font-semibold text-on-dark-muted">
        <CalendarDays aria-hidden className="size-4 text-gold" /> Your 12-week plan
      </p>
      <ol className="mt-5 space-y-0">
        {studyPlan.map((p, i) => (
          <li key={p.week} className="relative flex gap-4 pb-5 last:pb-0">
            {i < studyPlan.length - 1 ? <span aria-hidden className="absolute top-9 bottom-0 left-4 w-px bg-on-dark/15" /> : null}
            <span className="relative grid size-8 shrink-0 place-items-center rounded-pill bg-gold text-small font-bold text-navy-deep">{i + 1}</span>
            <div className="min-w-0">
              <p className="text-label text-gold">{p.week}</p>
              <p className="font-semibold text-on-dark">{p.title}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Text link with arrow. */
export function ArrowLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-1 text-small font-semibold text-navy-soft underline-offset-4 hover:underline", className)}>
      {children}
      <ArrowRight aria-hidden className="size-4" />
    </Link>
  );
}
