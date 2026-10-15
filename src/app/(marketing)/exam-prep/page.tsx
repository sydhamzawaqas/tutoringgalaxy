import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Heading, tint } from "@/components/home/parts";
import { Band, CtaBand, HeroActions, PageHero } from "@/components/pages/shared";
import { examPrepIndex, examPreps, studyPlan } from "@/data/content/exam-prep";
import { academies } from "@/data/content/academy";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/data/content/site";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Exam preparation: IGCSE, GCSE, O and A Level, IB, SAT, ACT, GED",
  description:
    "Structured exam preparation with expert tutors, weekly study plans, past papers and AI progress reports. Free trial lesson.",
  path: "/exam-prep",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Exam Preparation", path: "/exam-prep" },
];

const listJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Exam preparation programs",
  itemListElement: examPreps.map((e, i) => ({ "@type": "ListItem", position: i + 1, name: `${e.name} Preparation`, url: `${site.url}/exam-prep/${e.slug}` })),
};

export default function ExamPrepIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={listJsonLd} />

      <PageHero
        crumbs={crumbs}
        eyebrow={examPrepIndex.eyebrow}
        title={examPrepIndex.title}
        lead={examPrepIndex.lead}
        chips={examPreps.map((e) => e.name)}
        chipsLabel="Programs"
      >
        <HeroActions message="Hi Tutoring Galaxy, I'd like help with exam preparation." />
      </PageHero>

      <Band>
        <Heading eyebrow="Choose your exam" title="Pick your exam to see the plan" lead="Every program includes a 12-week study plan, subject coverage, success stories and a free trial lesson." center />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {examPreps.map((e, i) => (
            <li key={e.slug}>
              <Link href={`/exam-prep/${e.slug}`} className="group flex h-full flex-col rounded-panel border border-border bg-background p-6 shadow-card transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lift">
                <span className={cn("grid size-12 place-items-center rounded-container text-small font-bold", tint(i))}>{e.name.slice(0, 2)}</span>
                <h3 className="mt-5 text-lead font-bold">{e.name} Preparation</h3>
                <p className="mt-1 text-small text-muted-foreground">{e.blurb}</p>
                <p className="mt-3 text-small">{e.tagline}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-5 text-label font-semibold text-navy-soft group-hover:underline">
                  View plan <ArrowRight aria-hidden className="size-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Band>

      <Band tone="sky">
        <Heading eyebrow="Study plan" title="One proven 12-week structure" lead="A proven structure used by hundreds of students. Pacing is adjusted to your exam date and current level." center />
        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {studyPlan.map((p, i) => (
            <li key={p.week} className="rounded-panel bg-background p-6 shadow-card">
              <p className="flex items-center gap-2 text-label font-semibold text-gold-deep">
                <CalendarDays aria-hidden className="size-4" /> {p.week}
              </p>
              <h3 className="mt-2 text-lead font-bold">Phase {i + 1}: {p.title}</h3>
              <p className="mt-2 text-small text-muted-foreground">{p.body}</p>
            </li>
          ))}
        </ol>
      </Band>

      <Band>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading eyebrow="Want more structure?" title="Tutoring Galaxy Academy" lead="Mentor-led academies with modules, a resource library and a completion certificate." />
          <Link href="/academy" className="inline-flex items-center gap-1 text-small font-semibold text-navy-soft underline-offset-4 hover:underline">
            All academies <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {academies.map((a, i) => (
            <li key={a.slug}>
              <Link href={`/academy/${a.slug}`} className={cn("flex h-full flex-col rounded-panel p-6 transition-shadow hover:shadow-card", tint(i))}>
                <h3 className="text-lead font-bold">{a.title}</h3>
                <p className="mt-1 text-small">{a.blurb}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Band>

      <CtaBand title="Not sure where to start?" lead="Book a free trial lesson. We'll match a tutor who knows your exam and build the plan around your exam date." />
    </>
  );
}
