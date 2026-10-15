import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Heading } from "@/components/home/parts";
import { Band, CtaBand, HeroActions, PageHero } from "@/components/pages/shared";
import { LeaderboardBoard } from "@/components/pages/leaderboard-board";
import { TierIcon } from "@/components/pages/star-tier";
import { emptyState, leaderboardEntries, leaderboardIntro, leaderboardPeriod, privacyNote } from "@/data/content/leaderboard";
import { ASSESSMENT_HREF, starTiers } from "@/data/content/growing-stars";
import { CITIES, REGIONS } from "@/data/legacy/seo";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Growing Stars Leaderboard",
  description: "Regional leaderboards of top-performing students across Pakistan, UAE, UK and Australia.",
  path: "/leaderboard",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Leaderboard", path: "/leaderboard" },
];

/** City filter options grouped by country, in the order regions are listed. */
const cityGroups = REGIONS.map((r) => ({
  region: r.name,
  cities: CITIES.filter((c) => c.region === r.slug).map((c) => c.name),
})).filter((g) => g.cities.length > 0);

export default function LeaderboardPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <PageHero
        crumbs={crumbs}
        eyebrow={leaderboardIntro.eyebrow}
        title={leaderboardIntro.title}
        lead={leaderboardIntro.lead}
        chips={REGIONS.map((r) => r.name)}
        chipsLabel="Regional boards"
      >
        <HeroActions trialHref={ASSESSMENT_HREF} trialLabel="Take the AI assessment" message="Hi! I'd like to know more about the Growing Stars leaderboard." />
      </PageHero>

      <Band>
        <div className="mb-6 flex items-start gap-3 rounded-panel bg-sky-tint p-4 text-small text-navy-soft">
          <ShieldCheck aria-hidden className="mt-0.5 size-5 shrink-0" />
          <p><strong className="text-foreground">Privacy first:</strong> {privacyNote}</p>
        </div>
        <LeaderboardBoard
          entries={leaderboardEntries}
          cityGroups={cityGroups}
          period={leaderboardPeriod}
          emptyTitle={emptyState.title}
          emptyBody={emptyState.body}
          assessmentHref={ASSESSMENT_HREF}
        />
      </Band>

      <Band tone="surface">
        <Heading eyebrow="How rankings work" title="Ranked by Growing Stars Score" lead="Students are ranked by their Growing Stars Score from the AI assessment, refreshed with each monthly reassessment." center />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {starTiers.map((t) => (
            <li key={t.tier} className="flex items-center gap-4 rounded-panel bg-background p-5 shadow-card">
              <TierIcon tier={t.tier} />
              <div className="min-w-0">
                <h3 className="font-bold">{t.tier} Star</h3>
                <p className="text-small text-muted-foreground tabular-nums">Score {t.min}+</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-small text-muted-foreground">
          Want to climb the board?{" "}
          <Link href="/growing-stars" className="font-semibold text-navy-soft underline-offset-4 hover:underline">Join the Growing Stars Program</Link>
        </p>
      </Band>

      <CtaBand />
    </>
  );
}
