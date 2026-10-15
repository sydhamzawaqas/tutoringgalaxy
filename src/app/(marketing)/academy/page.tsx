import Link from "next/link";
import { ArrowRight, Award, Library, Sparkles, Target, Users } from "lucide-react";
import { Heading, tint } from "@/components/home/parts";
import { Band, CtaBand, FeatureGrid, HeroActions, PageHero } from "@/components/pages/shared";
import { academies, academyIndex } from "@/data/content/academy";
import { ASSESSMENT_HREF } from "@/data/content/growing-stars";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/data/content/site";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Tutoring Galaxy Academy: GED, IGCSE, A Level and IB programmes",
  description:
    "Mentor-led online academies with structured modules, full resource libraries and completion certificates. Choose your programme: GED, IGCSE, A Level or IB.",
  path: "/academy",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Academy", path: "/academy" },
];

const listJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Tutoring Galaxy Academy programmes",
  itemListElement: academies.map((a, i) => ({ "@type": "ListItem", position: i + 1, name: a.title, url: `${site.url}/academy/${a.slug}` })),
};

const includes = [
  { icon: "target", title: "Structured modules", body: "Mastery-based modules: progress only when you've truly mastered the topic." },
  { icon: "users", title: "Dedicated mentor", body: "One vetted mentor for the entire programme — no rotating tutors." },
  { icon: "library", title: "Resource library", body: "Past papers, revision notes, mock exams and recorded masterclasses, included." },
  { icon: "award", title: "Completion certificate", body: "Graduate as an Academy Scholar with a certificate and predicted-grade report." },
];

const ICON_FOR = [Target, Users, Library, Award];

export default function AcademyIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={listJsonLd} />

      <PageHero crumbs={crumbs} eyebrow={academyIndex.eyebrow} title={academyIndex.title} lead={academyIndex.lead} chips={academies.map((a) => a.title)} chipsLabel="Programmes">
        <HeroActions
          trialLabel="Free trial class"
          message="Hi Tutoring Galaxy, I'd like to know more about the Academy programmes."
          extra={{ href: ASSESSMENT_HREF, label: "Free placement test", icon: Sparkles }}
        />
      </PageHero>

      <Band>
        <Heading eyebrow="Choose your programme" title="Four academies, one approach" center />
        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {academies.map((a, i) => {
            const Icon = ICON_FOR[i % ICON_FOR.length];
            return (
              <li key={a.slug}>
                <Link href={`/academy/${a.slug}`} className="group flex h-full flex-col rounded-panel border border-border bg-background p-7 shadow-card transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lift">
                  <div className="flex items-center gap-4">
                    <span className={cn("grid size-14 shrink-0 place-items-center rounded-container text-lead font-bold", tint(i))}>{a.name.slice(0, 2)}</span>
                    <div className="min-w-0">
                      <h3 className="text-h3">{a.title}</h3>
                      <p className="text-small text-muted-foreground">{a.blurb}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-muted-foreground">{a.hero}</p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {a.modules.map((m) => (
                      <li key={m.title} className="flex items-center gap-2 rounded-control bg-surface px-3 py-2 text-small font-medium">
                        <Icon aria-hidden className="size-4 shrink-0 text-gold-deep" />
                        <span className="min-w-0">{m.title}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1 pt-6 text-small font-semibold text-navy-soft group-hover:underline">
                    Explore {a.title} <ArrowRight aria-hidden className="size-4" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Band>

      <Band tone="dark">
        <Heading eyebrow="Included in every academy" title="Modules, resources and a certificate" dark center />
        <FeatureGrid items={includes} dark cols={2} />
      </Band>

      <CtaBand
        title="Not sure which academy fits?"
        lead="Take the free Growing Stars placement test and we'll recommend the right path."
        extra={{ href: ASSESSMENT_HREF, label: "Placement test", icon: Sparkles }}
      />
    </>
  );
}
