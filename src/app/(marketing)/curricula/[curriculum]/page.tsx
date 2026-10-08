import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge, Container, PaperLayout, Section, SectionHeading } from "@/components/ui/primitives";
import { FaqList, PageIntro, PrimaryActions, TutorCard } from "@/components/sections/blocks";
import { Breadcrumbs, ContextClosingCta, MarginFacts, TickList, trialMessage } from "@/components/sections/directory";
import { getCurriculum, pageCurricula } from "@/data/content/curricula";
import { getSubject } from "@/data/content/subjects";
import { tutors } from "@/data/content/tutors";
import { faqs } from "@/data/content/faqs";
import { resources } from "@/data/content/resources";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

// Only curricula with `page: true` are prerendered. `dynamicParams` isn't available with Cache
// Components, so any other slug renders notFound() below.
export function generateStaticParams() {
  return pageCurricula().map((c) => ({ curriculum: c.slug }));
}

type Props = { params: Promise<{ curriculum: string }> };

function load(slug: string) {
  const c = getCurriculum(slug);
  return c?.page ? c : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = load((await params).curriculum);
  if (!c) notFound();
  return pageMetadata({
    title: `${c.short} tutors, online and at home`,
    description: `One-to-one ${c.name} tutoring with tutors who know the syllabus. ${c.board}, ${c.ages}. First lesson free.`,
    path: `/curricula/${c.slug}`,
  });
}

// General questions that apply to every curriculum.
const curriculumFaqs = faqs.filter((f) => ["How does the free trial lesson work?", "How do you choose a tutor for my child?", "Do you teach online and at home?", "Can we change tutors?"].includes(f.q));

export default async function CurriculumPage({ params }: Props) {
  const c = load((await params).curriculum);
  if (!c) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Curricula", path: "/curricula" },
    { name: c.short, path: `/curricula/${c.slug}` },
  ];
  const subjectList = c.subjects.map((s) => getSubject(s)).filter((s) => s !== undefined);
  const curriculumTutors = tutors.filter((t) => t.curricula.includes(c.slug));
  const guides = resources.filter((r) => r.curricula.includes(c.slug));
  const message = trialMessage(c.short);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs items={crumbs} />

      <PageIntro
        title={`${c.name} tutoring`}
        lead={c.summary}
        aside={
          <MarginFacts
            facts={[
              { label: "Exam board", value: c.board },
              { label: "Level", value: c.ages },
              { label: "Lessons", value: "Online everywhere, or at home in Islamabad and Rawalpindi" },
            ]}
          />
        }
      >
        <PrimaryActions trialHref={`/book?curriculum=${c.slug}`} message={message} />
      </PageIntro>

      <Section className="border-t-0">
        <Container>
          <PaperLayout margin={<p>Your tutor works from your child&apos;s exact syllabus code and the papers they will sit.</p>}>
            <SectionHeading title={`How we help with ${c.short}`} />
            <TickList items={c.howWeHelp} />
          </PaperLayout>
        </Container>
      </Section>

      <Section>
        <Container>
          <PaperLayout margin={<p>Don&apos;t see a subject? Ask us. We may still have a tutor for it.</p>}>
            <SectionHeading title={`${c.short} subjects we teach`} />
            <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
              {subjectList.map((s) => (
                <li key={s.slug} className="border-b border-dashed border-rule py-3">
                  {s.page ? (
                    <Link href={`/subjects/${s.slug}`} className="font-semibold underline-offset-4 hover:underline">
                      {s.name}
                    </Link>
                  ) : (
                    <span className="font-semibold">{s.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </PaperLayout>
        </Container>
      </Section>

      <Section>
        <Container>
          <PaperLayout>
            <SectionHeading
              title={`Where we teach ${c.short}`}
              lead="Online lessons are available wherever you live. Home lessons are available in Islamabad and Rawalpindi."
            />
            <div className="mt-6 flex flex-wrap gap-1.5">
              {c.regions.map((r) => (
                <Badge key={r}>{r}</Badge>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              <Button asChild variant="link" className="px-0">
                <Link href="/tutoring/online">Online tutoring</Link>
              </Button>
              <Button asChild variant="link" className="px-0">
                <Link href="/tutoring/home">Home tutoring</Link>
              </Button>
            </div>
          </PaperLayout>
        </Container>
      </Section>

      <Section>
        <Container>
          <PaperLayout margin={<p>These are example profiles that show the format. Real tutor profiles, with qualifications checked, replace them before launch.</p>}>
            <SectionHeading title={`${c.short} tutors`} lead="Every tutor teaches the curricula they know best." />
          </PaperLayout>
          {curriculumTutors.length ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {curriculumTutors.map((t) => (
                <TutorCard key={t.slug} t={t} />
              ))}
            </div>
          ) : (
            <p className="mt-6 max-w-measure text-muted-foreground">
              Tell us the subject and level, and we&apos;ll suggest a {c.short} tutor and share their profile before the trial.
            </p>
          )}
          <Button asChild variant="secondary" className="mt-6">
            <Link href={`/tutors?curriculum=${c.slug}`}>Browse {c.short} tutors</Link>
          </Button>
        </Container>
      </Section>

      {guides.length ? (
        <Section>
          <Container>
            <SectionHeading title="Guides for parents" />
            <ul className="mt-6 max-w-measure">
              {guides.map((g) => (
                <li key={g.slug} className="border-b border-dashed border-rule py-3">
                  <Link href={`/resources/${g.slug}`} className="font-semibold underline-offset-4 hover:underline">
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <Section>
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <SectionHeading title="Questions parents ask" />
          <div>
            <FaqList faqs={curriculumFaqs} />
            <Button asChild variant="link" className="mt-4 px-0">
              <Link href="/faq">All questions</Link>
            </Button>
          </div>
        </Container>
      </Section>

      <ContextClosingCta
        title={`Start ${c.short} lessons with a free trial`}
        lead="Tell us the subject and syllabus. We'll match a tutor within a day."
        message={message}
        trialHref={`/book?curriculum=${c.slug}`}
      />
    </>
  );
}
