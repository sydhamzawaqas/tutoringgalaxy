/**
 * Homepage copy, taken from the old Lovable site (components/site/hero.tsx, sections.tsx,
 * premium-sections.tsx). Client to confirm claims marked CONFIRM before launch.
 */
export const hero = {
  pill: "Trusted by families worldwide in 11 countries",
  title: "Premium home & online tutoring.",
  titleAccent: "Grades that open doors.",
  lead: "Expert 1-on-1 tutoring for IGCSE, GCSE, A-Level, IB, SAT & more, online or at home. Join families across Pakistan preparing for O-Level, A-Level & MDCAT with Cambridge-trained tutors.",
  checks: ["Free first lesson", "Qualified teachers", "Cancel any time"],
  // CONFIRM: money-back guarantee terms (old hero: "100% money-back on first package").
  guarantee: "100% money-back on first package",
  /** Old hero "We tutor for" chips (Pakistan ordering first). `slug` maps to /curricula/<slug> when that page exists. */
  curricula: [
    { label: "O-Level", slug: "o-level" },
    { label: "A-Level", slug: "a-level" },
    { label: "IGCSE", slug: "igcse" },
    { label: "Matric", slug: "matric" },
    { label: "FSc", slug: "fsc" },
    { label: "MDCAT", slug: "mdcat" },
    { label: "ECAT", slug: "ecat" },
    { label: "SAT", slug: "sat" },
    { label: "GCSE", slug: "gcse" },
    { label: "IB", slug: "ib" },
    { label: "GED", slug: "ged" },
    { label: "ACT", slug: "act" },
    { label: "AP", slug: "ap" },
    { label: "HSC", slug: "hsc" },
    { label: "VCE", slug: "vce" },
  ],
  /** Featured tutors in the hero carousel (old hero used the first three). */
  featuredTutorSlugs: ["ayesha-khan", "fatima-malik", "ahmed-saleem", "hassan-raza", "emma-wilson"],
};

/** Outcome notes from the old "ledger" band. */
export const outcomeNotes = {
  countries: "Every region has a published tutor panel.",
  cities: "Home tutoring in major cities, online everywhere.",
  match: "Usually while you're still on WhatsApp.",
  years: "One panel, grown tutor by tutor.",
};

/** Grade options from the old tutor finder form. */
export const finderGrades = ["Primary", "Middle School", "O Level / GCSE", "A Level", "University"] as const;

/** Old RegionCurriculumBand: 11 regions with the curricula families ask for there. */
export const regionCards = [
  { slug: "pakistan", name: "Pakistan", flag: "🇵🇰", landmark: "🕌", curricula: ["Matric", "FSc", "O-Level", "A-Level", "GED"] },
  { slug: "uae", name: "UAE", flag: "🇦🇪", landmark: "🏙️", curricula: ["British", "American", "IB", "MoE"] },
  { slug: "uk", name: "UK", flag: "🇬🇧", landmark: "🕰️", curricula: ["GCSE", "A-Level", "IB"] },
  { slug: "australia", name: "Australia", flag: "🇦🇺", landmark: "🏛️", curricula: ["HSC", "VCE", "IB"] },
  { slug: "usa", name: "USA", flag: "🇺🇸", landmark: "🗽", curricula: ["Common Core", "AP", "SAT", "ACT"] },
  { slug: "canada", name: "Canada", flag: "🇨🇦", landmark: "🍁", curricula: ["Ontario", "BC", "AP", "IB"] },
  { slug: "saudi-arabia", name: "Saudi Arabia", flag: "🇸🇦", landmark: "🕋", curricula: ["British", "American", "IB", "MoE"] },
  { slug: "qatar", name: "Qatar", flag: "🇶🇦", landmark: "🏜️", curricula: ["British", "American", "IB"] },
  { slug: "oman", name: "Oman", flag: "🇴🇲", landmark: "🕌", curricula: ["British", "American", "IB", "MoE"] },
  { slug: "bahrain", name: "Bahrain", flag: "🇧🇭", landmark: "🌴", curricula: ["British", "American", "IB"] },
  { slug: "kuwait", name: "Kuwait", flag: "🇰🇼", landmark: "🕌", curricula: ["British", "American", "IB", "MoE"] },
] as const;

/** Old ServicesGrid ("What we offer"). */
export const services = [
  { icon: "brain", t: "AI-powered adaptive tests", d: "Questions adapt to your ability for accurate assessment." },
  { icon: "compass", t: "Comprehensive skill analysis", d: "Academic, cognitive and aptitude insights." },
  { icon: "book", t: "Personalised learning path", d: "AI creates a custom plan for your growth." },
  // CONFIRM: regional leaderboards go live once real assessment results exist (plan §1.3 /leaderboard).
  { icon: "trophy", t: "Regional leaderboards", d: "Compete with top students in your region." },
  { icon: "sparkles", t: "Career guidance", d: "Discover the best path for your future." },
  // CONFIRM: Star Awards & scholarships programme details.
  { icon: "users", t: "Star Awards & scholarships", d: "Be recognised. Earn. Grow. Shine." },
] as const;

/** Old ComparisonStrip: [feature, Tutoring Galaxy, typical agencies]. */
export const comparison: readonly (readonly [string, boolean, boolean])[] = [
  // CONFIRM: "top-1%" claim.
  ["Vetted, top-1% tutors", true, false],
  ["Free first session", true, false],
  ["AI-matched, human-checked in under 24h", true, false],
  ["Handwritten weekly progress notes", true, false],
  ["No long-term commitment", true, true],
  ["Country-specific syllabi (PK, UAE, UK, AU)", true, false],
];

export const whyChooseUs = [
  { icon: "sparkles", t: "AI-matched, human-checked", d: "Every match is filtered by our AI, then reviewed by a real person before you meet the tutor." },
  // CONFIRM: "Top-1%" claim.
  { icon: "award", t: "Top-1% tutors only", d: "Every tutor is interviewed, background-checked and mock-taught before they meet a student." },
  { icon: "notebook", t: "Notebook-style progress", d: "You get real weekly notes from your tutor, not autogenerated dashboards." },
  { icon: "calendar", t: "Flexible scheduling", d: "Book online, in-home or hybrid. Reschedule with one tap, with no penalties on missed sessions." },
  { icon: "book", t: "Curricula, not menus", d: "O/A Level, IGCSE, IB, AP, MDCAT, SAT. We teach the syllabus, not a catalogue." },
  // CONFIRM: money-back guarantee terms.
  { icon: "shield", t: "Risk-free start", d: "Your first session is on us. Money-back guarantee on the first paid package." },
] as const;

export const howItWorks = [
  { t: "Tell us your requirements", d: "Share subject, curriculum, grade and location in under 2 minutes on WhatsApp or the form." },
  { t: "Receive expert tutor matches", d: "Our team AI-matches and hand-checks 2–3 qualified tutors for your child within 24 hours." },
  { t: "Book your free trial class", d: "Meet your top choice for a complimentary 30-minute trial, online or at home." },
  { t: "Start personalised lessons", d: "Weekly sessions on a plan tailored to your child's syllabus and target grade." },
  { t: "Track progress and results", d: "Handwritten weekly notes and a monthly parent report, so you see the grade curve move." },
] as const;

export const journey = [
  { t: "Diagnostic", d: "10-minute diagnostic pinpoints exact topic gaps and target grade." },
  { t: "Personalised plan", d: "Your tutor writes a term-by-term plan mapped to your syllabus." },
  { t: "Weekly sessions", d: "Structured 1-on-1 lessons: online, at home, or hybrid." },
  { t: "Monthly reports", d: "Handwritten progress notes and a parent report every 30 days." },
  { t: "Exam success", d: "Mock exams, past-paper drills and grade-lift by term end." },
] as const;

export const vetting = {
  // CONFIRM: "fewer than 4 in 100" figure.
  intro: "Fewer than 4 in 100 applicants make it onto the platform. Here is exactly how we filter them, so 'top 1%' isn't a slogan.",
  steps: [
    {
      t: "Background & safety",
      sub: "Criminal-record checks and verified identity.",
      body: "Every applicant clears an enhanced criminal-record check (DBS or country equivalent), government-ID verification, and a two-reference call with previous schools or families. No tutor meets a student before this file is complete and signed off.",
    },
    {
      t: "Subject proficiency",
      sub: "A subject-specific mastery test, passed in the top decile.",
      body: "Candidates sit a subject-specific mastery test written by our academic panel: full past-paper questions plus curveballs from the top of the syllabus. Chemistry tutors sit chemistry. Maths tutors sit maths. No generalists.",
    },
    {
      t: "Mock teaching & pedagogy",
      sub: "A live mock lesson observed by our academic leads.",
      body: "The final gate is a live 30-minute mock lesson with one of our academic leads playing a struggling student. We score clarity, questioning, patience and pacing. Knowing the subject isn't enough; you have to be able to teach it.",
    },
  ],
};

export const founder = {
  quote: "We started Tutoring Galaxy because families deserve more than a list of names and hourly rates.",
  body: [
    "Real academic growth doesn't come from a marketplace. It comes from a mentor: someone who knows the student's weak topics by name, WhatsApps the parent after a rough mock, and shows up week after week until the grade moves.",
    "Everything we build, from the vetting and the AI matching to the handwritten weekly notes, exists to protect that one relationship between student, parent and mentor. That is our whole product.",
  ],
};
