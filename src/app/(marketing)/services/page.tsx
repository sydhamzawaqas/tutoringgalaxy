import Link from "next/link";
import { ArrowRight, GraduationCap, Sparkles } from "lucide-react";
import { Heading } from "@/components/home/parts";
import { Band, CtaBand, FeatureGrid, HeroActions, IconChip, PageHero } from "@/components/pages/shared";
import { platformFeatures, platformIntro, serviceExams, services, servicesIntro } from "@/data/content/services";
import { academies } from "@/data/content/academy";
import { ASSESSMENT_HREF } from "@/data/content/growing-stars";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/data/content/site";

export const metadata = pageMetadata({
  title: "Tutoring services: home, online, AI assessment and exam prep",
  description:
    "Home tutoring, online tutoring, AI assessment, exam preparation (O/A Level, IGCSE, IB, MDCAT, ECAT), career guidance and scholarships.",
  path: "/services",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

const serviceListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Tutoring Galaxy services",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: { "@type": "Service", name: s.title, description: s.body, provider: { "@type": "EducationalOrganization", name: site.name } },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={serviceListJsonLd} />

      <PageHero
        crumbs={crumbs}
        eyebrow={servicesIntro.eyebrow}
        title={servicesIntro.title}
        lead={servicesIntro.lead}
        aside={
          <ul className="grid grid-cols-2 gap-3">
            {services.map((s, i) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`} className="flex h-full items-center gap-3 rounded-container border border-on-dark/10 bg-on-dark/5 p-3 text-small font-semibold text-on-dark backdrop-blur transition-colors hover:bg-on-dark/10">
                  <IconChip icon={s.icon} i={i} className="size-10 bg-on-dark/10 text-gold" />
                  <span className="min-w-0">{s.title}</span>
                </a>
              </li>
            ))}
          </ul>
        }
      >
        <HeroActions message="Hi Tutoring Galaxy, I'd like to know more about your tutoring services." />
      </PageHero>

      {/* The six services */}
      <Band>
        <Heading eyebrow="Our services" title="Six ways we help your child grow" lead="Pick one or combine them. Your first lesson is a free trial." center />
        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <li key={s.slug} id={s.slug} className="scroll-mt-24">
              <article className="flex h-full flex-col gap-5 rounded-panel border border-border bg-background p-7 shadow-card transition-shadow hover:shadow-lift sm:flex-row">
                <IconChip icon={s.icon} i={i} className="size-14" />
                <div className="flex min-w-0 flex-1 flex-col">
                  <h3 className="text-h3">{s.title}</h3>
                  <p className="mt-2 text-muted-foreground">{s.body}</p>
                  {s.slug === "exam-prep" ? (
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {serviceExams.map((e) => (
                        <li key={e.label}>
                          {e.href ? (
                            <Link href={e.href} className="inline-flex rounded-pill bg-sky-tint px-2.5 py-0.5 text-label font-medium text-navy-soft hover:underline">{e.label}</Link>
                          ) : (
                            <span className="inline-flex rounded-pill bg-surface px-2.5 py-0.5 text-label font-medium text-muted-foreground">{e.label}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <Link href={s.href} className="mt-auto inline-flex items-center gap-1 pt-5 text-small font-semibold text-navy-soft underline-offset-4 hover:underline">
                    {s.cta}
                    <ArrowRight aria-hidden className="size-4" />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Band>

      {/* Old ServicesGrid */}
      <Band tone="dark">
        <Heading eyebrow={platformIntro.eyebrow} title={platformIntro.title} dark center />
        <FeatureGrid items={platformFeatures} dark />
        <HeroActions trialHref="/growing-stars" trialLabel="Explore Growing Stars" extra={{ href: ASSESSMENT_HREF, label: "Take the AI assessment", icon: Sparkles }} className="mt-10 justify-center" />
      </Band>

      {/* Academies teaser */}
      <Band tone="sky">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading eyebrow="Structured programmes" title="Tutoring Galaxy Academy" lead="Mentor-led academies with modules, a resource library and a completion certificate." />
          <Link href="/academy" className="inline-flex items-center gap-1 text-small font-semibold text-navy-soft underline-offset-4 hover:underline">
            All academies <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {academies.map((a, i) => (
            <li key={a.slug}>
              <Link href={`/academy/${a.slug}`} className="group flex h-full flex-col rounded-panel bg-background p-6 shadow-card transition-shadow hover:shadow-lift">
                <IconChip icon="cap" i={i} />
                <h3 className="mt-4 text-lead font-bold">{a.title}</h3>
                <p className="mt-1 text-small text-muted-foreground">{a.blurb}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-label font-semibold text-navy-soft group-hover:underline">
                  <GraduationCap aria-hidden className="size-4" /> Explore {a.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Band>

      <CtaBand message="Hi Tutoring Galaxy, I'd like to book a free trial lesson." />
    </>
  );
}
