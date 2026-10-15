/**
 * Growing Stars Leaderboard (/leaderboard).
 *
 * The old site showed a hard-coded SAMPLE list of ten "students". Those were not real results, so
 * they are not carried over. The page is driven by `leaderboardEntries`, which is empty until real
 * Growing Stars Scores exist (Phase 2: computed from assessment attempts in Postgres).
 */
// CONFIRM: leaderboard stays empty until the first term's assessment results are in. Client to
// confirm students/parents consent to being listed (first name + anonymised Star ID only).
import type { StarTier } from "./growing-stars";

export type LeaderboardEntry = {
  /** Anonymised handle, e.g. "Star #4821". Never a full name. */
  handle: string;
  /** First name only (students are minors). */
  firstName: string;
  /** City display name, matching data/legacy/seo.ts CITIES[].name. */
  city: string;
  /** Growing Stars Score, 0–100. */
  score: number;
  tier: StarTier;
};

export const leaderboardEntries: LeaderboardEntry[] = [];

/** Month the current standings cover, e.g. "October 2026". Null until the first ranking. */
export const leaderboardPeriod: string | null = null;

export const leaderboardIntro = {
  eyebrow: "Rankings",
  title: "Growing Stars Leaderboard",
  lead: "See the top students by region — updated monthly.",
};

export const privacyNote =
  "Our students are minors, so we only display first names and an anonymised Star ID. Full names, schools and contact details are never published.";

export const emptyState = {
  title: "The leaderboard opens when the first term's results are in",
  body: "Rankings are built from real Growing Stars assessment scores, refreshed monthly. Take the assessment now and your score counts towards the first board.",
};
