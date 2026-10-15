import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { WhatsAppIcon } from "@/components/brand/marks";
import { Eyebrow } from "@/components/home/parts";
import { whatsappLink } from "@/data/content/site";
import { cn } from "@/lib/utils";

/** Gold trial button + outline WhatsApp button for dark (starfield) bands. */
export function DarkActions({ trialHref = "/book", message, className }: { trialHref?: string; message?: string; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <Button asChild size="lg" className="bg-gold text-navy-deep shadow-lift hover:bg-gold/90">
        <Link href={trialHref}>Book a free trial</Link>
      </Button>
      <Button asChild size="lg" variant="secondary" className="border-on-dark/40 bg-transparent text-on-dark hover:bg-on-dark/10">
        <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          WhatsApp us
        </a>
      </Button>
    </div>
  );
}

/**
 * Dark hero for the catalogue pages (subjects, curricula, blog). Left: eyebrow, h1, lead, actions.
 * Right (optional): a white card or any visual.
 */
export function CatalogHero({
  eyebrow,
  title,
  accent,
  lead,
  icon,
  checks,
  children,
  aside,
}: {
  eyebrow: string;
  title: string;
  /** Optional gold-coloured end of the title. */
  accent?: string;
  lead?: string;
  icon?: React.ReactNode;
  checks?: readonly string[];
  children?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section className="starfield relative overflow-hidden text-on-dark">
      <Container className={cn("relative grid gap-10 py-14 lg:py-20", aside ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-14" : undefined)}>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-4">
            {icon}
            <Eyebrow dark>{eyebrow}</Eyebrow>
          </div>
          <h1 className="mt-6 max-w-3xl text-h1-sm text-on-dark sm:text-h1">
            {title}
            {accent ? (
              <>
                {" "}
                <span className="text-gold">{accent}</span>
              </>
            ) : null}
          </h1>
          {lead ? <p className="mt-5 max-w-2xl text-lead text-on-dark-muted">{lead}</p> : null}
          {children ? <div className="mt-8">{children}</div> : null}
          {checks?.length ? (
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-small text-on-dark-muted">
              {checks.map((c) => (
                <li key={c} className="flex items-center gap-1.5">
                  <Check aria-hidden className="size-4 text-gold" strokeWidth={2.5} />
                  {c}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {aside ? <div className="min-w-0">{aside}</div> : null}
      </Container>
    </section>
  );
}

/** Closing dark call-to-action band (same look as the homepage's final CTA). */
export function CtaBand({ title, lead, trialHref, message }: { title: string; lead: string; trialHref?: string; message?: string }) {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="starfield relative overflow-hidden rounded-panel px-6 py-12 text-center text-on-dark sm:px-14 sm:py-14">
          <h2 className="mx-auto max-w-2xl text-h2-sm text-on-dark sm:text-h2">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lead text-on-dark-muted">{lead}</p>
          <DarkActions trialHref={trialHref} message={message} className="mt-8 justify-center" />
        </div>
      </Container>
    </section>
  );
}

/** Light section wrapper with consistent spacing; `tone` adds a soft background band. */
export function Band({ children, tone, id, className }: { children: React.ReactNode; tone?: "surface" | "sky" | "gold"; id?: string; className?: string }) {
  const bg = tone === "surface" ? "bg-surface" : tone === "sky" ? "bg-sky-tint" : tone === "gold" ? "bg-gold-tint" : undefined;
  return (
    <section id={id} className={cn("py-16 lg:py-24", bg, className)}>
      <Container>{children}</Container>
    </section>
  );
}
