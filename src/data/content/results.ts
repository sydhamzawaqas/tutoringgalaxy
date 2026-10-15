/**
 * Results (/results). Ported from the old site: routes/results.tsx.
 * Grade improvements and stories come from data/legacy/testimonials.ts.
 */
import { TESTIMONIALS } from "@/data/legacy/testimonials";

export type ExamWin = { name: string; exam: string; score: string; note: string; country: string; prepSlug?: string };
export type Admission = { name: string; university: string; program: string; country: string; year: string };

export const resultsIntro = {
  eyebrow: "Proof, not promises",
  title: "Real Results from Real Students",
  lead: "Every result on this page is from a student we tutored. Grade jumps, exam breakthroughs, and offers from the world's top universities.",
};

/** Testimonials with a before → after grade. */
export const gradeWins = TESTIMONIALS.filter((t) => t.before && t.after);

/** Long-form stories (old page showed the first eight). */
export const stories = TESTIMONIALS.slice(0, 8);

// CONFIRM: the eight exam wins and nine admissions below are copied from the old site. Client to
// confirm each one is a real student who agreed to be listed (first name + initial only).
export const examWins: ExamWin[] = [
  { name: "Hassan A.", exam: "SAT", score: "1550 / 1600", note: "+280 points in 12 weeks", country: "Pakistan", prepSlug: "sat" },
  { name: "Priya D.", exam: "IB Diploma", score: "43 / 45", note: "Three HL 7s", country: "UAE", prepSlug: "ib" },
  { name: "Junaid I.", exam: "MDCAT", score: "192 / 200", note: "Top 1% national cohort", country: "Pakistan" },
  { name: "Emma L.", exam: "A Level", score: "4 A*", note: "Maths, Further Maths, Physics, Chem", country: "UK", prepSlug: "a-level" },
  { name: "Khalid M.", exam: "IGCSE", score: "9 A* + 1 A", note: "Grade 10 CAIE", country: "UAE", prepSlug: "igcse" },
  { name: "Nadia F.", exam: "GED", score: "175 avg", note: "College-ready in 5 months", country: "USA", prepSlug: "ged" },
  { name: "Ravi S.", exam: "ACT", score: "34 / 36", note: "Perfect Math sub-score", country: "Canada", prepSlug: "act" },
  { name: "Alina R.", exam: "O Level", score: "8 A*", note: "Best-in-school Additional Maths", country: "Pakistan", prepSlug: "o-level" },
];

export const admissions: Admission[] = [
  { name: "Zara K.", university: "University of Oxford", program: "PPE", country: "UK", year: "2025" },
  { name: "Ahmed R.", university: "Imperial College London", program: "Mechanical Engineering", country: "UK", year: "2025" },
  { name: "Aisha M.", university: "LUMS", program: "Computer Science", country: "Pakistan", year: "2025" },
  { name: "Omar S.", university: "NYU Abu Dhabi", program: "Economics", country: "UAE", year: "2024" },
  { name: "Layla H.", university: "University of Toronto", program: "Life Sciences", country: "Canada", year: "2024" },
  { name: "Bilal A.", university: "UCL", program: "Data Science", country: "UK", year: "2024" },
  { name: "Sara N.", university: "Aga Khan University", program: "MBBS", country: "Pakistan", year: "2024" },
  { name: "Yousef T.", university: "American University of Sharjah", program: "Architecture", country: "UAE", year: "2024" },
  { name: "Meera P.", university: "University of Melbourne", program: "Biomedicine", country: "Australia", year: "2025" },
];

export const resultsSections = {
  grades: { eyebrow: "Grade Improvements", title: "Before → After", lead: "Actual grade jumps from students who completed a Tutoring Galaxy program." },
  exams: { eyebrow: "Exam Achievements", title: "Standout Scores", lead: "From IGCSE and A Level to SAT, IB, MDCAT and beyond — our students consistently place in the top percentiles." },
  admissions: { eyebrow: "University Admissions", title: "Where Our Students Went Next", lead: "Offers from Oxbridge, Ivies, top UK Russell Group, and leading universities across Pakistan, the UAE, Australia and Canada." },
  stories: { eyebrow: "In Their Own Words", title: "Student & Parent Stories", lead: "The full picture — long-form testimonials from families around the world." },
  cta: { title: "Your child's success story starts here.", lead: "Book a free trial and get a personalised plan built around your child's goals — Oxbridge, Ivy, MDCAT, or top grades at school." },
};
