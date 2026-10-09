/**
 * Places that get their own /locations/[place] page. Not a route file (only page.tsx is public).
 *
 * TODO(client): other cities get a page only when we have real local tutors there, with their own
 * details (and, ideally, reviews). Until then, families elsewhere are pointed to /tutoring/online,
 * and the old city URLs redirect to /tutoring/home (see next.config.ts).
 */
export type Place = {
  slug: string;
  name: string;
  /** Cities covered by home tutoring from this page. */
  homeCities: string[];
  /** Curriculum slugs most families ask for here. */
  curricula: string[];
};

export const places: Place[] = [
  {
    slug: "islamabad",
    name: "Islamabad",
    homeCities: ["Islamabad", "Rawalpindi"],
    curricula: ["o-level", "a-level", "igcse", "matric", "fsc", "mdcat"],
  },
];

export const getPlace = (slug: string) => places.find((p) => p.slug === slug);
