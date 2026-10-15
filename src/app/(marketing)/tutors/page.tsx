import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/primitives";
import { TutorDirectory } from "@/components/tutors/tutor-directory";
import { BrowseHubs, DarkActions, TierExplainer, TutorsClosingCta, TutorsHero } from "@/components/tutors/sections";
import { TUTOR_CURRICULA, normalizeFilters, tutors } from "@/data/content/tutors";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const description =
  "Browse tutors for O Level, A Level, IGCSE, IB, GCSE, MDCAT, SAT and more. Filter by subject, curriculum, country, certification and online or home lessons. First lesson free.";

// Filtered views share the /tutors canonical and are kept out of the index, so they never become thin pages.
export async function generateMetadata({ searchParams }: PageProps<"/tutors">): Promise<Metadata> {
  const f = normalizeFilters(await searchParams);
  const filtered = Boolean(f.subject || f.curriculum || f.country || f.certification || f.mode || f.sort);
  return pageMetadata({ title: "Find a tutor", description, path: "/tutors", noindex: filtered });
}

const countriesServed = new Set(tutors.flatMap((t) => t.countriesServed)).size;
const subjectsTaught = new Set(tutors.flatMap((t) => t.subjects)).size;
const curriculaTaught = TUTOR_CURRICULA.filter((c) => tutors.some((t) => t.curricula.includes(c.slug))).length;

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Tutors", path: "/tutors" },
];

export default function TutorsPage({ searchParams }: PageProps<"/tutors">) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <TutorsHero
        crumbs={crumbs}
        eyebrow="Tutor directory"
        title="Find your tutor"
        lead="Subject specialists for every major curriculum, online worldwide or at home in Islamabad and Rawalpindi. Filter the list, or let Smart Match rank tutors for you."
        stats={[
          { v: String(tutors.length), l: "Tutor profiles" },
          { v: String(countriesServed), l: "Countries served" },
          { v: String(subjectsTaught), l: "Subjects" },
          { v: String(curriculaTaught), l: "Curricula and exams" },
        ]}
      >
        <DarkActions message="Hi Tutoring Galaxy, I'd like help choosing a tutor." />
      </TutorsHero>

      <section className="py-12 lg:py-16" aria-label="Tutor directory">
        <Container>
          <Suspense fallback={<TutorDirectory />}>
            <Directory searchParams={searchParams} />
          </Suspense>
        </Container>
      </section>

      <TierExplainer />
      <BrowseHubs />
      <TutorsClosingCta
        title="Can't see the right tutor?"
        lead="Most matches are made by our team, not the list. Tell us the subject, syllabus and times that suit you and we'll suggest a tutor within a day. The first lesson is free."
        message="Hi Tutoring Galaxy, I couldn't find the right tutor on your site. Can you help?"
      />
    </>
  );
}

async function Directory({ searchParams }: { searchParams: PageProps<"/tutors">["searchParams"] }) {
  const initial = normalizeFilters(await searchParams);
  return <TutorDirectory initial={initial} syncUrl />;
}
