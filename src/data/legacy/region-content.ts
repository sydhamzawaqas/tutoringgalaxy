// Region-specific content for the dynamic /regions/$region template.
import type { Region } from "./seo";

export type RegionExtra = {
  tagline: string;
  intro: string;
  benefits: string[]; // assessment benefits, region-flavored
  leaderboard: { name: string; city: string; score: number }[];
  faqs: { q: string; a: string }[];
  ctaTitle?: string;
  ctaSubtitle?: string;
};

const COMMON_BENEFITS = [
  "Personalised Growing Stars Score across 5 dimensions",
  "Tutor matching based on your weakest dimension",
  "Tracked progress with periodic re-assessments",
  "Free 1-hour trial class with a top-matched tutor",
];

export const REGION_EXTRAS: Record<Region["slug"], RegionExtra> = {
  pakistan: {
    tagline: "Pakistan's #1 AI-powered tutoring platform",
    intro: "Verified home & online tutors across Islamabad, Lahore, Karachi and Rawalpindi — covering O/A Level, Matric, FSc, MDCAT and ECAT.",
    benefits: COMMON_BENEFITS,
    leaderboard: [
      { name: "Ayesha K.", city: "Islamabad", score: 96 },
      { name: "Hamza R.", city: "Lahore", score: 93 },
      { name: "Fatima S.", city: "Karachi", score: 91 },
      { name: "Daniyal M.", city: "Rawalpindi", score: 88 },
      { name: "Zainab A.", city: "Lahore", score: 86 },
    ],
    faqs: [
      { q: "Do you offer home tutoring in Pakistan?", a: "Yes — we send vetted home tutors across Islamabad, Rawalpindi, Lahore and Karachi, with online options nationwide." },
      { q: "Which boards do you cover?", a: "Federal & Provincial Matric, FSc, Cambridge O/A Level, IGCSE, IB, plus MDCAT and ECAT prep." },
      { q: "How do you match tutors?", a: "We use your Growing Stars assessment to identify weak areas, then match a specialist tutor for that exact need." },
    ],
  },
  uae: {
    tagline: "Premium online tutoring across the Emirates",
    intro: "Top tutors for IGCSE, A Level and IB students in Dubai, Abu Dhabi and across the UAE — online from anywhere.",
    benefits: COMMON_BENEFITS,
    leaderboard: [
      { name: "Mariam H.", city: "Dubai", score: 94 },
      { name: "Yusuf A.", city: "Abu Dhabi", score: 91 },
      { name: "Layla K.", city: "Dubai", score: 89 },
      { name: "Omar S.", city: "Sharjah", score: 86 },
      { name: "Noor R.", city: "Abu Dhabi", score: 84 },
    ],
    faqs: [
      { q: "Are tutors familiar with UAE schools?", a: "Yes — our tutors regularly support students from GEMS, Repton, Dubai College, JESS and other top UAE schools." },
      { q: "Do you support IB and IGCSE?", a: "Both — including IB MYP, IB DP, Cambridge IGCSE and A Level across all major subjects." },
    ],
  },
  uk: {
    tagline: "Trusted online GCSE, A Level and IB tuition",
    intro: "1-to-1 online tutoring for UK students — GCSE, A Level and IB — with progress tracked through our Growing Stars assessments.",
    benefits: COMMON_BENEFITS,
    leaderboard: [
      { name: "Olivia P.", city: "London", score: 95 },
      { name: "James W.", city: "Manchester", score: 92 },
      { name: "Sophie T.", city: "London", score: 90 },
      { name: "Ethan B.", city: "Birmingham", score: 87 },
      { name: "Amelia C.", city: "Leeds", score: 85 },
    ],
    faqs: [
      { q: "Do you cover all UK exam boards?", a: "Yes — AQA, Edexcel, OCR, WJEC and CIE across GCSE and A Level." },
      { q: "Is tutoring online or in-person?", a: "Online by default, with optional in-person tutors in London and Manchester." },
    ],
  },
  australia: {
    tagline: "HSC, VCE and IB specialists — online Australia-wide",
    intro: "Tutors who know the HSC, VCE and IB inside-out — supporting students in Sydney, Melbourne and across Australia.",
    benefits: COMMON_BENEFITS,
    leaderboard: [
      { name: "Charlotte M.", city: "Sydney", score: 94 },
      { name: "Jack R.", city: "Melbourne", score: 91 },
      { name: "Ava L.", city: "Sydney", score: 89 },
      { name: "Liam K.", city: "Brisbane", score: 86 },
      { name: "Mia P.", city: "Melbourne", score: 84 },
    ],
    faqs: [
      { q: "Do you align with HSC and VCE syllabi?", a: "Yes — every tutor maps lessons to the official HSC (NESA) or VCAA VCE study designs." },
      { q: "Can I get help with the ATAR?", a: "Absolutely — we focus on the subjects that maximise your scaled ATAR." },
    ],
  },
  usa: {
    tagline: "SAT, AP and K-12 tutoring — online across the US",
    intro: "Top-rated online tutors for SAT, AP, IB and Common Core — supporting students from New York to Los Angeles.",
    benefits: COMMON_BENEFITS,
    leaderboard: [
      { name: "Emma J.", city: "New York", score: 96 },
      { name: "Noah D.", city: "Los Angeles", score: 93 },
      { name: "Isabella M.", city: "Chicago", score: 91 },
      { name: "Lucas K.", city: "Boston", score: 88 },
      { name: "Sophia R.", city: "San Francisco", score: 86 },
    ],
    faqs: [
      { q: "Do you offer SAT prep?", a: "Yes — full SAT prep with diagnostic tests, score tracking and weekly practice." },
      { q: "Which AP subjects are covered?", a: "All major APs including Calculus AB/BC, Physics 1/2/C, Chemistry, Biology, CS A, English Lang & Lit, and more." },
    ],
  },
  canada: {
    tagline: "Ontario curriculum, IB & AP tutoring — coast to coast",
    intro: "Online tutors aligned to the Ontario curriculum, IB, AP and SAT — for students in Toronto, Vancouver and across Canada.",
    benefits: COMMON_BENEFITS,
    leaderboard: [
      { name: "Olivia B.", city: "Toronto", score: 95 },
      { name: "Ethan T.", city: "Vancouver", score: 92 },
      { name: "Ava M.", city: "Montreal", score: 90 },
      { name: "Liam D.", city: "Calgary", score: 87 },
      { name: "Chloe S.", city: "Toronto", score: 85 },
    ],
    faqs: [
      { q: "Do tutors follow the Ontario curriculum?", a: "Yes — we align to the OSSD curriculum expectations and report-card categories." },
      { q: "Can I prep for university admissions?", a: "Yes — SAT, AP and IB prep, plus subject mastery for top Canadian and US universities." },
    ],
  },
  "saudi-arabia": {
    tagline: "Tutors for international and Saudi national schools",
    intro: "Verified online tutors for IGCSE, A Level, IB, SAT and the Saudi National Curriculum — across Riyadh, Jeddah and KSA.",
    benefits: COMMON_BENEFITS,
    leaderboard: [
      { name: "Aisha A.", city: "Riyadh", score: 94 },
      { name: "Mohammed Z.", city: "Jeddah", score: 91 },
      { name: "Sara K.", city: "Riyadh", score: 89 },
      { name: "Khalid R.", city: "Dammam", score: 86 },
      { name: "Hana M.", city: "Jeddah", score: 84 },
    ],
    faqs: [
      { q: "Do you support the Saudi National Curriculum?", a: "Yes — Arabic-medium and English-medium support across MoE curriculum subjects." },
      { q: "Are female tutors available?", a: "Yes — we have qualified female tutors available for all subjects and grade levels." },
    ],
  },
  qatar: {
    tagline: "Premium tutoring across Doha and Qatar",
    intro: "Verified online and home tutors for IGCSE, A Level, IB and SAT — supporting students at top schools across Doha, Lusail and Al Rayyan.",
    benefits: COMMON_BENEFITS,
    leaderboard: [
      { name: "Hessa A.", city: "Doha", score: 95 },
      { name: "Khalid M.", city: "Lusail", score: 92 },
      { name: "Sara N.", city: "Doha", score: 90 },
      { name: "Faisal R.", city: "Al Rayyan", score: 87 },
      { name: "Mariam K.", city: "Doha", score: 85 },
    ],
    faqs: [
      { q: "Which Qatar schools do you support?", a: "Our tutors work with students from Doha College, ACS Doha, Compass International, Qatar Academy, DPS-MIS and other leading schools." },
      { q: "Do you cover IGCSE, A Level and IB?", a: "Yes — Cambridge & Edexcel IGCSE and A Level, plus IB MYP and DP across all major subjects." },
      { q: "Are tutors available online?", a: "All tutors are available 1-on-1 online across Qatar, with selected home tutoring in Doha." },
    ],
  },
  oman: {
    tagline: "Trusted online tutors across the Sultanate of Oman",
    intro: "Verified online and home tutors for IGCSE, A Level, IB and SAT — supporting students in Muscat, Salalah and Sohar.",
    benefits: COMMON_BENEFITS,
    leaderboard: [
      { name: "Salim A.", city: "Muscat", score: 94 },
      { name: "Maryam K.", city: "Muscat", score: 91 },
      { name: "Hamed R.", city: "Salalah", score: 88 },
      { name: "Reem M.", city: "Sohar", score: 86 },
      { name: "Zayd N.", city: "Muscat", score: 84 },
    ],
    faqs: [
      { q: "Do you support schools in Muscat?", a: "Yes — tutors regularly support students from ABA Oman, TAISM, Muscat International School and the British School Muscat." },
      { q: "Which curricula do you cover in Oman?", a: "Cambridge & Edexcel IGCSE, A Level, IB MYP/DP and SAT prep, plus support for the Omani national curriculum on request." },
    ],
  },
  bahrain: {
    tagline: "Premium online tutoring across Bahrain",
    intro: "1-on-1 tutors for IGCSE, A Level, IB and SAT — supporting students at top schools across Manama and Riffa.",
    benefits: COMMON_BENEFITS,
    leaderboard: [
      { name: "Latifa A.", city: "Manama", score: 95 },
      { name: "Ahmed S.", city: "Riffa", score: 91 },
      { name: "Noor M.", city: "Manama", score: 89 },
      { name: "Khalid R.", city: "Riffa", score: 86 },
      { name: "Dana K.", city: "Manama", score: 84 },
    ],
    faqs: [
      { q: "Which Bahrain schools do you support?", a: "St Christopher's, British School of Bahrain, Bahrain Bayan, Ibn Khuldoon and other leading international schools." },
      { q: "Is tutoring online or home-based?", a: "Default is 1-on-1 online; home tutoring available on request in Manama and Riffa." },
    ],
  },
  kuwait: {
    tagline: "Expert online tutors across Kuwait",
    intro: "Verified tutors for IGCSE, A Level, IB and SAT — supporting students in Kuwait City, Hawalli and across the country.",
    benefits: COMMON_BENEFITS,
    leaderboard: [
      { name: "Fahad A.", city: "Kuwait City", score: 95 },
      { name: "Shamma K.", city: "Kuwait City", score: 92 },
      { name: "Yousef M.", city: "Hawalli", score: 89 },
      { name: "Asma R.", city: "Kuwait City", score: 87 },
      { name: "Talal S.", city: "Hawalli", score: 85 },
    ],
    faqs: [
      { q: "Which Kuwait schools do you support?", a: "American School of Kuwait, British School of Kuwait, Kuwait English School, Gulf English School and other leading international schools." },
      { q: "Do you cover IGCSE, A Level and IB?", a: "Yes — full Cambridge & Edexcel IGCSE and A Level, plus IB MYP and DP across all major subjects." },
    ],
  },
};
