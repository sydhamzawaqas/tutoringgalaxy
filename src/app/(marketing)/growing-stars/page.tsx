import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/home/parts";
import { Band, CtaBand, FeatureGrid, HeroActions, PageHero } from "@/components/pages/shared";
import { TierBadge, TierIcon } from "@/components/pages/star-tier";
import {
  ASSESSMENT_HREF, getStartedSteps, growingStarsFeatures, growingStarsHero, growingStarsPlans, starTiers,
} from "@/data/content/growing-stars";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/data/content/site";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Growing Stars Program",
  description:
    "An exclusive learning ecosystem combining monthly AI reassessments, personalised study plans, a dedicated tutor, parent reports, and career guidance.",
  path: "/growing-stars",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Growing Stars", path: "/growing-stars" },
];

const offersJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Growing Stars Program",
  provider: { "@type": "EducationalOrganization", name: site.name, url: site.url },
  offers: growingStarsPlans.map((p) => ({
    "@type": "Offer",
    name: p.name,
    price: p.price.replace(/[^\d]/g, ""),
    priceCurrency: "PKR",
    description: p.summary,
  })),
};

export default function GrowingStarsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={offersJsonLd} />

      <PageHero
        crumbs={crumbs}
        eyebrow={growingStarsHero.eyebrow}
        title={growingStarsHero.title}
        accent={growingStarsHero.accent}
        lead={growingStarsHero.lead}
        aside={
          <div className="rounded-panel border border-on-dark/10 bg-on-dark/5 p-6 backdrop-blur">
            <p className="text-label font-semibold text-on-dark-muted">Star awards by Growing Stars Score</p>
            <ol className="mt-4 space-y-3">
              {starTiers.map((t) => (
                <li key={t.tier} className="flex items-center gap-4 rounded-container bg-background p-3 text-foreground shadow-card">
                  <TierIcon tier={t.tier} className="size-10" />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold">{t.tier} Star</p>
                    <p className="truncate text-label text-muted-foreground">{t.body}</p>
                  </div>
                  <span className="shrink-0 text-small font-bold tabular-nums">{t.min}+</span>
                </li>
              ))}
            </ol>
          </div>
        }
      >
        <HeroActions trialLabel="Join Growing Stars" trialHref="/book?program=growing-stars" message={growingStarsHero.whatsapp} />
      </PageHero>

      {/* Benefits */}
      <Band>
        <Heading eyebrow="Program benefits" title="Everything You Need to Excel" lead="A holistic program combining AI technology with human expertise." center />
        <FeatureGrid items={growingStarsFeatures} />
      </Band>

      {/* Plans */}
      <Band tone="sky" id="plans">
        <Heading eyebrow="Pricing" title="Choose Your Plan" lead="Flexible options for every student's needs and goals." center />
        <ul className="mt-14 grid items-start gap-5 md:grid-cols-3">
          {growingStarsPlans.map((p) => (
            <li
              key={p.slug}
              className={cn(
                "relative flex flex-col rounded-panel p-7 shadow-card",
                p.featured ? "starfield text-on-dark shadow-lift md:-mt-4" : "bg-background",
              )}
            >
              {p.featured ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-pill bg-gold px-3 py-1 text-label font-bold text-navy-deep">Most Popular</span>
              ) : null}
              <h3 className={cn("text-h3", p.featured && "text-on-dark")}>{p.name}</h3>
              <p className={cn("mt-1 text-small", p.featured ? "text-on-dark-muted" : "text-muted-foreground")}>{p.summary}</p>
              <p className="mt-6">
                <span className={cn("text-h2-sm font-bold tabular-nums", p.featured && "text-gold")}>{p.price}</span>
                <span className={cn("text-small", p.featured ? "text-on-dark-muted" : "text-muted-foreground")}>{p.period}</span>
              </p>
              <ul className="mt-6 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-small">
                    <Check aria-hidden className={cn("mt-0.5 size-4.5 shrink-0", p.featured ? "text-gold" : "text-success")} strokeWidth={2} />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={cn("mt-8 w-full", p.featured && "bg-gold text-navy-deep hover:bg-gold/90")}
                variant={p.featured ? "primary" : "secondary"}
              >
                <Link href={`/book?program=growing-stars&plan=${p.slug}`}>Get Started</Link>
              </Button>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-small text-muted-foreground">
          Not sure which plan fits? Start with a free trial lesson and we&apos;ll recommend one.
        </p>
      </Band>

      {/* Star tiers */}
      <Band>
        <Heading eyebrow="Star awards" title="Diamond, Gold, Silver and Bronze Stars" lead="Earn Diamond, Gold, Silver, and Bronze Stars based on your Growing Stars Score." center />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {starTiers.map((t) => (
            <li key={t.tier} className="flex flex-col items-center rounded-panel border border-border bg-background p-7 text-center shadow-card">
              <TierIcon tier={t.tier} className="size-16" />
              <h3 className="mt-5 text-lead font-bold">{t.tier} Star</h3>
              <p className="mt-1 text-small font-semibold tabular-nums text-gold-deep">Score {t.min}+</p>
              <p className="mt-3 text-small text-muted-foreground">{t.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-small text-muted-foreground">
          <span>Top stars appear on the</span>
          <Link href="/leaderboard" className="font-semibold text-navy-soft underline-offset-4 hover:underline">Growing Stars Leaderboard</Link>
          <TierBadge tier="Diamond" />
        </div>
      </Band>

      {/* Get started */}
      <Band tone="gold">
        <Heading eyebrow="Get started" title="Ready to Become a Growing Star?" lead="Take the AI assessment first to find out your current level, then join the program." center />
        <ol className="relative mt-14 grid gap-6 lg:grid-cols-4">
          <span aria-hidden className="absolute top-7 right-[12%] left-[12%] hidden h-0.5 bg-gold/50 lg:block" />
          {getStartedSteps.map((s, i) => (
            <li key={s.title} className="relative rounded-panel bg-background p-6 shadow-card lg:text-center">
              <span className="relative z-10 grid size-14 place-items-center rounded-pill bg-navy text-h3 font-bold text-on-dark ring-4 ring-gold-tint lg:mx-auto">{i + 1}</span>
              <h3 className="mt-5 font-bold">{s.title}</h3>
              <p className="mt-2 text-small text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href={ASSESSMENT_HREF}><Sparkles aria-hidden />Start with AI Assessment</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/book?program=growing-stars">Join Growing Stars</Link>
          </Button>
        </div>
      </Band>

      <CtaBand message={growingStarsHero.whatsapp} />
    </>
  );
}
