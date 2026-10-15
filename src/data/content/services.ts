/**
 * Services (/services). Ported from the old site: routes/services.tsx (six services) and
 * components/site/sections.tsx ServicesGrid (six platform features).
 */
import { ASSESSMENT_HREF } from "./growing-stars";

export type IconKey =
  | "home" | "monitor" | "brain" | "target" | "compass" | "award" | "book" | "trophy" | "sparkles" | "users";

export type Service = { slug: string; icon: IconKey; title: string; body: string; href: string; cta: string; points?: string[] };

export const servicesIntro = {
  eyebrow: "What We Offer",
  title: "Comprehensive tutoring & assessment solutions",
  lead: "From home tutoring in your living room to AI assessments that map your child's growth — built around results.",
};

export const services: Service[] = [
  { slug: "home", icon: "home", title: "Home Tutoring", body: "Verified tutors visit your home across Islamabad, Rawalpindi, Lahore, Karachi, Dubai and more.", href: "/tutoring/home", cta: "Home tutoring" },
  { slug: "online", icon: "monitor", title: "Online Tutoring", body: "HD 1:1 sessions across Pakistan, UAE, UK and Australia — flexible scheduling.", href: "/tutoring/online", cta: "Online tutoring" },
  { slug: "assessment", icon: "brain", title: "AI Assessment", body: "Adaptive tests measure 5 dimensions and return a Growing Stars Score.", href: ASSESSMENT_HREF, cta: "Take the assessment" },
  { slug: "exam-prep", icon: "target", title: "Exam Preparation", body: "Specialist preparation for O/A Level, IGCSE, IB, GCSE, HSC, VCE, MDCAT & ECAT.", href: "/exam-prep", cta: "Exam preparation" },
  { slug: "career", icon: "compass", title: "Career Guidance", body: "AI-powered career match plus expert counselling for university applications.", href: "/growing-stars", cta: "Growing Stars Program" },
  { slug: "awards", icon: "award", title: "Scholarships & Awards", body: "Top performers earn Bronze, Silver, Gold and Diamond Star rewards.", href: "/leaderboard", cta: "See the leaderboard" },
];

/** Old ServicesGrid: "Comprehensive Solutions for Every Student". */
export const platformIntro = { eyebrow: "What We Offer", title: "Comprehensive Solutions for Every Student" };

export const platformFeatures: { icon: IconKey; title: string; body: string }[] = [
  { icon: "brain", title: "AI-Powered Adaptive Tests", body: "Questions adapt to your ability for accurate assessment." },
  { icon: "compass", title: "Comprehensive Skill Analysis", body: "Academic, cognitive and aptitude insights." },
  { icon: "book", title: "Personalized Learning Path", body: "AI creates a custom plan for your growth." },
  { icon: "trophy", title: "Regional Leaderboards", body: "Compete with top students in your region." },
  { icon: "sparkles", title: "Career Guidance", body: "Discover the best path for your future." },
  { icon: "users", title: "Star Awards & Scholarships", body: "Be recognized. Earn. Grow. Shine." },
];

/** Exam boards named in the Exam Preparation service, linked where we have a page. */
export const serviceExams: { label: string; href?: string }[] = [
  { label: "O Level", href: "/exam-prep/o-level" },
  { label: "A Level", href: "/exam-prep/a-level" },
  { label: "IGCSE", href: "/exam-prep/igcse" },
  { label: "IB", href: "/exam-prep/ib" },
  { label: "GCSE", href: "/exam-prep/gcse" },
  { label: "HSC" },
  { label: "VCE" },
  { label: "MDCAT", href: "/curricula/mdcat" },
  { label: "ECAT", href: "/curricula/ecat" },
];
