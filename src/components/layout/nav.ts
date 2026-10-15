import { curricula } from "@/data/content/curricula";
import { subjects } from "@/data/content/subjects";

/**
 * Site navigation. One source for the desktop mega-menu, the mobile menu and the footer.
 * Some targets (/services, /results, /match, /growing-stars, /academy, /leaderboard, /blog,
 * /exam-prep, /assessments) are Phase 1 pages built alongside this file.
 */

export type NavLink = { href: string; label: string; description?: string };
export type NavColumn = { title: string; links: NavLink[]; all?: NavLink };
export type NavFeature = { eyebrow: string; title: string; body: string; cta: NavLink };
export type NavGroup = { id: string; label: string; columns: NavColumn[]; feature?: NavFeature };

const curriculumLinks: NavLink[] = curricula
  .filter((c) => c.page)
  .slice(0, 10)
  .map((c) => ({ href: `/curricula/${c.slug}`, label: c.short }));

const subjectLinks: NavLink[] = subjects
  .filter((s) => s.page)
  .map((s) => ({ href: `/subjects/${s.slug}`, label: s.name }));

export const megaNav: NavGroup[] = [
  {
    id: "tutoring",
    label: "Tutoring",
    columns: [
      {
        title: "Ways to learn",
        links: [
          { href: "/tutoring/online", label: "Online tutoring", description: "Live one-to-one lessons, wherever you are" },
          { href: "/tutoring/home", label: "Home tutoring", description: "A vetted tutor at your door in Islamabad and Rawalpindi" },
          { href: "/services", label: "Services", description: "Exam prep, homework help, coaching and more" },
        ],
      },
      {
        title: "How we work",
        links: [
          { href: "/how-it-works", label: "How it works", description: "From first message to first lesson" },
          { href: "/pricing", label: "Pricing", description: "Clear hourly rates and monthly plans" },
          { href: "/results", label: "Results", description: "Grade jumps, exam wins and admissions" },
        ],
      },
    ],
    feature: {
      eyebrow: "First lesson free",
      title: "Try a tutor before you commit",
      body: "Tell us the subject and syllabus. We match a tutor who has taught it, usually within a day.",
      cta: { href: "/book", label: "Book a free trial" },
    },
  },
  {
    id: "curricula",
    label: "Curricula",
    columns: [
      { title: "Top curricula", links: curriculumLinks, all: { href: "/curricula", label: "All curricula" } },
      {
        title: "Exams",
        links: [
          { href: "/exam-prep", label: "Exam prep", description: "Weekly study plans, past papers and progress reports" },
          { href: "/assessments", label: "Free assessment", description: "See exactly where your child stands" },
        ],
      },
    ],
  },
  {
    id: "subjects",
    label: "Subjects",
    columns: [{ title: "Popular subjects", links: subjectLinks, all: { href: "/subjects", label: "All subjects" } }],
    feature: {
      eyebrow: "Not sure where to start?",
      title: "Take the free assessment",
      body: "A short diagnostic that shows strengths, gaps and the next topics to work on.",
      cta: { href: "/assessments", label: "Start the assessment" },
    },
  },
  {
    id: "tutors",
    label: "Tutors",
    columns: [
      {
        title: "Find your tutor",
        links: [
          { href: "/tutors", label: "Find a tutor", description: "Browse vetted tutors by subject and curriculum" },
          { href: "/match", label: "Smart Tutor Match", description: "Answer 6 quick questions, get your best matches" },
        ],
      },
      {
        title: "Teach with us",
        links: [{ href: "/join-as-tutor", label: "Become a tutor", description: "Apply to join our tutor network" }],
      },
    ],
  },
  {
    id: "programs",
    label: "Programs",
    columns: [
      {
        title: "Programs",
        links: [
          { href: "/growing-stars", label: "Growing Stars", description: "Monthly reassessments, a study plan and a dedicated tutor" },
          { href: "/academy", label: "Academy", description: "Mentor-led GED, IGCSE, A Level and IB academies" },
          { href: "/leaderboard", label: "Leaderboard", description: "Top performers on our assessments" },
        ],
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    columns: [
      {
        title: "Read",
        links: [
          { href: "/blog", label: "Blog", description: "Study tips, exam news and advice" },
          { href: "/resources", label: "Parent guides", description: "Plain-English guides to curricula and exams" },
        ],
      },
      {
        title: "Company",
        links: [
          { href: "/about", label: "About us" },
          { href: "/faq", label: "FAQ" },
          { href: "/contact", label: "Contact" },
        ],
      },
    ],
  },
];

/** Small links in the dark bar above the header (desktop) and at the foot of the mobile menu. */
export const utilityNav: NavLink[] = [
  { href: "/app", label: "Parent dashboard" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/assessments", label: "Free assessment" },
  { href: "/join-as-tutor", label: "Become a tutor" },
];

/** Flat list kept for anything that still wants a simple top-level menu. */
export const mainNav = [
  { href: "/tutoring/online", label: "Online tutoring" },
  { href: "/tutoring/home", label: "Home tutoring" },
  { href: "/curricula", label: "Curricula" },
  { href: "/tutors", label: "Tutors" },
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How it works" },
] as const;

/** Static footer columns. The region-aware columns (curricula, subjects, cities) live in footer-region.tsx. */
export const footerNav = [
  {
    title: "Tutoring",
    links: [
      { href: "/tutoring/online", label: "Online tutoring" },
      { href: "/tutoring/home", label: "Home tutoring" },
      { href: "/services", label: "Services" },
      { href: "/pricing", label: "Pricing" },
      { href: "/results", label: "Results" },
      { href: "/tutors", label: "Find a tutor" },
      { href: "/match", label: "Smart Tutor Match" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/growing-stars", label: "Growing Stars" },
      { href: "/academy", label: "Academy" },
      { href: "/blog", label: "Blog" },
      { href: "/resources", label: "Guides for parents" },
      { href: "/join-as-tutor", label: "Teach with us" },
      { href: "/contact", label: "Contact" },
      { href: "/faq", label: "FAQ" },
    ],
  },
] as const;

export const legalNav = [
  { href: "/legal/privacy", label: "Privacy policy" },
  { href: "/legal/terms", label: "Terms of service" },
  { href: "/legal/refunds", label: "Refund policy" },
] as const;
