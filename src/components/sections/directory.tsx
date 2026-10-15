import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { Container, Panel, Section } from "@/components/ui/primitives";
import { PrimaryActions } from "@/components/sections/blocks";

/**
 * Pieces shared by the directory and detail pages (curricula, subjects, tutors, resources, locations).
 * They compose the foundation components; no new styles.
 */

/** Visible breadcrumb trail. Pair with breadcrumbJsonLd() using the same items. */
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-rule">
      <Container>
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 py-3 text-small text-muted-foreground">
          {items.map((it, i) => {
            const last = i === items.length - 1;
            return (
              <li key={it.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-foreground">
                    {it.name}
                  </span>
                ) : (
                  <>
                    <Link href={it.path} className="underline-offset-4 hover:text-foreground hover:underline">
                      {it.name}
                    </Link>
                    <ChevronRight aria-hidden className="size-3.5" strokeWidth={1.5} />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </nav>
  );
}

/** A plain list with success ticks, for "how we help" style points. */
export function TickList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={className ?? "mt-6 space-y-3"}>
      {items.map((x) => (
        <li key={x} className="flex gap-2.5">
          <Check aria-hidden className="mt-1 size-4.5 shrink-0 text-success" strokeWidth={1.75} />
          <span>{x}</span>
        </li>
      ))}
    </ul>
  );
}

/** Small key/value facts for the margin column. */
export function MarginFacts({ facts }: { facts: readonly { label: string; value: React.ReactNode }[] }) {
  return (
    <dl className="space-y-4">
      {facts.map((f) => (
        <div key={f.label}>
          <dt className="text-label font-semibold text-foreground">{f.label}</dt>
          <dd className="mt-0.5">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Closing call to action with page-specific WhatsApp message and trial link.
 * Same look as ClosingCta in blocks.tsx, which doesn't take a message.
 */
export function ContextClosingCta({
  title = "Start with a free lesson",
  lead = "Tell us the subject and exam board. We'll match a tutor within a day.",
  message,
  trialHref = "/book",
}: {
  title?: string;
  lead?: string;
  message?: string;
  trialHref?: string;
}) {
  return (
    <Section>
      <Container>
        <Panel className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="max-w-measure">
            <h2 className="text-h2-sm sm:text-h2">{title}</h2>
            <p className="mt-3 text-lead text-muted-foreground">{lead}</p>
          </div>
          <PrimaryActions trialHref={trialHref} message={message} />
        </Panel>
      </Container>
    </Section>
  );
}

/** Prefilled WhatsApp message naming what the parent was looking at. */
export function trialMessage(what: string) {
  return `Hi Tutoring Galaxy, I'd like to book a free trial lesson for ${what}.`;
}
