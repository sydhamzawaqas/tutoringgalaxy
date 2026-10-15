import { FaqList } from "@/components/sections/blocks";
import { Heading } from "@/components/home/parts";
import { JsonLd, faqJsonLd } from "@/lib/seo";
import type { Faq } from "@/data/content/faqs";

type QA = { q: string; a: string };

const asFaqs = (list: readonly QA[]): Faq[] => list.map((f) => ({ q: f.q, a: f.a, topics: [] }));

/** FAQ heading + accordion + FAQPage JSON-LD built from the same list. */
export function FaqBlock({ title, lead, faqs, eyebrow = "FAQ" }: { title: string; lead?: string; faqs: readonly QA[]; eyebrow?: string }) {
  const list = asFaqs(faqs);
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <JsonLd data={faqJsonLd(list)} />
      <Heading eyebrow={eyebrow} title={title} lead={lead} />
      <FaqList faqs={list} />
    </div>
  );
}
