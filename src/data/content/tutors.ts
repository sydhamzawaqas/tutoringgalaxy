/**
 * Tutor profiles. IMPORTANT: these are EXAMPLE profiles that show the layout. They are flagged
 * `example: true` and labelled on the site. Replace them with real, consenting tutors (with photos,
 * qualifications and verified details) before launch. In production this list moves to the database.
 */
export type Tutor = {
  slug: string;
  name: string;
  initials: string;
  headline: string;
  qualifications: string[];
  experienceYears: number;
  curricula: string[]; // curriculum slugs
  subjects: string[]; // subject slugs
  modes: ("online" | "home")[];
  city?: string;
  bio: string;
  approach: string;
  example: boolean;
};

export const tutors: Tutor[] = [
  {
    slug: "example-maths-tutor",
    name: "Sara A.",
    initials: "SA",
    headline: "Mathematics for O Level, IGCSE and A Level",
    qualifications: ["MPhil Mathematics"],
    experienceYears: 8,
    curricula: ["o-level", "igcse", "a-level"],
    subjects: ["mathematics", "additional-mathematics"],
    modes: ["online", "home"],
    city: "Islamabad",
    bio: "Teaches Cambridge 4024, 0580 and 9709 with a focus on clear, complete working.",
    approach: "Starts each topic with the idea, then moves quickly to past-paper questions and the mark scheme.",
    example: true,
  },
  {
    slug: "example-chemistry-tutor",
    name: "Bilal R.",
    initials: "BR",
    headline: "Chemistry for A Level, FSc and MDCAT",
    qualifications: ["MSc Chemistry"],
    experienceYears: 10,
    curricula: ["a-level", "fsc", "mdcat"],
    subjects: ["chemistry"],
    modes: ["online"],
    bio: "Specialises in organic chemistry and MDCAT MCQ technique.",
    approach: "Uses short daily MCQ sets and reviews every mistake with the student.",
    example: true,
  },
  {
    slug: "example-physics-tutor",
    name: "Hina M.",
    initials: "HM",
    headline: "Physics for IGCSE, IB and A Level",
    qualifications: ["MS Physics"],
    experienceYears: 6,
    curricula: ["igcse", "ib", "a-level"],
    subjects: ["physics"],
    modes: ["online"],
    bio: "Teaches mechanics and electricity with simple diagrams and lots of practice.",
    approach: "Builds problem-solving step by step, then times the student on exam questions.",
    example: true,
  },
  {
    slug: "example-english-tutor",
    name: "Omar K.",
    initials: "OK",
    headline: "English for O Level, IGCSE and SAT",
    qualifications: ["MA English Literature"],
    experienceYears: 7,
    curricula: ["o-level", "igcse", "sat"],
    subjects: ["english"],
    modes: ["online", "home"],
    city: "Islamabad",
    bio: "Helps students write clearly under time pressure, from directed writing to essays.",
    approach: "Models answers, then gives marked feedback on the student's own writing every week.",
    example: true,
  },
];

export const getTutor = (slug: string) => tutors.find((t) => t.slug === slug);
