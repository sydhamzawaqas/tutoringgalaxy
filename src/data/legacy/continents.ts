// Continent / macro-region groupings of countries (Region slugs).
import type { Region } from "./seo";

export type Continent = {
  slug: "middle-east" | "south-asia" | "europe" | "north-america" | "oceania" | "africa" | "southeast-asia";
  name: string;
  blurb: string;
  countries: Region["slug"][];
};

export const CONTINENTS: Continent[] = [
  {
    slug: "middle-east", name: "Middle East",
    blurb: "Online and home tutors across the GCC — IGCSE, A Level, IB and SAT specialists.",
    countries: ["uae", "saudi-arabia", "qatar", "oman", "bahrain", "kuwait"],
  },
  {
    slug: "south-asia", name: "South Asia",
    blurb: "Pakistan-led coverage for O/A Level, IGCSE, Matric, FSc, MDCAT and ECAT.",
    countries: ["pakistan"],
  },
  {
    slug: "europe", name: "Europe",
    blurb: "GCSE, A Level and IB tutors for UK and European international school students.",
    countries: ["uk"],
  },
  {
    slug: "north-america", name: "North America",
    blurb: "SAT, ACT, AP, IB and Common Core tutors across the US and Canada.",
    countries: ["usa", "canada"],
  },
  {
    slug: "oceania", name: "Oceania",
    blurb: "HSC, VCE and IB specialists across Australia.",
    countries: ["australia"],
  },
  {
    slug: "africa", name: "Africa",
    blurb: "Online tutoring for IGCSE, A Level and IB students across Africa — coming soon.",
    countries: [],
  },
  {
    slug: "southeast-asia", name: "Southeast Asia",
    blurb: "Online IB, IGCSE and A Level tutors for students across SEA — coming soon.",
    countries: [],
  },
];

export const CONTINENT_BY_SLUG: Record<string, Continent> = Object.fromEntries(CONTINENTS.map(c => [c.slug, c]));
