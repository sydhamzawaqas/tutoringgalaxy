import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Container, Mark, PaperLayout, Section, SectionHeading } from "@/components/ui/primitives";
import { CurriculumCard, PageIntro, PrimaryActions, TutorCard } from "@/components/sections/blocks";
import { Breadcrumbs, ContextClosingCta, trialMessage } from "@/components/sections/directory";
import { getSubject, pageSubjects } from "@/data/content/subjects";
import { curricula } from "@/data/content/curricula";
import { tutors } from "@/data/content/tutors";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

// Only subjects with `page: true` are prerendered. `dynamicParams` isn't available with Cache
// Components, so any other slug renders notFound() below.
export function generateStaticParams() {
  return pageSubjects().map((s) => ({ subject: s.slug }));
}

type Props = { params: Promise<{ subject: string }> };

function load(slug: string) {
  const s = getSubject(slug);
  return s?.page ? s : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = load((await params).subject);
  if (!s) notFound();
  return pageMetadata({
    title: `${s.name} tutors for O Level, A Level, IGCSE and more`,
    description: `One-to-one ${s.name} tutoring, online or at home. ${s.summary} First lesson free.`,
    path: `/subjects/${s.slug}`,
  });
}

export default async function SubjectPage({ params }: Props) {
  const s = load((await params).subject);
  if (!s) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Subjects", path: "/subjects" },
    { name: s.name, path: `/subjects/${s.slug}` },
  ];
  const withSubject = curricula.filter((c) => c.subjects.includes(s.slug));
  const subjectTutors = tutors.filter((t) => t.subjects.includes(s.slug));
  const message = trialMessage(s.name);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs items={crumbs} />

      <PageIntro
        title={`${s.name} tutoring`}
        lead={s.summary}
        aside={<p>Topic names and depth vary by exam board. Your tutor follows your child&apos;s exact syllabus.</p>}
      >
        <PrimaryActions trialHref={`/book?subject=${s.slug}`} message={message} />
      </PageIntro>

      <Section className="border-t-0">
        <Container>
          <PaperLayout margin={<p>Not every topic appears in every syllabus. We start by checking which ones your child&apos;s papers cover.</p>}>
            <div className="flex items-baseline justify-between gap-4">
              <SectionHeading title="Syllabus contents" lead={`The main areas our ${s.name} tutors cover.`} />
              <Mark>{s.topics.length} areas</Mark>
            </div>
            <ul className="mt-6">
              {s.topics.map((t) => (
                <li key={t} className="border-b border-dashed border-rule py-3 text-lead">
                  {t}
                </li>
              ))}
            </ul>
          </PaperLayout>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading title={`Curricula that include ${s.name}`} />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {withSubject
              .filter((c) => c.page)
              .map((c) => (
                <CurriculumCard key={c.slug} c={c} />
              ))}
          </div>
          {withSubject.some((c) => !c.page) ? (
            <p className="mt-4 text-small text-muted-foreground">
              Also for{" "}
              {withSubject
                .filter((c) => !c.page)
                .map((c) => c.short)
                .join(" and ")}
              .
            </p>
          ) : null}
        </Container>
      </Section>

      <Section>
        <Container>
          <PaperLayout margin={<p>These are example profiles that show the format. Real tutor profiles, with qualifications checked, replace them before launch.</p>}>
            <SectionHeading title={`${s.name} tutors`} lead="We share a tutor's profile with you before the free trial." />
          </PaperLayout>
          {subjectTutors.length ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {subjectTutors.map((t) => (
                <TutorCard key={t.slug} t={t} />
              ))}
            </div>
          ) : (
            <p className="mt-6 max-w-measure text-muted-foreground">
              Tell us the curriculum and level, and we&apos;ll suggest a {s.name} tutor before the trial.
            </p>
          )}
          <Button asChild variant="secondary" className="mt-6">
            <Link href={`/tutors?subject=${s.slug}`}>Browse {s.name} tutors</Link>
          </Button>
        </Container>
      </Section>

      <ContextClosingCta
        title={`Start ${s.name} lessons with a free trial`}
        lead="Tell us the curriculum and the topics your child finds hard. We'll match a tutor within a day."
        message={message}
        trialHref={`/book?subject=${s.slug}`}
      />
    </>
  );
}
