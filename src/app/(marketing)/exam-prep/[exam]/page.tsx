import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, CalendarDays, GraduationCap, Sparkles, Target, Trophy } from "lucide-react";
import { GradeJump, Heading, Stars } from "@/components/home/parts";
import { Band, CtaBand, FaqBlock, HeroActions, IconChip, PageHero, asFaqs } from "@/components/pages/shared";
import { ArrowLink, PlanTimeline, SubjectGrid, TutorMiniCards, tutorsFor } from "@/components/pages/programme";
import { EXAM_SLUGS, examPreps, getExamPrep, prepFaqs, prepFormat, prepOutcomes, storiesFor, studyPlan } from "@/data/content/exam-prep";
import { getAcademy } from "@/data/content/academy";
import { getCurriculum } from "@/data/content/curricula";
import { ASSESSMENT_HREF } from "@/data/content/growing-stars";
import { site } from "@/data/content/site";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return EXAM_SLUGS.map((exam) => ({ exam }));
}

export async function generateMetadata({ params }: PageProps<"/exam-prep/[exam]">): Promise<Metadata> {
  const e = getExamPrep((await params).exam);
  if (!e) notFound();
  return pageMetadata({
    title: `${e.name} preparation: tutors, study plan and past papers`,
    description: `Complete ${e.name} preparation: expert tutors, structured study plan, past papers and AI progress reports. ${e.tagline}. Free trial class.`,
    path: `/exam-prep/${e.slug}`,
  });
}

export default async function ExamPrepPage({ params }: PageProps<"/exam-prep/[exam]">) {
  const e = getExamPrep((await params).exam);
  if (!e) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Exam Preparation", path: "/exam-prep" },
    { name: `${e.name} Preparation`, path: `/exam-prep/${e.slug}` },
  ];
  const faqs = prepFaqs(e);
  const stories = storiesFor(e.slug);
  const curriculumPage = getCurriculum(e.slug)?.page ? `/curricula/${e.slug}` : undefined;
  const academy = getAcademy(e.slug);
  const hasTutors = tutorsFor(e.slug, 1).length > 0;
  const message = `Hi Tutoring Galaxy, I'd like to book a free ${e.name} trial lesson.`;
  const description = `Complete ${e.name} preparation: expert tutors, structured study plan, past papers and AI progress reports.`;

  const overview = [
    { icon: "target", title: "Who it's for", body: e.audience },
    { icon: "book", title: "Format", body: prepFormat },
    { icon: "trophy", title: "Outcomes", body: prepOutcomes },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: `${e.name} Preparation`,
          description,
          provider: { "@type": "EducationalOrganization", name: site.name, sameAs: site.url },
        }}
      />
      <JsonLd data={faqJsonLd(asFaqs(faqs))} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <PageHero
        crumbs={crumbs}
        eyebrow={`${e.name} Preparation`}
        title={`${e.name} Preparation —`}
        accent="Tutors, Study Plan & Past Papers"
        lead={e.tagline}
        chips={e.countries}
        chipsLabel="Students we prepare in"
        aside={<PlanTimeline />}
      >
        <HeroActions
          trialHref={`/book?curriculum=${e.slug}`}
          trialLabel={`Book a free ${e.name} trial lesson`}
          message={message}
          extra={{ href: ASSESSMENT_HREF, label: `Take the free ${e.name} assessment`, icon: Sparkles }}
        />
      </PageHero>

      {/* Overview */}
      <Band>
        <Heading eyebrow="Overview" title={`About ${e.name}`} lead={e.description} />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {overview.map((o, i) => (
            <li key={o.title} className="rounded-panel border border-border bg-background p-7 shadow-card">
              <IconChip icon={o.icon} i={i} />
              <h3 className="mt-5 text-lead font-bold">{o.title}</h3>
              <p className="mt-2 text-muted-foreground">{o.body}</p>
            </li>
          ))}
        </ul>
        {curriculumPage || academy ? (
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {curriculumPage ? <ArrowLink href={curriculumPage}>{e.name} curriculum guide</ArrowLink> : null}
            {academy ? <ArrowLink href={`/academy/${academy.slug}`}>Join the {academy.title}</ArrowLink> : null}
          </div>
        ) : null}
      </Band>

      {/* Subjects */}
      <Band tone="surface">
        <Heading eyebrow="Subjects covered" title={`${e.name} subjects we tutor`} />
        <SubjectGrid subjects={e.subjects} prefix={e.name} cta="Find tutor" />
      </Band>

      {/* Study plan */}
      <Band>
        <Heading eyebrow="Study plan" title={`Our 12-week ${e.name} preparation plan`} lead="A proven structure used by hundreds of students. Pacing is adjusted to your exam date and current level." />
        <ol className="relative mt-14 grid gap-5 md:grid-cols-2">
          {studyPlan.map((p, i) => (
            <li key={p.week} className={cn("rounded-panel p-7", i === 0 ? "bg-gold-tint" : i === 1 ? "bg-sky-tint" : i === 2 ? "bg-mint-tint" : "bg-lilac-tint")}>
              <div className="flex items-center justify-between gap-3">
                <p className="flex items-center gap-2 text-label font-semibold text-navy-soft">
                  <CalendarDays aria-hidden className="size-4" /> {p.week}
                </p>
                <span className="text-h2 font-bold leading-none text-navy/15 tabular-nums">0{i + 1}</span>
              </div>
              <h3 className="mt-2 text-h3">Phase {i + 1}: {p.title}</h3>
              <p className="mt-3 text-muted-foreground">{p.body}</p>
            </li>
          ))}
        </ol>
      </Band>

      {/* Success stories */}
      <Band tone="dark">
        <Heading eyebrow="Success stories" title={`${e.name} student wins`} dark center />
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {stories.map((s) => (
            <li key={s.name} className="flex flex-col rounded-panel border border-on-dark/10 bg-on-dark/5 p-6 backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-3">
                {s.before && s.after ? <GradeJump before={s.before} after={s.after} dark /> : <Trophy aria-hidden className="size-6 text-gold" />}
                <Stars rating={5} />
              </div>
              <p className="mt-4 text-label font-semibold text-gold">{s.result}</p>
              <blockquote className="mt-3 flex-1 text-on-dark">&ldquo;{s.text}&rdquo;</blockquote>
              <p className="mt-5 border-t border-on-dark/10 pt-4 text-small text-on-dark-muted">{s.name}, {s.place}</p>
            </li>
          ))}
        </ul>
        {hasTutors ? (
          <div className="mt-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h3 className="text-h3 text-on-dark">Top {e.name} tutors</h3>
              <Link href={`/tutors?curriculum=${e.slug}`} className="text-small font-semibold text-gold underline-offset-4 hover:underline">Browse {e.name} tutors</Link>
            </div>
            <div className="mt-6"><TutorMiniCards curriculum={e.slug} limit={3} dark /></div>
          </div>
        ) : null}
      </Band>

      {/* FAQ */}
      <Band>
        <FaqBlock title={`${e.name} preparation — questions parents ask`} items={faqs} />
      </Band>

      {/* Other exams */}
      <Band tone="sky" className="py-14 lg:py-16">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="flex items-center gap-2 text-h3"><GraduationCap aria-hidden className="size-6 text-gold-deep" /> Other exam programs</h2>
          <ul className="flex flex-wrap gap-2">
            {examPreps.filter((x) => x.slug !== e.slug).map((x) => (
              <li key={x.slug}>
                <Link href={`/exam-prep/${x.slug}`} className="inline-flex items-center gap-1.5 rounded-pill border border-border bg-background px-3.5 py-1.5 text-small font-semibold transition-colors hover:bg-surface">
                  <BookOpen aria-hidden className="size-4 text-navy-soft" />
                  {x.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Band>

      {/* CONFIRM: "Money-back guarantee" is old-site copy; client to confirm the policy exists. */}
      <CtaBand
        title={`Start your ${e.name} preparation today`}
        lead="Free trial lesson · Verified expert tutors · Money-back guarantee"
        trialHref={`/book?curriculum=${e.slug}`}
        message={message}
        extra={{ href: ASSESSMENT_HREF, label: "Free assessment", icon: Target }}
      />
    </>
  );
}
