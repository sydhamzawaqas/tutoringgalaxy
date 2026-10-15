export type DifficultyConfig = {
  easy: number;
  intermediate: number;
  hard: number;
};

export type CurriculumConfig = {
  id: string;
  name: string;
  regions: string[];
  levels: string[];
  subjects: string[];
  topics: Record<string, string[]>; // subject -> topics
  difficultyDistribution?: DifficultyConfig;
  terminology: {
    examName: string;
    gradeLevel: string;
    marks: string;
  };
};

export const REGIONS = [
  "Pakistan",
  "Australia",
  "United Kingdom",
  "UAE",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  "International",
];

export const CURRICULUM_CONFIGS: CurriculumConfig[] = [
  {
    id: "cambridge-o-level",
    name: "Cambridge O-Level",
    regions: ["Pakistan", "UAE", "International"],
    levels: ["O-Level"],
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Economics", "Accounting", "Business Studies"],
    topics: {
      "Mathematics": ["Algebra", "Geometry", "Trigonometry", "Calculus", "Probability", "Statistics", "Number Theory"],
      "Physics": ["Mechanics", "Waves", "Electricity", "Magnetism", "Thermal Physics", "Atomic Physics"],
    },
    terminology: {
      examName: "O-Level Examination",
      gradeLevel: "Year 11",
      marks: "marks",
    },
  },
  {
    id: "gcse",
    name: "GCSE",
    regions: ["United Kingdom"],
    levels: ["Year 10", "Year 11"],
    subjects: ["Mathematics", "Combined Science", "English Language", "English Literature"],
    topics: {
      "Mathematics": ["Number", "Algebra", "Ratio, Proportion and Rates of Change", "Geometry and Measures", "Probability", "Statistics"],
    },
    terminology: {
      examName: "GCSE",
      gradeLevel: "Year",
      marks: "marks",
    },
  },
  {
    id: "naplan",
    name: "NAPLAN",
    regions: ["Australia"],
    levels: ["Year 3", "Year 5", "Year 7", "Year 9"],
    subjects: ["Numeracy", "Reading", "Writing", "Language Conventions"],
    topics: {
      "Numeracy": ["Number and Algebra", "Measurement and Geometry", "Statistics and Probability"],
    },
    terminology: {
      examName: "NAPLAN",
      gradeLevel: "Year",
      marks: "score",
    },
  },
];

export const DEFAULT_DIFFICULTY: DifficultyConfig = {
  easy: 20,
  intermediate: 30,
  hard: 50,
};
