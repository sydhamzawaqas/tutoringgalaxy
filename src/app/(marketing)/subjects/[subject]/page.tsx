import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, Check, Clock, Compass, Globe2, GraduationCap, ListChecks, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/home/parts";
import { Breadcrumbs, trialMessage } from "@/components/sections/directory";
import { Band, CatalogHero, CtaBand, DarkActions } from "@/components/catalog/hero";
import { CurriculumTile, FactCard, LinkChips, TestimonialCard, TintIcon, TutorMiniCard, tutorsForSubject } from "@/components/catalog/cards";
import { SubjectIcon } from "@/components/catalog/subject-icon";
import { FaqBlock } from "@/components/catalog/faq";
import { citiesForSubject, cityHref } from "@/components/catalog/places";
import { PostCard } from "@/components/blog/post-card";
import { getSubject, getSubjectDetail, pageSubjects, subjectBenefits, subjectFaqs } from "@/data/content/subjects";
import { curricula } from "@/data/content/curricula";
import { postsForSubject } from "@/data/content/blog";
import { TESTIMONIALS } from "@/data/legacy/testimonials";
import { site } from "@/data/content/site";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

// Every subject with `page: true` is prerendered. `dynamicParams` isn't available with Cache
// Components, so any other slug renders notFound() below.
export function generateStaticParams() {
  return pageSubjects().map((s) => ({ subject: s.slug }));
}

function load(slug: string) {
  const s = getSubject(slug);
  return s?.page ? s : undefined;
}

export async function generateMetadata({ params }: PageProps<"/subjects/[subject]">): Promise<Metadata> {
  const s = load((await params).subject);
  if (!s) notFound();
  return pageMetadata({
    title: `${s.name} tutors for IGCSE, O Level, A Level, IB and more`,
    description: `One-to-one ${s.name} tutoring, online or at home, matched to your exact curriculum and exam board. ${s.summary} First lesson free.`,
    path: `/subjects/${s.slug}`,
  });
}

const BENEFIT_ICONS = [Target, Compass, GraduationCap, Users];

export default async function SubjectPage({ params }: PageProps<"/subjects/[subject]">) {
  const s = load((await params).subject);
  if (!s) notFound();

  const d = getSubjectDetail(s);
  const faqs = subjectFaqs(s.name);
  const withSubject = curricula.filter((c) => c.page && c.subjects.includes(s.slug));
  const subjectTutors = tutorsForSubject(s.slug, 6);
  const stories = TESTIMONIALS.filter((t) => t.subjectSlug === s.slug).slice(0, 3);
  const cities = citiesForSubject(s.slug);
  const articles = postsForSubject(s.name, 3);
  const message = trialMessage(s.name);
  const trialHref = `/book?subject=${s.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Subjects", path: "/subjects" },
    { name: s.name, path: `/subjects/${s.slug}` },
  ];
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `${s.name} tutoring`,
    name: `${s.name} tutoring`,
    description: s.summary,
    url: `${site.url}/subjects/${s.slug}`,
    provider: { "@type": "EducationalOrganization", name: site.name, url: site.url },
    areaServed: ["Pakistan", "United Arab Emirates", "United Kingdom", "Saudi Arabia", "Qatar", "United States", "Canada", "Australia"],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={service} />
      <Breadcrumbs items={crumbs} />

      <CatalogHero
        icon={<SubjectIcon icon={s.icon} size="lg" />}
        eyebrow={`Online and home ${s.name} tutors`}
        title={`${s.name} tutors`}
        accent="for every curriculum"
        lead={`${d.tagline}. ${s.summary}`}
        aside={
          <FactCard
            title={`${s.name} at a glance`}
            facts={[
              {
                icon: (
                  <TintIcon i={0}>
                    <BadgeCheck />
                  </TintIcon>
                ),
                label: "Verified tutors",
                value: "Interviewed and subject-tested",
              },
              {
                icon: (
                  <TintIcon i={1}>
                    <Globe2 />
                  </TintIcon>
                ),
                label: "One-to-one online",
                value: "Students in Pakistan, UAE, UK, KSA, US, AU",
              },
              {
                icon: (
                  <TintIcon i={2}>
                    <Clock />
                  </TintIcon>
                ),
                // CONFIRM: "within 24 hours" matching time (old site and homepage).
                label: "Free trial",
                value: "Matched tutor within 24 hours, no card required",
              },
              {
                icon: (
                  <TintIcon i={3}>
                    <ListChecks />
                  </TintIcon>
                ),
                label: "Curricula",
                value: `${withSubject.length} curricula and exam boards`,
              },
            ]}
          />
        }
      >
        <DarkActions trialHref={trialHref} message={message} />
        {withSubject.length ? (
          <ul aria-label={`${s.name} by curriculum`} className="mt-7 flex flex-wrap gap-2">
            {withSubject.slice(0, 8).map((c) => (
              <li key={c.slug}>
                <Link href={`/curricula/${c.slug}`} className="inline-flex rounded-pill border border-on-dark/15 bg-on-dark/5 px-3 py-1 text-label font-medium text-on-dark hover:border-gold/60">
                  {c.short} {s.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </CatalogHero>

      {/* Overview + skills */}
      <Band>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <Heading eyebrow="Overview" title={`How we teach ${s.name}`} lead={d.overview} />
            {s.topics.length ? (
              <div className="mt-8">
                <p className="text-label font-semibold text-muted-foreground">Syllabus areas we cover</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {s.topics.map((t) => (
                    <li key={t} className="rounded-pill border border-border bg-surface px-3 py-1 text-small text-navy">
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-small text-muted-foreground">Topic names and depth vary by exam board. Your tutor follows your child&apos;s exact syllabus.</p>
              </div>
            ) : null}
          </div>
          <div>
            <h2 className="text-h3">Skills we build</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {d.skills.map((k, i) => (
                <li key={k} className="flex items-center gap-3 rounded-container border border-border bg-background p-4 shadow-card">
                  <TintIcon i={i}>
                    <Check strokeWidth={2.5} />
                  </TintIcon>
                  <span className="font-semibold">{k}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Band>

      {/* Why it matters + how tutors help */}
      <Band tone="sky">
        <Heading eyebrow="Why it matters" title={`Why ${s.name} tutoring pays off`} lead="One-to-one lessons start from your child's gaps, not from page one of the textbook." center />
        {d.whyMatters?.length ? (
          <ul className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
            {d.whyMatters.map((w, i) => (
              <li key={w} className="rounded-panel bg-background p-6 shadow-card">
                <span className="text-h2 font-bold leading-none text-navy/15 tabular-nums">0{i + 1}</span>
                <p className="mt-3 font-semibold">{w}</p>
              </li>
            ))}
          </ul>
        ) : null}
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {subjectBenefits.map((b, i) => {
            const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
            return (
              <li key={b.title} className="rounded-panel bg-background p-6 shadow-card">
                <TintIcon i={i} size="md">
                  <Icon aria-hidden />
                </TintIcon>
                <h3 className="mt-4 font-bold">{b.title}</h3>
                <p className="mt-1 text-small text-muted-foreground">{b.body}</p>
              </li>
            );
          })}
        </ul>
      </Band>

      {/* By curriculum */}
      {withSubject.length ? (
        <Band>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Heading eyebrow="By curriculum" title={`${s.name} across every curriculum`} lead={`${s.name} tutors for ${withSubject.map((c) => c.short).slice(0, 6).join(", ")} and more.`} />
            <Button asChild variant="secondary">
              <Link href="/curricula">All curricula</Link>
            </Button>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {withSubject.map((c, i) => (
              <li key={c.slug}>
                <CurriculumTile c={c} i={i} subjectName={s.name} />
              </li>
            ))}
          </ul>
        </Band>
      ) : null}

      {/* Tutors */}
      <Band tone="surface" id="tutors" className="scroll-mt-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading eyebrow="Tutors" title={`${s.name} tutors`} lead="We share a tutor's profile with you before the free trial." />
          <Button asChild variant="secondary">
            <Link href={`/tutors?subject=${s.slug}`}>
              Browse {s.name} tutors <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
        {subjectTutors.length ? (
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {subjectTutors.map((t, i) => (
              <li key={t.slug}>
                <TutorMiniCard t={t} i={i} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 max-w-measure rounded-panel border border-dashed border-border bg-background p-6 text-muted-foreground">
            Tell us the curriculum and level, and we&apos;ll suggest a {s.name} tutor and share their profile before the trial.
          </p>
        )}
      </Band>

      {/* Testimonials */}
      {stories.length ? (
        <section className="starfield py-16 text-on-dark lg:py-24">
          <div className="mx-auto w-full max-w-page px-4 sm:px-6">
            <Heading eyebrow="Results" title={`What ${s.name} families say`} dark center />
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

      {/* By city */}
      {cities.length ? (
        <Band>
          <Heading eyebrow="By city" title={`${s.name} tutors near you`} lead="Home tutoring in Islamabad and Rawalpindi. Online lessons everywhere else, at times that suit your time zone." />
          <div className="mt-8">
            <LinkChips icon items={cities.map((c) => ({ href: cityHref(c.slug), label: `${s.name} tutors in ${c.name}`, key: c.slug }))} />
          </div>
        </Band>
      ) : null}

      {/* Articles */}
      {articles.length ? (
        <Band tone={cities.length ? "surface" : undefined}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Heading eyebrow="From the blog" title={`${s.name} study guides`} />
            <Button asChild variant="secondary">
              <Link href="/blog">All articles</Link>
            </Button>
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {articles.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </Band>
      ) : null}

      <Band>
        <FaqBlock title={`${s.name} tutoring: questions answered`} lead="Can't find your answer? Message us on WhatsApp." faqs={faqs} />
      </Band>

      <CtaBand title={`Book a free ${s.name} trial today`} lead="Meet a matched, verified tutor within 24 hours. No card required." trialHref={trialHref} message={message} />
    </>
  );
}
