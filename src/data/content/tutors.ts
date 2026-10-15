/**
 * Tutor profiles: ONE dataset for /tutors, /match, the hubs and every page that shows a tutor.
 *
 * Built from the old site's two lists (src/data/legacy/tutors.ts, 14 tutors, and
 * src/data/legacy/teachers.ts, 24 teachers of which 14 are the same people). Merged by slug,
 * so there are 24 unique profiles. The four "example" placeholder tutors of the first build are gone.
 *
 * CONFIRM: every profile below comes from the old site and has NOT been checked. Before launch the
 * client must confirm each person is real, has consented to being listed, and that their name,
 * qualifications, rates, ratings, review counts, certifications and availability are accurate.
 * Until then `confirmed: false` keeps the profile out of search (noindex), out of the sitemap and
 * stops Person structured data being emitted. Flip it per tutor once confirmed.
 *
 * CONFIRM: the old site's written reviews were generated from a template (same three lines for
 * every tutor), so they are NOT carried over. Ratings and review counts are kept from the old
 * data but need the client's source before launch.
 *
 * In production this list moves to the database (admin "tutor management").
 */
import { TEACHERS, countryFlag, countryLabel, type CountrySlug } from "@/data/legacy/teachers";
import { CERTIFICATIONS, type CertificationId } from "@/data/legacy/certifications";
import { CURRICULA as LEGACY_CURRICULA, SUBJECTS as LEGACY_SUBJECTS } from "@/data/legacy/seo";
import { getCurriculum } from "@/data/content/curricula";
import { getSubject } from "@/data/content/subjects";

export type { CountrySlug, CertificationId };

export type TutorMode = "online" | "home";

export type TierLevel = 1 | 2 | 3 | 4;
export type Tier = { level: TierLevel; label: string; blurb: string };

export type TutorRate = {
  amount: number;
  currency: "PKR" | "GBP" | "AED" | "AUD" | "INR" | "SAR" | "QAR" | "CAD" | "OMR" | "USD";
  /** As shown, e.g. "PKR 2,500/hr". */
  display: string;
  /** Rough US-dollar equivalent per hour, for budget matching only. */
  usd: number;
};

export type Tutor = {
  slug: string;
  name: string;
  initials: string;
  /** Subject-led line, e.g. "Mathematics and Physics tutor for O Level, A Level and IGCSE". */
  headline: string;
  /** Main credential as written on the old site, e.g. "MPhil Mathematics, LUMS". */
  title: string;
  bio: string;
  intro: string;
  /** Teaching philosophy, in the tutor's words (old site). */
  approach: string;
  subjects: string[]; // subject slugs (legacy SUBJECTS)
  curricula: string[]; // curriculum slugs (legacy CURRICULA)
  country: string; // display name
  countrySlug: CountrySlug;
  countriesServed: CountrySlug[];
  city: string;
  timezone: string;
  languages: string[];
  modes: TutorMode[];
  rate: TutorRate;
  rating: number;
  reviews: number;
  experienceYears: number;
  university?: string;
  qualifications: string[];
  certifications: CertificationId[];
  tier: Tier;
  availability: string[];
  highlights: string[];
  /** Client has confirmed this is a real, consenting tutor with accurate details. Drives noindex + sitemap. */
  confirmed: boolean;
  /** @deprecated Use `!confirmed`. Kept so older consumers (sitemap) keep working. */
  example: boolean;
};

/* ── Taxonomy helpers ───────────────────────────────────────────────────── */

export const TUTOR_SUBJECTS = LEGACY_SUBJECTS;
export const TUTOR_CURRICULA = LEGACY_CURRICULA;

export function subjectName(slug: string) {
  return LEGACY_SUBJECTS.find((s) => s.slug === slug)?.name ?? getSubject(slug)?.name ?? slug;
}
export function curriculumName(slug: string) {
  return getCurriculum(slug)?.short ?? LEGACY_CURRICULA.find((c) => c.slug === slug)?.name ?? slug;
}
export const getTutorSubject = (slug: string) => LEGACY_SUBJECTS.find((s) => s.slug === slug);
export const getTutorCurriculum = (slug: string) => LEGACY_CURRICULA.find((c) => c.slug === slug);

export type TutorCountry = { slug: CountrySlug; name: string; flag: string };
const COUNTRY_ORDER: CountrySlug[] = ["pakistan", "uae", "uk", "saudi-arabia", "qatar", "oman", "bahrain", "kuwait", "australia", "usa", "canada", "india"];
export const TUTOR_COUNTRIES: TutorCountry[] = COUNTRY_ORDER.map((slug) => ({ slug, name: countryLabel(slug), flag: countryFlag(slug) }));
export const getTutorCountry = (slug: string) => TUTOR_COUNTRIES.find((c) => c.slug === slug);

export const TUTOR_CERTIFICATIONS = CERTIFICATIONS.map(({ id, label, short, tooltip }) => ({ id, label, short, tooltip }));
export const getCertification = (id: string) => TUTOR_CERTIFICATIONS.find((c) => c.id === id);

/* ── Derivations ────────────────────────────────────────────────────────── */

const SPECIALIST_CERTS = new Set<CertificationId>(["ib-certified", "cambridge-certified", "british-curriculum", "sat-specialist", "naplan-specialist"]);
const CERTIFIED_CERTS = new Set<CertificationId>(["certified-teacher", "licensed-educator"]);

/** Old site's verification tiers, derived from certifications + experience. */
function tierFor(certs: CertificationId[], years: number): Tier {
  const specialist = certs.some((c) => SPECIALIST_CERTS.has(c));
  const certified = certs.some((c) => CERTIFIED_CERTS.has(c));
  if (specialist && years >= 8) return { level: 4, label: "Curriculum Specialist", blurb: "Deep specialism in a named curriculum with proven results." };
  if (certified && years >= 10) return { level: 3, label: "Senior Educator", blurb: "10+ years experience, advanced qualifications and consistent outcomes." };
  if (certified) return { level: 2, label: "Certified Teacher", blurb: "Recognised teaching qualification with verified classroom experience." };
  return { level: 1, label: "Verified Tutor", blurb: "Identity, qualifications and subject competency verified by our team." };
}

export const TIERS: Tier[] = [
  tierFor([], 0),
  tierFor(["certified-teacher"], 0),
  tierFor(["certified-teacher"], 10),
  tierFor(["ib-certified"], 8),
];

// CONFIRM: approximate exchange rates (USD per 1 unit), used only to compare budgets in /match.
const USD_PER: Record<TutorRate["currency"], number> = {
  PKR: 1 / 280,
  GBP: 1.27,
  AED: 1 / 3.67,
  AUD: 0.66,
  INR: 1 / 83,
  SAR: 1 / 3.75,
  QAR: 1 / 3.64,
  CAD: 0.73,
  OMR: 2.6,
  USD: 1,
};

function parseRate(display: string): TutorRate {
  const amount = Number.parseFloat(display.replace(/[^\d.]/g, "")) || 0;
  const code = display.match(/\b(PKR|AED|AUD|INR|SAR|QAR|CAD|OMR|USD)\b/)?.[1] as TutorRate["currency"] | undefined;
  const currency: TutorRate["currency"] = code ?? (display.includes("£") ? "GBP" : "USD");
  return { amount, currency, display, usd: Math.round(amount * USD_PER[currency]) };
}

function list(items: string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

// Home tutoring is only offered where we have home tutors (see countries.ts).
// CONFIRM: the old data also listed in-home lessons for tutors in other cities (Lahore, Karachi,
// Dubai, Toronto, Sydney…). They are shown as online-only until the client confirms home coverage there.
const HOME_CITIES = new Set(["Islamabad", "Rawalpindi"]);

/** Slugs the client has confirmed as real, consenting tutors. Empty until confirmed. */
// CONFIRM: add slugs here (or set per-profile in the database) once each tutor is confirmed.
const CONFIRMED = new Set<string>([]);

export const tutors: Tutor[] = TEACHERS.map((t) => {
  const subjectsLine = list(t.subjects.slice(0, 2).map(subjectName));
  const curriculaLine = list(t.curricula.slice(0, 3).map(curriculumName));
  const home = t.mode.includes("in-home") && HOME_CITIES.has(t.city);
  const confirmed = CONFIRMED.has(t.slug);
  // Old default qualifications appended "Verified by Tutoring Galaxy"; that is shown as a badge instead.
  const qualifications = t.qualifications.filter((q) => q !== "Verified by Tutoring Galaxy");
  return {
    slug: t.slug,
    name: t.name,
    initials: t.initials,
    headline: `${subjectsLine} tutor for ${curriculaLine}`,
    title: t.title,
    bio: t.bio,
    intro: t.intro,
    approach: t.philosophy,
    subjects: t.subjects,
    curricula: t.curricula,
    country: countryLabel(t.countrySlug),
    countrySlug: t.countrySlug,
    countriesServed: Array.from(new Set([t.countrySlug, ...t.countriesServed])),
    city: t.city,
    timezone: t.timezone,
    languages: t.languages,
    modes: home ? ["online", "home"] : ["online"],
    rate: parseRate(t.hourlyRate),
    rating: t.rating,
    reviews: t.reviews,
    experienceYears: t.experienceYears,
    university: t.university,
    qualifications,
    certifications: t.certifications,
    tier: tierFor(t.certifications, t.experienceYears),
    availability: t.availability.filter((a) => !/^online|in-home|& in-home|online only/i.test(a.trim())),
    highlights: t.highlights,
    confirmed,
    example: !confirmed,
  };
});

export const getTutor = (slug: string) => tutors.find((t) => t.slug === slug);

/* ── Queries ────────────────────────────────────────────────────────────── */

export type TutorFilters = {
  subject?: string;
  curriculum?: string;
  country?: string;
  certification?: string;
  mode?: string;
};

export function filterTutors(list: Tutor[], f: TutorFilters) {
  return list.filter(
    (t) =>
      (!f.subject || t.subjects.includes(f.subject)) &&
      (!f.curriculum || t.curricula.includes(f.curriculum)) &&
      (!f.country || t.countriesServed.includes(f.country as CountrySlug)) &&
      (!f.certification || t.certifications.includes(f.certification as CertificationId)) &&
      (!f.mode || t.modes.includes(f.mode as TutorMode)),
  );
}

export const FACETS = ["subject", "curriculum", "country", "certification", "mode"] as const;
export type Facet = (typeof FACETS)[number];

export const SORTS = [
  { value: "recommended", label: "Recommended" },
  { value: "rating", label: "Highest rated" },
  { value: "reviews", label: "Most reviews" },
  { value: "rate-asc", label: "Rate: low to high" },
  { value: "rate-desc", label: "Rate: high to low" },
  { value: "experience", label: "Most experience" },
] as const;
export type SortKey = (typeof SORTS)[number]["value"];

export function sortTutors(list: Tutor[], sort: SortKey) {
  const out = [...list];
  switch (sort) {
    case "rating":
      return out.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    case "reviews":
      return out.sort((a, b) => b.reviews - a.reviews);
    case "rate-asc":
      return out.sort((a, b) => a.rate.usd - b.rate.usd);
    case "rate-desc":
      return out.sort((a, b) => b.rate.usd - a.rate.usd);
    case "experience":
      return out.sort((a, b) => b.experienceYears - a.experienceYears);
    default:
      return out.sort((a, b) => b.tier.level - a.tier.level || b.rating * b.reviews - a.rating * a.reviews);
  }
}

const COUNTRY_ALIASES: Record<string, CountrySlug> = {
  pk: "pakistan",
  "united-arab-emirates": "uae",
  dubai: "uae",
  "united-kingdom": "uk",
  gb: "uk",
  england: "uk",
  ksa: "saudi-arabia",
  "united-states": "usa",
  us: "usa",
};

/**
 * Turn raw query values (from the URL or the homepage finder) into known filter values.
 * Unknown values are dropped. Country accepts a slug ("uae") or a name ("United Arab Emirates").
 */
export function normalizeFilters(raw: Record<string, string | string[] | undefined>): TutorFilters & { sort?: SortKey } {
  const one = (k: string) => {
    const v = raw[k];
    return ((Array.isArray(v) ? v[0] : v) ?? "").trim();
  };
  const subject = one("subject");
  const curriculum = one("curriculum");
  const countryRaw = one("country").toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");
  const country = getTutorCountry(countryRaw)?.slug ?? COUNTRY_ALIASES[countryRaw];
  const certification = one("certification");
  const mode = one("mode");
  const sort = one("sort");
  return {
    subject: getTutorSubject(subject) ? subject : undefined,
    curriculum: getTutorCurriculum(curriculum) ? curriculum : undefined,
    country,
    certification: getCertification(certification) ? certification : undefined,
    mode: mode === "online" || mode === "home" ? mode : undefined,
    sort: SORTS.some((s) => s.value === sort) ? (sort as SortKey) : undefined,
  };
}

export const tutorsBySubject =(slug: string) => filterTutors(tutors, { subject: slug });
export const tutorsByCurriculum = (slug: string) => filterTutors(tutors, { curriculum: slug });
export const tutorsByCountry = (slug: string) => filterTutors(tutors, { country: slug });

/** Other tutors sharing the most subjects, then curricula, with this one. */
export function similarTutors(t: Tutor, n = 3) {
  return tutors
    .filter((o) => o.slug !== t.slug)
    .map((o) => ({
      o,
      s:
        o.subjects.filter((x) => t.subjects.includes(x)).length * 3 +
        o.curricula.filter((x) => t.curricula.includes(x)).length +
        (o.countrySlug === t.countrySlug ? 1 : 0),
    }))
    .sort((a, b) => b.s - a.s || b.o.rating - a.o.rating)
    .slice(0, n)
    .map((x) => x.o);
}
