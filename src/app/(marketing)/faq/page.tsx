import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { ClosingCta, FaqList, PageIntro, PrimaryActions } from "@/components/sections/blocks";
import { faqs, type Faq } from "@/data/content/faqs";
import { JsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Frequently asked questions",
  description: "Answers to common questions about the free trial, choosing a tutor, online and home lessons, pricing and AI practice.",
  path: "/faq",
});

type Topic = Faq["topics"][number];

/**
 * Each question appears once, under the first group (in this order) that matches one of its topics.
 * That keeps the page and the FAQPage structured data free of duplicates.
 */
const groups: { id: string; title: string; topics: Topic[] }[] = [
  { id: "trial", title: "The free trial and choosing a tutor", topics: ["trial"] },
  { id: "lessons", title: "Online and home lessons", topics: ["online", "home"] },
  { id: "pricing", title: "Pricing and progress", topics: ["pricing"] },
  { id: "ai", title: "AI practice", topics: ["ai"] },
  { id: "general", title: "Everything else", topics: ["general"] },
];

const grouped = (() => {
  const seen = new Set<Faq>();
  return groups
    .map((g) => {
      const items = faqs.filter((f) => !seen.has(f) && f.topics.some((t) => g.topics.includes(t)));
      items.forEach((f) => seen.add(f));
      return { ...g, items };
    })
    .filter((g) => g.items.length > 0);
})();

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(grouped.flatMap((g) => g.items))} />

      <PageIntro
        title="Frequently asked questions"
        lead="Straight answers to what parents ask us most. If your question isn't here, send it on WhatsApp."
        aside={
          <nav aria-label="FAQ topics">
            <p className="text-label">Topics</p>
            <ul className="mt-2">
              {grouped.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`} className="flex min-h-11 items-center text-foreground underline-offset-4 hover:underline">
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        }
      >
        <PrimaryActions message="Hi Tutoring Galaxy, I have a question about tutoring." />
      </PageIntro>

      {grouped.map((g, i) => (
        <Section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} className={i === 0 ? "border-t-0 py-12 lg:py-16" : "py-12 lg:py-16"}>
          <Container className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <div id={`${g.id}-title`}>
              <SectionHeading title={g.title} />
            </div>
            <FaqList faqs={g.items} />
          </Container>
        </Section>
      ))}

      <ClosingCta title="Still have a question?" lead="Ask us on WhatsApp, or book the free trial and ask the tutor directly." />
    </>
  );
}
