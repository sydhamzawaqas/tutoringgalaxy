/**
 * Tutoring Galaxy Academy programmes (/academy, /academy/[slug]).
 * Ported from the old site: routes/academy.index.tsx and routes/academy.$slug.tsx.
 */
import { CURRICULUM_BY_SLUG, SUBJECTS } from "@/data/legacy/seo";
import { CURRICULUM_EXTRAS } from "@/data/legacy/curriculum-content";
import type { QA } from "./exam-prep";

export type AcademySlug = "ged" | "igcse" | "a-level" | "ib";

export type Academy = {
  slug: AcademySlug;
  /** Curriculum short name, e.g. "IGCSE". */
  name: string;
  /** "IGCSE Academy". */
  title: string;
  blurb: string;
  hero: string;
  promise: string;
  modules: { title: string; body: string }[];
  library: string[];
  certification: string;
  outcomes: { stat: string; label: string }[];
  countries: string[];
  /** Legacy subject slugs (data/legacy/seo.ts SUBJECTS). */
  subjects: string[];
};

type Copy = Omit<Academy, "slug" | "name" | "title" | "countries" | "subjects">;

// CONFIRM: every `outcomes` figure below (pass rates, uplifts, grade shares) is copied from the old
// site and has no first-party evidence on file. Client to confirm or remove before launch.
const COPY: Record<AcademySlug, Copy> = {
  ged: {
    blurb: "US high-school equivalency, mentor-led across 4 subjects.",
    hero: "Earn your US high-school equivalency with a structured, mentor-led academy.",
    promise: "Master all 4 GED subjects with bite-sized modules, weekly mentor reviews and unlimited practice tests.",
    modules: [
      { title: "Mathematical Reasoning", body: "Algebra, geometry, data analysis with paced lessons and timed practice." },
      { title: "Reasoning Through Language Arts", body: "Reading comprehension, grammar mastery and extended-response writing." },
      { title: "Science", body: "Life science, physical science, earth & space — taught through real GED passages." },
      { title: "Social Studies", body: "Civics, US history, economics and geography with primary-source practice." },
    ],
    library: ["200+ GED Ready practice questions", "Full-length timed mock exams", "Subject cheat sheets & formula packs", "Recorded mentor masterclasses"],
    certification: "Receive a Tutoring Galaxy GED Academy Completion Certificate plus a personalised score-readiness report.",
    outcomes: [
      { stat: "92%", label: "first-attempt pass rate" },
      { stat: "+45", label: "avg. score uplift" },
      { stat: "8 wks", label: "typical completion" },
    ],
  },
  igcse: {
    blurb: "Cambridge & Edexcel IGCSE mastery across 14 subjects.",
    hero: "The world's most popular international qualification — taught the Tutoring Galaxy way.",
    promise: "Cambridge & Edexcel IGCSE mastery across 14 subjects, with weekly checkpoints and exam-style assessments.",
    modules: [
      { title: "Core Sciences", body: "Physics, Chemistry, Biology — concept building, lab simulations and past-paper drills." },
      { title: "Mathematics (0580 / 0606)", body: "Extended Maths and Additional Maths streams with topic mastery quizzes." },
      { title: "Languages & Humanities", body: "English First / Second Language, Literature, Business, Economics and History." },
      { title: "Exam Technique", body: "Paper-by-paper strategy, mark-scheme decoding and timed full mock series." },
    ],
    library: ["10 years of solved past papers", "Subject-wise revision notes", "Topic prediction reports", "Recorded paper walkthroughs"],
    certification: "Earn an IGCSE Academy Honors badge and predicted-grade letter for school and university applications.",
    outcomes: [
      { stat: "78%", label: "A*/A grades secured" },
      { stat: "14", label: "subjects supported" },
      { stat: "1:1", label: "mentor-led sessions" },
    ],
  },
  "a-level": {
    blurb: "The gold standard for Russell Group & Ivy admission.",
    hero: "The gold standard for university admission — accelerated with elite mentors.",
    promise: "Cambridge & Edexcel A Level mastery across Sciences, Maths, Humanities and Business — built for Russell Group, Ivy & top global universities.",
    modules: [
      { title: "AS & A2 Sciences", body: "Physics, Chemistry, Biology — full specification coverage with research-style problem sets." },
      { title: "Further Mathematics", body: "Pure, Mechanics, Statistics and Decision Maths with Olympiad-style enrichment." },
      { title: "Humanities & Business", body: "Economics, Business, Psychology, History — essay frameworks and source analysis." },
      { title: "University Pathway", body: "Personal statement coaching, BMAT/UCAT/LNAT prep and interview practice." },
    ],
    library: ["Examiner-written model essays", "10-year past-paper bank", "Topic mastery diagnostics", "Live revision intensives"],
    certification: "Receive an A Level Academy Distinction certificate and a university-readiness profile.",
    outcomes: [
      { stat: "85%", label: "A*/A outcomes" },
      { stat: "Russell Group", label: "university destinations supported" },
      { stat: "24", label: "subjects supported" },
    ],
  },
  ib: {
    blurb: "Full Diploma support — six groups plus TOK, EE and CAS.",
    hero: "The IB Diploma, deconstructed — six subjects plus TOK, EE and CAS, mentored end-to-end.",
    promise: "HL and SL coverage across all six groups, with dedicated mentors for TOK, the Extended Essay and Internal Assessments.",
    modules: [
      { title: "Group 4 — Sciences (HL/SL)", body: "Physics, Chemistry, Biology — labs, IAs and paper 3 specialisation." },
      { title: "Group 5 — Mathematics", body: "AA and AI streams (HL & SL) with full IA mentorship." },
      { title: "TOK & Extended Essay", body: "1-on-1 supervisors for TOK exhibition, essay and 4,000-word EE drafting." },
      { title: "Group 1–3 + Group 6", body: "Language A/B, Individuals & Societies, and Arts — taught by IB-trained specialists." },
    ],
    library: ["IA exemplars with examiner notes", "Past papers (post-2019 syllabus)", "TOK & EE planning templates", "Predicted grade trackers"],
    certification: "Receive an IB Academy Scholar badge plus a full predicted-grade and university-fit report.",
    outcomes: [
      { stat: "38+", label: "avg. predicted points" },
      { stat: "6 & 7", label: "majority HL outcomes" },
      { stat: "100%", label: "IA submission rate" },
    ],
  },
};

export const ACADEMY_SLUGS: AcademySlug[] = ["ged", "igcse", "a-level", "ib"];

export const academies: Academy[] = ACADEMY_SLUGS.map((slug) => {
  const c = CURRICULUM_BY_SLUG[slug];
  const x = CURRICULUM_EXTRAS[slug];
  return {
    slug,
    name: c.name,
    title: `${c.name} Academy`,
    countries: x.countries,
    subjects: x.subjects ?? SUBJECTS.map((s) => s.slug),
    ...COPY[slug],
  };
});

export const getAcademy = (slug: string) => academies.find((a) => a.slug === slug);

export const academyIndex = {
  eyebrow: "The Academy",
  title: "Tutoring Galaxy Academy",
  lead: "Structured, mentor-led online academies built around the world's top secondary qualifications. Modules, resources and a completion certificate — included.",
};

/** The three promise pillars on every academy page. The third uses the academy's certification line. */
export const academyPillars = (a: Academy) => [
  { icon: "target", title: "Mastery-based modules", body: "Progress only when you've truly mastered the topic — verified by quizzes and mentor check-ins." },
  { icon: "users", title: "Dedicated mentor", body: `A vetted ${a.name} mentor stays with you for the entire programme — no rotating tutors.` },
  { icon: "award", title: "Recognised certification", body: a.certification },
] as const;

/** "Academy Scholar" certification benefits. */
export const scholarBenefits = [
  "Verified completion certificate",
  "Mentor recommendation letter",
  "Predicted-grade report",
  "Listed on the Growing Stars leaderboard",
];

export const academyFaqs = (a: Academy): QA[] => [
  { q: `How is ${a.name} Academy different from regular tutoring?`, a: "Academy is a structured, mentor-led programme with modules, a resource library and a completion certificate. Regular tutoring is more flexible and topic-driven." },
  { q: "Can I join mid-year?", a: "Yes — every student begins with a placement assessment that customises the module sequence to your current level." },
  { q: "Is the first class free?", a: "Yes. Your first 1-on-1 mentor session is free with no commitment." },
  { q: `Do you support school exams alongside ${a.name}?`, a: "Absolutely — your mentor coordinates with your school syllabus and internal assessments." },
];
