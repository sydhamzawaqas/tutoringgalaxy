import Link from "next/link";
import { ArrowRight, GraduationCap, Sparkles, Trophy } from "lucide-react";
import { Avatar, GradeJump, Heading, Stars, tint } from "@/components/home/parts";
import { Band, CtaBand, FaqBlock, HeroActions, PageHero, StatStrip } from "@/components/pages/shared";
import { admissions, examWins, gradeWins, resultsIntro, resultsSections, stories } from "@/data/content/results";
import { ASSESSMENT_HREF } from "@/data/content/growing-stars";
import { getExamPrep } from "@/data/content/exam-prep";
import { faqsFor } from "@/data/content/faqs";
import { site } from "@/data/content/site";
import { getBusinessStat } from "@/data/legacy/business-stats";
import { currentYear } from "@/lib/dates";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

const title = "Student results and success stories";
const description =
  "Real results from real students: grade jumps, exam breakthroughs, and Ivy League and Oxbridge admissions. See the proof parents love.";

export const metadata = pageMetadata({ title, description, path: "/results" });

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Results", path: "/results" },
];

const faqItems = faqsFor("general").map(({ q, a }) => ({ q, a }));

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: title,
  description,
  url: `${site.url}/results`,
  publisher: { "@type": "EducationalOrganization", name: site.name },
};

export default async function ResultsPage() {
  const years = (await currentYear()) - site.foundedYear;
  const stats = [
    { icon: "globe", value: getBusinessStat("countriesServed").displayValue ?? "", label: "Countries served" },
    { icon: "pin", value: getBusinessStat("citiesServed").displayValue ?? "", label: "Cities covered" },
    { icon: "book", value: getBusinessStat("curriculaCovered").displayValue ?? "", label: "Curricula supported" },
    { icon: "calendar", value: `${years}+`, label: "Years tutoring" },
  ];

  return (
    <>
      <JsonLd data={collectionJsonLd} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(faqsFor("general"))} />

      <PageHero
        crumbs={crumbs}
        eyebrow={resultsIntro.eyebrow}
        title={resultsIntro.title}
        lead={resultsIntro.lead}
        overlap
        aside={
          <ul className="grid gap-3">
            {gradeWins.slice(0, 3).map((t, i) => (
              <li key={t.name} className={cn("flex items-center justify-between gap-4 rounded-container bg-background p-4 text-foreground shadow-lift", i === 1 && "lg:ml-10")}>
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar initials={t.initial} i={i} size="sm" />
                  <div className="min-w-0">
                    <p className="truncate text-small font-bold">{t.subject}</p>
                    <p className="truncate text-label text-muted-foreground">{t.location}</p>
                  </div>
                </div>
                <GradeJump before={t.before ?? ""} after={t.after ?? ""} />
              </li>
            ))}
          </ul>
        }
      >
        <HeroActions trialLabel="Get results like these — start free" message="Hi Tutoring Galaxy, I saw your results page and would like to book a free trial." />
      </PageHero>

      <StatStrip stats={stats} />

      {/* Grade improvements */}
      <Band>
        <Heading eyebrow={resultsSections.grades.eyebrow} title={resultsSections.grades.title} lead={resultsSections.grades.lead} center />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {gradeWins.map((t, i) => {
            const prep = t.curriculumSlug ? getExamPrep(t.curriculumSlug) : undefined;
            return (
              <li key={t.name} className="flex flex-col rounded-panel border border-border bg-background p-6 shadow-card transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lift">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <GradeJump before={t.before ?? ""} after={t.after ?? ""} />
                  {t.duration ? <span className="rounded-pill bg-mint-tint px-2.5 py-0.5 text-label font-semibold text-success">in {t.duration}</span> : null}
                </div>
                <p className="mt-4 font-bold">{t.subject}</p>
                <div className="mt-auto flex items-center gap-3 border-t border-rule pt-4">
                  <Avatar initials={t.initial} i={i} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="text-small font-bold">{t.name}</p>
                    <p className="text-label text-muted-foreground">{t.role}, {t.location}</p>
                  </div>
                  {prep ? (
                    <Link href={`/exam-prep/${prep.slug}`} className="shrink-0 text-label font-semibold text-navy-soft underline-offset-4 hover:underline">
                      {prep.name} prep
                    </Link>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </Band>

      {/* Exam achievements */}
      <Band tone="dark">
        <Heading eyebrow={resultsSections.exams.eyebrow} title={resultsSections.exams.title} lead={resultsSections.exams.lead} dark center />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {examWins.map((w) => (
            <li key={w.name} className="flex flex-col rounded-panel border border-on-dark/10 bg-on-dark/5 p-6 backdrop-blur">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-pill bg-gold px-2.5 py-0.5 text-label font-bold text-navy-deep">{w.exam}</span>
                <Trophy aria-hidden className="size-5 text-gold" />
              </div>
              <p className="mt-4 text-h3 font-bold text-on-dark tabular-nums">{w.score}</p>
              <p className="mt-1 text-small text-on-dark-muted">{w.note}</p>
              <div className="mt-auto flex items-center justify-between gap-2 border-t border-on-dark/10 pt-4 text-label text-on-dark-muted">
                <span>{w.name}, {w.country}</span>
                {w.prepSlug ? (
                  <Link href={`/exam-prep/${w.prepSlug}`} aria-label={`${w.exam} preparation`} className="inline-flex items-center gap-1 rounded-control font-semibold text-gold hover:underline">
                    Prep <ArrowRight aria-hidden className="size-3.5" />
                  </Link>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </Band>

      {/* University admissions */}
      <Band tone="sky">
        <Heading eyebrow={resultsSections.admissions.eyebrow} title={resultsSections.admissions.title} lead={resultsSections.admissions.lead} center />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {admissions.map((a, i) => (
            <li key={a.name} className="flex gap-4 rounded-panel bg-background p-6 shadow-card">
              <span className={cn("grid size-12 shrink-0 place-items-center rounded-container", tint(i))}>
                <GraduationCap aria-hidden className="size-6" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-bold">{a.university}</h3>
                  <span className="text-label text-muted-foreground tabular-nums">{a.year}</span>
                </div>
                <p className="text-small text-muted-foreground">{a.program}</p>
                <p className="mt-3 text-label text-muted-foreground">{a.name} · {a.country}</p>
              </div>
            </li>
          ))}
        </ul>
      </Band>

      {/* Stories */}
      <Band>
        <Heading eyebrow={resultsSections.stories.eyebrow} title={resultsSections.stories.title} lead={resultsSections.stories.lead} center />
        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {stories.map((t, i) => (
            <li key={t.name} className="flex flex-col rounded-panel border border-border bg-background p-7 shadow-card">
              <Stars rating={t.rating} />
              <blockquote className="mt-4 flex-1 text-lead">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="mt-5 flex items-center gap-3 border-t border-rule pt-4">
                <Avatar initials={t.initial} i={i} size="sm" />
                <div>
                  <p className="text-small font-bold">{t.name}</p>
                  <p className="text-label text-muted-foreground">{t.role}, {t.location}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {[
            { href: "/tutors", label: "Meet the tutors" },
            { href: "/pricing", label: "See pricing" },
            { href: ASSESSMENT_HREF, label: "Take the free AI assessment" },
          ].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="inline-flex items-center gap-1.5 rounded-pill border border-border bg-background px-4 py-2 text-small font-semibold transition-colors hover:bg-surface">
                {l.href === ASSESSMENT_HREF ? <Sparkles aria-hidden className="size-4 text-gold-deep" /> : null}
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </Band>

      <Band tone="surface">
        <FaqBlock title="Frequently Asked Questions" lead="Everything you need to know about our home and online tutors." items={faqItems} />
      </Band>

      <CtaBand title={resultsSections.cta.title} lead={resultsSections.cta.lead} />
    </>
  );
}
