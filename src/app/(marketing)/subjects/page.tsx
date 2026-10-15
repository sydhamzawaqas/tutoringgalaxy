import Link from "next/link";
import { ArrowRight, BookOpen, Globe2, GraduationCap, MessageCircleQuestion } from "lucide-react";
import { Heading } from "@/components/home/parts";
import { Breadcrumbs } from "@/components/sections/directory";
import { Band, CatalogHero, CtaBand, DarkActions } from "@/components/catalog/hero";
import { SubjectCard, TintIcon } from "@/components/catalog/cards";
import { SubjectIcon } from "@/components/catalog/subject-icon";
import { subjectGroups, subjects, subjectsInGroup } from "@/data/content/subjects";
import { curricula } from "@/data/content/curricula";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site, whatsappLink } from "@/data/content/site";

export const metadata = pageMetadata({
  title: "Subjects we teach",
  description:
    "One-to-one tutoring in Mathematics, Physics, Chemistry, Biology, English, Economics, Accounting, Computer Science, languages and humanities, for every major curriculum. First lesson free.",
  path: "/subjects",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Subjects", path: "/subjects" },
];

/** "IGCSE, O Level, A Level +4" for a subject card. */
function curriculaNote(slug: string) {
  const list = curricula.filter((c) => c.subjects.includes(slug)).map((c) => c.short);
  if (!list.length) return undefined;
  return list.length > 4 ? `${list.slice(0, 4).join(", ")} +${list.length - 4} more` : list.join(", ");
}

export default function SubjectsPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: subjects
      .filter((s) => s.page)
      .map((s, i) => ({ "@type": "ListItem", position: i + 1, name: `${s.name} tutoring`, url: `${site.url}/subjects/${s.slug}` })),
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={itemList} />
      <Breadcrumbs items={crumbs} />

      <CatalogHero
        eyebrow="Subjects"
        title="Tutoring across every"
        accent="core subject"
        lead="Subject specialists for school exams and entry tests. Each tutor teaches to your child's exact syllabus, from algebra to essay writing."
        checks={[`${subjects.length} subjects`, `${curricula.length} curricula and exam boards`, "First lesson free"]}
        aside={
          <nav aria-label="Subject groups" className="rounded-panel bg-background p-6 text-foreground shadow-lift sm:p-7">
            <p className="text-label font-semibold tracking-wide text-muted-foreground uppercase">Browse by group</p>
            <ul className="mt-4 divide-y divide-rule">
              {subjectGroups.map((g, i) => {
                const list = subjectsInGroup(g.slug);
                return (
                  <li key={g.slug}>
                    <a href={`#${g.slug}`} className="group flex items-center gap-3 py-3 first:pt-0">
                      <SubjectIcon icon={list[0]?.icon ?? "book"} i={i} size="sm" />
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold group-hover:text-navy-soft">{g.name}</span>
                        <span className="block truncate text-label text-muted-foreground">{list.map((s) => s.name).join(", ")}</span>
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

      {subjectGroups.map((g, gi) => {
        const list = subjectsInGroup(g.slug);
        return (
          <Band key={g.slug} id={g.slug} tone={gi % 2 ? "surface" : undefined} className="scroll-mt-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <Heading eyebrow={`${list.length} subjects`} title={g.name} lead={g.lead} />
            </div>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {list.map((s, i) => (
                <li key={s.slug}>
                  <SubjectCard s={s} i={i + gi} note={curriculaNote(s.slug)} />
                </li>
              ))}
            </ul>
          </Band>
        );
      })}

      <Band tone="sky">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: GraduationCap, t: "Matched to the syllabus", d: "Tell us the exam board and syllabus code. We match a tutor who has taught it.", href: "/curricula", cta: "See curricula" },
            { icon: Globe2, t: "Online or at home", d: "Online lessons worldwide; home tutoring in Islamabad and Rawalpindi.", href: "/tutoring/online", cta: "How online lessons work" },
            { icon: BookOpen, t: "Study guides", d: "Exam tips, revision plans and curriculum guides from our tutors.", href: "/blog", cta: "Read the blog" },
          ].map((f, i) => (
            <Link key={f.t} href={f.href} className="group flex flex-col rounded-panel bg-background p-6 shadow-card transition-shadow hover:shadow-lift">
              <TintIcon i={i} size="md">
                <f.icon aria-hidden />
              </TintIcon>
              <h2 className="mt-4 text-lead font-bold">{f.t}</h2>
              <p className="mt-1 flex-1 text-small text-muted-foreground">{f.d}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-label font-semibold text-navy-soft group-hover:text-gold-deep">
                {f.cta} <ArrowRight aria-hidden className="size-3.5" />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-start gap-4 rounded-panel border border-dashed border-navy/20 bg-background/60 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-3">
            <MessageCircleQuestion aria-hidden className="mt-0.5 size-5 shrink-0 text-gold-deep" />
            <span>
              <strong>Need a subject that isn&apos;t listed?</strong> <span className="text-muted-foreground">Ask us and we&apos;ll check whether we have a tutor.</span>
            </span>
          </p>
          <a
            href={whatsappLink("Hi Tutoring Galaxy, do you have a tutor for a subject that isn't listed on your site?")}
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
