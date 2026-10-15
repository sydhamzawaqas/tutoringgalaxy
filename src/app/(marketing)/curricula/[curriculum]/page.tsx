import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarCheck, Check, Globe2, GraduationCap, Landmark, MapPin, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/home/parts";
import { Breadcrumbs, trialMessage } from "@/components/sections/directory";
import { Band, CatalogHero, CtaBand, DarkActions } from "@/components/catalog/hero";
import { FactCard, LinkChips, SubjectPill, TestimonialCard, TintIcon, TutorMiniCard, tutorsForCurriculum } from "@/components/catalog/cards";
import { FaqBlock } from "@/components/catalog/faq";
import { citiesForCurriculum, cityHref } from "@/components/catalog/places";
import { PostCard } from "@/components/blog/post-card";
import { curriculumFaqs, getCurriculum, getCurriculumDetail, pageCurricula } from "@/data/content/curricula";
import { getSubject } from "@/data/content/subjects";
import { postsForCurriculum } from "@/data/content/blog";
import { EXAM_SLUGS } from "@/data/content/exam-prep";
import { resources } from "@/data/content/resources";
import { TESTIMONIALS } from "@/data/legacy/testimonials";
import { site } from "@/data/content/site";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

// Every curriculum with `page: true` is prerendered. `dynamicParams` isn't available with Cache
// Components, so any other slug renders notFound() below.
export function generateStaticParams() {
  return pageCurricula().map((c) => ({ curriculum: c.slug }));
}

function load(slug: string) {
  const c = getCurriculum(slug);
  return c?.page ? c : undefined;
}

export async function generateMetadata({ params }: PageProps<"/curricula/[curriculum]">): Promise<Metadata> {
  const c = load((await params).curriculum);
  if (!c) notFound();
  return pageMetadata({
    title: `${c.short} tutors, online and at home`,
    description: `One-to-one ${c.name} tutoring with tutors who know the syllabus. ${c.board}, ${c.ages}. First lesson free.`,
    path: `/curricula/${c.slug}`,
  });
}

export default async function CurriculumPage({ params }: PageProps<"/curricula/[curriculum]">) {
  const c = load((await params).curriculum);
  if (!c) notFound();

  const d = getCurriculumDetail(c);
  const faqs = curriculumFaqs(c);
  const subjectList = c.subjects.filter((s) => getSubject(s));
  const curriculumTutors = tutorsForCurriculum(c.slug, 6);
  const stories = TESTIMONIALS.filter((t) => t.curriculumSlug === c.slug).slice(0, 3);
  const cities = citiesForCurriculum(c.slug);
  const articles = postsForCurriculum(c.slug, 3);
  const guides = resources.filter((r) => r.curricula.includes(c.slug));
  const hasPrep = (EXAM_SLUGS as readonly string[]).includes(c.slug);
  const message = trialMessage(c.short);
  const trialHref = `/book?curriculum=${c.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Curricula", path: "/curricula" },
    { name: c.short, path: `/curricula/${c.slug}` },
  ];
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `${c.short} tutoring`,
    name: `${c.name} tutoring`,
    description: d.description,
    url: `${site.url}/curricula/${c.slug}`,
    provider: { "@type": "EducationalOrganization", name: site.name, url: site.url },
    areaServed: d.countries,
    audience: { "@type": "EducationalAudience", audienceType: d.audience },
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={service} />
      <Breadcrumbs items={crumbs} />

      <CatalogHero
        eyebrow={d.tagline}
        title={`${c.short} tutors,`}
        accent="online and at home"
        lead={c.summary}
        checks={["Tutors who know the syllabus", "Past papers from day one", "First lesson free"]}
        aside={
          <FactCard
            title={`${c.short} at a glance`}
            facts={[
              {
                icon: (
                  <TintIcon i={0}>
                    <Landmark />
                  </TintIcon>
                ),
                label: "Exam board",
                value: c.board,
              },
              {
                icon: (
                  <TintIcon i={1}>
                    <GraduationCap />
                  </TintIcon>
                ),
                label: "Level",
                value: c.ages,
              },
              {
                icon: (
                  <TintIcon i={2}>
                    <UserRound />
                  </TintIcon>
                ),
                label: "Who it's for",
                value: d.audience,
              },
              {
                icon: (
                  <TintIcon i={3}>
                    <Globe2 />
                  </TintIcon>
                ),
                label: "Lessons",
                value: "Online everywhere, or at home in Islamabad and Rawalpindi",
              },
            ]}
            footer={
              <ul aria-label="Countries" className="flex flex-wrap gap-1.5">
                {d.countries.map((r) => (
                  <li key={r} className="rounded-pill bg-sky-tint px-2.5 py-0.5 text-label font-medium text-navy-soft">
                    {r}
                  </li>
                ))}
              </ul>
            }
          />
        }
      >
        <DarkActions trialHref={trialHref} message={message} />
      </CatalogHero>

      {/* About + how we help */}
      <Band>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Heading eyebrow={`About ${c.short}`} title={`What is ${c.short}?`} lead={d.description} />
            <p className="mt-6 text-muted-foreground">
              <strong className="text-foreground">Who it&apos;s for:</strong> {d.audience}
            </p>
          </div>
          <div className="rounded-panel bg-gold-tint p-7 sm:p-8">
            <h2 className="text-h3">How we help with {c.short}</h2>
            <ul className="mt-6 space-y-4">
              {c.howWeHelp.map((h) => (
                <li key={h} className="flex gap-3">
                  <span aria-hidden className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-pill bg-navy text-on-dark">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <span className="font-medium">{h}</span>
                </li>
              ))}
            </ul>
            {hasPrep ? (
              <Link href={`/exam-prep/${c.slug}`} className="mt-7 flex items-center gap-3 rounded-container bg-background p-4 shadow-card transition-shadow hover:shadow-lift">
                <span className="grid size-10 shrink-0 place-items-center rounded-control bg-navy text-gold">
                  <CalendarCheck aria-hidden className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{c.short} exam preparation</span>
                  <span className="block text-small text-muted-foreground">A structured plan for the months before the exam</span>
                </span>
                <ArrowRight aria-hidden className="size-4 shrink-0 text-navy-soft" />
              </Link>
            ) : null}
          </div>
        </div>
      </Band>

      {/* Subjects */}
      <Band tone="surface">
        <Heading eyebrow={`${subjectList.length} subjects`} title={`${c.short} subjects we teach`} lead="Don't see a subject? Ask us. We may still have a tutor for it." />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {subjectList.map((s, i) => (
            <li key={s}>
              <SubjectPill slug={s} i={i} prefix={c.short} />
            </li>
          ))}
        </ul>
      </Band>

      {/* Tutors */}
      <Band id="tutors" className="scroll-mt-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading eyebrow="Tutors" title={`${c.short} tutors`} lead="Every tutor teaches the curricula they know best. We share the profile before the free trial." />
          <Button asChild variant="secondary">
            <Link href={`/tutors?curriculum=${c.slug}`}>
              Browse {c.short} tutors <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
        {curriculumTutors.length ? (
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {curriculumTutors.map((t, i) => (
              <li key={t.slug}>
                <TutorMiniCard t={t} i={i} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 max-w-measure rounded-panel border border-dashed border-border bg-surface p-6 text-muted-foreground">
            Tell us the subject and level, and we&apos;ll suggest a {c.short} tutor and share their profile before the trial.
          </p>
        )}
      </Band>

      {/* Testimonials */}
      {stories.length ? (
        <section className="starfield py-16 text-on-dark lg:py-24">
          <div className="mx-auto w-full max-w-page px-4 sm:px-6">
            <Heading eyebrow="Results" title={`${c.short} results from our families`} dark center />
            <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {stories.map((t, i) => (
                <li key={t.name}>
                  <TestimonialCard t={t} i={i} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Cities */}
      {cities.length ? (
        <Band tone={stories.length ? undefined : "surface"}>
          <Heading eyebrow="By city" title={`${c.short} tutors near you`} lead="Home tutoring in Islamabad and Rawalpindi. Online lessons everywhere else, at times that suit your time zone." />
          <div className="mt-8">
            <LinkChips icon items={cities.map((city) => ({ href: cityHref(city.slug), label: `${c.short} tutors in ${city.name}`, key: city.slug }))} />
          </div>
        </Band>
      ) : (
        <Band tone={stories.length ? undefined : "surface"}>
          <div className="flex items-start gap-4">
            <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-gold-deep" />
            <p className="max-w-measure text-muted-foreground">
              {c.short} lessons are taught online, so your child can learn from wherever you live.{" "}
              <Link href="/tutoring/online" className="font-semibold text-navy-soft underline underline-offset-4">
                How online tutoring works
              </Link>
            </p>
          </div>
        </Band>
      )}

      {/* Articles and guides */}
      {articles.length || guides.length ? (
        <Band tone="surface">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Heading eyebrow="Guides" title={`${c.short} articles and guides`} />
            <Button asChild variant="secondary">
              <Link href="/blog">All articles</Link>
            </Button>
          </div>
          {articles.length ? (
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {articles.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          ) : null}
          {guides.length ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {guides.map((g) => (
                <li key={g.slug}>
                  <Link href={`/resources/${g.slug}`} className="inline-flex items-center gap-1.5 rounded-pill border border-border bg-background px-3.5 py-1.5 text-small font-medium text-navy hover:border-navy/40">
                    {g.title} <ArrowRight aria-hidden className="size-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </Band>
      ) : null}

      <Band>
        <FaqBlock title={`${c.short} tutoring: questions parents ask`} lead="Can't find your answer? Message us on WhatsApp." faqs={faqs} />
      </Band>

      <CtaBand title={`Start ${c.short} lessons with a free trial`} lead="Tell us the subject and syllabus. We'll match a tutor within a day." trialHref={trialHref} message={message} />
    </>
  );
}
