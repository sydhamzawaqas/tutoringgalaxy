/**
 * Subjects we tutor. The list merges the old site's 21 SUBJECTS (data/legacy/seo.ts) with the three
 * Pakistan-specific subjects the new site already had (Additional Mathematics, Islamiyat, Pakistan Studies).
 *
 * `subjects` stays small because client components (the booking form) import it. The long-form
 * page copy lives in `subjectDetails`, which only the server-rendered subject pages read.
 *
 * Depth copy (tagline, overview, skills, why it matters) comes from data/legacy/subject-content.ts.
 * The old text described the AI assessment; it is reworded here to describe tutoring.
 */

export type SubjectGroup = "maths" | "sciences" | "languages" | "business" | "humanities";

/** Icon keys, mapped to lucide icons in components/catalog/subject-icon.tsx. */
export type SubjectIconKey =
  | "calculator"
  | "plus-minus"
  | "sigma"
  | "chart"
  | "atom"
  | "flask"
  | "dna"
  | "leaf"
  | "book"
  | "pen"
  | "languages"
  | "trend"
  | "receipt"
  | "building"
  | "laptop"
  | "monitor"
  | "brain"
  | "users"
  | "landmark"
  | "globe"
  | "book-marked"
  | "map";

export type Subject = {
  slug: string;
  name: string;
  summary: string;
  topics: string[];
  /** Has its own /subjects/[slug] page. */
  page: boolean;
  group: SubjectGroup;
  icon: SubjectIconKey;
  /** One-line blurb from the old site. */
  blurb: string;
};

export const subjectGroups: { slug: SubjectGroup; name: string; lead: string }[] = [
  { slug: "maths", name: "Mathematics", lead: "From core maths to Further Mathematics and Statistics." },
  { slug: "sciences", name: "Sciences", lead: "Physics, Chemistry, Biology and Environmental Science, theory and practicals." },
  { slug: "languages", name: "Languages", lead: "English, Urdu, Arabic, French and Spanish: reading, writing and speaking." },
  { slug: "business", name: "Business and computing", lead: "Economics, Accounting, Business Studies, Computer Science and ICT." },
  { slug: "humanities", name: "Humanities and social sciences", lead: "Psychology, Sociology, History, Geography, Islamiyat and Pakistan Studies." },
];

export const subjects: Subject[] = [
  { slug: "mathematics", name: "Mathematics", group: "maths", icon: "calculator", blurb: "Algebra, calculus, geometry and beyond.", summary: "From algebra and geometry to calculus and statistics, taught with worked examples and exam-style practice.", topics: ["Number and algebra", "Functions and graphs", "Geometry and trigonometry", "Calculus", "Statistics and probability", "Vectors"], page: true },
  { slug: "additional-mathematics", name: "Additional Mathematics", group: "maths", icon: "plus-minus", blurb: "The bridge from O Level maths to A Level.", summary: "The step between O Level or IGCSE maths and A Level, covering calculus, logarithms and more.", topics: ["Quadratics and inequalities", "Logarithms and exponentials", "Differentiation", "Integration", "Trigonometric identities"], page: true },
  { slug: "further-mathematics", name: "Further Mathematics", group: "maths", icon: "sigma", blurb: "Advanced pure and applied mathematics.", summary: "Advanced pure and applied maths for strong A Level students.", topics: ["Complex numbers", "Matrices", "Further calculus", "Differential equations", "Mechanics and statistics"], page: true },
  { slug: "statistics", name: "Statistics", group: "maths", icon: "chart", blurb: "Probability, inference and data analysis.", summary: "Probability, distributions and hypothesis testing, for A Level and AP Statistics and the statistics papers inside maths courses.", topics: ["Data presentation and summary", "Probability", "Discrete and continuous distributions", "Sampling and estimation", "Hypothesis testing", "Correlation and regression"], page: true },
  { slug: "physics", name: "Physics", group: "sciences", icon: "atom", blurb: "Mechanics, electricity, modern physics.", summary: "Concepts first, then numerical problem-solving and practical-paper skills.", topics: ["Mechanics", "Waves and optics", "Electricity", "Thermal physics", "Nuclear and modern physics"], page: true },
  { slug: "chemistry", name: "Chemistry", group: "sciences", icon: "flask", blurb: "Organic, inorganic and physical chemistry.", summary: "Physical, inorganic and organic chemistry with clear explanations and exam technique.", topics: ["Atomic structure and bonding", "Stoichiometry", "Energetics and kinetics", "Organic chemistry", "Practical skills"], page: true },
  { slug: "biology", name: "Biology", group: "sciences", icon: "dna", blurb: "Cells, genetics, ecology and human biology.", summary: "Cells to ecosystems, with a focus on precise answers the way mark schemes expect.", topics: ["Cells and transport", "Biological molecules", "Genetics", "Human physiology", "Ecology"], page: true },
  { slug: "environmental-science", name: "Environmental Science", group: "sciences", icon: "leaf", blurb: "Ecosystems, climate and sustainability.", summary: "Ecosystems, resources, pollution and sustainability, for IGCSE Environmental Management, IB ESS and AP Environmental Science.", topics: ["Ecosystems and biodiversity", "Energy and resources", "Water and soil", "Pollution", "Climate change", "Sustainable development"], page: true },
  { slug: "english", name: "English", group: "languages", icon: "book", blurb: "Language, literature and academic writing.", summary: "Reading, writing and literature, from essay structure to timed comprehension.", topics: ["Reading comprehension", "Directed and composition writing", "Literature essays", "Grammar and vocabulary"], page: true },
  { slug: "urdu", name: "Urdu", group: "languages", icon: "pen", blurb: "Grammar, literature and composition.", summary: "Grammar, comprehension and composition for O Level and Matric.", topics: ["Grammar", "Comprehension", "Essay and letter writing"], page: true },
  { slug: "arabic", name: "Arabic", group: "languages", icon: "languages", blurb: "Arabic language, grammar and literature.", summary: "Arabic as a first or foreign language: grammar, reading, writing and speaking for school exams.", topics: ["Grammar and morphology", "Reading comprehension", "Writing", "Speaking and listening", "Vocabulary building"], page: true },
  { slug: "french", name: "French", group: "languages", icon: "languages", blurb: "French language and literature.", summary: "French for IGCSE, GCSE, A Level and IB, with speaking practice and exam-style writing.", topics: ["Grammar and tenses", "Listening", "Reading", "Writing", "Speaking and oral exams"], page: true },
  { slug: "spanish", name: "Spanish", group: "languages", icon: "languages", blurb: "Spanish language and culture.", summary: "Spanish for IGCSE, GCSE, A Level, IB and AP, building grammar, vocabulary and confidence in speaking.", topics: ["Grammar and tenses", "Listening", "Reading", "Writing", "Speaking and oral exams"], page: true },
  { slug: "economics", name: "Economics", group: "business", icon: "trend", blurb: "Micro, macro and applied economics.", summary: "Micro and macro theory, diagrams and evaluation for higher marks.", topics: ["Markets and prices", "Market failure", "Macroeconomic policy", "International trade"], page: true },
  { slug: "accounting", name: "Accounting", group: "business", icon: "receipt", blurb: "Financial and managerial accounting.", summary: "Double-entry, financial statements and analysis, practised step by step.", topics: ["Double entry", "Financial statements", "Ratio analysis", "Cost accounting"], page: true },
  { slug: "business-studies", name: "Business Studies", group: "business", icon: "building", blurb: "Management, marketing, finance and enterprise.", summary: "Management, marketing, finance and operations, applied to case studies.", topics: ["Business structure", "Marketing", "Finance", "Operations"], page: true },
  { slug: "computer-science", name: "Computer Science", group: "business", icon: "laptop", blurb: "Programming, algorithms and theory.", summary: "Theory and programming, including pseudocode and problem-solving papers.", topics: ["Data representation", "Algorithms and pseudocode", "Programming", "Networks and security"], page: true },
  { slug: "ict", name: "ICT", group: "business", icon: "monitor", blurb: "Information and communications technology.", summary: "Practical and theory components of IGCSE ICT.", topics: ["Spreadsheets and databases", "Document production", "Theory of ICT systems"], page: true },
  { slug: "psychology", name: "Psychology", group: "humanities", icon: "brain", blurb: "Cognition, behaviour and research methods.", summary: "Approaches, research methods and essay-writing for A Level and IB.", topics: ["Approaches", "Research methods", "Cognitive and social psychology"], page: true },
  { slug: "sociology", name: "Sociology", group: "humanities", icon: "users", blurb: "Society, culture and social theory.", summary: "Families, education, crime and research methods, with the evaluation skills essay questions need.", topics: ["Theory and methods", "Family and households", "Education", "Crime and deviance", "Social inequality"], page: true },
  { slug: "history", name: "History", group: "humanities", icon: "landmark", blurb: "World, modern and regional history.", summary: "Source analysis and structured essays for modern world and regional history papers.", topics: ["Source analysis", "International relations", "Modern world history", "Regional depth studies", "Essay planning"], page: true },
  { slug: "geography", name: "Geography", group: "humanities", icon: "globe", blurb: "Human, physical and environmental geography.", summary: "Physical and human geography, case studies and the map and data skills papers test.", topics: ["Rivers, coasts and landforms", "Weather and climate", "Population and settlement", "Economic development", "Map and fieldwork skills"], page: true },
  { slug: "islamiyat", name: "Islamiyat", group: "humanities", icon: "book-marked", blurb: "O Level Islamiyat, answered with structure.", summary: "O Level Islamiyat with structured, well-referenced answers.", topics: ["Quran passages", "Life of the Prophet (PBUH)", "Hadith and history"], page: true },
  { slug: "pakistan-studies", name: "Pakistan Studies", group: "humanities", icon: "map", blurb: "History and geography of Pakistan.", summary: "History and geography of Pakistan for O Level.", topics: ["History and culture", "Environment of Pakistan"], page: true },
];

export const pageSubjects = () => subjects.filter((s) => s.page);
export const getSubject = (slug: string) => subjects.find((s) => s.slug === slug);
export const subjectsInGroup = (group: SubjectGroup) => subjects.filter((s) => s.group === group);

/* ------------------------------------------------------------------------------------------------ */
/* Long-form page copy (server pages only)                                                          */
/* ------------------------------------------------------------------------------------------------ */

export type SubjectDetail = {
  tagline: string;
  overview: string;
  skills: string[];
  whyMatters?: string[];
};

/** Hand-written depth content from the old site (legacy subject-content.ts), reworded for tutoring. */
const DETAILS: Record<string, SubjectDetail> = {
  mathematics: {
    tagline: "Build fluency, reasoning and exam confidence",
    overview:
      "Our Mathematics tutors map your child's fluency, problem-solving and reasoning across number, algebra, geometry, statistics and calculus, then plan lessons to close the highest-impact gaps first.",
    skills: ["Number and algebraic fluency", "Geometric reasoning", "Functions and calculus", "Statistics and probability", "Worded problem-solving", "Exam technique and pacing"],
    // CONFIRM: "highest weighting" is the old site's claim.
    whyMatters: ["Foundation for STEM, finance, computer science and medicine", "Highest weighting in most entrance exams (SAT, MDCAT, ECAT)", "Strong predictor of university admission outcomes"],
  },
  physics: {
    tagline: "Master concepts, equations and applied problem-solving",
    overview:
      "Physics rewards conceptual clarity. Our tutors separate equation-recall from genuine understanding across mechanics, electricity, waves and modern physics, and teach to the gaps.",
    skills: ["Mechanics and dynamics", "Electricity and magnetism", "Waves and optics", "Thermodynamics", "Modern and quantum physics", "Practical and data analysis"],
    whyMatters: ["Core to engineering and medical admissions", "Develops modelling skills used across STEM careers", "Heavily weighted in A Level, IB HL and AP Physics"],
  },
  chemistry: {
    tagline: "Connect theory, mechanisms and lab practice",
    overview:
      "We check how well your child links macroscopic observations to particle-level explanations across physical, inorganic and organic chemistry, then build the missing links lesson by lesson.",
    skills: ["Atomic structure and bonding", "Stoichiometry and equilibria", "Organic mechanisms", "Energetics and kinetics", "Practical and analytical skills"],
    whyMatters: ["Required for medicine, pharmacy and biochemistry", "Heavy weighting in MDCAT and pre-med pathways", "Builds rigorous scientific reasoning"],
  },
  biology: {
    tagline: "From cells to systems, taught with precision",
    overview:
      "Biology is often taught as memorisation. Our tutors build application, data-handling and the synoptic links examiners actually credit.",
    skills: ["Cell biology and biochemistry", "Genetics and evolution", "Human physiology", "Ecology and environment", "Data interpretation", "Extended-response writing"],
    whyMatters: ["Gateway to medicine, dentistry and life sciences", "Largest mark-share in MDCAT", "Strong base for biotech and research careers"],
  },
  english: {
    tagline: "Sharpen comprehension, analysis and writing",
    overview:
      "We work on reading inference, language analysis, structured argument and writing accuracy: the four skills every English board rewards.",
    skills: ["Reading and inference", "Language and literary analysis", "Structured argument", "Grammar and accuracy", "Creative writing", "Exam timing"],
    whyMatters: ["Required for almost every university programme", "Determines IELTS / TOEFL readiness", "Underpins performance across all written subjects"],
  },
  "computer-science": {
    tagline: "Think computationally, code confidently",
    overview: "From algorithmic thinking to programming fluency, our tutors teach the skills exam boards, universities and employers actually test.",
    skills: ["Algorithms and data structures", "Programming (Python / Java / C++)", "Computational thinking", "Databases and SQL", "Computer systems", "Theory of computation"],
    // CONFIRM: "highest-growth career field globally" is the old site's claim.
    whyMatters: ["Highest-growth career field globally", "Core to engineering, AI and product roles", "Increasingly required at school and university level"],
  },
  economics: {
    tagline: "From models to real-world reasoning",
    overview: "Economics is more than diagrams. We teach application to real markets, data interpretation and evaluative essay structure.",
    skills: ["Microeconomic analysis", "Macroeconomic reasoning", "Data response", "Diagram precision", "Evaluative essays", "Current affairs application"],
    whyMatters: ["Top choice for business, finance and policy careers", "High-scoring subject at A Level and IB", "Builds analytical writing valued by top universities"],
  },
  accounting: {
    tagline: "Accuracy, structure and financial reasoning",
    overview: "We build bookkeeping accuracy, statement preparation and the financial analysis skills examiners increasingly emphasise.",
    skills: ["Double-entry and ledgers", "Final accounts preparation", "Ratio analysis", "Cost and management accounting", "Errors and adjustments", "Exam structure"],
    whyMatters: ["Direct pathway to ACCA, CA and CFA tracks", "High-employability subject at A Level", "Foundation for finance, audit and consulting"],
  },
  "business-studies": {
    tagline: "Think like a founder, write like a strategist",
    overview: "Business Studies rewards structured analysis. We teach case-study reasoning, quantitative analysis and evaluative writing.",
    skills: ["Marketing and strategy", "Operations and HR", "Finance and accounting basics", "Case-study analysis", "Quantitative reasoning", "Evaluative writing"],
    whyMatters: ["Pathway to business school and entrepreneurship", "Develops applied analytical skills", "High-engagement subject with strong real-world links"],
  },
};

/** Page copy for a subject: hand-written where the old site had it, otherwise built from the subject itself. */
export function getSubjectDetail(s: Subject): SubjectDetail {
  return (
    DETAILS[s.slug] ?? {
      tagline: s.blurb.replace(/\.$/, ""),
      overview: `${s.summary} Your tutor starts by finding the topics your child finds hardest, then teaches to the exact syllabus and papers they will sit.`,
      skills: s.topics,
    }
  );
}

/** Why families choose a tutor for any subject (legacy DEFAULT_BENEFITS, reworded for tutoring). */
export const subjectBenefits = [
  { title: "Diagnostic first", body: "Pinpoints concept-level gaps, not just topic-level scores." },
  { title: "Personalised plan", body: "A lesson plan aligned to your child's weakest sub-skills." },
  { title: "Curriculum-aware", body: "Calibrated to O/A Level, IGCSE, IB, SAT/AP and national boards." },
  { title: "Tutor matching", body: "A tutor whose strengths cover your child's gaps, shared before the trial." },
] as const;

/** Subject FAQs (old /subjects/$subject page). */
export function subjectFaqs(name: string) {
  return [
    // CONFIRM: price matches data/content/faqs.ts ("Monthly plans start at PKR 15,000"); the old page also said "approx. USD 55".
    { q: `How much does an online ${name} tutor cost?`, a: `Our ${name} tutors start at PKR 15,000 a month for one subject. Rates depend on the curriculum (IGCSE, A Level, IB, SAT) and tutor experience. Families abroad are quoted in local currency.` },
    { q: `Do you offer ${name} tutors for IGCSE and A Level?`, a: `Yes. Every ${name} tutor is matched to your exact curriculum: IGCSE, GCSE, O Level, A Level, IB, GED, SAT or a national board.` },
    { q: `Is the first ${name} lesson free?`, a: `Yes. Every new student gets a free one-to-one trial lesson with a matched ${name} tutor before committing.` },
    { q: `Are the ${name} lessons online or in-person?`, a: `Both. We teach one-to-one online ${name} lessons worldwide, and home tuition in selected cities, starting with Islamabad and Rawalpindi.` },
  ];
}
