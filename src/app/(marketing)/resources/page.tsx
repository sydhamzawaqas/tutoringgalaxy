import Link from "next/link";
import { Container, Mark, Section, SheetCard } from "@/components/ui/primitives";
import { ClosingCta, PageIntro } from "@/components/sections/blocks";
import { resourceWordCount, resources } from "@/data/content/resources";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Guides for parents",
  description:
    "Plain-language guides for parents: O Level or IGCSE, using past papers, online or home tutoring, and preparing for MDCAT.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <PageIntro
        title="Guides for parents"
        lead="Short, practical guides on choosing exams, revising well and getting the most from tutoring."
        aside={<p>Have a question we haven&apos;t covered? Ask us on WhatsApp and we&apos;ll answer it, and maybe write a guide on it.</p>}
      />

      <Section className="border-t-0">
        <Container>
          <ul className="grid gap-4 md:grid-cols-2">
            {resources.map((r) => (
              <li key={r.slug}>
                <SheetCard className="relative flex h-full flex-col transition-colors hover:border-foreground">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-h3">
                      <Link href={`/resources/${r.slug}`} className="after:absolute after:inset-0">
                        {r.title}
                      </Link>
                    </h2>
                    <Mark>{Math.max(1, Math.round(resourceWordCount(r) / 200))} min</Mark>
                  </div>
                  <p className="mt-3 text-muted-foreground">{r.summary}</p>
                </SheetCard>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}
