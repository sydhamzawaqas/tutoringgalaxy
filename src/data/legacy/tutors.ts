export type TutorReview = { author: string; rating: number; text: string; date: string };

export type Tutor = {
  slug: string;
  name: string;
  initials: string;
  title: string;
  city: string;
  country: string;
  subjects: string[];
  curricula: string[];
  rating: number;
  reviews: number;
  hourlyRate: string;
  experienceYears: number;
  bio: string;
  highlights: string[];
  qualifications: string[];
  availability: string[];
  reviewsList: TutorReview[];
};

const DEFAULT_AVAILABILITY = ["Mon–Fri: 4pm–10pm", "Sat–Sun: 10am–6pm", "Online & in-home"];

const sampleReviews = (name: string, subject: string): TutorReview[] => [
  { author: "Parent of A-Level student", rating: 5, date: "Apr 2026",
    text: `${name} transformed my child's confidence in ${subject}. Grades jumped from C to A* in one term.` },
  { author: "IGCSE student", rating: 5, date: "Mar 2026",
    text: `Clear explanations and patient. Best ${subject} tutor I've ever had.` },
  { author: "Parent", rating: 4.5, date: "Feb 2026",
    text: `Punctual, professional and the AI report after every session is very helpful.` },
];

const make = (t: Omit<Tutor, "qualifications" | "availability" | "reviewsList"> & Partial<Pick<Tutor, "qualifications" | "availability" | "reviewsList">>): Tutor => ({
  qualifications: t.qualifications ?? [t.title, `${t.experienceYears}+ years teaching experience`, "Verified by Tutoring Galaxy"],
  availability: t.availability ?? DEFAULT_AVAILABILITY,
  reviewsList: t.reviewsList ?? sampleReviews(t.name.split(" ")[0], t.subjects[0] ?? "the subject"),
  ...t,
});

export const TUTORS: Tutor[] = [
  make({ slug: "ayesha-khan", name: "Ayesha Khan", initials: "AK", title: "MPhil Mathematics, LUMS",
    city: "Islamabad", country: "Pakistan",
    subjects: ["mathematics", "physics"], curricula: ["o-level", "a-level", "igcse"],
    rating: 4.95, reviews: 142, hourlyRate: "PKR 2,500/hr", experienceYears: 8,
    bio: "8 years of teaching Cambridge mathematics with a 96% A/A* pass rate.",
    highlights: ["96% A/A* pass rate", "Cambridge trainer", "Home + online"] }),
  make({ slug: "hassan-raza", name: "Hassan Raza", initials: "HR", title: "MBBS, MDCAT Specialist",
    city: "Rawalpindi", country: "Pakistan",
    subjects: ["biology", "chemistry"], curricula: ["mdcat", "fsc", "a-level"],
    rating: 4.92, reviews: 118, hourlyRate: "PKR 3,000/hr", experienceYears: 6,
    bio: "Helped 200+ students crack MDCAT with scores above 175.",
    highlights: ["Avg student score 178/200", "Concept-first teaching"] }),
  make({ slug: "fatima-malik", name: "Fatima Malik", initials: "FM", title: "BSc Physics, Oxford",
    city: "London", country: "UK",
    subjects: ["physics", "mathematics"], curricula: ["gcse", "a-level", "ib"],
    rating: 4.97, reviews: 96, hourlyRate: "£45/hr", experienceYears: 7,
    bio: "Oxford-trained physicist, specializing in A Level and IB HL.",
    highlights: ["Oxford alumna", "IB HL 7s", "Online only"],
    availability: ["Mon–Thu: 5pm–9pm GMT", "Sat: 9am–2pm GMT", "Online only"] }),
  make({ slug: "ahmed-saleem", name: "Ahmed Saleem", initials: "AS", title: "ACCA, CA Finalist",
    city: "Dubai", country: "UAE",
    subjects: ["accounting", "economics"], curricula: ["igcse", "a-level", "ib"],
    rating: 4.9, reviews: 81, hourlyRate: "AED 200/hr", experienceYears: 9,
    bio: "Specialist in Business, Accounting and Economics across IGCSE and IB.",
    highlights: ["100% A-C rate", "Native English", "Dubai-based"] }),
  make({ slug: "sara-iqbal", name: "Sara Iqbal", initials: "SI", title: "MA English Literature",
    city: "Lahore", country: "Pakistan",
    subjects: ["english"], curricula: ["o-level", "a-level", "igcse", "matric"],
    rating: 4.93, reviews: 134, hourlyRate: "PKR 2,200/hr", experienceYears: 10,
    bio: "Award-winning English teacher with strong literature & language results.",
    highlights: ["Literature expert", "Essay mastery"] }),
  make({ slug: "bilal-tariq", name: "Bilal Tariq", initials: "BT", title: "MSc Chemistry, NUST",
    city: "Islamabad", country: "Pakistan",
    subjects: ["chemistry", "biology"], curricula: ["o-level", "a-level", "mdcat", "fsc"],
    rating: 4.89, reviews: 102, hourlyRate: "PKR 2,400/hr", experienceYears: 7,
    bio: "Chemistry specialist with focus on conceptual clarity and exam technique.",
    highlights: ["Top 5 NUST grad", "Visual learning"] }),
  make({ slug: "noor-ahmed", name: "Noor Ahmed", initials: "NA", title: "BSc Computer Science",
    city: "Karachi", country: "Pakistan",
    subjects: ["computer-science", "mathematics"], curricula: ["o-level", "a-level", "igcse"],
    rating: 4.91, reviews: 76, hourlyRate: "PKR 2,300/hr", experienceYears: 5,
    bio: "Makes pseudocode and algorithms simple for any learner.",
    highlights: ["Project mentor", "Code reviews"] }),
  make({ slug: "emma-wilson", name: "Emma Wilson", initials: "EW", title: "PGCE, King's College",
    city: "Manchester", country: "UK",
    subjects: ["mathematics", "physics"], curricula: ["gcse", "a-level"],
    rating: 4.96, reviews: 88, hourlyRate: "£40/hr", experienceYears: 11,
    bio: "Decade-long GCSE & A Level expertise with measurable grade jumps.",
    highlights: ["Edexcel & AQA", "Mock exam coach"] }),
  make({ slug: "rana-aslam", name: "Rana Aslam", initials: "RA", title: "MS Economics, LSE",
    city: "Abu Dhabi", country: "UAE",
    subjects: ["economics", "mathematics"], curricula: ["a-level", "ib"],
    rating: 4.94, reviews: 64, hourlyRate: "AED 180/hr", experienceYears: 8,
    bio: "LSE-trained economist teaching A Level and IB HL Economics.",
    highlights: ["LSE alumnus", "IA & EE coach"] }),
  make({ slug: "lily-tan", name: "Lily Tan", initials: "LT", title: "BEd Mathematics",
    city: "Sydney", country: "Australia",
    subjects: ["mathematics"], curricula: ["hsc", "ib"],
    rating: 4.92, reviews: 71, hourlyRate: "AUD 80/hr", experienceYears: 9,
    bio: "Sydney HSC maths specialist with consistent Band 6 results.",
    highlights: ["Band 6 specialist", "Online & home"] }),
  make({ slug: "david-nguyen", name: "David Nguyen", initials: "DN", title: "BSc Chemistry, Melbourne",
    city: "Melbourne", country: "Australia",
    subjects: ["chemistry", "biology"], curricula: ["vce", "ib"],
    rating: 4.9, reviews: 58, hourlyRate: "AUD 75/hr", experienceYears: 6,
    bio: "VCE Chemistry tutor with 95+ ATAR average among students.",
    highlights: ["VCE specialist", "Lab demos online"] }),
  make({ slug: "zainab-shah", name: "Zainab Shah", initials: "ZS", title: "MPhil Biology, AKU",
    city: "Islamabad", country: "Pakistan",
    subjects: ["biology"], curricula: ["o-level", "a-level", "mdcat"],
    rating: 4.95, reviews: 109, hourlyRate: "PKR 2,600/hr", experienceYears: 9,
    bio: "Biology mentor focused on MDCAT and Cambridge curricula.",
    highlights: ["AKU alumna", "MDCAT mentor"] }),
  // Added to broaden subject coverage
  make({ slug: "omar-farooq", name: "Omar Farooq", initials: "OF", title: "MSc Computer Science, FAST",
    city: "Lahore", country: "Pakistan",
    subjects: ["computer-science"], curricula: ["o-level", "a-level", "igcse", "ib"],
    rating: 4.94, reviews: 67, hourlyRate: "PKR 2,500/hr", experienceYears: 7,
    bio: "Specialist in Cambridge & IB Computer Science with NEA project mentorship.",
    highlights: ["Python & Java", "NEA / IA mentor", "Online + home"] }),
  make({ slug: "james-carter", name: "James Carter", initials: "JC", title: "MA English, Cambridge",
    city: "London", country: "UK",
    subjects: ["english"], curricula: ["gcse", "a-level", "ib"],
    rating: 4.96, reviews: 92, hourlyRate: "£45/hr", experienceYears: 8,
    bio: "Cambridge English graduate. Essay technique and unseen text analysis.",
    highlights: ["Oxbridge interview prep", "Essay coach"] }),
];

export const TUTOR_BY_SLUG: Record<string, Tutor> = Object.fromEntries(TUTORS.map(t => [t.slug, t]));
