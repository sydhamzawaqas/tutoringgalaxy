import { Check } from "lucide-react";
import { Container, PaperLayout, Section, SectionHeading, SheetCard } from "@/components/ui/primitives";
import { PageIntro, Steps } from "@/components/sections/blocks";
import { TutorApplicationForm } from "@/components/forms/tutor-application-form";
import { curricula } from "@/data/content/curricula";
import { site, whatsappLink } from "@/data/content/site";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Teach with us",
  description:
    "Apply to tutor O Level, A Level, IGCSE, IB, Matric, FSc, MDCAT or SAT students with Tutoring Galaxy, online or at home in Islamabad and Rawalpindi.",
  path: "/join-as-tutor",
});

// TODO(client): confirm how tutors are paid (rate, schedule) and whether to publish it here.
// TODO(client): confirm each step of the process below matches what really happens.
const lookingFor = [
  "You have taught a specific syllabus before, and know its papers and mark schemes",
  "You can explain an idea simply, then check that the student really understood it",
  "You are reliable: on time, prepared and in touch with parents",
  "Usually, a degree in your subject or a closely related one",
  "A laptop, a stable internet connection and a quiet place to teach online",
];

const applySteps = [
  { title: "Apply", body: "Tell us what you teach, which exam boards and levels, and your experience.", mark: "10 minutes" },
  { title: "Short conversation", body: "If your experience matches what families are asking for, we'll call or message you to talk about how you teach." },
  { title: "Demo lesson", body: "You teach a short sample lesson on a topic from a syllabus you know, so we can see how you explain." },
  { title: "Start teaching", body: "We match you with students on the syllabuses and levels you've taught, online or near you." },
];

export default function JoinAsTutorPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Teach with us", path: "/join-as-tutor" },
        ])}
      />

      <PageIntro
        title="Teach with Tutoring Galaxy"
        lead="We match tutors with students on the exact syllabus they've taught, from O Level and IGCSE to IB, MDCAT and SAT. Lessons are one-to-one, online or at home."
        aside={
          <p>
            Questions before you apply?{" "}
            <a
              href={whatsappLink("Hi Tutoring Galaxy, I'd like to ask about teaching with you.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4"
            >
              WhatsApp us
            </a>{" "}
            or email{" "}
            <a href={`mailto:${site.email}`} className="break-all text-foreground underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>
        }
      />

      <Section className="border-t-0">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading title="Who we look for" />
            <ul className="mt-6 space-y-3">
              {lookingFor.map((x) => (
                <li key={x} className="flex gap-2.5">
                  <Check aria-hidden className="mt-1 size-4.5 shrink-0 text-success" strokeWidth={1.75} />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title="How it works" />
            <Steps steps={applySteps} />
          </div>
        </Container>
      </Section>

      <Section id="apply">
        <Container>
          <PaperLayout
            margin={
              <p>
                We use these details only to review your application and contact you about it. See the privacy policy for how long we keep
                them.
              </p>
            }
          >
            <SectionHeading title="Apply to teach" lead="All fields are required. It takes about 10 minutes." />
            <SheetCard className="mt-8 p-6 sm:p-8">
              <TutorApplicationForm curricula={curricula.map((c) => ({ slug: c.slug, short: c.short }))} />
            </SheetCard>
          </PaperLayout>
        </Container>
      </Section>
    </>
  );
}
