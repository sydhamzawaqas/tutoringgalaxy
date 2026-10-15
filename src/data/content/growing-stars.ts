/**
 * Growing Stars Program (/growing-stars). Ported from the old site: routes/growing-stars.tsx.
 * Star tier thresholds come from the old student dashboard (routes/dashboard.tsx tierFor()).
 */

/** Where "take the AI assessment" links go. The assessments area is being rebuilt in Phase 2. */
// CONFIRM: switch to the final assessment route once /assessments ships.
export const ASSESSMENT_HREF = "/assessments";

export const growingStarsHero = {
  eyebrow: "Exclusive Program",
  title: "Growing Stars",
  accent: "Program",
  lead: "A complete learning ecosystem designed to nurture your talent, track your progress, and guide you toward a successful future.",
  whatsapp: "Hi! I'd like to know more about the Growing Stars Program.",
};

export const growingStarsFeatures = [
  { icon: "calendar", title: "Monthly Reassessment", body: "Track your progress with AI-powered reassessments every month to measure real growth." },
  { icon: "book", title: "Personalized Study Plan", body: "Your AI creates and updates your study roadmap based on your latest results." },
  { icon: "user", title: "Dedicated Tutor Support", body: "One expert tutor assigned to your journey for consistency and rapport." },
  { icon: "file", title: "Parent Progress Reports", body: "Detailed monthly reports sent directly to parents with insights and next steps." },
  { icon: "award", title: "Star Awards & Recognition", body: "Earn Diamond, Gold, Silver, and Bronze Stars based on your Growing Stars Score." },
  { icon: "compass", title: "Career Guidance Roadmap", body: "AI-driven career pathway recommendations aligned with your strengths and goals." },
] as const;

export type GrowingStarsPlan = {
  slug: string;
  name: string;
  price: string;
  period: string;
  summary: string;
  features: string[];
  featured?: boolean;
};

// CONFIRM: prices are from the old site. They differ from the main tutoring plans on /pricing
// (which start at PKR 15,000), so the client should confirm they are still offered.
export const growingStarsPlans: GrowingStarsPlan[] = [
  {
    slug: "starter",
    name: "Starter",
    price: "PKR 3,500",
    period: "/month",
    summary: "Perfect for students beginning their journey",
    features: ["Monthly AI Assessment", "2 Tutor Sessions/month", "Parent Progress Report", "Basic Career Guidance"],
  },
  {
    slug: "growing-star",
    name: "Growing Star",
    price: "PKR 7,500",
    period: "/month",
    summary: "Most popular — comprehensive support",
    features: ["Monthly AI Assessment", "4 Tutor Sessions/month", "Detailed Parent Reports", "Career Guidance Roadmap", "Star Awards Eligibility", "WhatsApp Priority Support"],
    featured: true,
  },
  {
    slug: "diamond",
    name: "Diamond",
    price: "PKR 14,000",
    period: "/month",
    summary: "Elite program for top achievers",
    // CONFIRM: "8 Tutor Sessions" had no period on the old site; read as per month.
    features: ["Weekly AI Assessment", "8 Tutor Sessions", "Weekly Parent Reports", "Full Career Planning", "Scholarship Opportunities", "University Application Support", "24/7 Priority Support"],
  },
];

export type StarTier = "Diamond" | "Gold" | "Silver" | "Bronze";

// CONFIRM: thresholds are the Growing Stars Score (GSS, 0–100) bands from the old dashboard.
// The old quiz results page used different bands (90/80/70), so the client should pick one.
export const starTiers: { tier: StarTier; min: number; body: string }[] = [
  { tier: "Diamond", min: 85, body: "The highest star. Top of the regional leaderboard." },
  { tier: "Gold", min: 70, body: "Strong, consistent results across every dimension." },
  { tier: "Silver", min: 55, body: "Solid progress, with clear next steps in your study plan." },
  { tier: "Bronze", min: 40, body: "Your first star. Monthly reassessments show how fast you climb." },
];

export const tierFor = (score: number): StarTier | null => starTiers.find((t) => score >= t.min)?.tier ?? null;

/** "Ready to Become a Growing Star?" — take the assessment first, then join the program. */
export const getStartedSteps = [
  { title: "Take the AI assessment", body: "Take the AI assessment first to find out your current level." },
  { title: "Get your Growing Stars Score", body: "Your score places you in a star tier and shows your strengths and gaps." },
  { title: "Choose your plan", body: "Pick Starter, Growing Star or Diamond. One expert tutor is assigned to your journey." },
  { title: "Reassess every month", body: "Monthly reassessments update your study plan and your parents' progress report." },
];
