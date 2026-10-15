import { TutoringMode } from "@/components/sections/tutoring-mode";
import { countries } from "@/data/content/countries";
import { pageCurricula } from "@/data/content/curricula";
import { faqsFor } from "@/data/content/faqs";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Online tutoring",
  description:
    "Live one-to-one online lessons for O Level, A Level, IGCSE, IB, GCSE, Matric, FSc, MDCAT and SAT, with a tutor who has taught your child's exact syllabus. First lesson free.",
  path: "/tutoring/online",
});

// TODO(client): confirm the video platform and whiteboard tool tutors use, then name them in "How online lessons run".
export default function OnlineTutoringPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Online tutoring", path: "/tutoring/online" },
        ])}
      />
      <TutoringMode
        content={{
          title: "Online tutoring, one-to-one",
          lead: "Live lessons with a tutor who has taught your child's exact syllabus, wherever you live. You choose the times, and the first lesson is free.",
          facts: [`Available in all ${countries.length} countries we serve`, "Lessons at times that suit your time zone", "No payment for the trial"],
          what: {
            title: "What online tutoring is",
            body: [
              "Your child and their tutor meet on a live video call, one-to-one. The tutor explains, works through questions with your child and watches their working, the same way they would at a desk together.",
              "Because the tutor doesn't need to live nearby, we can match on what matters most: the exam board, the level and the topics your child finds hard.",
            ],
          },
          suits: {
            title: "Who it suits",
            items: [
              "Families abroad who want a tutor who knows Cambridge, Edexcel or IB papers",
              "Students preparing for a specific paper, like O Level Mathematics or MDCAT",
              "Busy weeks, where travel time would make lessons hard to fit in",
              "Older students who are comfortable learning on a laptop or tablet",
            ],
          },
          lessons: {
            title: "How online lessons run",
            lead: "Each lesson follows the plan agreed after the free trial.",
            steps: [
              { title: "Join the lesson", body: "Your child joins from a laptop or tablet with a camera and a quiet place to work.", mark: "on time" },
              { title: "Learn and practise together", body: "The tutor explains the topic, then your child works through exam-style questions while the tutor checks their working." },
              { title: "Practice between lessons", body: "On plans that include it, your child practises questions with feedback, and the tutor can see what was practised." },
              { title: "A note for parents", body: "After lessons the tutor sends a short note on what was covered and what comes next." },
            ],
          },
          where: {
            title: "Where online lessons are available",
            lead: "Online lessons are available in every country we serve. Tell us your time zone and we'll find times that work.",
            places: countries.map((c) => ({ name: c.name })),
          },
          curricula: {
            title: "Curricula we teach online",
            lead: "Cambridge, Edexcel, IB, Pakistani boards and US admissions tests.",
            items: pageCurricula(),
          },
          faqs: faqsFor("online").concat(faqsFor("ai")),
          other: {
            title: "Prefer a tutor at home?",
            body: "Home lessons are available in some cities in Pakistan.",
            href: "/tutoring/home",
            linkLabel: "Home tutoring",
          },
          whatsappMessage: "Hi Tutoring Galaxy, I'd like to ask about online tutoring.",
        }}
      />
    </>
  );
}
