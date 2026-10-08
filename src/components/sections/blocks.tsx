import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge, Container, Mark, Panel, QNum, Section, SectionHeading, SheetCard } from "@/components/ui/primitives";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { WhatsAppIcon } from "@/components/brand/marks";
import { whatsappLink } from "@/data/content/site";
import type { Curriculum } from "@/data/content/curricula";
import type { Plan } from "@/data/content/pricing";
import type { Faq } from "@/data/content/faqs";
import type { Tutor } from "@/data/content/tutors";
import { getCurriculum } from "@/data/content/curricula";

/** The two calls to action used everywhere. Same labels on every page. */
export function PrimaryActions({ trialHref = "/book", message }: { trialHref?: string; message?: string }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button asChild size="lg">
        <Link href={trialHref}>Book a free trial</Link>
      </Button>
      <Button asChild size="lg" variant="secondary">
        <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          WhatsApp us
        </a>
      </Button>
    </div>
  );
}

/** Standard page intro for inner pages. */
export function PageIntro({
  title,
  lead,
  children,
  aside,
}: {
  title: string;
  lead?: string;
  children?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <div className="border-b border-rule">
      <Container className="grid gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-12 lg:py-20">
        <div>
          <SectionHeading as="h1" title={title} lead={lead} />
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
        {aside ? (
          <aside className="border-t border-dashed border-rule pt-4 text-small text-muted-foreground lg:border-t-0 lg:border-l lg:border-solid lg:pt-0 lg:pl-5">
            {aside}
          </aside>
        ) : null}
      </Container>
    </div>
  );
}

/** A numbered sequence with margin marks. Only for real steps. */
export function Steps({ steps }: { steps: readonly { title: string; body: string; mark?: string }[] }) {
  return (
    <ol className="mt-8">
      {steps.map((s, i) => (
        <li key={s.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-b border-dashed border-rule py-5 sm:grid-cols-[3rem_minmax(0,1fr)_10rem]">
          <QNum aria-hidden>{i + 1}</QNum>
          <div>
            <h3 className="text-lead font-bold">{s.title}</h3>
            <p className="mt-1 text-muted-foreground">{s.body}</p>
          </div>
          {s.mark ? <Mark className="col-start-2 mt-2 sm:col-start-3 sm:mt-0 sm:text-right">{s.mark}</Mark> : null}
        </li>
      ))}
    </ol>
  );
}

export function CurriculumCard({ c }: { c: Curriculum }) {
  return (
    <Link href={`/curricula/${c.slug}`} className="group block rounded-container border border-border p-5 transition-colors hover:border-foreground">
      <h3 className="text-lead font-bold">{c.short}</h3>
      <p className="mt-1 text-small text-muted-foreground">{c.board}</p>
      <p className="mt-2 text-label text-muted-foreground">{c.ages}</p>
    </Link>
  );
}

export function TutorCard({ t }: { t: Tutor }) {
  return (
    <SheetCard className="flex h-full flex-col">
      <div className="flex gap-4">
        <div aria-hidden className="grid size-16 shrink-0 place-items-center rounded-container border border-border bg-surface text-lead font-bold">
          {t.initials}
        </div>
        <div className="min-w-0">
          <h3 className="text-lead font-bold">{t.name}</h3>
          <p className="text-small text-muted-foreground">{t.headline}</p>
          <p className="text-small text-muted-foreground">
            {t.qualifications.join(", ")}, {t.experienceYears} years teaching
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {t.curricula.map((c) => (
          <Badge key={c}>{getCurriculum(c)?.short ?? c}</Badge>
        ))}
        <Badge>Online</Badge>
        {t.modes.includes("home") && t.city ? <Badge>Home: {t.city}</Badge> : null}
      </div>
      <p className="mt-4 text-small">{t.bio}</p>
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-dashed border-rule pt-4">
        {t.example ? <span className="text-label text-muted-foreground">Example profile</span> : <span />}
        <Button asChild variant="secondary" size="sm">
          <Link href={`/tutors/${t.slug}`}>View profile</Link>
        </Button>
      </div>
    </SheetCard>
  );
}

export function PricingCards({ plans }: { plans: Plan[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {plans.map((p) => (
        <SheetCard key={p.slug} className={p.featured ? "border-foreground" : undefined}>
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-h3">{p.name}</h3>
            <Mark>{p.subjects}</Mark>
          </div>
          <p className="mt-1 text-small text-muted-foreground">{p.summary}</p>
          <p className="mt-5">
            <span className="text-h3 font-bold tabular-nums">{p.price}</span>{" "}
            {p.period ? <span className="text-small text-muted-foreground">{p.period}</span> : null}
          </p>
          <ul className="mt-5 space-y-2">
            {p.features.map((f) => (
              <li key={f} className="flex gap-2.5 text-small">
                <Check aria-hidden className="mt-0.5 size-4.5 shrink-0 text-success" strokeWidth={1.75} />
                {f}
              </li>
            ))}
          </ul>
          <Button asChild className="mt-6 w-full" variant={p.featured ? "primary" : "secondary"}>
            <Link href={`/book?plan=${p.slug}`}>Book a free trial</Link>
          </Button>
          {p.featured ? <p className="mt-3 text-center text-label text-muted-foreground">Most families choose this</p> : null}
        </SheetCard>
      ))}
    </div>
  );
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <Accordion type="single" collapsible className="mt-6 border-t border-rule">
      {faqs.map((f, i) => (
        <AccordionItem key={f.q} value={`q${i}`}>
          <AccordionTrigger>{f.q}</AccordionTrigger>
          <AccordionContent>{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

/** Closing call to action, once per page. */
export function ClosingCta({
  title = "Start with a free lesson",
  lead = "Tell us the subject and exam board. We'll match a tutor within a day.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <Section>
      <Container>
        <Panel className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="max-w-measure">
            <h2 className="text-h2-sm sm:text-h2">{title}</h2>
            <p className="mt-3 text-lead text-muted-foreground">{lead}</p>
          </div>
          <PrimaryActions />
        </Panel>
      </Container>
    </Section>
  );
}
