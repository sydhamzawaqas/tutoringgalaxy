import { SUBJECTS } from "./seo";

export type CurriculumExtra = {
  tagline?: string;
  description: string;
  audience: string;
  countries: string[];
  subjects?: string[]; // subject slugs; falls back to all SUBJECTS
  faqs?: { q: string; a: string }[];
};

const DEFAULT_FAQS = [
  { q: "How does the Growing Stars assessment help with this curriculum?", a: "It maps your strengths and weaknesses against the syllabus and recommends a tutor and study plan tailored to your grade level." },
  { q: "Can I get a free trial class?", a: "Yes — every student gets one free trial with a matched tutor before committing." },
  { q: "Are sessions online or in-person?", a: "Both. We offer 1-on-1 online sessions globally and home tuition in selected cities." },
  { q: "How are tutors selected?", a: "Every tutor is interviewed, subject-tested, and rated by parents. Only the top 5% are onboarded." },
];

export const CURRICULUM_EXTRAS: Record<string, CurriculumExtra> = {
  "ged": {
    tagline: "Earn your US high-school equivalency",
    description: "The GED is a US high-school equivalency credential recognised by colleges and employers worldwide. It tests Mathematical Reasoning, Reasoning Through Language Arts, Science, and Social Studies.",
    audience: "Adult learners and students aged 16+ seeking a high-school equivalency diploma.",
    countries: ["United States", "UAE", "Pakistan", "Saudi Arabia"],
    subjects: ["mathematics", "english", "physics", "biology"],
  },
  "gcse": {
    tagline: "The UK's core secondary qualification",
    description: "GCSEs are the standard UK academic qualification taken at age 16, with grades 9–1. They are the gateway to A Levels, IB and college admission across the UK.",
    audience: "Students in Years 10–11 (ages 14–16) in the UK system.",
    countries: ["United Kingdom", "UAE", "Pakistan"],
  },
  "igcse": {
    tagline: "The world's most popular international qualification",
    description: "IGCSE is offered by Cambridge and Edexcel and is recognised by universities globally. It develops conceptual understanding across 70+ subjects.",
    audience: "Students in grades 9–11 in international schools.",
    countries: ["Pakistan", "UAE", "United Kingdom", "Saudi Arabia"],
  },
  "o-level": {
    tagline: "Cambridge O Level — globally trusted foundation",
    description: "Cambridge O Level is an internationally recognised qualification for grades 9–11, focused on rigorous academic content and exam technique.",
    audience: "Grade 9–11 students preparing for A Levels or university foundation.",
    countries: ["Pakistan", "UAE", "Bangladesh", "Sri Lanka"],
  },
  "a-level": {
    tagline: "The gold standard for university admission",
    description: "Cambridge & Edexcel A Levels are the most widely accepted pre-university qualification, with specialised study in 3–4 subjects across 2 years.",
    audience: "Grade 11–13 students applying to universities in the UK, US, UAE and beyond.",
    countries: ["Pakistan", "UAE", "United Kingdom"],
  },
  "ib": {
    tagline: "The International Baccalaureate Diploma Programme",
    description: "The IB is a holistic, research-driven curriculum recognised by top universities worldwide, combining six subject groups with TOK, EE and CAS.",
    audience: "Grade 11–12 students at IB World Schools.",
    countries: ["UAE", "United Kingdom", "Australia", "United States"],
  },
  "sat": {
    tagline: "Your gateway to US university admissions",
    description: "The SAT is a standardised test used by US colleges, covering Reading, Writing and Math. The digital SAT runs ~2 hours 14 minutes.",
    audience: "Grade 11–12 students applying to US, Canadian, and select international universities.",
    countries: ["United States", "UAE", "Saudi Arabia", "Pakistan", "Canada"],
    subjects: ["mathematics", "english"],
  },
  "act": {
    tagline: "An alternative path to US universities",
    description: "The ACT is a US college admissions test covering English, Math, Reading, Science Reasoning and an optional Writing section.",
    audience: "Grade 11–12 students applying to US universities.",
    countries: ["United States", "UAE", "Saudi Arabia", "Canada"],
    subjects: ["mathematics", "english", "physics", "biology"],
  },
  "ap": {
    tagline: "Advanced Placement — earn college credit in high school",
    description: "AP courses and exams let high-school students study college-level material and earn university credit. 38+ subjects are available.",
    audience: "Grade 10–12 students seeking to strengthen US/Canadian university applications.",
    countries: ["United States", "Canada", "UAE"],
  },
  "edexcel": {
    tagline: "Pearson Edexcel International qualifications",
    description: "Edexcel offers International GCSE and International A Level qualifications used in schools across 100+ countries.",
    audience: "Grade 9–13 students at international schools using the Edexcel pathway.",
    countries: ["Pakistan", "UAE", "United Kingdom"],
  },
  "cambridge": {
    tagline: "Cambridge Assessment International Education",
    description: "Cambridge curricula (Primary, Lower Secondary, IGCSE, O & A Level) are taught in 10,000+ schools across 160 countries.",
    audience: "All school-age students in Cambridge-accredited schools.",
    countries: ["Pakistan", "UAE", "United Kingdom", "Saudi Arabia"],
  },
  "matric": {
    tagline: "Pakistan's Matriculation board",
    description: "The Matric system (SSC) is the standard Pakistani secondary school qualification for grades 9–10, administered by provincial boards.",
    audience: "Grade 9–10 students in Pakistani board schools.",
    countries: ["Pakistan"],
    subjects: ["mathematics", "physics", "chemistry", "biology", "english", "urdu"],
  },
  "fsc": {
    tagline: "FSc Pre-Engineering & Pre-Medical",
    description: "FSc (HSSC) is Pakistan's intermediate qualification for grades 11–12, with Pre-Engineering and Pre-Medical streams that feed into ECAT and MDCAT.",
    audience: "Grade 11–12 students preparing for Pakistani university entrance exams.",
    countries: ["Pakistan"],
    subjects: ["mathematics", "physics", "chemistry", "biology", "english"],
  },
};

export function getCurriculumExtra(slug: string, name: string, blurb: string): CurriculumExtra {
  const x = CURRICULUM_EXTRAS[slug];
  return {
    tagline: x?.tagline ?? `Expert ${name} tutoring for every student`,
    description: x?.description ?? blurb,
    audience: x?.audience ?? `Students preparing for ${name} examinations.`,
    countries: x?.countries ?? ["Pakistan", "UAE", "United Kingdom"],
    subjects: x?.subjects ?? SUBJECTS.map((s) => s.slug),
    faqs: x?.faqs ?? DEFAULT_FAQS,
  };
}
