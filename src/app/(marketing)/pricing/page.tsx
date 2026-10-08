import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Panel, PaperLayout, Section, SectionHeading } from "@/components/ui/primitives";
import { ClosingCta, FaqList, PageIntro, PricingCards } from "@/components/sections/blocks";
import { plans, pricingNotes } from "@/data/content/pricing";
import { faqsFor } from "@/data/content/faqs";
import { JsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pricing",
  description:
    "Monthly tutoring plans from PKR 15,000 for one subject, and custom exam programmes. The first lesson is free and needs no payment details.",
  path: "/pricing",
});

const pricingFaqs = faqsFor("pricing");

/**
 * Comparison built only from the plan feature lists in data/content/pricing.ts.
 * `true` = listed for that plan, `null` = not listed for that plan, string = the plan's own wording.
 * TODO(client): confirm which features are shared across plans (e.g. WhatsApp support on Growth,
 * AI practice on the Exam programme) so the "not listed" cells can be filled in properly.
 */
type Cell = string | true | null;
const comparison: { feature: string; cells: [Cell, Cell, Cell] }[] = [
  { feature: "Subjects", cells: ["1 subject", "Up to 2 subjects", "All exam subjects"] },
  { feature: "One-to-one lessons", cells: ["4 a month", "8 a month", "Planned with you"] },
  { feature: "Updates for parents", cells: ["Monthly progress note", "Monthly progress report", "Dashboard and fortnightly reports"] },
  { feature: "AI practice between lessons", cells: [null, true, "Ask us"] },
  { feature: "Priority tutor matching", cells: [null, true, null] },
  { feature: "Lead tutor who coordinates the plan", cells: [null, null, true] },
  { feature: "Mock exams marked to the mark scheme", cells: [null, null, true] },
  { feature: "WhatsApp support", cells: [true, "Ask us", "Ask us"] },
];

function CellValue({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <>
        <Check aria-hidden className="inline size-4.5 text-success" strokeWidth={1.75} />
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === null) {
    return (
      <>
        <span aria-hidden className="text-muted-foreground">–</span>
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <>{value}</>;
}

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(pricingFaqs)} />

      <PageIntro
        title="Pricing"
        lead="Simple monthly plans with no long contract. Start with a free lesson, then choose the plan that fits."
        aside={
          <ul className="space-y-3">
            {pricingNotes.map((n) => (
              <li key={n} className="flex gap-2">
                <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={1.75} />
                <span>{n}</span>
              </li>
            ))}
          </ul>
        }
      />

      <Section className="border-t-0 pt-12 lg:pt-16">
        <Container>
          <h2 className="sr-only">Plans</h2>
          <PricingCards plans={plans} />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading title="What each plan includes" lead="A side-by-side view of the three plans." />
          <div className="mt-8 overflow-x-auto rounded-container border border-border">
            <table className="w-full min-w-xl text-left text-small">
              <caption className="sr-only">Features included in each plan</caption>
              <thead className="bg-surface">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Feature
                  </th>
                  {plans.map((p) => (
                    <th key={p.slug} scope="col" className="px-4 py-3 font-semibold">
                      {p.name}
                      <span className="block font-normal text-muted-foreground tabular-nums">
                        {p.price}
                        {p.period ? ` ${p.period}` : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.feature} className="border-t border-rule">
                    <th scope="row" className="px-4 py-3 font-semibold">
                      {row.feature}
                    </th>
                    {row.cells.map((cell, i) => (
                      <td key={plans[i]?.slug ?? i} className="px-4 py-3 tabular-nums">
                        <CellValue value={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-small text-muted-foreground">
            Not sure which plan fits? Book the free trial first. The tutor will suggest a plan once they&apos;ve seen where your child is.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <PaperLayout
            margin={
              <p>
                Questions about a payment? Email or WhatsApp us and we&apos;ll reply with the details for your plan.
              </p>
            }
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Panel>
                <h2 className="text-h3">Changing tutors</h2>
                <p className="mt-2 text-muted-foreground">
                  If the tutor isn&apos;t the right fit, tell us and we&apos;ll match someone else at no extra cost.
                </p>
              </Panel>
              <Panel>
                <h2 className="text-h3">Ask us about refunds</h2>
                <p className="mt-2 text-muted-foreground">
                  The trial is free, so you only pay once you&apos;ve decided to continue. For questions about refunds on a paid plan, read our
                  refund policy or get in touch.
                </p>
                <Button asChild variant="link" className="mt-2 h-11 px-0">
                  <Link href="/legal/refunds">Refund policy</Link>
                </Button>
              </Panel>
            </div>
          </PaperLayout>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <SectionHeading title="Questions about pricing" />
          <div>
            <FaqList faqs={pricingFaqs} />
            <Button asChild variant="link" className="mt-4 px-0">
              <Link href="/faq">All questions</Link>
            </Button>
          </div>
        </Container>
      </Section>

      <ClosingCta title="Try a lesson before you choose a plan" />
    </>
  );
}
