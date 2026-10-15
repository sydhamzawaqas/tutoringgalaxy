import Link from "next/link";
import { Check, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Panel, PaperLayout, Section, SectionHeading } from "@/components/ui/primitives";
import { ClosingCta, CurriculumCard, FaqList, PageIntro, PrimaryActions, Steps } from "@/components/sections/blocks";
import type { Curriculum } from "@/data/content/curricula";
import type { Faq } from "@/data/content/faqs";

export type TutoringModeContent = {
  title: string;
  lead: string;
  /** Short facts for the margin of the intro. */
  facts: string[];
  what: { title: string; body: string[] };
  suits: { title: string; lead?: string; items: string[] };
  lessons: { title: string; lead?: string; steps: { title: string; body: string; mark?: string }[] };
  where: { title: string; lead: string; places: { name: string; detail?: string }[]; note?: string };
  curricula: { title: string; lead: string; items: Curriculum[] };
  faqs: Faq[];
  other: { title: string; body: string; href: string; linkLabel: string };
  whatsappMessage?: string;
};

/** Shared layout for /tutoring/online and /tutoring/home. */
export function TutoringMode({ content: c }: { content: TutoringModeContent }) {
  return (
    <>
      <PageIntro
        title={c.title}
        lead={c.lead}
        aside={
          <ul className="space-y-3">
            {c.facts.map((f) => (
              <li key={f} className="flex gap-2">
                <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={1.75} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        }
      >
        <PrimaryActions message={c.whatsappMessage} />
      </PageIntro>

      <Section className="border-t-0">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading title={c.what.title} />
            <div className="mt-4 max-w-measure space-y-4 text-muted-foreground">
              {c.what.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading title={c.suits.title} lead={c.suits.lead} />
            <ul className="mt-6 space-y-3">
              {c.suits.items.map((x) => (
                <li key={x} className="flex gap-2.5">
                  <Check aria-hidden className="mt-1 size-4.5 shrink-0 text-success" strokeWidth={1.75} />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <PaperLayout margin={<p>Every lesson is one-to-one. Times are agreed with you and can change when school timetables do.</p>}>
            <SectionHeading title={c.lessons.title} lead={c.lessons.lead} />
            <Steps steps={c.lessons.steps} />
          </PaperLayout>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading title={c.where.title} lead={c.where.lead} />
          <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {c.where.places.map((p) => (
              <li key={p.name} className="flex gap-2.5 border-b border-dashed border-rule pb-3">
                <MapPin aria-hidden className="mt-0.5 size-4.5 shrink-0 text-muted-foreground" strokeWidth={1.5} />
                <span>
                  {p.name}
                  {p.detail ? <span className="block text-small text-muted-foreground">{p.detail}</span> : null}
                </span>
              </li>
            ))}
          </ul>
          {c.where.note ? <p className="mt-6 max-w-measure text-small text-muted-foreground">{c.where.note}</p> : null}
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading title={c.curricula.title} lead={c.curricula.lead} />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {c.curricula.items.map((cur) => (
              <CurriculumCard key={cur.slug} c={cur} />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div>
            <SectionHeading title="Questions parents ask" />
            <Panel className="mt-8">
              <p className="font-semibold">{c.other.title}</p>
              <p className="mt-1 text-small text-muted-foreground">{c.other.body}</p>
              <Button asChild variant="link" className="mt-2 h-11 px-0">
                <Link href={c.other.href}>{c.other.linkLabel}</Link>
              </Button>
            </Panel>
          </div>
          <div>
            <FaqList faqs={c.faqs} />
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
