import { HelpCircle } from "lucide-react";
import { Heading } from "@/components/home/parts";
import { Breadcrumbs } from "@/components/sections/directory";
import { Band, CatalogHero, CtaBand, DarkActions } from "@/components/catalog/hero";
import { CurriculumTile } from "@/components/catalog/cards";
import { curricula, curriculumGroups, type Curriculum } from "@/data/content/curricula";
import { subjects } from "@/data/content/subjects";
import { site, whatsappLink } from "@/data/content/site";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Curricula and exam boards we teach",
  description:
    "One-to-one tutoring for Cambridge O Level, IGCSE and A Level, Edexcel, GCSE, IB, Matric, FSc, MDCAT, ECAT, SAT, ACT, AP, GED, HSC, VCE and more, matched to your exact syllabus. First lesson free.",
  path: "/curricula",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Curricula", path: "/curricula" },
];

const bySlug = (slugs: string[]) => slugs.map((s) => curricula.find((c) => c.slug === s)).filter((c): c is Curriculum => Boolean(c?.page));
const TINTS = ["bg-gold-tint text-gold-deep", "bg-sky-tint text-navy-soft", "bg-mint-tint text-success", "bg-lilac-tint text-navy-soft", "bg-coral-tint text-annotation"];

export default function CurriculaPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: curricula
      .filter((c) => c.page)
      .map((c, i) => ({ "@type": "ListItem", position: i + 1, name: `${c.short} tutoring`, url: `${site.url}/curricula/${c.slug}` })),
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={itemList} />
      <Breadcrumbs items={crumbs} />

      <CatalogHero
        eyebrow="Curricula and exam boards"
        title="Tutoring across every"
        accent="major curriculum"
        lead="Every curriculum has its own syllabus, papers and mark schemes. We match your child with a tutor who has taught theirs."
        checks={[`${curricula.length} curricula and exam boards`, `${subjects.length} subjects`, "First lesson free"]}
        aside={
          <nav aria-label="Curriculum groups" className="rounded-panel bg-background p-6 text-foreground shadow-lift sm:p-7">
            <p className="text-label font-semibold tracking-wide text-muted-foreground uppercase">Browse by region</p>
            <ul className="mt-4 divide-y divide-rule">
              {curriculumGroups.map((g, i) => {
                const list = bySlug(g.slugs);
                return (
                  <li key={g.slug}>
                    <a href={`#${g.slug}`} className="group flex items-center gap-3 py-3 first:pt-0">
                      <span aria-hidden className={cn("grid size-9 shrink-0 place-items-center rounded-control text-label font-bold", TINTS[i % TINTS.length])}>
                        {list[0]?.short.slice(0, 2)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold group-hover:text-navy-soft">{g.name}</span>
                        <span className="block truncate text-label text-muted-foreground">{list.map((c) => c.short).join(", ")}</span>
                      </span>
                      <span className="rounded-pill bg-surface px-2 py-0.5 text-label font-semibold tabular-nums text-muted-foreground">{list.length}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        }
      >
        <DarkActions />
      </CatalogHero>

      {curriculumGroups.map((g, gi) => {
        const list = bySlug(g.slugs);
        return (
          <Band key={g.slug} id={g.slug} tone={gi % 2 ? "surface" : undefined} className="scroll-mt-20">
            <Heading eyebrow={`${list.length} ${list.length === 1 ? "curriculum" : "curricula"}`} title={g.name} lead={g.lead} />
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((c, i) => (
                <li key={c.slug}>
                  <CurriculumTile c={c} i={i + gi} />
                </li>
              ))}
            </ul>
          </Band>
        );
      })}

      <Band tone="sky">
        <div className="flex flex-col items-start gap-5 rounded-panel bg-background p-6 shadow-card sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-container bg-gold-tint text-gold-deep">
              <HelpCircle aria-hidden className="size-6" />
            </span>
            <div>
              <h2 className="text-h3">Not sure which syllabus your child follows?</h2>
              <p className="mt-1 text-muted-foreground">Tell us the school and year group and we&apos;ll work it out with you.</p>
            </div>
          </div>
          <a
            href={whatsappLink("Hi Tutoring Galaxy, can you help me work out which syllabus my child follows?")}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-small font-semibold text-navy-soft underline underline-offset-4 hover:text-gold-deep"
          >
            Ask on WhatsApp
          </a>
        </div>
      </Band>

      <CtaBand title="Start with a free lesson" lead="Tell us the subject and exam board. We'll match a tutor within a day." />
    </>
  );
}
