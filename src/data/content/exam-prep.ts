/**
 * Exam preparation programmes (/exam-prep, /exam-prep/[exam]).
 * Ported from the old site: routes/prep.index.tsx and routes/prep.$slug.tsx, with the per-exam
 * copy from data/curriculum-content.ts (CURRICULUM_EXTRAS) and data/seo.ts (CURRICULA blurbs).
 */
import { CURRICULUM_BY_SLUG, SUBJECTS } from "@/data/legacy/seo";
import { CURRICULUM_EXTRAS } from "@/data/legacy/curriculum-content";
import { TESTIMONIALS } from "@/data/legacy/testimonials";

export type ExamSlug = "igcse" | "gcse" | "o-level" | "a-level" | "ged" | "ib" | "sat" | "act";

export type ExamPrep = {
  slug: ExamSlug;
  name: string;
  blurb: string;
  tagline: string;
  description: string;
  audience: string;
  countries: string[];
  /** Legacy subject slugs (data/legacy/seo.ts SUBJECTS). */
  subjects: string[];
};

export type QA = { q: string; a: string };

/** Display order, same as the old /prep index. */
export const EXAM_SLUGS: ExamSlug[] = ["igcse", "gcse", "o-level", "a-level", "ged", "ib", "sat", "act"];

function build(slug: ExamSlug): ExamPrep {
  const c = CURRICULUM_BY_SLUG[slug];
  const x = CURRICULUM_EXTRAS[slug];
  return {
    slug,
    name: c.name,
    blurb: c.blurb,
    tagline: x.tagline ?? x.description,
    description: x.description,
    audience: x.audience,
    countries: x.countries,
    subjects: x.subjects ?? SUBJECTS.map((s) => s.slug),
  };
}

export const examPreps: ExamPrep[] = EXAM_SLUGS.map(build);
export const getExamPrep = (slug: string) => examPreps.find((e) => e.slug === slug);

/** The 12-week plan shown on every exam page (old STUDY_PLAN). */
export const studyPlan = [
  { week: "Weeks 1–2", title: "Diagnostic & foundations", body: "Take the Growing Stars assessment to map current strengths. Review syllabus and set target grades." },
  { week: "Weeks 3–6", title: "Topic mastery sprint", body: "Two 1-on-1 sessions per subject per week. Concept building with worked examples and weekly mini-quizzes." },
  { week: "Weeks 7–10", title: "Past papers & technique", body: "Timed past-paper practice, marker-style feedback, and targeted reteach of weak topics." },
  { week: "Weeks 11–12", title: "Mocks & final polish", body: "Full mock exams under exam conditions, with detailed AI report and revision schedule." },
] as const;

/** Overview cards. "Who it's for" comes from each exam's audience line. */
export const prepFormat =
  "1-on-1 online & home tutoring, weekly homework, monthly mock exams, AI progress report after every session.";
// CONFIRM: outcome wording from the old site; no number attached, keep it qualitative.
export const prepOutcomes = "Our tutoring is structured around measurable grade-band improvement within a single term.";

export type SuccessStory = { name: string; place: string; result: string; text: string };

// CONFIRM: these three stories were shown on every old /prep page regardless of exam. Client to
// confirm they are real students (first name + initial only) before launch.
const GENERIC_STORIES: SuccessStory[] = [
  { name: "Hira A.", place: "Islamabad", result: "From C to A* in Mathematics", text: "The weekly AI report showed exactly where I was losing marks. By the mocks I was confidently solving past papers." },
  { name: "Daniel K.", place: "Dubai", result: "7 in IB HL Physics", text: "My tutor broke down every topic with worked examples. The mock exam practice made the real paper feel routine." },
  { name: "Ayaan M.", place: "Lahore", result: "1480 SAT on first attempt", text: "Adaptive practice tests and pacing drills made the difference. The trial class convinced us instantly." },
];

/**
 * Stories for one exam: testimonials tagged with that curriculum first (data/legacy/testimonials.ts),
 * then the old generic prep stories, three in total.
 */
export function storiesFor(slug: ExamSlug): (SuccessStory & { before?: string; after?: string })[] {
  const tagged = TESTIMONIALS.filter((t) => t.curriculumSlug === slug).map((t) => ({
    name: t.name,
    place: t.location,
    result: t.subject ?? "",
    text: t.quote,
    before: t.before,
    after: t.after,
  }));
  return [...tagged, ...GENERIC_STORIES].slice(0, 3);
}

/** FAQ per exam: the old prep page questions plus the old curriculum defaults that apply. */
export function prepFaqs(e: ExamPrep): QA[] {
  return [
    { q: `How long does ${e.name} preparation take?`, a: "A typical structured plan runs 10–12 weeks of regular 1-on-1 tutoring, but we tailor the schedule to your exam date." },
    { q: `Is the first ${e.name} trial lesson really free?`, a: `Yes. Your first 1-on-1 lesson with a matched ${e.name} tutor is completely free with no commitment.` },
    { q: "Do you cover past papers and mark schemes?", a: "Yes — every plan includes timed past-paper practice with examiner-style feedback." },
    { q: "How does the Growing Stars assessment help with this curriculum?", a: "It maps your strengths and weaknesses against the syllabus and recommends a tutor and study plan tailored to your grade level." },
    { q: "Are sessions online or in-person?", a: "Both. We offer 1-on-1 online sessions globally and home tuition in selected cities." },
  ];
}

export const examPrepIndex = {
  eyebrow: "Exam preparation",
  title: "Curriculum & exam preparation programs",
  lead: "Pick your exam to see a structured 12-week study plan, subject coverage, success stories and a free trial lesson.",
};
