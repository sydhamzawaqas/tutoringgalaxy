import { Container } from "@/components/ui/primitives";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import type { Tutor, TutorFilters } from "@/data/content/tutors";
import { TutorDirectory } from "./tutor-directory";
import { BrowseHubs, DarkActions, TutorsClosingCta, TutorsHero } from "./sections";

/** Shared layout for /tutors/subject/[s], /tutors/curriculum/[c] and /tutors/country/[c]. */
export function TutorHub({
  name,
  path,
  eyebrow,
  title,
  lead,
  list,
  lock,
  trialHref,
  message,
  noun,
}: {
  /** e.g. "Physics" or "IGCSE"; used in the closing call to action. */
  noun?: string;
  name: string;
  path: string;
  eyebrow: string;
  title: string;
  lead: string;
  list: Tutor[];
  lock: TutorFilters;
  trialHref: string;
  message: string;
}) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Tutors", path: "/tutors" },
    { name, path },
  ];
  const countries = new Set(list.flatMap((t) => t.countriesServed)).size;
  const curricula = new Set(list.flatMap((t) => t.curricula)).size;
  const subjects = new Set(list.flatMap((t) => t.subjects)).size;
  const avgYears = list.length ? Math.round(list.reduce((n, t) => n + t.experienceYears, 0) / list.length) : 0;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <TutorsHero
        crumbs={crumbs}
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        stats={
          list.length
            ? [
                { v: String(list.length), l: list.length === 1 ? "Tutor" : "Tutors" },
                lock.country ? { v: String(subjects), l: "Subjects" } : { v: String(countries), l: "Countries served" },
                lock.curriculum ? { v: String(subjects), l: "Subjects" } : { v: String(curricula), l: "Curricula and exams" },
                { v: `${avgYears}+`, l: "Average years teaching" },
              ]
            : undefined
        }
      >
        <DarkActions trialHref={trialHref} message={message} />
      </TutorsHero>

      <section className="py-12 lg:py-16" aria-label={`${name} directory`}>
        <Container>
          <TutorDirectory lock={lock} label={`Filter ${name.toLowerCase()}`} />
        </Container>
      </section>

      <BrowseHubs exclude={{ subject: lock.subject, curriculum: lock.curriculum, country: lock.country }} />

      <TutorsClosingCta
        title={list.length ? `Book a free trial with ${noun ? `a ${noun} tutor` : "one of these tutors"}` : `We can still find you ${noun ? `a ${noun} tutor` : "a tutor"}`}
        lead="Tell us the syllabus and the times that suit you. We'll suggest a tutor within a day, and the first lesson is free."
        message={message}
        trialHref={trialHref}
      />
    </>
  );
}
