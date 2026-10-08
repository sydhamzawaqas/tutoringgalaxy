/**
 * Curricula we tutor. `page: true` means it gets its own /curricula/[slug] page.
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
    subjects: ["mathematics", "additional-mathematics", "physics", "chemistry", "biology", "english", "economics", "accounting", "computer-science", "urdu", "islamiyat", "pakistan-studies"],
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
    subjects: ["mathematics", "further-mathematics", "physics", "chemistry", "biology", "economics", "accounting", "business-studies", "computer-science", "psychology", "english"],
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
    subjects: ["mathematics", "additional-mathematics", "physics", "chemistry", "biology", "english", "economics", "business-studies", "computer-science", "ict"],
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
    subjects: ["mathematics", "physics", "chemistry", "biology", "english", "computer-science"],
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
    subjects: ["mathematics", "physics", "chemistry", "biology", "economics", "english", "psychology", "business-studies"],
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
    subjects: ["mathematics", "physics", "chemistry", "biology", "english", "urdu", "computer-science"],
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
    subjects: ["mathematics", "physics", "chemistry"],
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
    subjects: ["mathematics", "physics", "chemistry", "biology", "computer-science", "economics"],
    regions: ["USA", "Canada", "UAE"],
    page: false,
  },
  {
    slug: "ged",
    name: "GED",
    short: "GED",
    board: "GED Testing Service",
    ages: "Adults and older students",
    summary: "The GED is a high-school equivalency credential with four tests: Mathematical Reasoning, Reasoning Through Language Arts, Science and Social Studies.",
    howWeHelp: ["Flexible scheduling around work", "Focused preparation test by test", "Practice tests before booking each exam"],
    subjects: ["mathematics", "english"],
    regions: ["Pakistan", "UAE", "USA"],
    page: false,
  },
];

export const pageCurricula = () => curricula.filter((c) => c.page);
export const getCurriculum = (slug: string) => curricula.find((c) => c.slug === slug);
