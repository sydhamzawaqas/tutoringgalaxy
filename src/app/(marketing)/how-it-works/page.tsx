import Link from "next/link";
import { ClipboardCheck, Eye, House, Lightbulb, Monitor, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge, Container, Mark, Note, PaperLayout, Section, SectionHeading, SheetCard } from "@/components/ui/primitives";
import { Tick } from "@/components/brand/marks";
import { ClosingCta, FaqList, PageIntro, PrimaryActions, Steps } from "@/components/sections/blocks";
import { ongoingSteps, trialSteps } from "@/data/content/how-it-works";
import { faqs } from "@/data/content/faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How it works",
  description:
    "How a free trial lesson works, what weekly lessons look like, and how AI practice helps between lessons without giving answers away.",
  path: "/how-it-works",
});

const pageFaqs = faqs.filter((f) => f.topics.some((t) => t === "trial" || t === "ai"));

const aiPoints = [
  {
    icon: Lightbulb,
    title: "It guides, it doesn't give answers",
    body: "When your child gets stuck, they get a hint about the next step, not the final answer. They still do the working.",
  },
  {
    icon: ClipboardCheck,
    title: "Checked against the mark scheme",
    body: "Feedback follows how examiners award marks, so your child learns to show the working that earns them.",
  },
  {
    icon: Eye,
    title: "Tutors see what was practised",
    body: "The tutor can see which questions were tried and where your child struggled, and starts the next lesson there.",
  },
  {
    icon: Users,
    title: "Parents see progress",
    body: "Practice results feed into the monthly report, so you can see which topics are improving.",
  },
] as const;

export default function HowItWorksPage() {
  return (
    <>
      <PageIntro
        title="How it works"
        lead="Start with a free lesson. If the tutor is right for your child, carry on with weekly one-to-one lessons, practice between them and regular updates for you."
        aside={<p>The trial needs no payment details. You decide afterwards whether to continue.</p>}
      >
        <PrimaryActions />
      </PageIntro>

      {/* Free trial */}
      <Section className="border-t-0">
        <Container>
          <PaperLayout margin={<p>We share the tutor&apos;s profile on WhatsApp before the trial, so you know who your child will meet.</p>}>
            <SectionHeading title="The free trial" lead="Three steps, and you only continue if it's the right tutor." />
            <Steps steps={trialSteps} />
          </PaperLayout>
        </Container>
      </Section>

      {/* Ongoing lessons */}
      <Section>
        <Container>
          <PaperLayout margin={<p>Plans are monthly, with no long contract.</p>}>
            <SectionHeading title="After the trial" lead="Lessons follow a plan built around the syllabus and the gaps the trial showed." />
            <Steps steps={ongoingSteps} />
            <Button asChild variant="link" className="mt-4 px-0">
              <Link href="/pricing">See plans and prices</Link>
            </Button>
          </PaperLayout>
        </Container>
      </Section>

      {/* AI practice */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start">
          <div>
            <SectionHeading
              title="How AI practice works"
              lead="Between lessons, your child can practise exam-style questions and get step-by-step feedback. It supports the tutor; it doesn't replace them."
            />
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {aiPoints.map(({ icon: Icon, title, body }) => (
                <li key={title}>
                  <Icon aria-hidden className="size-5 text-muted-foreground" strokeWidth={1.5} />
                  <h3 className="mt-3 font-bold">{title}</h3>
                  <p className="mt-1 text-small text-muted-foreground">{body}</p>
                </li>
              ))}
            </ul>
          </div>

          <SheetCard aria-label="Example of AI practice feedback">
            <div className="flex items-center justify-between gap-3">
              <Badge>IGCSE Mathematics</Badge>
              <span className="text-label text-muted-foreground">Example</span>
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <p>
                <span className="font-bold">2 (a)</span> Solve <span className="font-note italic">3(x − 2) = 2x + 5</span>
              </p>
              <Mark>2</Mark>
            </div>
            <div className="mt-4 space-y-2 font-note italic">
              <p className="answer-line pb-1">3x − 6 = 2x + 5</p>
              <p className="answer-line pb-1">x = −1</p>
            </div>
            <div className="mt-4 flex items-start gap-2">
              <Tick className="size-6 shrink-0" />
              <Note>First line is right. Now check the sign when you move −6 across.</Note>
            </div>
            <p className="mt-4 border-t border-rule pt-3 text-small text-muted-foreground">
              The hint points to the step to fix. The answer isn&apos;t shown until your child gets there.
            </p>
          </SheetCard>
        </Container>
      </Section>

      {/* Online or home */}
      <Section>
        <Container>
          <SectionHeading title="Online or at home" lead="The plan, the tutor's preparation and the updates for parents are the same either way." />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <SheetCard className="flex flex-col">
              <Monitor aria-hidden className="size-5 text-muted-foreground" strokeWidth={1.5} />
              <h3 className="mt-3 text-h3">Online</h3>
              <p className="mt-2 text-muted-foreground">
                Live one-to-one lessons on a video call, available in every country we serve. The widest choice of tutors for your exact syllabus.
              </p>
              <Button asChild variant="secondary" className="mt-6 self-start">
                <Link href="/tutoring/online">About online tutoring</Link>
              </Button>
            </SheetCard>
            <SheetCard className="flex flex-col">
              <House aria-hidden className="size-5 text-muted-foreground" strokeWidth={1.5} />
              <h3 className="mt-3 text-h3">At home</h3>
              <p className="mt-2 text-muted-foreground">
                A tutor comes to your home for one-to-one lessons. Available in cities where we have tutors nearby, starting with Islamabad and Rawalpindi.
              </p>
              <Button asChild variant="secondary" className="mt-6 self-start">
                <Link href="/tutoring/home">About home tutoring</Link>
              </Button>
            </SheetCard>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <SectionHeading title="Questions parents ask" />
          <div>
            <FaqList faqs={pageFaqs} />
            <Button asChild variant="link" className="mt-4 px-0">
              <Link href="/faq">All questions</Link>
            </Button>
          </div>
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}
