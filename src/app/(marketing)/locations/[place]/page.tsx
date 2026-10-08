import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Container, PaperLayout, Section, SectionHeading } from "@/components/ui/primitives";
import { CurriculumCard, FaqList, PageIntro, PrimaryActions, Steps, TutorCard } from "@/components/sections/blocks";
import { Breadcrumbs, ContextClosingCta, MarginFacts, TickList } from "@/components/sections/directory";
import { getCurriculum, type Curriculum } from "@/data/content/curricula";
import { tutors } from "@/data/content/tutors";
import { faqsFor } from "@/data/content/faqs";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { getPlace, places } from "./places";

// TODO(client): only Islamabad has a page. Other cities get one only when real local tutors exist
// (add them to places.ts). `dynamicParams` isn't available with Cache Components, so unknown places
// render notFound() below.
export function generateStaticParams() {
  return places.map((p) => ({ place: p.slug }));
}

type Props = { params: Promise<{ place: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPlace((await params).place);
  if (!p) notFound();
  return pageMetadata({
    title: `Home and online tutors in ${p.homeCities.join(" and ")}`,
    description: `One-to-one home tutoring in ${p.homeCities.join(" and ")} for O Level, A Level, IGCSE, Matric, FSc and MDCAT, plus online lessons. First lesson free.`,
    path: `/locations/${p.slug}`,
  });
}

const homeSteps = [
  { title: "Tell us what you need", body: "The subject, syllabus and level, your area, and the days and times that suit you." },
  { title: "We suggest a tutor", body: "We share the tutor's profile before anything is booked, so you know who is coming." },
  { title: "Free first lesson", body: "The tutor visits for a trial lesson. You continue only if it's the right fit." },
] as const;

export default async function PlacePage({ params }: Props) {
  const p = getPlace((await params).place);
  if (!p) notFound();

  const cities = p.homeCities.join(" and ");
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Home tutoring", path: "/tutoring/home" },
    { name: p.name, path: `/locations/${p.slug}` },
  ];
  const popular = p.curricula.map((c) => getCurriculum(c)).filter((c): c is Curriculum => Boolean(c?.page));
  const localTutors = tutors.filter((t) => t.modes.includes("home") && t.city && p.homeCities.includes(t.city));
  const homeFaqs = faqsFor("home").concat(faqsFor("trial").filter((f) => !f.topics.includes("home")));
  const message = `Hi Tutoring Galaxy, I'd like a free trial lesson with a home tutor in ${p.name}.`;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(homeFaqs)} />
      <Breadcrumbs items={crumbs} />

      <PageIntro
        title={`Home tutors in ${cities}`}
        lead={`We send tutors to your home in ${cities}, and teach online wherever you are. Each tutor is matched to your child's exact syllabus.`}
        aside={
          <MarginFacts
            facts={[
              { label: "Home lessons", value: cities },
              { label: "Online lessons", value: "Everywhere we teach" },
              { label: "First lesson", value: "Free, with no payment details" },
            ]}
          />
        }
      >
        <PrimaryActions trialHref="/book?mode=home" message={message} />
      </PageIntro>

      <Section className="border-t-0">
        <Container>
          <PaperLayout margin={<p>Home tutoring depends on having a suitable tutor near you. If we don&apos;t, we&apos;ll tell you and suggest online lessons instead.</p>}>
            <SectionHeading title={`How home tutoring works in ${p.name}`} />
            <Steps steps={homeSteps} />
          </PaperLayout>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            title={`Curricula families ask for in ${p.name}`}
            lead="Cambridge and Pakistani board exams, and medical college entry tests."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((c) => (
              <CurriculumCard key={c.slug} c={c} />
            ))}
          </div>
          <Button asChild variant="link" className="mt-6 px-0">
            <Link href="/curricula">All curricula</Link>
          </Button>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading title="At home" lead={`A tutor comes to you in ${cities}.`} />
            <TickList
              items={[
                "Helpful for younger students and those who focus better in person",
                "The tutor can watch working as it happens",
                "You can meet the tutor and agree where lessons take place",
              ]}
            />
            <Button asChild variant="link" className="mt-4 px-0">
              <Link href="/tutoring/home">More about home tutoring</Link>
            </Button>
          </div>
          <div>
            <SectionHeading title="Online" lead="The same tutors, from anywhere, with no travel time." />
            <TickList
              items={[
                "A wider choice of specialist tutors",
                "Easy to fit around school and activities",
                "Lessons continue during holidays or if you move",
              ]}
            />
            <Button asChild variant="link" className="mt-4 px-0">
              <Link href="/tutoring/online">More about online tutoring</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {localTutors.length ? (
        <Section>
          <Container>
            <PaperLayout margin={<p>These are example profiles that show the format. Real tutor profiles, with qualifications checked, replace them before launch.</p>}>
              <SectionHeading title={`Tutors who teach at home in ${p.name}`} />
            </PaperLayout>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {localTutors.map((t) => (
                <TutorCard key={t.slug} t={t} />
              ))}
            </div>
            <Button asChild variant="secondary" className="mt-6">
              <Link href="/tutors?mode=home">Browse home tutors</Link>
            </Button>
          </Container>
        </Section>
      ) : null}

      <Section>
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <SectionHeading title="Questions parents ask" />
          <div>
            <FaqList faqs={homeFaqs} />
            <Button asChild variant="link" className="mt-4 px-0">
              <Link href="/faq">All questions</Link>
            </Button>
          </div>
        </Container>
      </Section>

      <ContextClosingCta
        title={`Book a free home lesson in ${p.name}`}
        lead="Tell us the subject, syllabus and your area. We'll match a tutor, usually within a day."
        message={message}
        trialHref="/book?mode=home"
      />
    </>
  );
}
