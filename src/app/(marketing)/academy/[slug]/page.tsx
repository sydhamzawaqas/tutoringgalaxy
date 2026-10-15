import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Award, BookOpen, CheckCircle2, GraduationCap, Library, Sparkles } from "lucide-react";
import { Heading, tint } from "@/components/home/parts";
import { Band, CtaBand, FaqBlock, HeroActions, IconChip, PageHero, asFaqs } from "@/components/pages/shared";
import { ArrowLink, SubjectGrid, TutorMiniCards, tutorsFor } from "@/components/pages/programme";
import { ACADEMY_SLUGS, academies, academyFaqs, academyPillars, getAcademy, scholarBenefits } from "@/data/content/academy";
import { getCurriculum } from "@/data/content/curricula";
import { ASSESSMENT_HREF } from "@/data/content/growing-stars";
import { site } from "@/data/content/site";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return ACADEMY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/academy/[slug]">): Promise<Metadata> {
  const a = getAcademy((await params).slug);
  if (!a) notFound();
  return pageMetadata({
    title: `${a.title}: mentor-led online course, resources and certification`,
    description: `${a.title} by Tutoring Galaxy: structured modules, expert mentors, full resource library and a completion certificate. ${a.hero}`,
    path: `/academy/${a.slug}`,
  });
}

export default async function AcademyPage({ params }: PageProps<"/academy/[slug]">) {
  const a = getAcademy((await params).slug);
  if (!a) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Academy", path: "/academy" },
    { name: a.title, path: `/academy/${a.slug}` },
  ];
  const faqs = academyFaqs(a);
  const hasFaculty = tutorsFor(a.slug, 1).length > 0;
  const curriculumPage = getCurriculum(a.slug)?.page ? `/curricula/${a.slug}` : undefined;
  const message = `Hi Tutoring Galaxy, I'd like to know more about the ${a.title}.`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: a.title,
          description: `${a.title} by Tutoring Galaxy: structured modules, expert mentors, full resource library and a completion certificate. ${a.hero}`,
          provider: { "@type": "EducationalOrganization", name: site.name, sameAs: site.url },
          hasCourseInstance: { "@type": "CourseInstance", courseMode: "Online", inLanguage: "en" },
        }}
      />
      <JsonLd data={faqJsonLd(asFaqs(faqs))} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <PageHero
        crumbs={crumbs}
        eyebrow={a.title}
        title={`${a.title} —`}
        accent="Become exam-ready, the Tutoring Galaxy way"
        lead={a.hero}
        chips={a.countries}
        chipsLabel="Students join from"
        aside={
          // CONFIRM: outcome figures are old-site claims (see data/content/academy.ts).
          <ul className="grid gap-3">
            {a.outcomes.map((o, i) => (
              <li key={o.label} className={cn("flex items-center gap-4 rounded-container bg-background p-4 text-foreground shadow-lift", i === 1 && "lg:ml-10")}>
                <IconChip icon={["trophy", "sparkles", "cap"][i] ?? "award"} i={i} />
                <div className="min-w-0">
                  <p className="text-h3 font-bold tabular-nums">{o.stat}</p>
                  <p className="text-small text-muted-foreground">{o.label}</p>
                </div>
              </li>
            ))}
          </ul>
        }
      >
        <HeroActions
          trialHref={`/book?curriculum=${a.slug}&program=academy`}
          trialLabel="Enroll — Free trial class"
          message={message}
          extra={{ href: ASSESSMENT_HREF, label: "Take free placement test", icon: Sparkles }}
        />
      </PageHero>

      {/* Promise */}
      <Band>
        <Heading eyebrow="The Academy promise" title={`Why join ${a.title}`} lead={a.promise} center />
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {academyPillars(a).map((p, i) => (
            <li key={p.title} className="rounded-panel border border-border bg-background p-7 shadow-card">
              <IconChip icon={p.icon} i={i} />
              <h3 className="mt-5 text-lead font-bold">{p.title}</h3>
              <p className="mt-2 text-muted-foreground">{p.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
          <ArrowLink href={`/exam-prep/${a.slug}`}>View {a.name} prep plan</ArrowLink>
          {curriculumPage ? <ArrowLink href={curriculumPage}>{a.name} curriculum guide</ArrowLink> : null}
        </div>
      </Band>

      {/* Modules */}
      <Band tone="sky">
        <Heading eyebrow="Curriculum" title={`${a.title} modules`} />
        <ol className="mt-12 grid gap-5 md:grid-cols-2">
          {a.modules.map((m, i) => (
            <li key={m.title} className="flex gap-5 rounded-panel bg-background p-7 shadow-card">
              <span className="grid size-14 shrink-0 place-items-center rounded-pill bg-navy text-h3 font-bold text-on-dark ring-4 ring-sky-tint">{i + 1}</span>
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-label font-semibold text-gold-deep">
                  <GraduationCap aria-hidden className="size-4" /> Module {i + 1}
                </p>
                <h3 className="mt-1 text-lead font-bold">{m.title}</h3>
                <p className="mt-2 text-muted-foreground">{m.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Band>

      {/* Subjects */}
      <Band>
        <Heading eyebrow="Subjects in this academy" title={`${a.name} subjects you can specialise in`} />
        <SubjectGrid subjects={a.subjects} prefix={a.name} cta="Meet mentors" />
      </Band>

      {/* Library */}
      <Band tone="surface">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <Heading eyebrow="Resource library" title="Everything you need, included" />
          <ul className="grid gap-4 sm:grid-cols-2">
            {a.library.map((item, i) => (
              <li key={item} className="flex items-center gap-4 rounded-panel bg-background p-5 shadow-card">
                <span className={cn("grid size-11 shrink-0 place-items-center rounded-container", tint(i))}>
                  {i % 2 === 0 ? <Library aria-hidden className="size-5" /> : <BookOpen aria-hidden className="size-5" />}
                </span>
                <span className="font-semibold">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Band>

      {/* Faculty */}
      {hasFaculty ? (
        <Band>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Heading eyebrow="Faculty" title={`Meet the ${a.title} mentors`} />
            <Link href={`/tutors?curriculum=${a.slug}`} className="text-small font-semibold text-navy-soft underline-offset-4 hover:underline">Browse {a.name} tutors</Link>
          </div>
          <div className="mt-12"><TutorMiniCards curriculum={a.slug} limit={4} /></div>
        </Band>
      ) : null}

      {/* Certification */}
      <Band tone="dark">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Heading eyebrow="Certification" title={`Graduate as a ${a.name} Academy Scholar`} lead={a.certification} dark />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {scholarBenefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-on-dark">
                  <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-gold" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div aria-hidden className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-2 rounded-panel bg-gold/30" />
            <div className="relative rounded-panel border-4 border-double border-gold bg-background p-8 text-center text-foreground shadow-lift">
              <Award className="mx-auto size-14 text-gold-deep" />
              <p className="mt-4 text-label font-semibold tracking-widest text-muted-foreground uppercase">Certificate of completion</p>
              <p className="mt-3 text-h3">{a.name} Academy Scholar</p>
              <div className="mx-auto mt-6 h-px w-40 bg-border" />
              <p className="mt-2 text-label text-muted-foreground">{site.name}</p>
            </div>
          </div>
        </div>
      </Band>

      {/* FAQ */}
      <Band>
        <FaqBlock title={`${a.title} — common questions`} items={faqs} />
      </Band>

      {/* Other academies */}
      <Band tone="sky" className="py-14 lg:py-16">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="flex items-center gap-2 text-h3"><GraduationCap aria-hidden className="size-6 text-gold-deep" /> Other academies</h2>
          <ul className="flex flex-wrap gap-2">
            {academies.filter((x) => x.slug !== a.slug).map((x) => (
              <li key={x.slug}>
                <Link href={`/academy/${x.slug}`} className="inline-flex rounded-pill border border-border bg-background px-3.5 py-1.5 text-small font-semibold transition-colors hover:bg-surface">{x.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Band>

      <CtaBand
        title={`Join ${a.title} today`}
        lead="Free placement test · Dedicated mentor · Completion certificate"
        trialHref={`/book?curriculum=${a.slug}&program=academy`}
        message={message}
        extra={{ href: ASSESSMENT_HREF, label: "Placement test", icon: Sparkles }}
      />
    </>
  );
}
