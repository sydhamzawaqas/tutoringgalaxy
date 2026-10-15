/**
 * Curricula we tutor: all 20 from the old site (data/legacy/seo.ts CURRICULA). `page: true` means it
 * gets its own /curricula/[slug] page.
 * Descriptions are general, well-established facts about each qualification; the client should
 * review the "how we help" lines before launch.
 */
export type Curriculum = {
  slug: string;
  name: string;
  short: string;
  board: string;
  ages: string;
  summary: string;
  howWeHelp: string[];
  subjects: string[]; // subject slugs
  regions: string[];
  page: boolean;
};

export const curricula: Curriculum[] = [
  {
    slug: "o-level",
    name: "Cambridge O Level",
    short: "O Level",
    board: "Cambridge International",
    ages: "Grades 9–11 (ages 14–16)",
    summary:
      "Cambridge O Level is the international equivalent of GCSE, widely taken in Pakistan and the Gulf. Most subjects are assessed by written papers at the end of the course, in the May/June or October/November series.",
    howWeHelp: [
      "Tutors who have taught the exact syllabus code, for example Mathematics 4024 or Physics 5054",
      "Topic-by-topic teaching with past papers and mark schemes from the start",
      "A clear plan for the months before the exam series",
    ],
    subjects: ["mathematics", "additional-mathematics", "statistics", "physics", "chemistry", "biology", "environmental-science", "english", "economics", "accounting", "business-studies", "computer-science", "urdu", "arabic", "french", "islamiyat", "pakistan-studies", "history", "geography", "sociology"],
    regions: ["Pakistan", "UAE", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Kuwait"],
    page: true,
  },
  {
    slug: "a-level",
    name: "Cambridge and Edexcel A Level",
    short: "A Level",
    board: "Cambridge International, Pearson Edexcel",
    ages: "Grades 11–12 (ages 16–18)",
    summary:
      "A Levels are the main route to university in the UK and many other countries. Students usually take three or four subjects over two years, with AS Level as the first half.",
    howWeHelp: [
      "Subject specialists for AS and A2, including Further Mathematics",
      "Practice with structured and long-answer questions the way examiners mark them",
      "Support for predicted grades and university entry requirements",
    ],
    subjects: ["mathematics", "further-mathematics", "physics", "chemistry", "biology", "economics", "accounting", "business-studies", "computer-science", "psychology", "sociology", "english", "urdu", "arabic", "french", "spanish", "history", "geography"],
    regions: ["Pakistan", "UAE", "UK", "Saudi Arabia", "Qatar"],
    page: true,
  },
  {
    slug: "igcse",
    name: "Cambridge and Edexcel IGCSE",
    short: "IGCSE",
    board: "Cambridge International, Pearson Edexcel",
    ages: "Grades 9–10 (ages 14–16)",
    summary:
      "IGCSE is the international GCSE, taken in over a hundred countries. Many subjects offer Core and Extended (or Foundation and Higher) tiers, which decide the highest grade available.",
    howWeHelp: [
      "Help choosing the right tier, and teaching to it",
      "Tutors familiar with both Cambridge and Edexcel specifications",
      "Regular timed past-paper practice in the final term",
    ],
    subjects: ["mathematics", "additional-mathematics", "physics", "chemistry", "biology", "environmental-science", "english", "economics", "accounting", "business-studies", "computer-science", "ict", "urdu", "arabic", "french", "spanish", "islamiyat", "pakistan-studies", "history", "geography", "sociology"],
    regions: ["Pakistan", "UAE", "UK", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Kuwait"],
    page: true,
  },
  {
    slug: "gcse",
    name: "GCSE",
    short: "GCSE",
    board: "AQA, Edexcel, OCR",
    ages: "Years 10–11 (ages 14–16)",
    summary:
      "GCSEs are the main qualifications at 16 in England, graded 9 to 1. Different exam boards set different papers for the same subject, so it matters which board a school uses.",
    howWeHelp: [
      "Teaching matched to your school's exam board",
      "Foundation and Higher tier support",
      "Online lessons at UK-friendly times",
    ],
    subjects: ["mathematics", "further-mathematics", "statistics", "physics", "chemistry", "biology", "english", "computer-science", "economics", "business-studies", "psychology", "sociology", "history", "geography", "french", "spanish", "arabic", "urdu"],
    regions: ["UK"],
    page: true,
  },
  {
    slug: "ib",
    name: "International Baccalaureate",
    short: "IB",
    board: "International Baccalaureate (IBO)",
    ages: "MYP ages 11–16, Diploma ages 16–19",
    summary:
      "The IB Diploma Programme combines six subjects at Standard or Higher Level with the Extended Essay, Theory of Knowledge and CAS. Internal assessments count towards the final grade.",
    howWeHelp: [
      "SL and HL subject tutors, including Mathematics: Analysis and Approaches and Applications and Interpretation",
      "Guidance on internal assessments and the Extended Essay, without writing them for the student",
      "Exam technique for paper-based components",
    ],
    subjects: ["mathematics", "physics", "chemistry", "biology", "environmental-science", "economics", "business-studies", "computer-science", "english", "psychology", "history", "geography", "french", "spanish", "arabic"],
    regions: ["UAE", "UK", "Qatar", "Saudi Arabia", "Pakistan"],
    page: true,
  },
  {
    slug: "matric",
    name: "Matric (SSC)",
    short: "Matric",
    board: "Pakistani boards (FBISE and provincial BISEs)",
    ages: "Grades 9–10",
    summary:
      "Matriculation (Secondary School Certificate) is assessed by the Federal Board or the provincial boards in Pakistan, in Science or Arts groups.",
    howWeHelp: [
      "Tutors who know your board's paper pattern",
      "Concept teaching in English or Urdu",
      "Revision of past board papers",
    ],
    subjects: ["mathematics", "physics", "chemistry", "biology", "english", "urdu", "computer-science", "islamiyat", "pakistan-studies"],
    regions: ["Pakistan"],
    page: true,
  },
  {
    slug: "fsc",
    name: "FSc / Intermediate (HSSC)",
    short: "FSc",
    board: "Pakistani boards (FBISE and provincial BISEs)",
    ages: "Grades 11–12",
    summary:
      "FSc (Higher Secondary School Certificate) is taken in Pre-Medical or Pre-Engineering groups and leads into MDCAT and ECAT preparation.",
    howWeHelp: [
      "Pre-Medical and Pre-Engineering subject tutors",
      "Board-exam preparation alongside entry-test practice",
      "Numerical problem-solving for Physics and Mathematics",
    ],
    subjects: ["mathematics", "physics", "chemistry", "biology", "english"],
    regions: ["Pakistan"],
    page: true,
  },
  {
    slug: "mdcat",
    name: "MDCAT",
    short: "MDCAT",
    board: "Pakistan Medical and Dental Council",
    ages: "After FSc Pre-Medical or A Level",
    summary:
      "MDCAT is the entry test for medical and dental colleges in Pakistan, with multiple-choice questions in Biology, Chemistry, Physics, English and Logical Reasoning.",
    howWeHelp: [
      "Syllabus-mapped MCQ practice with explanations",
      "Timed mock tests and error review",
      "A study plan for the months before the test",
    ],
    subjects: ["biology", "chemistry", "physics", "english"],
    regions: ["Pakistan"],
    page: true,
  },
  {
    slug: "ecat",
    name: "ECAT",
    short: "ECAT",
    board: "UET and other engineering universities",
    ages: "After FSc Pre-Engineering or A Level",
    summary: "ECAT is the entry test for engineering universities in Pakistan, focused on Mathematics, Physics and Chemistry or Computer Science.",
    howWeHelp: ["Speed and accuracy practice for MCQs", "Topic revision of FSc Mathematics and Physics", "Timed mock tests"],
    subjects: ["mathematics", "physics", "chemistry", "computer-science", "english"],
    regions: ["Pakistan"],
    page: true,
  },
  {
    slug: "sat",
    name: "SAT",
    short: "SAT",
    board: "College Board",
    ages: "Grades 11–12",
    summary: "The digital SAT has two sections, Reading and Writing and Math, and is used for admission to many US universities.",
    howWeHelp: ["Diagnostic test and a target-score plan", "Section-by-section strategy", "Full-length timed practice"],
    subjects: ["mathematics", "english"],
    regions: ["USA", "UAE", "Saudi Arabia", "Pakistan", "Canada"],
    page: true,
  },
  {
    slug: "ap",
    name: "Advanced Placement (AP)",
    short: "AP",
    board: "College Board",
    ages: "Grades 10–12",
    summary: "AP courses are college-level subjects with exams in May, scored from 1 to 5.",
    howWeHelp: ["Course-specific tutors for AP Calculus, Physics, Chemistry and more", "Free-response practice", "Exam-season revision"],
    subjects: ["mathematics", "statistics", "physics", "chemistry", "biology", "environmental-science", "computer-science", "economics", "psychology", "english", "history", "french", "spanish"],
    regions: ["USA", "Canada", "UAE"],
    page: true,
  },
  {
    slug: "ged",
    name: "GED",
    short: "GED",
    board: "GED Testing Service",
    ages: "Adults and older students",
    summary: "The GED is a high-school equivalency credential with four tests: Mathematical Reasoning, Reasoning Through Language Arts, Science and Social Studies.",
    howWeHelp: ["Flexible scheduling around work", "Focused preparation test by test", "Practice tests before booking each exam"],
    subjects: ["mathematics", "english", "physics", "biology"],
    regions: ["Pakistan", "UAE", "USA"],
    page: true,
  },
  {
    slug: "act",
    name: "ACT",
    short: "ACT",
    board: "ACT, Inc.",
    ages: "Grades 11–12",
    summary:
      "The ACT is a US college admissions test covering English, Math and Reading, with optional Science and Writing sections. It is accepted by US universities on equal terms with the SAT.",
    howWeHelp: ["Pacing practice for the ACT's shorter time per question", "Calculator strategy for the Math section", "Full-length timed practice tests with error review"],
    subjects: ["mathematics", "english", "physics", "biology"],
    regions: ["USA", "UAE", "Saudi Arabia", "Canada"],
    page: true,
  },
  {
    slug: "hsc",
    name: "NSW Higher School Certificate (HSC)",
    short: "HSC",
    board: "NSW Education Standards Authority (NESA)",
    ages: "Years 11–12",
    summary:
      "The HSC is the senior school qualification in New South Wales. School-based assessment and the final HSC exams both count, and results feed into the ATAR used for university entry.",
    howWeHelp: ["Tutors who teach to the NESA syllabus and band descriptors", "Preparation for assessment tasks and trial exams", "Online lessons at Australian-friendly times"],
    subjects: ["mathematics", "physics", "chemistry", "biology", "english", "economics", "business-studies", "history", "geography"],
    regions: ["Australia"],
    page: true,
  },
  {
    slug: "vce",
    name: "Victorian Certificate of Education (VCE)",
    short: "VCE",
    board: "Victorian Curriculum and Assessment Authority (VCAA)",
    ages: "Years 11–12",
    summary:
      "VCE is the senior qualification in Victoria. Study scores combine School-Assessed Coursework (SACs) with end-of-year exams and feed into the ATAR.",
    howWeHelp: ["SAC-style practice with detailed feedback", "End-of-year exam preparation from Term 3", "Online lessons at Australian-friendly times"],
    subjects: ["mathematics", "physics", "chemistry", "biology", "english", "economics", "accounting", "business-studies", "psychology", "history", "geography"],
    regions: ["Australia"],
    page: true,
  },
  {
    slug: "common-core",
    name: "US Common Core",
    short: "Common Core",
    board: "Common Core State Standards (US states)",
    ages: "Kindergarten to Grade 12",
    summary:
      "The Common Core State Standards set out what US students should know in English language arts and mathematics at each grade. Many states use them, or standards based on them.",
    howWeHelp: ["Grade-level Math and English support matched to the school", "Homework and test help that follows the class", "A strong base for the SAT and ACT later on"],
    subjects: ["mathematics", "english"],
    regions: ["USA"],
    page: true,
  },
  {
    slug: "ontario",
    name: "Ontario Curriculum (OSSD)",
    short: "Ontario",
    board: "Ontario Ministry of Education",
    ages: "Grades 9–12",
    summary:
      "The Ontario Secondary School Diploma (OSSD) is earned through credits in compulsory and optional courses. Grade 11 and 12 university-preparation courses count towards university admission.",
    howWeHelp: ["Course-specific tutors for Grade 11 and 12 university-preparation courses", "Support with tests, assignments and culminating tasks", "Online lessons at Canadian-friendly times"],
    subjects: ["mathematics", "physics", "chemistry", "biology", "english", "economics", "accounting", "business-studies", "computer-science", "history", "geography", "french"],
    regions: ["Canada"],
    page: true,
  },
  {
    slug: "saudi-national",
    name: "Saudi National Curriculum",
    short: "Saudi National",
    board: "Saudi Ministry of Education",
    ages: "Grades 1–12",
    summary: "The Saudi national curriculum is set by the Ministry of Education and taught in public and many private schools across the Kingdom.",
    howWeHelp: ["Tutors who follow the school's textbooks and term plan", "Maths and science support with clear worked examples", "Online lessons at Saudi-friendly times"],
    subjects: ["mathematics", "physics", "chemistry", "biology", "english", "arabic"],
    regions: ["Saudi Arabia"],
    page: true,
  },
  {
    slug: "edexcel",
    name: "Pearson Edexcel International",
    short: "Edexcel",
    board: "Pearson Edexcel",
    ages: "Grades 9–13",
    summary:
      "Edexcel offers International GCSE and International A Level qualifications used in schools across 100+ countries, with modular A Level units that can be sat in January, May/June or October.",
    howWeHelp: ["Tutors who know the Edexcel specifications and paper styles", "Unit-by-unit planning for modular International A Levels", "Past papers and mark schemes from the first lesson"],
    subjects: ["mathematics", "further-mathematics", "physics", "chemistry", "biology", "english", "economics", "accounting", "business-studies", "computer-science", "ict", "psychology", "history", "geography", "arabic", "french", "spanish", "urdu"],
    regions: ["Pakistan", "UAE", "UK"],
    page: true,
  },
  {
    slug: "cambridge",
    name: "Cambridge International",
    short: "Cambridge",
    board: "Cambridge International Education (CAIE)",
    ages: "Primary to A Level",
    summary:
      "Cambridge curricula (Primary, Lower Secondary, IGCSE, O Level and A Level) are taught in 10,000+ schools across 160 countries, each with its own syllabus codes and paper series.",
    howWeHelp: ["Tutors matched to the exact Cambridge syllabus code", "Teaching built around past papers, mark schemes and examiner reports", "Support at every stage, from Lower Secondary to A Level"],
    subjects: ["mathematics", "additional-mathematics", "further-mathematics", "statistics", "physics", "chemistry", "biology", "environmental-science", "english", "urdu", "arabic", "french", "spanish", "economics", "accounting", "business-studies", "computer-science", "ict", "psychology", "sociology", "history", "geography", "islamiyat", "pakistan-studies"],
    regions: ["Pakistan", "UAE", "UK", "Saudi Arabia", "Qatar"],
    page: true,
  },
];

export const pageCurricula = () => curricula.filter((c) => c.page);
export const getCurriculum = (slug: string) => curricula.find((c) => c.slug === slug);

/* ------------------------------------------------------------------------------------------------ */
/* Groups and long-form page copy (server pages only)                                               */
/* ------------------------------------------------------------------------------------------------ */

export const curriculumGroups: { slug: string; name: string; lead: string; slugs: string[] }[] = [
  { slug: "international", name: "International", lead: "Cambridge, Edexcel and IB programmes taught in schools around the world.", slugs: ["o-level", "igcse", "a-level", "ib", "cambridge", "edexcel"] },
  { slug: "uk", name: "UK", lead: "GCSEs with AQA, Edexcel and OCR, taught online at UK-friendly times.", slugs: ["gcse"] },
  { slug: "pakistan", name: "Pakistan", lead: "Federal and provincial board exams and entry tests, in English or Urdu.", slugs: ["matric", "fsc", "mdcat", "ecat"] },
  { slug: "north-america", name: "US and Canada", lead: "Admissions tests, AP and school curricula for the US and Canada.", slugs: ["sat", "act", "ap", "ged", "common-core", "ontario"] },
  { slug: "australia-gulf", name: "Australia and the Gulf", lead: "State senior certificates in Australia and the Saudi national curriculum.", slugs: ["hsc", "vce", "saudi-national"] },
];

export type CurriculumDetail = {
  tagline: string;
  description: string;
  audience: string;
  countries: string[];
};

/** Copy from the old site (data/legacy/curriculum-content.ts CURRICULUM_EXTRAS). */
const DETAILS: Record<string, CurriculumDetail> = {
  ged: {
    tagline: "Earn your US high-school equivalency",
    description: "The GED is a US high-school equivalency credential recognised by colleges and employers worldwide. It tests Mathematical Reasoning, Reasoning Through Language Arts, Science, and Social Studies.",
    audience: "Adult learners and students aged 16+ seeking a high-school equivalency diploma.",
    countries: ["United States", "UAE", "Pakistan", "Saudi Arabia"],
  },
  gcse: {
    tagline: "The UK's core secondary qualification",
    description: "GCSEs are the standard UK academic qualification taken at age 16, with grades 9–1. They are the gateway to A Levels, IB and college admission across the UK.",
    audience: "Students in Years 10–11 (ages 14–16) in the UK system.",
    countries: ["United Kingdom", "UAE", "Pakistan"],
  },
  igcse: {
    tagline: "The world's most popular international qualification",
    description: "IGCSE is offered by Cambridge and Edexcel and is recognised by universities globally. It develops conceptual understanding across 70+ subjects.",
    audience: "Students in grades 9–11 in international schools.",
    countries: ["Pakistan", "UAE", "United Kingdom", "Saudi Arabia"],
  },
  "o-level": {
    tagline: "Cambridge O Level, a globally trusted foundation",
    description: "Cambridge O Level is an internationally recognised qualification for grades 9–11, focused on rigorous academic content and exam technique.",
    audience: "Grade 9–11 students preparing for A Levels or university foundation.",
    countries: ["Pakistan", "UAE", "Bangladesh", "Sri Lanka"],
  },
  "a-level": {
    tagline: "The gold standard for university admission",
    description: "Cambridge and Edexcel A Levels are the most widely accepted pre-university qualification, with specialised study in 3–4 subjects across 2 years.",
    audience: "Grade 11–13 students applying to universities in the UK, US, UAE and beyond.",
    countries: ["Pakistan", "UAE", "United Kingdom"],
  },
  ib: {
    tagline: "The International Baccalaureate Diploma Programme",
    description: "The IB is a holistic, research-driven curriculum recognised by top universities worldwide, combining six subject groups with TOK, EE and CAS.",
    audience: "Grade 11–12 students at IB World Schools.",
    countries: ["UAE", "United Kingdom", "Australia", "United States"],
  },
  sat: {
    tagline: "Your gateway to US university admissions",
    description: "The SAT is a standardised test used by US colleges, covering Reading, Writing and Math. The digital SAT runs about 2 hours 14 minutes.",
    audience: "Grade 11–12 students applying to US, Canadian, and select international universities.",
    countries: ["United States", "UAE", "Saudi Arabia", "Pakistan", "Canada"],
  },
  act: {
    tagline: "An alternative path to US universities",
    description: "The ACT is a US college admissions test covering English, Math, Reading, Science Reasoning and an optional Writing section.",
    audience: "Grade 11–12 students applying to US universities.",
    countries: ["United States", "UAE", "Saudi Arabia", "Canada"],
  },
  ap: {
    tagline: "Advanced Placement: earn college credit in high school",
    description: "AP courses and exams let high-school students study college-level material and earn university credit. 38+ subjects are available.",
    audience: "Grade 10–12 students seeking to strengthen US/Canadian university applications.",
    countries: ["United States", "Canada", "UAE"],
  },
  edexcel: {
    tagline: "Pearson Edexcel International qualifications",
    description: "Edexcel offers International GCSE and International A Level qualifications used in schools across 100+ countries.",
    audience: "Grade 9–13 students at international schools using the Edexcel pathway.",
    countries: ["Pakistan", "UAE", "United Kingdom"],
  },
  cambridge: {
    tagline: "Cambridge Assessment International Education",
    description: "Cambridge curricula (Primary, Lower Secondary, IGCSE, O and A Level) are taught in 10,000+ schools across 160 countries.",
    audience: "All school-age students in Cambridge-accredited schools.",
    countries: ["Pakistan", "UAE", "United Kingdom", "Saudi Arabia"],
  },
  matric: {
    tagline: "Pakistan's Matriculation board",
    description: "The Matric system (SSC) is the standard Pakistani secondary school qualification for grades 9–10, administered by provincial boards.",
    audience: "Grade 9–10 students in Pakistani board schools.",
    countries: ["Pakistan"],
  },
  fsc: {
    tagline: "FSc Pre-Engineering and Pre-Medical",
    description: "FSc (HSSC) is Pakistan's intermediate qualification for grades 11–12, with Pre-Engineering and Pre-Medical streams that feed into ECAT and MDCAT.",
    audience: "Grade 11–12 students preparing for Pakistani university entrance exams.",
    countries: ["Pakistan"],
  },
};

const COUNTRY_NAMES: Record<string, string> = { UK: "United Kingdom", USA: "United States" };

/** Page copy for a curriculum. Falls back to the curriculum's own summary where the old site had no extra copy. */
export function getCurriculumDetail(c: Curriculum): CurriculumDetail {
  return (
    DETAILS[c.slug] ?? {
      tagline: `Expert ${c.short} tutoring for every student`,
      description: c.summary,
      audience: `Students preparing for ${c.short} (${c.ages}).`,
      countries: c.regions.map((r) => COUNTRY_NAMES[r] ?? r),
    }
  );
}

/** Curriculum FAQs (legacy curriculum-content.ts DEFAULT_FAQS, adapted). */
export function curriculumFaqs(c: Curriculum) {
  return [
    { q: `Can I get a free ${c.short} trial class?`, a: `Yes. Every student gets one free trial lesson with a matched ${c.short} tutor before committing.` },
    { q: "Are sessions online or in-person?", a: "Both. We offer one-to-one online sessions worldwide and home tuition in selected cities, starting with Islamabad and Rawalpindi." },
    // CONFIRM: the old site added "Only the top 5% are onboarded". Removed until the client confirms the figure.
    { q: "How are tutors selected?", a: "Every tutor is interviewed, subject-tested and rated by parents before teaching with us." },
    { q: `Does the tutor follow my child's exact ${c.short} syllabus?`, a: `Yes. We match a tutor who has taught your child's ${c.short} syllabus and exam board, and lessons follow the papers they will sit.` },
  ];
}
