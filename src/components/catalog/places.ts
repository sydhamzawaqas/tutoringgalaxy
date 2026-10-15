import { CITIES, type City } from "@/data/legacy/seo";

/** Cities with home tutors today (data/content/countries.ts); they share the Islamabad page. */
const HOME_CITIES = new Set(["islamabad", "rawalpindi"]);

/**
 * Where a city link goes. Phase 2 adds /cities/[city]; until then home-tutoring cities go to the
 * Islamabad page and every other city goes to online tutoring (same as the redirects in next.config.ts).
 */
export const cityHref = (slug: string) => (HOME_CITIES.has(slug) ? "/locations/islamabad" : "/tutoring/online");

export const citiesForSubject = (slug: string) => CITIES.filter((c) => c.popularSubjects.includes(slug));
export const citiesForCurriculum = (slug: string) => CITIES.filter((c) => c.curricula.includes(slug));

export type { City };
