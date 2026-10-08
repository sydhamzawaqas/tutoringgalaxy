import type { MetadataRoute } from "next";
import { site } from "@/data/content/site";
import { pageCurricula } from "@/data/content/curricula";
import { pageSubjects } from "@/data/content/subjects";
import { tutors } from "@/data/content/tutors";
import { resources } from "@/data/content/resources";
import { places } from "./(marketing)/locations/[place]/places";

/**
 * Public, indexable pages only. Left out on purpose: example tutor profiles (noindex), filtered
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
  "/legal/privacy",
  "/legal/terms",
  "/legal/refunds",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticPaths,
    ...pageCurricula().map((c) => `/curricula/${c.slug}`),
    ...pageSubjects().map((s) => `/subjects/${s.slug}`),
    ...tutors.filter((t) => !t.example).map((t) => `/tutors/${t.slug}`),
    ...resources.map((r) => `/resources/${r.slug}`),
    ...places.map((p) => `/locations/${p.slug}`),
  ];
  return paths.map((path) => ({ url: `${site.url}${path === "/" ? "" : path}` }));
}
