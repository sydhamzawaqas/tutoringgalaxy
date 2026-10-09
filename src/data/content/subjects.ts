export type Subject = {
  slug: string;
  name: string;
  summary: string;
  topics: string[];
  page: boolean;
};

export const subjects: Subject[] = [
  { slug: "mathematics", name: "Mathematics", summary: "From algebra and geometry to calculus and statistics, taught with worked examples and exam-style practice.", topics: ["Number and algebra", "Functions and graphs", "Geometry and trigonometry", "Calculus", "Statistics and probability", "Vectors"], page: true },
  { slug: "additional-mathematics", name: "Additional Mathematics", summary: "The step between O Level or IGCSE maths and A Level, covering calculus, logarithms and more.", topics: ["Quadratics and inequalities", "Logarithms and exponentials", "Differentiation", "Integration", "Trigonometric identities"], page: false },
  { slug: "further-mathematics", name: "Further Mathematics", summary: "Advanced pure and applied maths for strong A Level students.", topics: ["Complex numbers", "Matrices", "Further calculus", "Differential equations", "Mechanics and statistics"], page: false },
  { slug: "physics", name: "Physics", summary: "Concepts first, then numerical problem-solving and practical-paper skills.", topics: ["Mechanics", "Waves and optics", "Electricity", "Thermal physics", "Nuclear and modern physics"], page: true },
  { slug: "chemistry", name: "Chemistry", summary: "Physical, inorganic and organic chemistry with clear explanations and exam technique.", topics: ["Atomic structure and bonding", "Stoichiometry", "Energetics and kinetics", "Organic chemistry", "Practical skills"], page: true },
  { slug: "biology", name: "Biology", summary: "Cells to ecosystems, with a focus on precise answers the way mark schemes expect.", topics: ["Cells and transport", "Biological molecules", "Genetics", "Human physiology", "Ecology"], page: true },
  { slug: "english", name: "English", summary: "Reading, writing and literature, from essay structure to timed comprehension.", topics: ["Reading comprehension", "Directed and composition writing", "Literature essays", "Grammar and vocabulary"], page: true },
  { slug: "economics", name: "Economics", summary: "Micro and macro theory, diagrams and evaluation for higher marks.", topics: ["Markets and prices", "Market failure", "Macroeconomic policy", "International trade"], page: true },
  { slug: "accounting", name: "Accounting", summary: "Double-entry, financial statements and analysis, practised step by step.", topics: ["Double entry", "Financial statements", "Ratio analysis", "Cost accounting"], page: true },
  { slug: "business-studies", name: "Business Studies", summary: "Management, marketing, finance and operations, applied to case studies.", topics: ["Business structure", "Marketing", "Finance", "Operations"], page: false },
  { slug: "computer-science", name: "Computer Science", summary: "Theory and programming, including pseudocode and problem-solving papers.", topics: ["Data representation", "Algorithms and pseudocode", "Programming", "Networks and security"], page: true },
  { slug: "ict", name: "ICT", summary: "Practical and theory components of IGCSE ICT.", topics: ["Spreadsheets and databases", "Document production", "Theory of ICT systems"], page: false },
  { slug: "psychology", name: "Psychology", summary: "Approaches, research methods and essay-writing for A Level and IB.", topics: ["Approaches", "Research methods", "Cognitive and social psychology"], page: false },
  { slug: "urdu", name: "Urdu", summary: "Grammar, comprehension and composition for O Level and Matric.", topics: ["Grammar", "Comprehension", "Essay and letter writing"], page: false },
  { slug: "islamiyat", name: "Islamiyat", summary: "O Level Islamiyat with structured, well-referenced answers.", topics: ["Quran passages", "Life of the Prophet (PBUH)", "Hadith and history"], page: false },
  { slug: "pakistan-studies", name: "Pakistan Studies", summary: "History and geography of Pakistan for O Level.", topics: ["History and culture", "Environment of Pakistan"], page: false },
];

export const pageSubjects = () => subjects.filter((s) => s.page);
export const getSubject = (slug: string) => subjects.find((s) => s.slug === slug);
