// Global Certified Teacher network — richer profile shape sitting on top of Tutor.
// Existing routes still read `TUTORS`; new `/teachers/*` surfaces read `TEACHERS`.

import { TUTORS, type Tutor, type TutorReview } from "./tutors";
import type { CertificationId } from "./certifications";

export type CountrySlug =
  | "pakistan" | "uk" | "uae" | "australia" | "canada"
  | "india" | "saudi-arabia" | "qatar" | "usa" | "oman" | "bahrain" | "kuwait";

export type TeachingMode = "online" | "in-home" | "hybrid";

export type Teacher = Tutor & {
  countrySlug: CountrySlug;
  timezone: string;
  languages: string[];
  certifications: CertificationId[];
  mode: TeachingMode[];
  nativeEnglish: boolean;
  verified: boolean;
  countriesServed: CountrySlug[];
  philosophy: string;
  intro: string;
  university?: string;
};

const COUNTRY_LABEL: Record<CountrySlug, string> = {
  pakistan: "Pakistan", uk: "United Kingdom", uae: "United Arab Emirates",
  australia: "Australia", canada: "Canada", india: "India",
  "saudi-arabia": "Saudi Arabia", qatar: "Qatar", usa: "United States",
  oman: "Oman", bahrain: "Bahrain", kuwait: "Kuwait",
};

const COUNTRY_FLAG: Record<CountrySlug, string> = {
  pakistan: "🇵🇰", uk: "🇬🇧", uae: "🇦🇪", australia: "🇦🇺", canada: "🇨🇦",
  india: "🇮🇳", "saudi-arabia": "🇸🇦", qatar: "🇶🇦", usa: "🇺🇸",
  oman: "🇴🇲", bahrain: "🇧🇭", kuwait: "🇰🇼",
};

export const countryLabel = (slug: CountrySlug) => COUNTRY_LABEL[slug];
export const countryFlag = (slug: CountrySlug) => COUNTRY_FLAG[slug];
export const ALL_COUNTRIES: CountrySlug[] = Object.keys(COUNTRY_LABEL) as CountrySlug[];

// ── Verification tiers ──────────────────────────────────────────────────────
// Level 1 Verified Tutor · Level 2 Certified Teacher · Level 3 Senior Educator
// Level 4 Curriculum Specialist. Derived from cert set + experience.
export type TeacherTier = 1 | 2 | 3 | 4;

export type TierMeta = {
  level: TeacherTier;
  label: string;
  short: string;
  icon: "verified" | "certified" | "senior" | "specialist";
  blurb: string;
};

const SPECIALIST_CERTS = new Set([
  "ib-certified", "cambridge-certified", "british-curriculum",
  "sat-specialist", "naplan-specialist",
]);
const CERTIFIED_CERTS = new Set(["certified-teacher", "licensed-educator"]);

export function teacherTier(t: Teacher): TierMeta {
  const hasSpecialist = t.certifications.some((c) => SPECIALIST_CERTS.has(c));
  const hasCertified = t.certifications.some((c) => CERTIFIED_CERTS.has(c));

  if (hasSpecialist && t.experienceYears >= 8) {
    return { level: 4, label: "Curriculum Specialist", short: "Specialist", icon: "specialist",
      blurb: "Deep specialism in a named curriculum with proven results." };
  }
  if (hasCertified && t.experienceYears >= 10) {
    return { level: 3, label: "Senior Educator", short: "Senior", icon: "senior",
      blurb: "10+ years experience, advanced qualifications and consistent outcomes." };
  }
  if (hasCertified) {
    return { level: 2, label: "Certified Teacher", short: "Certified", icon: "certified",
      blurb: "Recognised teaching qualification with verified classroom experience." };
  }
  return { level: 1, label: "Verified Tutor", short: "Verified", icon: "verified",
    blurb: "Identity, qualifications and subject competency verified by our team." };
}


// Enrichment map — layers extra fields on top of the seeded TUTORS list.
type Enrichment = Omit<Teacher, keyof Tutor>;

const TUTOR_TO_COUNTRY: Record<string, CountrySlug> = {
  Pakistan: "pakistan", UK: "uk", UAE: "uae", Australia: "australia",
  Canada: "canada", India: "india", "Saudi Arabia": "saudi-arabia",
  Qatar: "qatar", USA: "usa",
};

const DEFAULT_ENRICH: Enrichment = {
  countrySlug: "pakistan",
  timezone: "GMT+5",
  languages: ["English", "Urdu"],
  certifications: ["certified-teacher", "exam-prep-specialist"],
  mode: ["online", "in-home"],
  nativeEnglish: false,
  verified: true,
  countriesServed: ["pakistan"],
  philosophy: "Every student can excel with the right structure, patience and belief.",
  intro: "Warm, structured tutoring — with weekly progress reports for parents.",
};

const ENRICH: Record<string, Partial<Enrichment>> = {
  "ayesha-khan": { certifications: ["certified-teacher", "cambridge-certified", "stem-expert"], philosophy: "Maths becomes intuitive when concepts are visualised, not memorised.", intro: "Cambridge-trained maths specialist with a 96% A/A* pass rate.", university: "LUMS" },
  "hassan-raza": { certifications: ["certified-teacher", "exam-prep-specialist", "stem-expert"], philosophy: "MDCAT is won through disciplined MCQ technique and concept clarity.", intro: "MDCAT mentor — 200+ students scoring above 175.", university: "Aga Khan University" },
  "fatima-malik": { countrySlug: "uk", timezone: "GMT", languages: ["English"], certifications: ["certified-teacher", "ib-certified", "british-curriculum", "native-english", "stem-expert"], nativeEnglish: true, countriesServed: ["uk", "uae", "pakistan"], philosophy: "Physics is a language — once you read it, the world opens up.", intro: "Oxford-trained physicist specialising in A Level and IB HL Physics.", university: "University of Oxford" },
  "ahmed-saleem": { countrySlug: "uae", timezone: "GMT+4", languages: ["English", "Urdu", "Arabic"], certifications: ["certified-teacher", "cambridge-certified", "ib-certified", "exam-prep-specialist"], nativeEnglish: true, countriesServed: ["uae", "saudi-arabia", "qatar"], philosophy: "Business and Accounts click when tied to real-world case studies.", intro: "Dubai-based ACCA finalist teaching Business, Accounting and Economics.", university: "University of Dubai" },
  "sara-iqbal": { certifications: ["certified-teacher", "exam-prep-specialist"], philosophy: "Great writing starts with fearless first drafts and honest editing.", intro: "Award-winning English teacher — literature analysis and essay mastery.", university: "Punjab University" },
  "bilal-tariq": { certifications: ["certified-teacher", "cambridge-certified", "stem-expert"], philosophy: "Chemistry is memorable when students see reactions, not just read them.", intro: "NUST chemistry graduate — visual, exam-focused teaching.", university: "NUST" },
  "noor-ahmed": { certifications: ["certified-teacher", "stem-expert"], philosophy: "Every learner can code once they see the logic behind the syntax.", intro: "Cambridge Computer Science specialist — algorithms made simple.", university: "IBA Karachi" },
  "emma-wilson": { countrySlug: "uk", timezone: "GMT", languages: ["English"], certifications: ["licensed-educator", "british-curriculum", "native-english", "exam-prep-specialist", "stem-expert"], nativeEnglish: true, countriesServed: ["uk"], philosophy: "Structured revision plus targeted mock exams — every time.", intro: "PGCE-qualified maths teacher, 11 years GCSE and A Level.", university: "King's College London" },
  "rana-aslam": { countrySlug: "uae", timezone: "GMT+4", languages: ["English", "Urdu"], certifications: ["certified-teacher", "ib-certified", "exam-prep-specialist"], nativeEnglish: true, countriesServed: ["uae", "uk"], philosophy: "Economics rewards curiosity — always ask 'what would happen if?'.", intro: "LSE-trained economist tutoring A Level and IB HL Economics.", university: "LSE" },
  "lily-tan": { countrySlug: "australia", timezone: "GMT+10", languages: ["English", "Mandarin"], certifications: ["licensed-educator", "naplan-specialist", "native-english", "exam-prep-specialist"], nativeEnglish: true, countriesServed: ["australia"], philosophy: "HSC success comes from mastering syllabus dot-points, one at a time.", intro: "Sydney HSC maths specialist — consistent Band 6 results.", university: "University of Sydney" },
  "david-nguyen": { countrySlug: "australia", timezone: "GMT+11", languages: ["English", "Vietnamese"], certifications: ["licensed-educator", "naplan-specialist", "stem-expert", "native-english"], nativeEnglish: true, countriesServed: ["australia"], philosophy: "Chemistry is a puzzle — each element is a clue you learn to read.", intro: "VCE chemistry tutor — students average 95+ ATAR.", university: "University of Melbourne" },
  "zainab-shah": { certifications: ["certified-teacher", "cambridge-certified", "exam-prep-specialist"], philosophy: "Biology sticks when linked to real human stories and case studies.", intro: "MPhil Biology — MDCAT and Cambridge specialist.", university: "Aga Khan University" },
  "omar-farooq": { certifications: ["certified-teacher", "cambridge-certified", "ib-certified", "stem-expert"], philosophy: "Great code is written thrice — think, sketch, then type.", intro: "Cambridge & IB Computer Science mentor with NEA/IA expertise.", university: "FAST NUCES" },
  "james-carter": { countrySlug: "uk", timezone: "GMT", languages: ["English"], certifications: ["licensed-educator", "british-curriculum", "ib-certified", "native-english", "exam-prep-specialist"], nativeEnglish: true, countriesServed: ["uk"], philosophy: "The essay is a conversation — never a monologue.", intro: "Cambridge English graduate — essay technique and unseen texts.", university: "University of Cambridge" },
};

const seeded: Teacher[] = TUTORS.map((t) => {
  const partial = ENRICH[t.slug] ?? {};
  const inferredCountry = TUTOR_TO_COUNTRY[t.country] ?? "pakistan";
  const merged: Enrichment = {
    ...DEFAULT_ENRICH,
    countrySlug: inferredCountry,
    countriesServed: [inferredCountry],
    ...partial,
  };
  return { ...t, ...merged };
});

// Additional international teachers to broaden the network.
const extraReviews = (name: string, subject: string): TutorReview[] => [
  { author: "Parent", rating: 5, date: "Mar 2026", text: `${name} is patient, structured and genuinely cares. Grades improved within weeks in ${subject}.` },
  { author: "IB student", rating: 5, date: "Feb 2026", text: `Best ${subject} teacher I've had — clear, confident, encouraging.` },
];

const extras: Teacher[] = [
  {
    slug: "priya-sharma", name: "Priya Sharma", initials: "PS", title: "MSc Physics, IIT Delhi",
    city: "New Delhi", country: "India", countrySlug: "india", timezone: "GMT+5:30",
    subjects: ["physics", "mathematics"], curricula: ["ib", "igcse", "a-level"],
    rating: 4.94, reviews: 87, hourlyRate: "INR 1,800/hr", experienceYears: 9,
    bio: "IIT-trained physicist teaching IB and Cambridge students worldwide.",
    highlights: ["IIT Delhi", "IB HL specialist", "Online only"],
    qualifications: ["MSc Physics — IIT Delhi", "9+ years teaching experience", "IB workshop leader"],
    availability: ["Mon–Fri: 4pm–10pm IST", "Sat: 10am–4pm IST", "Online only"],
    reviewsList: extraReviews("Priya", "Physics"),
    languages: ["English", "Hindi"], certifications: ["certified-teacher", "ib-certified", "stem-expert"],
    mode: ["online"], nativeEnglish: false, verified: true,
    countriesServed: ["india", "uae", "uk", "usa"],
    philosophy: "Physics is a lens for seeing the world's hidden patterns.", intro: "IIT-trained IB Physics specialist — online across time zones.",
    university: "IIT Delhi",
  },
  {
    slug: "aarav-mehta", name: "Aarav Mehta", initials: "AM", title: "MSc Mathematics, IIT Bombay",
    city: "Mumbai", country: "India", countrySlug: "india", timezone: "GMT+5:30",
    subjects: ["mathematics", "further-mathematics"], curricula: ["ib", "igcse", "a-level", "sat"],
    rating: 4.93, reviews: 72, hourlyRate: "INR 2,000/hr", experienceYears: 8,
    bio: "IB HL and Further Maths specialist — IIT alumnus.",
    highlights: ["IIT Bombay", "SAT 1580 average", "Online"],
    qualifications: ["MSc Mathematics — IIT Bombay", "8+ years teaching"],
    availability: ["Mon–Fri: 5pm–10pm IST", "Weekends: 9am–5pm IST"],
    reviewsList: extraReviews("Aarav", "Maths"),
    languages: ["English", "Hindi", "Marathi"], certifications: ["certified-teacher", "ib-certified", "sat-specialist", "stem-expert"],
    mode: ["online"], nativeEnglish: false, verified: true,
    countriesServed: ["india", "uae", "usa", "canada"],
    philosophy: "Mathematics is a craft — daily practice beats last-minute cramming.", intro: "IIT-trained IB HL & SAT Maths coach.", university: "IIT Bombay",
  },
  {
    slug: "khalid-al-mansoori", name: "Khalid Al Mansoori", initials: "KM", title: "PhD Chemistry, KAU",
    city: "Riyadh", country: "Saudi Arabia", countrySlug: "saudi-arabia", timezone: "GMT+3",
    subjects: ["chemistry", "biology"], curricula: ["igcse", "a-level", "ib", "saudi-national"],
    rating: 4.9, reviews: 54, hourlyRate: "SAR 250/hr", experienceYears: 10,
    bio: "Riyadh-based PhD chemist — bilingual teaching for KSA families.",
    highlights: ["PhD Chemistry", "Bilingual", "In-home + online"],
    qualifications: ["PhD Chemistry — King Abdulaziz University", "10+ years teaching"],
    availability: ["Sat–Wed: 4pm–10pm AST", "Fri: 10am–4pm AST"],
    reviewsList: extraReviews("Khalid", "Chemistry"),
    languages: ["Arabic", "English"], certifications: ["certified-teacher", "cambridge-certified", "ib-certified", "stem-expert"],
    mode: ["online", "in-home"], nativeEnglish: false, verified: true,
    countriesServed: ["saudi-arabia", "uae", "qatar", "bahrain"],
    philosophy: "Bilingual instruction gives students confidence in both languages.", intro: "PhD chemist — bilingual Cambridge, IB and Saudi National teaching.",
    university: "King Abdulaziz University",
  },
  {
    slug: "amira-al-thani", name: "Amira Al Thani", initials: "AT", title: "MA English, Georgetown Qatar",
    city: "Doha", country: "Qatar", countrySlug: "qatar", timezone: "GMT+3",
    subjects: ["english"], curricula: ["igcse", "a-level", "ib", "sat"],
    rating: 4.95, reviews: 63, hourlyRate: "QAR 220/hr", experienceYears: 7,
    bio: "Doha-based English teacher — SAT and IB English specialist.",
    highlights: ["Georgetown Qatar", "SAT English 780 avg", "Bilingual"],
    qualifications: ["MA English — Georgetown University in Qatar", "7+ years teaching"],
    availability: ["Sat–Wed: 4pm–9pm AST", "Fri: 10am–2pm AST"],
    reviewsList: extraReviews("Amira", "English"),
    languages: ["Arabic", "English"], certifications: ["certified-teacher", "ib-certified", "sat-specialist", "exam-prep-specialist"],
    mode: ["online", "in-home"], nativeEnglish: true, verified: true,
    countriesServed: ["qatar", "uae", "saudi-arabia"],
    philosophy: "Every essay tells a story — my job is to help you find yours.", intro: "SAT & IB English coach based in Doha.",
    university: "Georgetown University in Qatar",
  },
  {
    slug: "michael-brown", name: "Michael Brown", initials: "MB", title: "MEd, University of Toronto",
    city: "Toronto", country: "Canada", countrySlug: "canada", timezone: "GMT-5",
    subjects: ["mathematics", "physics"], curricula: ["ontario", "ap", "ib", "sat"],
    rating: 4.96, reviews: 88, hourlyRate: "CAD 70/hr", experienceYears: 12,
    bio: "OSSD-certified educator — Ontario, AP and IB specialist.",
    highlights: ["OSSD certified", "12+ years", "Online + in-home"],
    qualifications: ["MEd — University of Toronto", "OCT registered teacher"],
    availability: ["Mon–Fri: 4pm–9pm EST", "Sat: 10am–3pm EST"],
    reviewsList: extraReviews("Michael", "Maths"),
    languages: ["English", "French"], certifications: ["licensed-educator", "ib-certified", "sat-specialist", "native-english", "stem-expert"],
    mode: ["online", "in-home"], nativeEnglish: true, verified: true,
    countriesServed: ["canada", "usa"],
    philosophy: "Rigour and warmth are not opposites — students thrive when both are present.", intro: "OCT-registered Ontario, AP and IB Maths & Physics teacher.",
    university: "University of Toronto",
  },
  {
    slug: "sophie-laurent", name: "Sophie Laurent", initials: "SL", title: "BEd, McGill University",
    city: "Montreal", country: "Canada", countrySlug: "canada", timezone: "GMT-5",
    subjects: ["french", "english"], curricula: ["ontario", "ib", "sat"],
    rating: 4.91, reviews: 52, hourlyRate: "CAD 65/hr", experienceYears: 6,
    bio: "Bilingual French/English tutor in Montreal.",
    highlights: ["Native bilingual", "IB French SL/HL", "Online"],
    qualifications: ["BEd — McGill University", "6+ years teaching"],
    availability: ["Mon–Fri: 5pm–9pm EST", "Sat: 9am–1pm EST"],
    reviewsList: extraReviews("Sophie", "French"),
    languages: ["French", "English"], certifications: ["licensed-educator", "ib-certified", "native-english"],
    mode: ["online", "in-home"], nativeEnglish: true, verified: true,
    countriesServed: ["canada"],
    philosophy: "Language is best learned through immersion, not translation.", intro: "Bilingual Montreal tutor for IB French and English.",
    university: "McGill University",
  },
  {
    slug: "olivia-taylor", name: "Olivia Taylor", initials: "OT", title: "PGCE, University of Melbourne",
    city: "Melbourne", country: "Australia", countrySlug: "australia", timezone: "GMT+11",
    subjects: ["english", "history"], curricula: ["vce", "ib"],
    rating: 4.93, reviews: 46, hourlyRate: "AUD 78/hr", experienceYears: 8,
    bio: "VCE English & IB HL History — essay technique specialist.",
    highlights: ["PGCE", "VCE 45 study score avg", "Online"],
    qualifications: ["PGCE — University of Melbourne", "8+ years teaching"],
    availability: ["Mon–Fri: 4pm–9pm AEDT", "Sat: 10am–2pm AEDT"],
    reviewsList: extraReviews("Olivia", "English"),
    languages: ["English"], certifications: ["licensed-educator", "ib-certified", "naplan-specialist", "native-english", "exam-prep-specialist"],
    mode: ["online", "in-home"], nativeEnglish: true, verified: true,
    countriesServed: ["australia"],
    philosophy: "Essays are argument construction — clarity beats cleverness.", intro: "VCE English and IB HL History coach in Melbourne.",
    university: "University of Melbourne",
  },
  {
    slug: "daniel-white", name: "Daniel White", initials: "DW", title: "MSc Computer Science, UCL",
    city: "London", country: "UK", countrySlug: "uk", timezone: "GMT",
    subjects: ["computer-science", "mathematics"], curricula: ["gcse", "a-level", "ib"],
    rating: 4.94, reviews: 71, hourlyRate: "£50/hr", experienceYears: 6,
    bio: "UCL Computer Science graduate — GCSE, A Level and IB CS.",
    highlights: ["UCL", "NEA project mentor", "Online"],
    qualifications: ["MSc Computer Science — UCL", "6+ years teaching"],
    availability: ["Mon–Fri: 5pm–9pm GMT", "Sat: 10am–2pm GMT"],
    reviewsList: extraReviews("Daniel", "Computer Science"),
    languages: ["English"], certifications: ["certified-teacher", "british-curriculum", "ib-certified", "native-english", "stem-expert"],
    mode: ["online"], nativeEnglish: true, verified: true,
    countriesServed: ["uk"],
    philosophy: "Coding is thinking made visible.", intro: "UCL CS graduate — GCSE, A Level and IB Computer Science.",
    university: "University College London",
  },
  {
    slug: "layla-hosseini", name: "Layla Hosseini", initials: "LH", title: "MSc Mathematics, University of Toronto",
    city: "Dubai", country: "UAE", countrySlug: "uae", timezone: "GMT+4",
    subjects: ["mathematics", "further-mathematics"], curricula: ["igcse", "a-level", "ib", "sat"],
    rating: 4.97, reviews: 94, hourlyRate: "AED 220/hr", experienceYears: 11,
    bio: "Dubai-based maths specialist across IB, Cambridge and SAT.",
    highlights: ["11+ years", "IB HL Maths AA/AI", "In-home + online"],
    qualifications: ["MSc Mathematics — University of Toronto", "IB workshop leader"],
    availability: ["Sun–Thu: 4pm–10pm GST", "Fri–Sat: 10am–5pm GST"],
    reviewsList: extraReviews("Layla", "Maths"),
    languages: ["English", "Farsi", "Arabic"], certifications: ["certified-teacher", "ib-certified", "cambridge-certified", "sat-specialist", "stem-expert"],
    mode: ["online", "in-home"], nativeEnglish: true, verified: true,
    countriesServed: ["uae", "saudi-arabia", "qatar", "oman"],
    philosophy: "Consistent daily practice creates confident mathematicians.", intro: "Dubai IB HL Maths & SAT specialist, 11 years experience.",
    university: "University of Toronto",
  },
  {
    slug: "hafsa-ali", name: "Hafsa Ali", initials: "HA", title: "BEd, Sultan Qaboos University",
    city: "Muscat", country: "Oman", countrySlug: "oman", timezone: "GMT+4",
    subjects: ["mathematics", "chemistry"], curricula: ["igcse", "a-level", "ib"],
    rating: 4.9, reviews: 38, hourlyRate: "OMR 20/hr", experienceYears: 7,
    bio: "Muscat-based bilingual maths and chemistry tutor.",
    highlights: ["Bilingual", "Cambridge specialist"],
    qualifications: ["BEd — Sultan Qaboos University", "7+ years teaching"],
    availability: ["Sat–Wed: 4pm–9pm GST", "Fri: 10am–2pm GST"],
    reviewsList: extraReviews("Hafsa", "Maths"),
    languages: ["Arabic", "English"], certifications: ["certified-teacher", "cambridge-certified", "stem-expert"],
    mode: ["online", "in-home"], nativeEnglish: false, verified: true,
    countriesServed: ["oman", "uae"],
    philosophy: "Confidence in maths transforms every other subject.", intro: "Bilingual Cambridge maths and chemistry teacher in Muscat.",
    university: "Sultan Qaboos University",
  },
];

export const TEACHERS: Teacher[] = [...seeded, ...extras];
export const TEACHER_BY_SLUG: Record<string, Teacher> = Object.fromEntries(
  TEACHERS.map((t) => [t.slug, t]),
);

export function teachersByCountry(country: CountrySlug): Teacher[] {
  return TEACHERS.filter((t) => t.countrySlug === country || t.countriesServed.includes(country));
}
export function teachersBySubject(subject: string): Teacher[] {
  return TEACHERS.filter((t) => t.subjects.includes(subject));
}
export function teachersByCurriculum(curriculum: string): Teacher[] {
  return TEACHERS.filter((t) => t.curricula.includes(curriculum));
}
export function teachersByCurriculumAndSubject(curriculum: string, subject: string): Teacher[] {
  return TEACHERS.filter((t) => t.curricula.includes(curriculum) && t.subjects.includes(subject));
}

// Countries that actually have at least one teacher — used for sitemap and hub listings.
export const COUNTRIES_WITH_TEACHERS: CountrySlug[] = Array.from(
  new Set<CountrySlug>(TEACHERS.flatMap((t) => [t.countrySlug, ...t.countriesServed])),
);
