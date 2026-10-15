import { TutoringMode } from "@/components/sections/tutoring-mode";
import { countries } from "@/data/content/countries";
import { pageCurricula } from "@/data/content/curricula";
import { faqsFor } from "@/data/content/faqs";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

// Only cities with home tutors (countries.ts homeCities). Client to confirm before launch.
const homePlaces = countries.flatMap((c) => c.homeCities.map((city) => ({ name: city, detail: c.name })));
const homeCountries = new Set<string>(countries.filter((c) => c.homeCities.length > 0).map((c) => c.name));
const cityList = homePlaces.map((p) => p.name).join(" and ");

// Curricula offered where home tutoring is available (regions use short names like "Pakistan").
const homeCurricula = pageCurricula().filter((c) => c.regions.some((r) => homeCountries.has(r)));

export const metadata = pageMetadata({
  title: "Home tutoring",
  description: `One-to-one home tutoring in ${cityList} for O Level, A Level, IGCSE, Matric, FSc and entry tests, with a tutor who has taught your child's syllabus. First lesson free.`,
  path: "/tutoring/home",
});

// TODO(client): confirm whether home lessons are priced differently from online lessons, and add it here and on /pricing.
// TODO(client): confirm which areas of each city tutors can travel to.
export default function HomeTutoringPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Home tutoring", path: "/tutoring/home" },
        ])}
      />
      <TutoringMode
        content={{
          title: `Home tutoring in ${cityList}`,
          lead: "A tutor who has taught your child's syllabus comes to your home for one-to-one lessons. The first lesson is free, and you only continue if it's the right tutor.",
          facts: [`Available in ${cityList}`, "Lessons at times you agree with the tutor", "No payment for the trial"],
          what: {
            title: "What home tutoring is",
            body: [
              "The tutor comes to your home and teaches your child one-to-one, at the kitchen table or wherever they usually study. Lessons follow the same plan and the same exam papers as our online lessons.",
              "Some children concentrate better with someone beside them, and some parents like to see lessons happening. Home tutoring is for those families.",
            ],
          },
          suits: {
            title: "Who it suits",
            items: [
              "Younger students who focus better with a tutor in the room",
              "Students who find screens distracting or tiring after school",
              "Subjects with a lot of written working, where a tutor can follow every line",
              "Families who'd like to meet the tutor in person",
            ],
          },
          lessons: {
            title: "How home lessons run",
            lead: "Each lesson follows the plan agreed after the free trial.",
            steps: [
              { title: "Agree a regular time", body: "You and the tutor set a weekly time. We ask that a parent or another adult is at home during lessons." },
              { title: "Learn and practise together", body: "The tutor explains the topic, then your child works through exam-style questions while the tutor checks their working." },
              { title: "Practice between lessons", body: "On plans that include it, your child practises questions with feedback online, and the tutor can see what was practised." },
              { title: "A note for parents", body: "After lessons the tutor sends a short note on what was covered and what comes next." },
            ],
          },
          where: {
            title: "Where home tutoring is available",
            lead: "We only offer home lessons where we have tutors nearby. Everywhere else, online lessons work the same way.",
            places: homePlaces,
            note: "Live somewhere else? Send us your area on WhatsApp and we'll tell you honestly whether a tutor can reach you.",
          },
          curricula: {
            title: "Curricula we teach at home",
            lead: "School and board exams taught in Pakistan, plus entry tests.",
            items: homeCurricula,
          },
          faqs: faqsFor("home").concat(faqsFor("trial")),
          other: {
            title: "Not in these cities?",
            body: "Online lessons are available in every country we serve.",
            href: "/tutoring/online",
            linkLabel: "Online tutoring",
          },
          whatsappMessage: "Hi Tutoring Galaxy, I'd like to ask about home tutoring.",
        }}
      />
    </>
  );
}
