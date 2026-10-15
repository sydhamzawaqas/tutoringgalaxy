import { SUBJECT_BY_SLUG, type Subject } from "./seo";

export type SubjectExtra = {
  tagline: string;
  overview: string;
  skills: string[];
  whyMatters: string[];
  benefits: { title: string; body: string }[];
  sampleReport: { label: string; value: string; note: string }[];
  faqs: { q: string; a: string }[];
};

// Short-slug aliases supported by /subject/:slug
export const SUBJECT_SLUG_ALIASES: Record<string, string> = {
  math: "mathematics", maths: "mathematics", mathematics: "mathematics",
  physics: "physics",
  chemistry: "chemistry", chem: "chemistry",
  biology: "biology", bio: "biology",
  english: "english", eng: "english",
  "computer-science": "computer-science", cs: "computer-science", "computer-studies": "computer-science",
  economics: "economics", econ: "economics",
  accounting: "accounting", acc: "accounting",
  "business-studies": "business-studies", business: "business-studies",
};

const DEFAULT_BENEFITS = [
  { title: "Diagnostic accuracy", body: "Pinpoints concept-level gaps, not just topic-level scores." },
  { title: "Personalised plan", body: "An 8-week roadmap aligned to your weakest sub-skills." },
  { title: "Curriculum-aware", body: "Calibrated to O/A Level, IGCSE, IB, SAT/AP and national boards." },
  { title: "Tutor matching", body: "Recommends tutors whose strengths cover your gaps." },
];

const DEFAULT_REPORT = [
  { label: "Growing Stars Score", value: "740 / 1000", note: "Gold tier — top 18% of peers" },
  { label: "Strongest area", value: "Application", note: "Outperforms 82% of cohort" },
  { label: "Focus area", value: "Conceptual depth", note: "Recommended 6 weeks of targeted work" },
];

const CONTENT: Record<string, Partial<SubjectExtra>> = {
  mathematics: {
    tagline: "Build fluency, reasoning and exam confidence",
    overview: "Our Mathematics assessment maps your fluency, problem-solving and reasoning across number, algebra, geometry, statistics and calculus — then designs a plan to close the highest-impact gaps first.",
    skills: ["Number & algebraic fluency", "Geometric reasoning", "Functions & calculus", "Statistics & probability", "Worded problem-solving", "Exam technique & pacing"],
    whyMatters: ["Foundation for STEM, finance, computer science and medicine", "Highest weighting in most entrance exams (SAT, MDCAT, ECAT)", "Strong predictor of university admission outcomes"],
  },
  physics: {
    tagline: "Master concepts, equations and applied problem-solving",
    overview: "Physics rewards conceptual clarity. Our assessment separates equation-recall from genuine understanding across mechanics, electricity, waves and modern physics.",
    skills: ["Mechanics & dynamics", "Electricity & magnetism", "Waves & optics", "Thermodynamics", "Modern & quantum physics", "Practical & data analysis"],
    whyMatters: ["Core to engineering and medical admissions", "Develops modelling skills used across STEM careers", "Heavily weighted in A Level, IB HL and AP Physics"],
  },
  chemistry: {
    tagline: "Connect theory, mechanisms and lab practice",
    overview: "We assess how well you link macroscopic observations to particle-level explanations across physical, inorganic and organic chemistry.",
    skills: ["Atomic structure & bonding", "Stoichiometry & equilibria", "Organic mechanisms", "Energetics & kinetics", "Practical & analytical skills"],
    whyMatters: ["Required for medicine, pharmacy and biochemistry", "Heavy weighting in MDCAT and pre-med pathways", "Builds rigorous scientific reasoning"],
  },
  biology: {
    tagline: "From cells to systems — assessed with precision",
    overview: "Biology assessments often reward memorisation. Ours measures application, data-handling and the synoptic links examiners actually credit.",
    skills: ["Cell biology & biochemistry", "Genetics & evolution", "Human physiology", "Ecology & environment", "Data interpretation", "Extended-response writing"],
    whyMatters: ["Gateway to medicine, dentistry and life sciences", "Largest mark-share in MDCAT", "Strong base for biotech and research careers"],
  },
  english: {
    tagline: "Sharpen comprehension, analysis and writing",
    overview: "We assess reading inference, language analysis, structured argument and writing accuracy — the four skills every English board rewards.",
    skills: ["Reading & inference", "Language & literary analysis", "Structured argument", "Grammar & accuracy", "Creative writing", "Exam timing"],
    whyMatters: ["Required for almost every university programme", "Determines IELTS / TOEFL readiness", "Underpins performance across all written subjects"],
  },
  "computer-science": {
    tagline: "Think computationally, code confidently",
    overview: "From algorithmic thinking to programming fluency, we assess the skills universities and employers actually test.",
    skills: ["Algorithms & data structures", "Programming (Python / Java / C++)", "Computational thinking", "Databases & SQL", "Computer systems", "Theory of computation"],
    whyMatters: ["Highest-growth career field globally", "Core to engineering, AI and product roles", "Increasingly required at school and university level"],
  },
  economics: {
    tagline: "From models to real-world reasoning",
    overview: "Economics is more than diagrams. We assess application to real markets, data interpretation and evaluative essay structure.",
    skills: ["Microeconomic analysis", "Macroeconomic reasoning", "Data response", "Diagram precision", "Evaluative essays", "Current affairs application"],
    whyMatters: ["Top choice for business, finance and policy careers", "High-scoring subject at A Level and IB", "Builds analytical writing valued by top universities"],
  },
  accounting: {
    tagline: "Accuracy, structure and financial reasoning",
    overview: "We assess bookkeeping accuracy, statement preparation and the financial analysis skills examiners increasingly emphasise.",
    skills: ["Double-entry & ledgers", "Final accounts preparation", "Ratio analysis", "Cost & management accounting", "Errors & adjustments", "Exam structure"],
    whyMatters: ["Direct pathway to ACCA, CA and CFA tracks", "High-employability subject at A Level", "Foundation for finance, audit and consulting"],
  },
  "business-studies": {
    tagline: "Think like a founder, write like a strategist",
    overview: "Business Studies rewards structured analysis. We assess case-study reasoning, quantitative analysis and evaluative writing.",
    skills: ["Marketing & strategy", "Operations & HR", "Finance & accounting basics", "Case-study analysis", "Quantitative reasoning", "Evaluative writing"],
    whyMatters: ["Pathway to business school and entrepreneurship", "Develops applied analytical skills", "High-engagement subject with strong real-world links"],
  },
};

const DEFAULT_FAQS = (name: string) => [
  { q: `How is the ${name} assessment structured?`, a: `It's a 15–20 minute adaptive assessment covering the core sub-skills of ${name}, calibrated to your grade level and curriculum.` },
  { q: `Will the AI report show my weak topics?`, a: `Yes — your report breaks ${name} performance into sub-skills, flags the three highest-impact gaps and proposes an 8-week plan.` },
  { q: `Can I retake the ${name} assessment?`, a: `Yes. We recommend retaking every 6–8 weeks to track measurable progress.` },
  { q: `Do you offer ${name} tutors after the assessment?`, a: `Yes. Based on your weakest sub-skills we match you with tutors whose strengths cover those gaps.` },
];

/** Subjects with hand-written depth content (not template fallbacks). */
export const SUBJECT_CONTENT_SLUGS: string[] = Object.keys(CONTENT);

export function getSubjectExtra(subject: Subject): SubjectExtra {
  const c = CONTENT[subject.slug] ?? {};
  return {
    tagline: c.tagline ?? `Master ${subject.name} with a precise, AI-driven assessment`,
    overview: c.overview ?? `Our ${subject.name} assessment maps your strengths and gaps across the curriculum, then builds a personalised plan.`,
    skills: c.skills ?? ["Core concepts", "Application", "Problem-solving", "Exam technique"],
    whyMatters: c.whyMatters ?? [`${subject.name} is highly weighted across major curricula`, "Strong predictor of university admission outcomes"],
    benefits: c.benefits ?? DEFAULT_BENEFITS,
    sampleReport: c.sampleReport ?? DEFAULT_REPORT,
    faqs: c.faqs ?? DEFAULT_FAQS(subject.name),
  };
}

export function resolveSubjectSlug(slug: string): Subject | undefined {
  const canonical = SUBJECT_SLUG_ALIASES[slug] ?? slug;
  return SUBJECT_BY_SLUG[canonical];
}
