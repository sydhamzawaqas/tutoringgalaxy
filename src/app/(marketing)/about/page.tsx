import Link from "next/link";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Panel, PaperLayout, QNum, Section, SectionHeading } from "@/components/ui/primitives";
import { ClosingCta, PageIntro, PrimaryActions, Steps } from "@/components/sections/blocks";
import { countries } from "@/data/content/countries";
import { curricula } from "@/data/content/curricula";
import { site } from "@/data/content/site";
import { currentYear } from "@/lib/dates";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About us",
  description: `${site.name} has offered one-to-one tutoring since ${site.foundedYear}. Founded in ${site.city} by ${site.founder.name}, we now teach families in ${countries.length} countries.`,
  path: "/about",
});

/**
 * How tutors are chosen. A description of the process, with no numbers.
 * TODO(client): confirm each step matches what really happens (e.g. whether every tutor gives a demo lesson,
 * and whether ID or reference checks are done) before launch. Do not add "background-checked" unless it's true.
 */
const tutorSteps = [
  { title: "Application", body: "Tutors tell us what they teach, which exam boards and levels, and their qualifications and teaching experience." },
  { title: "Conversation and checks", body: "We talk to each applicant about how they teach and check the qualifications they've listed." },
  { title: "Demo lesson", body: "Applicants teach a short sample lesson on a topic from a syllabus they've taught, so we can see how they explain and check understanding." },
  { title: "Matched to what they know", body: "Tutors are only matched with students on syllabuses and levels they have taught before." },
  { title: "Ongoing feedback", body: "We ask parents how lessons are going. If a tutor isn't the right fit, we match someone else." },
];

export default async function AboutPage() {
  const year = await currentYear();
  const years = year - site.foundedYear;
  const homeCities = countries.flatMap((c) => c.homeCities);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <PageIntro
        title="About Tutoring Galaxy"
        lead={`One-to-one tutoring since ${site.foundedYear}, matched to each child's exact syllabus. We started in ${site.city} and now teach families in ${countries.length} countries.`}
        aside={
          <dl className="space-y-3">
            <div>
              <dt className="text-label">Founded</dt>
              <dd className="text-foreground tabular-nums">
                {site.foundedYear}, {site.city}
              </dd>
            </div>
            <div>
              <dt className="text-label">Founder</dt>
              <dd className="text-foreground">{site.founder.name}</dd>
            </div>
            <div>
              <dt className="text-label">Teaching in</dt>
              <dd className="text-foreground tabular-nums">{countries.length} countries</dd>
            </div>
          </dl>
        }
      >
        <PrimaryActions />
      </PageIntro>

      {/* Story */}
      <Section className="border-t-0">
        <Container>
          <PaperLayout margin={<p>{site.founder.name}, {site.founder.role}</p>}>
            <SectionHeading title="Our story" />
            {/* TODO(client): replace with the founder's own words and the mission quote from the old site, once confirmed. */}
            <div className="mt-6 max-w-measure space-y-4 text-muted-foreground">
              <p>
                {site.name} was founded in {site.city} in {site.foundedYear} by {site.founder.name}. The idea was simple: a student preparing
                for a particular exam should be taught by someone who knows that exam, its syllabus, its papers and how its examiners award
                marks.
              </p>
              <p>
                Today families come to us from Pakistan, the Gulf, the UK and further away. Online lessons mean a student anywhere can learn
                with a tutor who has taught their syllabus, and in {homeCities.join(" and ")} a tutor can also come to your home.
              </p>
              <p>
                We teach {curricula.length} curricula and entry tests, from O Level and IGCSE to IB, MDCAT and SAT, online and at home.
              </p>
            </div>
          </PaperLayout>
        </Container>
      </Section>

      {/* Mission */}
      <Section>
        <Container>
          <Panel className="p-8 md:p-10">
            <h2 className="text-h2-sm sm:text-h2">What we&apos;re here to do</h2>
            <p className="mt-4 max-w-measure text-lead text-muted-foreground">
              Help each child understand their subject well enough to do themselves justice in the exam, and keep parents clearly informed
              along the way.
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                ["The right tutor", "Matched on syllabus, level and the topics your child finds hard."],
                ["Honest updates", "Plain notes after lessons and a monthly report, not jargon."],
                ["Practice that teaches", "Feedback that guides your child to the answer instead of giving it away."],
              ].map(([title, body]) => (
                <li key={title} className="border-t border-rule pt-4">
                  <h3 className="font-bold">{title}</h3>
                  <p className="mt-1 text-small text-muted-foreground">{body}</p>
                </li>
              ))}
            </ul>
          </Panel>
        </Container>
      </Section>

      {/* How tutors are chosen */}
      <Section>
        <Container>
          <PaperLayout
            margin={
              <p>
                Want to teach with us?{" "}
                <Link href="/join-as-tutor" className="text-foreground underline underline-offset-4">
                  Apply as a tutor
                </Link>
                .
              </p>
            }
          >
            <SectionHeading title="How we choose tutors" lead="Every tutor goes through the same steps before teaching a student." />
            <Steps steps={tutorSteps} />
          </PaperLayout>
        </Container>
      </Section>

      {/* Timeline */}
      <Section>
        <Container>
          <SectionHeading title="Then and now" />
          <ol className="mt-8 max-w-measure">
            <li className="grid grid-cols-[5rem_minmax(0,1fr)] gap-x-4 border-b border-dashed border-rule py-5">
              <QNum className="text-lead">{site.foundedYear}</QNum>
              <div>
                <h3 className="font-bold">Founded in {site.city}</h3>
                <p className="mt-1 text-muted-foreground">{site.founder.name} starts {site.name}, teaching one-to-one.</p>
              </div>
            </li>
            <li className="grid grid-cols-[5rem_minmax(0,1fr)] gap-x-4 border-b border-dashed border-rule py-5">
              <QNum className="text-lead">Today</QNum>
              <div>
                <h3 className="font-bold">
                  {years} years on, {countries.length} countries
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Online lessons for families in {countries.length} countries, and home lessons in {homeCities.join(" and ")}.
                </p>
              </div>
            </li>
          </ol>
          {/* TODO(client): add dated milestones (e.g. when online lessons started) only once confirmed. */}
        </Container>
      </Section>

      {/* Where we teach */}
      <Section>
        <Container>
          <SectionHeading title="Where we teach" lead="Online in every country below. Home lessons where a city is listed." />
          <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {countries.map((c) => (
              <li key={c.name} className="flex gap-2.5 border-b border-dashed border-rule pb-3">
                <MapPin aria-hidden className="mt-0.5 size-4.5 shrink-0 text-muted-foreground" strokeWidth={1.5} />
                <span>
                  {c.name}
                  <span className="block text-small text-muted-foreground">
                    {c.homeCities.length > 0 ? `Online, and at home in ${c.homeCities.join(" and ")}` : "Online"}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            <Button asChild variant="link" className="px-0">
              <Link href="/tutoring/online">Online tutoring</Link>
            </Button>
            <Button asChild variant="link" className="px-0">
              <Link href="/tutoring/home">Home tutoring</Link>
            </Button>
          </div>
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}
