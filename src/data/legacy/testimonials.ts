export type Testimonial = {
  name: string;
  initial: string;
  role: string;
  location: string;
  citySlug: string;
  flag: string;
  quote: string;
  rating: number;
  photo: string;
  before?: string;
  after?: string;
  subject?: string;
  subjectSlug?: string;
  curriculumSlug?: string;
  duration?: string;
};

// DiceBear avatars — stable, license-free, no upload required.
const avatar = (seed: string) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;

export const TESTIMONIALS: Testimonial[] = [
  { name: "Aisha Raza", initial: "A", role: "Parent", location: "Islamabad, Pakistan", citySlug: "islamabad", flag: "🇵🇰",
    photo: avatar("Aisha Raza"), rating: 5,
    quote: "My daughter went from failing to top of her class. The AI assessment identified exactly where she was struggling and the tutor designed a laser-focused plan.",
    before: "D", after: "A*", subject: "O-Level Mathematics", subjectSlug: "mathematics", curriculumSlug: "o-level", duration: "8 Weeks" },
  { name: "Lena Schneider", initial: "L", role: "Parent", location: "Dubai, UAE", citySlug: "dubai", flag: "🇦🇪",
    photo: avatar("Lena Schneider"), rating: 5,
    quote: "IB Maths HL score improved from 4 to 7 before final exams. The tutor understood the IB curriculum inside out — absolutely worth every session.",
    before: "4", after: "7", subject: "IB Mathematics HL", subjectSlug: "mathematics", curriculumSlug: "ib" },
  { name: "Sarah Mitchell", initial: "S", role: "Parent", location: "London, UK", citySlug: "london", flag: "🇬🇧",
    photo: avatar("Sarah Mitchell"), rating: 5,
    quote: "Both my children improved dramatically. The tutors are knowledgeable, patient, and genuinely invested. Best educational decision we've made.",
    before: "C/C", after: "A/A*", subject: "GCSE English & Sciences", subjectSlug: "english", curriculumSlug: "gcse" },
  { name: "Ahmed Raza", initial: "A", role: "Student", location: "DHA Phase 5, Islamabad", citySlug: "islamabad", flag: "🇵🇰",
    photo: avatar("Ahmed Raza"), rating: 5,
    quote: "The home tutor came directly to our house in DHA and transformed Ahmed's grades in just 8 weeks. Professional, punctual, and truly expert.",
    before: "D", after: "A*", subject: "O-Level Mathematics", subjectSlug: "mathematics", curriculumSlug: "o-level" },
  { name: "Fatima Malik", initial: "F", role: "Student", location: "Bahria Town, Rawalpindi", citySlug: "rawalpindi", flag: "🇵🇰",
    photo: avatar("Fatima Malik"), rating: 5,
    quote: "Finding a reliable MDCAT tutor in Bahria Town felt impossible until Tutoring Galaxy matched us. Scored 87% and now in medical college.",
    before: "62%", after: "87%", subject: "MDCAT Preparation", subjectSlug: "biology", curriculumSlug: "mdcat" },
  { name: "Hassan Ali", initial: "H", role: "Student", location: "F-8, Islamabad", citySlug: "islamabad", flag: "🇵🇰",
    photo: avatar("Hassan Ali"), rating: 5,
    quote: "Our tutor traveled to F-8 every week without fail. Hassan's Physics grade went from C to A. Outstanding service.",
    before: "C", after: "A", subject: "A-Level Physics", subjectSlug: "physics", curriculumSlug: "a-level" },
  { name: "Omar Al Farsi", initial: "O", role: "Parent", location: "Abu Dhabi, UAE", citySlug: "abu-dhabi", flag: "🇦🇪",
    photo: avatar("Omar Al Farsi"), rating: 5,
    quote: "SAT tutor prepared my son end-to-end. Scored 1520 and got into NYU Abu Dhabi. Money well spent.",
    before: "1290", after: "1520", subject: "SAT Prep", subjectSlug: "mathematics", curriculumSlug: "sat" },
  { name: "Priya Kapoor", initial: "P", role: "Parent", location: "Doha, Qatar", citySlug: "doha", flag: "🇶🇦",
    photo: avatar("Priya Kapoor"), rating: 5,
    quote: "IGCSE Chemistry tutor was brilliant with visual explanations. My daughter now loves the subject.",
    before: "C", after: "A", subject: "IGCSE Chemistry", subjectSlug: "chemistry", curriculumSlug: "igcse" },
  { name: "James Whitfield", initial: "J", role: "Parent", location: "Manchester, UK", citySlug: "manchester", flag: "🇬🇧",
    photo: avatar("James Whitfield"), rating: 5,
    quote: "GCSE Maths tutor took my son from Grade 4 to Grade 8. Highly recommend.",
    before: "4", after: "8", subject: "GCSE Mathematics", subjectSlug: "mathematics", curriculumSlug: "gcse" },
  { name: "Emily Chen", initial: "E", role: "Student", location: "Sydney, Australia", citySlug: "sydney", flag: "🇦🇺",
    photo: avatar("Emily Chen"), rating: 5,
    quote: "IB Biology HL tutor helped me hit a 7. Sessions were structured, engaging and always on time.",
    before: "5", after: "7", subject: "IB Biology HL", subjectSlug: "biology", curriculumSlug: "ib" },
  { name: "Sana Khalid", initial: "S", role: "Parent", location: "Karachi, Pakistan", citySlug: "karachi", flag: "🇵🇰",
    photo: avatar("Sana Khalid"), rating: 5,
    quote: "Computer Science A Level tutor is world-class. My son's project earned an A*.",
    before: "C", after: "A*", subject: "A-Level Computer Science", subjectSlug: "computer-science", curriculumSlug: "a-level" },
  { name: "Michael Turner", initial: "M", role: "Parent", location: "Toronto, Canada", citySlug: "toronto", flag: "🇨🇦",
    photo: avatar("Michael Turner"), rating: 5,
    quote: "GED tutoring gave my daughter the structure she needed. Passed with flying colours.",
    before: "Retake", after: "Pass 165+", subject: "GED Prep", subjectSlug: "mathematics", curriculumSlug: "ged" },
];
