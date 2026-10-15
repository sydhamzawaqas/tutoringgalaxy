/**
 * Plans from the old site's pricing page (PKR). The old site said "4 sessions" in one line and
 * "5 sessions" in another for Starter; 4 is used here pending client confirmation.
 */
export type Plan = {
  slug: string;
  name: string;
  price: string;
  period: string;
  summary: string;
  subjects: string;
  features: string[];
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    slug: "starter",
    name: "Starter",
    price: "PKR 15,000",
    period: "per month",
    summary: "One subject, steady weekly support.",
    subjects: "1 subject",
    features: ["4 one-to-one lessons a month", "Monthly progress note for parents", "WhatsApp support"],
  },
  {
    slug: "growth",
    name: "Growth",
    price: "PKR 35,000",
    period: "per month",
    summary: "Two core subjects, more practice.",
    subjects: "Up to 2 subjects",
    features: ["8 one-to-one lessons a month", "Monthly progress report", "AI practice between lessons", "Priority tutor matching"],
    featured: true,
  },
  {
    slug: "exam",
    name: "Exam programme",
    price: "Custom",
    period: "",
    summary: "Full preparation for O/A Level, IB or MDCAT.",
    subjects: "All exam subjects",
    features: ["A lead tutor who coordinates the plan", "Mock exams marked to the mark scheme", "Parent dashboard and fortnightly reports"],
  },
];

export const pricingNotes = [
  "Prices are in Pakistani rupees. Families abroad are quoted in their local currency.",
  "The first lesson is free and needs no payment details.",
  "Hourly lessons are available on request.",
];
