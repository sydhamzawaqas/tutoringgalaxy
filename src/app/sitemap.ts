import type { MetadataRoute } from "next";
import { site } from "@/data/content/site";
import { pageCurricula } from "@/data/content/curricula";
import { pageSubjects } from "@/data/content/subjects";
import { tutors, TUTOR_SUBJECTS, TUTOR_CURRICULA, TUTOR_COUNTRIES, tutorsBySubject, tutorsByCurriculum, tutorsByCountry } from "@/data/content/tutors";
import { posts, blogCategories } from "@/data/content/blog";
import { EXAM_SLUGS } from "@/data/content/exam-prep";
import { ACADEMY_SLUGS } from "@/data/content/academy";
import { resources } from "@/data/content/resources";
import { places } from "./(marketing)/locations/[place]/places";

/**
 * Public, indexable pages only. Left out on purpose: unconfirmed tutor profiles and empty tutor hubs
 * (both noindex), filtered
 * /tutors views, /book/thanks, the app, admin and auth pages.
 * No lastModified: a build-time `new Date()` would be misleading and isn't deterministic.
 */
const staticPaths = [
  "/",
  "/tutoring/online",
  "/tutoring/home",
  "/curricula",
  "/subjects",
  "/tutors",
  "/pricing",
  "/how-it-works",
  "/about",
  "/faq",
  "/contact",
  "/book",
  "/resources",
  "/join-as-tutor",
  "/services",
  "/results",
  "/growing-stars",
  "/leaderboard",
  "/match",
  "/exam-prep",
  "/academy",
  "/blog",
  "/legal/privacy",
  "/legal/terms",
  "/legal/refunds",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticPaths,
    ...pageCurricula().map((c) => `/curricula/${c.slug}`),
    ...pageSubjects().map((s) => `/subjects/${s.slug}`),
    ...tutors.filter((t) => t.confirmed).map((t) => `/tutors/${t.slug}`),
    ...TUTOR_SUBJECTS.filter((x) => tutorsBySubject(x.slug).length).map((x) => `/tutors/subject/${x.slug}`),
    ...TUTOR_CURRICULA.filter((x) => tutorsByCurriculum(x.slug).length).map((x) => `/tutors/curriculum/${x.slug}`),
    ...TUTOR_COUNTRIES.filter((x) => tutorsByCountry(x.slug).length).map((x) => `/tutors/country/${x.slug}`),
    ...posts.map((x) => `/blog/${x.slug}`),
    ...blogCategories.map((x) => `/blog/category/${x.slug}`),
    ...EXAM_SLUGS.map((x) => `/exam-prep/${x}`),
    ...ACADEMY_SLUGS.map((x) => `/academy/${x}`),
    ...resources.map((r) => `/resources/${r.slug}`),
    ...places.map((p) => `/locations/${p.slug}`),
  ];
  return paths.map((path) => ({ url: `${site.url}${path === "/" ? "" : path}` }));
}
