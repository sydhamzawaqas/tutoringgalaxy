import { Container } from "@/components/ui/primitives";
import { MatchWizard } from "@/components/tutors/match-wizard";
import { TutorsHero } from "@/components/tutors/sections";
import { tutors } from "@/data/content/tutors";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Smart Tutor Match: find your tutor in 60 seconds",
  description:
    "Answer 6 quick questions and our matching engine ranks the best tutors for your subject, curriculum, budget and schedule. Free, no sign-up, first lesson free.",
  path: "/match",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Smart Tutor Match", path: "/match" },
];

const how = [
  { t: "Subject and curriculum", d: "Matched first, and weighted most." },
  { t: "Budget", d: "Every rate converted to US dollars for a fair comparison." },
  { t: "Schedule and location", d: "Weekday evenings, weekends, online or at home." },
  { t: "Ratings and experience", d: "Break ties between equally good fits." },
];

export default function MatchPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <TutorsHero
        crumbs={crumbs}
        eyebrow="Smart Match"
        title="Find your perfect tutor in 60 seconds"
        lead={`Answer 6 quick questions. We rank our ${tutors.length} tutor profiles by fit: subject, curriculum, goal, budget, schedule and location.`}
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {how.map((h) => (
            <li key={h.t} className="rounded-container border border-on-dark/15 bg-on-dark/5 p-4">
              <p className="text-small font-bold text-on-dark">{h.t}</p>
              <p className="mt-1 text-small text-on-dark-muted">{h.d}</p>
            </li>
          ))}
        </ul>
      </TutorsHero>

      <section className="py-12 lg:py-16" aria-label="Smart Match questions">
        <Container>
          <MatchWizard />
        </Container>
      </section>
    </>
  );
}
