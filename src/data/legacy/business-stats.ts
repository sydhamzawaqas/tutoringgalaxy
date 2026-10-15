/**
 * CANONICAL BUSINESS STATISTICS REGISTRY — single source of truth.
 *
 * Rules (do not weaken):
 * 1. A metric may only be displayed publicly when `displayAllowed` is true.
 * 2. `displayAllowed` is true only for metrics that are DERIVED from first-party
 *    project data (counted from the datasets that build the site) or that are
 *    documented, internally consistent brand facts (e.g. founding year).
 * 3. Metrics that cannot be evidenced are kept here with `status: "unsupported"`
 *    and a `qualitative` replacement. Never invent, estimate or extrapolate a
 *    value to fill the gap, and never use "verified"/"certified" wording for them.
 * 4. Public pages must import from this file — no hardcoded duplicates.
 */

import { CITIES, REGIONS, SUBJECTS, CURRICULA } from "./seo";
import { TEACHERS } from "./teachers";

export type StatStatus = "derived" | "documented" | "unsupported";

export type BusinessStat = {
  key: string;
  /** Numeric value where one exists. Null when the claim is unsupported. */
  value: number | null;
  /** Public-facing formatted value. Null when nothing may be displayed. */
  displayValue: string | null;
  label: string;
  /** Internal metric definition — never rendered publicly. */
  definition: string;
  /** Internal evidence reference — never rendered publicly. */
  evidence: string;
  status: StatStatus;
  displayAllowed: boolean;
  lastVerified: string;
  /** Qualitative wording to use when the number may not be displayed. */
  qualitative?: string;
};

const LAST_VERIFIED = "2026-09-07";
export const FOUNDED_YEAR = 2016;

const nf = new Intl.NumberFormat("en-US");

function derived(
  key: string,
  value: number,
  label: string,
  definition: string,
  evidence: string,
  display?: string,
): BusinessStat {
  return {
    key,
    value,
    displayValue: display ?? nf.format(value),
    label,
    definition,
    evidence,
    status: "derived",
    displayAllowed: true,
    lastVerified: LAST_VERIFIED,
  };
}

function unsupported(key: string, label: string, definition: string, qualitative: string): BusinessStat {
  return {
    key,
    value: null,
    displayValue: null,
    label,
    definition,
    evidence: "No first-party record available to support a public number.",
    status: "unsupported",
    displayAllowed: false,
    lastVerified: LAST_VERIFIED,
    qualitative,
  };
}

// Evaluated lazily (at render/access time), never at module load: the edge runtime
// freezes the clock during module evaluation, which produced "1+" on the server
// and "10+" on the client (hydration flicker).
export function getYearsOperating(): number {
  return Math.max(1, new Date().getUTCFullYear() - FOUNDED_YEAR);
}

export const BUSINESS_STATS: Record<string, BusinessStat> = {
  countriesServed: derived(
    "countriesServed",
    REGIONS.length,
    "Countries served",
    "Countries with a published Tutoring Galaxy region page and active tutor coverage.",
    "Counted from src/data/seo.ts REGIONS.",
    `${REGIONS.length}`,
  ),
  citiesServed: derived(
    "citiesServed",
    CITIES.length,
    "Cities covered",
    "Cities with a published city page and tutor coverage.",
    "Counted from src/data/seo.ts CITIES.",
    `${CITIES.length}`,
  ),
  subjectsCovered: derived(
    "subjectsCovered",
    SUBJECTS.length,
    "Subjects taught",
    "Distinct subjects with a published subject page.",
    "Counted from src/data/seo.ts SUBJECTS.",
    `${SUBJECTS.length}`,
  ),
  curriculaCovered: derived(
    "curriculaCovered",
    CURRICULA.length,
    "Curricula supported",
    "Distinct curricula/exam boards with a published curriculum page.",
    "Counted from src/data/seo.ts CURRICULA.",
    `${CURRICULA.length}`,
  ),
  tutorProfilesPublished: derived(
    "tutorProfilesPublished",
    TEACHERS.length,
    "Published tutor profiles",
    "Tutor profiles published on the public site with named subjects and qualifications.",
    "Counted from src/data/teachers.ts TEACHERS.",
    `${TEACHERS.length}`,
  ),
  foundedYear: {
    key: "foundedYear",
    value: FOUNDED_YEAR,
    displayValue: String(FOUNDED_YEAR),
    label: "Founded",
    definition: "Year Tutoring Galaxy began operating.",
    evidence: "Documented brand fact, consistent across brand materials.",
    status: "documented",
    displayAllowed: true,
    lastVerified: LAST_VERIFIED,
  },
  yearsOperating: {
    key: "yearsOperating",
    get value() { return getYearsOperating(); },
    get displayValue() { return `${getYearsOperating()}+`; },
    label: "Years operating",
    definition: "Current UTC year minus the canonical founding year.",
    evidence: "Computed from foundedYear.",
    status: "derived",
    displayAllowed: true,
    lastVerified: LAST_VERIFIED,
  },
  matchTimeHours: {
    key: "matchTimeHours",
    value: 24,
    displayValue: "24h",
    label: "Tutor match commitment",
    definition: "Service commitment: a matched tutor proposal within 24 hours of an enquiry.",
    evidence: "Documented operating commitment, stated consistently site-wide.",
    status: "documented",
    displayAllowed: true,
    lastVerified: LAST_VERIFIED,
  },

  // ---- Unsupported claims: numbers must NOT be displayed. ----
  studentsServed: unsupported(
    "studentsServed",
    "Students taught",
    "Unique students who completed at least one paid session. No reconciled record exists.",
    "Students across every region we serve",
  ),
  familiesServed: unsupported(
    "familiesServed",
    "Families served",
    "Unique paying households. Prior claims (2,400+, 12,000+) cannot be reconciled.",
    "Trusted by families worldwide",
  ),
  lessonsDelivered: unsupported(
    "lessonsDelivered",
    "Lessons delivered",
    "Completed tutoring sessions. No session ledger available.",
    "Thousands of hours of one-to-one teaching",
  ),
  studentsAssessed: unsupported(
    "studentsAssessed",
    "Students assessed",
    "Completed Growing Stars assessments. Prior claim (50,000+) unsupported.",
    "Students assessed worldwide",
  ),
  verifiedReviews: unsupported(
    "verifiedReviews",
    "Reviews",
    "Reviews from an identity-verified review population. Website testimonials are not a verified review population and Google review totals are not tracked in-project.",
    "Trusted by families worldwide",
  ),
  googleRating: unsupported(
    "googleRating",
    "Average rating",
    "Aggregate rating across a single defined review population. Prior claims (4.9, 5.0) conflict and have no in-project source.",
    "Consistently strong parent feedback",
  ),
  successRate: unsupported(
    "successRate",
    "Success rate",
    "Share of students reaching a target grade. No definition, denominator or measurement period on record.",
    "Focused on measurable academic progress",
  ),
  gradeImprovement: unsupported(
    "gradeImprovement",
    "Average grade improvement",
    "Mean grade-band change against a student's own baseline. No measurement record.",
    "Built around measurable grade improvement",
  ),
  tutorAcceptanceRate: unsupported(
    "tutorAcceptanceRate",
    "Tutor acceptance rate",
    "Share of tutor applicants accepted. No applicant funnel record.",
    "Only a small share of applicants make the panel",
  ),
  tutorCount: unsupported(
    "tutorCount",
    "Tutor network size",
    "Total active tutors on the panel. Prior claim (100+) exceeds what project data supports; use tutorProfilesPublished for a countable figure.",
    "A vetted network of expert tutors",
  ),
};

/** Returns the canonical stat entry. Throws on unknown keys so typos fail loudly. */
export function getBusinessStat(key: string): BusinessStat {
  const stat = BUSINESS_STATS[key];
  if (!stat) throw new Error(`Unknown business stat: ${key}`);
  return stat;
}

/**
 * Public display helper: the canonical number when it may be shown, otherwise
 * the approved qualitative wording. Never returns an invented number.
 */
export function statText(key: string): string {
  const stat = getBusinessStat(key);
  if (stat.displayAllowed && stat.displayValue) return stat.displayValue;
  return stat.qualitative ?? "";
}

/** Stats safe to render as numeric trust signals, in display order. */
export const PUBLIC_TRUST_STATS: BusinessStat[] = [
  BUSINESS_STATS.countriesServed,
  BUSINESS_STATS.citiesServed,
  BUSINESS_STATS.subjectsCovered,
  BUSINESS_STATS.curriculaCovered,
  BUSINESS_STATS.tutorProfilesPublished,
  BUSINESS_STATS.yearsOperating,
].filter((s) => s.displayAllowed && s.displayValue);
