// Rich, unique content for the Islamabad flagship city page and its sector
// landing pages. Kept in one file so copy is easy to iterate on for SEO.

export type IslamabadTutor = {
  name: string;
  subject: string;
  curriculum: string;
  sector: string;
  photo: string;
  alt: string;
};

export const ISLAMABAD_TUTORS: IslamabadTutor[] = [
  {
    name: "Ayesha K.",
    subject: "O Level Physics",
    curriculum: "Cambridge O/A Level",
    sector: "F-7",
    photo: "https://ui-avatars.com/api/?name=Ayesha+K&background=0b1220&color=f5c451&size=256&bold=true",
    alt: "O Level Physics tutor in F-7 Islamabad",
  },
  {
    name: "Dr. Hassan R.",
    subject: "MDCAT Biology & Chemistry",
    curriculum: "MDCAT / FSc",
    sector: "F-10",
    photo: "https://ui-avatars.com/api/?name=Hassan+R&background=0b1220&color=f5c451&size=256&bold=true",
    alt: "MDCAT Biology tutor in F-10 Islamabad",
  },
  {
    name: "Sana M.",
    subject: "A Level Mathematics",
    curriculum: "Cambridge A Level",
    sector: "DHA Phase 2",
    photo: "https://ui-avatars.com/api/?name=Sana+M&background=0b1220&color=f5c451&size=256&bold=true",
    alt: "A Level Mathematics tutor in DHA Islamabad",
  },
  {
    name: "Bilal A.",
    subject: "Matric & FSc Physics",
    curriculum: "FBISE Matric / FSc",
    sector: "G-11",
    photo: "https://ui-avatars.com/api/?name=Bilal+A&background=0b1220&color=f5c451&size=256&bold=true",
    alt: "Matric Physics tutor in G-11 Islamabad",
  },
  {
    name: "Hira Z.",
    subject: "IGCSE English & Literature",
    curriculum: "Cambridge IGCSE",
    sector: "E-11",
    photo: "https://ui-avatars.com/api/?name=Hira+Z&background=0b1220&color=f5c451&size=256&bold=true",
    alt: "IGCSE English tutor in E-11 Islamabad",
  },
  {
    name: "Usman T.",
    subject: "O/A Level Chemistry",
    curriculum: "Cambridge O/A Level",
    sector: "Bahria Town Phase 4",
    photo: "https://ui-avatars.com/api/?name=Usman+T&background=0b1220&color=f5c451&size=256&bold=true",
    alt: "A Level Chemistry tutor in Bahria Town Islamabad",
  },
];

export const ISLAMABAD_TESTIMONIALS = [
  {
    parent: "Mrs. Farah Iqbal",
    sector: "DHA Phase 2, Islamabad",
    child: "Daughter, O Level (Beaconhouse Margalla Campus)",
    quote:
      "Our daughter went from a B in Physics to a solid A* in six months. The tutor from Tutoring Galaxy came home twice a week and never missed a session — even during Ramadan.",
  },
  {
    parent: "Dr. Adnan Sheikh",
    sector: "F-8/3, Islamabad",
    child: "Son, MDCAT prep (FSc Pre-Medical, ICB)",
    quote:
      "We tried two academies in Blue Area before this. The one-to-one MDCAT sessions at home cut travel time and my son scored 182/200. The AI report after every session was genuinely useful.",
  },
  {
    parent: "Mrs. Ayesha Nawaz",
    sector: "Bahria Town Phase 4, Islamabad",
    child: "Twin daughters, IGCSE (Roots International Islamabad)",
    quote:
      "Finding an IGCSE English Literature tutor willing to drive to Bahria was impossible. Tutoring Galaxy matched us in 48 hours and both girls got A*.",
  },
  {
    parent: "Mr. Zahid Malik",
    sector: "E-11/2, Islamabad",
    child: "Son, A Level Further Maths (LGS Defence)",
    quote:
      "The Further Maths tutor was easily the strongest we've worked with in Islamabad. Free trial made the decision risk-free.",
  },
  {
    parent: "Mrs. Rabia Ahmad",
    sector: "F-11 Markaz, Islamabad",
    child: "Daughter, Matric (ICAS)",
    quote:
      "For FBISE Matric the tutor knew the marking scheme inside out. Physics went from 68% to 91% in the board mocks.",
  },
  {
    parent: "Mr. Kamran Butt",
    sector: "G-10/4, Islamabad",
    child: "Son, FSc Pre-Engineering (ISOI)",
    quote:
      "Sessions were flexible around load-shedding hours and school timings. Highly recommended for FSc families in the G-sectors.",
  },
];

export const ISLAMABAD_FAQS = [
  {
    q: "How much do home tutors in Islamabad charge?",
    a: "Rates vary by level and tutor experience. In Islamabad, expect roughly PKR 1,500–2,500/hr for Matric and FSc, PKR 2,000–3,500/hr for O Level and IGCSE, and PKR 2,500–4,500/hr for A Level, MDCAT and ECAT specialists. Doctors and Cambridge trainers sit at the top of that range. Your first 30-minute trial is always free.",
  },
  {
    q: "Do tutors actually come to my house in DHA, Bahria Town or the F-sectors?",
    a: "Yes. We have separate panels of home tutors for the twin-cities. DHA Phase 1–6, Bahria Town Phase 1–8, all F-sectors (F-6 to F-11), E-7, E-11 and the G-sectors are covered. Bahria and DHA typically add a small travel allowance because of distance from the city centre.",
  },
  {
    q: "Which schools do your Islamabad tutors work with most?",
    a: "Our tutors regularly support families from Beaconhouse (Margalla, PECHS, Potohar), LGS (Defence, JT, Model Town), Roots International (Westridge, DHA, Faisal campuses), ICAS Islamabad, Islamabad Convent School, Froebel's, TNS Beaconhouse, City School, Bahria Town School and ISOI. Ask for a tutor familiar with your child's exact board and campus.",
  },
  {
    q: "Can you help with MDCAT and ECAT preparation at home?",
    a: "Yes — this is one of our strongest areas in Islamabad and Rawalpindi. Our MDCAT panel includes MBBS-qualified doctors and repeat top-scorers who teach Biology, Chemistry, Physics, English and Logical Reasoning to the PMDC/PMC syllabus. Sessions are usually 2–3 hours, 3–5 days a week for the 4–6 months leading up to the test.",
  },
  {
    q: "Do you cover FBISE Matric and FSc, or only O/A Level?",
    a: "Both. A large part of our Islamabad panel specialises in FBISE Matric and FSc (Pre-Engineering and Pre-Medical). Tutors are familiar with FBISE past papers, marking schemes and the board mocks used by ICB, ICG, ISOI and ICAS.",
  },
  {
    q: "How long does it take to be matched with a tutor?",
    a: "Same day for most F-sectors, E-11 and Blue Area. 24–48 hours for DHA and Bahria Town because the tutor pool is smaller. If we can't match you within 48 hours we tell you honestly — we don't send a random tutor just to fill the slot.",
  },
  {
    q: "Can I take online sessions instead of home visits?",
    a: "Yes. Many of our Islamabad families choose online for reasons like winter smog, distance, or matching with a very senior tutor who happens to live in Lahore or Karachi. Online sessions are recorded and the AI-generated report is emailed after each class.",
  },
  {
    q: "What if the first tutor isn't the right fit?",
    a: "Your first 30-minute trial is free. If it doesn't click, tell us within 24 hours and we'll match a different tutor at no cost. Most Islamabad families stay with their first-matched tutor.",
  },
];

export const ISLAMABAD_INTRO_PARAGRAPHS = [
  "Islamabad parents have never had more options — and never more noise. Between the academies on Jinnah Avenue, home tutor Facebook groups, and cousins-of-cousins on WhatsApp, finding a genuinely qualified tutor who will actually turn up in DHA, Bahria Town or the F-sectors is harder than it should be. That's exactly the problem Tutoring Galaxy was built to solve for capital families.",
  "We run a vetted panel of home and online tutors across Islamabad covering the four things that matter most here: Cambridge O Level and A Level, IGCSE, FBISE Matric and FSc, and MDCAT/ECAT entry-test preparation. Every tutor is interviewed, subject-tested and reference-checked before they teach a single Islamabad student. No shortcuts, no unverified profiles.",
  "Our tutors regularly support students from Beaconhouse Margalla, LGS Defence, Roots International (Westridge, DHA and Faisal campuses), ICAS, ISOI, Froebel's, Islamabad Convent, City School and Bahria Town School. For Matric and FSc, we work with ICB, ICG and the Federal Board's own model schools. Whether your child is at a Cambridge branch on Ataturk Avenue or an FBISE campus in G-11, we have a tutor who knows the syllabus and, more importantly, the marking scheme.",
  "Geographically, Islamabad has quirks other cities don't. Bahria Town and DHA are physically far from central Islamabad, and most tutors won't drive out there without a travel allowance. We maintain dedicated Bahria and DHA panels of tutors who live in or near those communities, so you get someone at your gate in under 30 minutes rather than an apology at 7pm. For the F-sectors (F-6, F-7, F-8, F-10, F-11), E-7, E-11 and Blue Area, matching is usually same-day. G-sectors and I-sectors: 24 hours.",
  "Rates in Islamabad sit slightly above Lahore and Karachi averages, mostly because our tutors are drawn from QAU, NUST, LUMS Islamabad campuses, doctors in training at PIMS and Shifa, and Cambridge-trained teachers who have left the academy circuit. Expect roughly PKR 2,000–3,500/hr for O/A Level and PKR 2,500–4,500/hr for MDCAT specialists. The first 30-minute trial class is free — no card, no commitment.",
  "One last thing that quietly changes outcomes: after every session, parents receive an AI-generated progress report — topics covered, concepts still weak, and what to work on before the next session. It replaces the vague \"session went well\" WhatsApp update with something you can actually act on.",
];

// ————————————————————————————————————————————————————————
// Sector-level long-form content (one entry per new area page)

export type SectorContent = {
  headline: string;
  paragraphs: string[];
  schools: string[];
  neighbourhoods: string[];
};

export const ISLAMABAD_SECTOR_CONTENT: Record<string, SectorContent> = {
  "dha-islamabad": {
    headline: "Home Tutors in DHA Islamabad — Phase 1 to Phase 5",
    schools: [
      "Beaconhouse Margalla Campus",
      "Roots International DHA",
      "LGS Defence",
      "The City School DHA",
      "Headstart School (DHA)",
    ],
    neighbourhoods: ["DHA Phase 1", "DHA Phase 2", "DHA Phase 3", "DHA Phase 4", "DHA Phase 5", "Sector J", "Sector K", "Sector M"],
    paragraphs: [
      "DHA Islamabad is where a large slice of the capital's Cambridge and IGCSE families now live — Phase 2 in particular has grown into a mini-Beaconhouse belt, with LGS Defence and Roots International DHA anchoring the corridor. Yet finding a home tutor willing to drive from the F or G sectors out to DHA at 5pm is famously difficult. Most academies simply refuse.",
      "Tutoring Galaxy maintains a dedicated DHA panel: tutors who either live in DHA or are within a 15-minute drive. That single decision changes availability from \"maybe next week\" to same-day for most O Level, A Level and IGCSE subjects. For Matric and FSc, matches typically confirm within 24 hours.",
      "What DHA parents ask us for most: A Level Mathematics, Further Mathematics, Physics and Chemistry (the Cambridge branches assess ferociously); IGCSE English Literature and Additional Maths for Roots families; and increasingly MDCAT preparation for Year 12 students pivoting to medicine. We also match a growing number of 11+ / GL Assessment tutors for families planning UK boarding schools.",
      "Rates in DHA sit at the higher end of Islamabad averages, roughly PKR 2,500–4,500/hr, reflecting both tutor calibre and travel. Sessions are usually 90 minutes to two hours, 2–4 times a week. Your first 30-minute trial class is complimentary — DHA parents typically know within one class whether the tutor is a fit.",
      "One piece of feedback we hear consistently from DHA households: reliability matters more than credentials. A Cambridge-trained tutor who cancels twice a month is worse than a competent tutor who is unfailingly punctual. We track attendance internally and rotate tutors off the panel who miss sessions. That's why the DHA panel stays small.",
      "If you're new to DHA Islamabad and just settling in from Karachi, Lahore or overseas, we can put together a small three-tutor plan (Maths, Sciences, English) for the current academic year in a single call. Book a free trial below and one of our matchers will reach out the same day.",
    ],
  },
  "f-7-islamabad": {
    headline: "Home Tutors in F-7 Islamabad",
    schools: [
      "Islamabad Convent School F-8/4",
      "Froebel's International F-7",
      "Beaconhouse F-8",
      "The City School F-7 Markaz",
      "Roots International Faisal Campus",
    ],
    neighbourhoods: ["F-7/1", "F-7/2", "F-7/3", "F-7/4", "F-6/3", "F-6/4", "Kohsar Market vicinity"],
    paragraphs: [
      "F-7 is the older, greener heart of Islamabad — quiet streets, Kohsar Market on one side, embassies within walking distance, and one of the highest concentrations of Cambridge and IGCSE students in the country. It's also the easiest sector in Islamabad to find a home tutor for, because most of our senior tutors live within a five-kilometre radius.",
      "We match F-7 households most often for O Level Mathematics, O Level Physics, IGCSE English (both First Language and Literature), A Level Economics, and A Level Chemistry. Sessions are typically after school on weekdays — 4:30pm to 7:30pm — with weekend slots reserved for double-period exam-run tutoring in October, November, April and May.",
      "For Islamabad Convent, Froebel's and Beaconhouse F-8 families, we recommend starting the tutor conversation in Year 10 or lower-sixth (AS) — not the week before mocks. The tutors who deliver A* grades are usually booked out three months in advance during exam season. Same-day matching is still very achievable in F-7 outside those windows.",
      "For families closer to Kohsar Market and F-6, we also handle a steady flow of 11+ / SSAT prep for children heading to UK or US boarding schools, and increasingly SAT prep for students applying to LUMS, NUST, Habib and overseas universities. All test-prep tutors have taken and scored in the top decile of the test they teach.",
      "Rates in F-7 sit around PKR 2,000–3,500/hr for O/A Level and IGCSE, slightly less for FBISE Matric and FSc. There is no travel surcharge for F-6, F-7 or F-8. Your first trial class is free — same-day booking is available most weekdays.",
    ],
  },
  "e-11-islamabad": {
    headline: "Home Tutors in E-11 Islamabad",
    schools: [
      "ICAS Islamabad (International Community School)",
      "The City School E-11",
      "Roots International E-11",
      "Beaconhouse Potohar Campus",
      "Bahria College E-8",
    ],
    neighbourhoods: ["E-11/1", "E-11/2", "E-11/3", "E-11/4", "Multi Gardens (E-11)", "Alnoor Colony"],
    paragraphs: [
      "E-11 has grown quickly over the last decade — Multi Gardens, D-17 next door, and an increasing number of Cambridge and IGCSE students at ICAS, Roots International E-11 and The City School. Because the sector is spread across four sub-sectors and gated societies, families here often struggle to find tutors willing to navigate the internal roads. Our E-11 panel is built specifically for this.",
      "The most-requested subjects in E-11 are IGCSE Mathematics and Additional Maths, O Level Physics and Chemistry, A Level Biology (a lot of pre-medical families here), and MDCAT preparation. ICAS Islamabad follows Cambridge Pathway so we assign tutors who have taught its exact Checkpoint, IGCSE and A Level trajectory.",
      "For FBISE Matric and FSc students in E-11 — including Bahria College E-8 families — we have a dedicated pool of tutors from QAU, NUST and PIMS who teach to the Federal Board syllabus, not a mash-up of it. Board past-paper walk-throughs form the backbone of every session in the six weeks before mocks.",
      "One local factor worth flagging: Multi Gardens and D-17 sit behind checkpoints, so tutors need to be pre-registered at your entry gate. Once we match you, we send the tutor's CNIC and vehicle details so your society can clear entry in advance — no repeated 20-minute holdups at the barrier.",
      "Rates in E-11 sit around PKR 1,800–3,200/hr depending on level. Same-day matching is possible for most subjects; MDCAT specialists are best booked 2–3 weeks in advance during peak season. Your first 30-minute trial is free.",
    ],
  },
  "bahria-town-islamabad": {
    headline: "Home Tutors in Bahria Town Islamabad — Phase 1 to Phase 8",
    schools: [
      "Roots International Bahria",
      "Bahria Town School & College",
      "Beaconhouse Bahria Town",
      "The City School Bahria",
      "Headstart School (Bahria)",
    ],
    neighbourhoods: [
      "Bahria Town Phase 1",
      "Bahria Town Phase 2",
      "Phase 3 (Awami Villas)",
      "Phase 4 (Safari Villas)",
      "Phase 6",
      "Phase 7",
      "Phase 8 (River View, Overseas)",
      "Bahria Enclave",
    ],
    paragraphs: [
      "Bahria Town is a city inside a city. From Phase 1 near the entrance to Phase 8 River View and the newer Bahria Enclave sitting behind Chak Shahzad, distances between phases can hit 20 minutes even without traffic. Most tutors in Islamabad simply won't drive to Bahria — and the ones who will often want to be paid for the round trip.",
      "We built the Bahria panel around tutors who live inside Bahria itself, plus a smaller group in DHA and I-8 who accept the travel. That local base is why we can promise a tutor at your gate within 24–48 hours for most O Level, A Level, IGCSE, Matric and FSc subjects — rather than the week-long waits families see with tutor academies based in the city centre.",
      "For Roots International Bahria and Beaconhouse Bahria families, we assign tutors who have taught their exact IGCSE and A Level scheme of work — including edexcel branches where relevant. For Bahria Town School & College families sitting FBISE Matric and FSc, we deploy tutors from NUST, QAU and PIMS with strong Federal Board past-paper track records.",
      "MDCAT prep in Bahria is a specific case: because the round trip to city-centre academies eats 90 minutes of study time daily, we see an unusually high share of Bahria families opt for one-to-one MDCAT sessions at home, 3–4 times a week. Our doctors and MDCAT top-scorers cover Biology, Chemistry, Physics, English and Logical Reasoning to the PMDC / PMC syllabus.",
      "Society-gate entry: we pre-register every Bahria-bound tutor with your Phase gate the day before the first visit, using CNIC and vehicle plate. This saves 15–20 minutes per session over the course of a term.",
      "Rates in Bahria sit around PKR 2,000–3,800/hr with a small travel allowance included for Phase 6 and beyond. Trial class is free — book it below and expect a call back the same day.",
    ],
  },
  "f-10-islamabad": {
    headline: "Home Tutors in F-10 Islamabad",
    schools: [
      "ISOI (Islamabad School of International Order)",
      "The City School F-10",
      "Beaconhouse F-10 (Newlands)",
      "Islamabad Model College F-10/4",
      "Bahria College E-8 (adjacent)",
    ],
    neighbourhoods: ["F-10/1", "F-10/2", "F-10/3", "F-10/4", "F-10 Markaz", "F-11 border"],
    paragraphs: [
      "F-10 sits at the intersection of old and new Islamabad — quieter than F-7, better served by the Islamabad Model College network, and home to ISOI, one of the strongest Cambridge branches in the capital. Families here typically need tutoring that covers both boards: Cambridge O/A Level or IGCSE for one child, and FBISE Matric or FSc for another.",
      "Our F-10 panel is built for exactly that dual-board reality. Every senior tutor we assign in F-10 has taught both the Cambridge and Federal Board syllabi in the past three years, so a family can use the same tutor across two children on two different curricula — a small operational win that meaningfully cuts costs.",
      "The subjects we cover most in F-10 are O Level Mathematics and Physics, A Level Biology and Chemistry, FSc Physics and Chemistry (heavy demand from Islamabad Model College F-10/4 students), and MDCAT / ECAT preparation. Sessions are typically weekday evenings and Saturday mornings, with double periods layered in six weeks before mocks or the actual entry tests.",
      "F-10 also has a large cluster of families preparing for MDCAT — partly because ISOI and IMCB feed a lot of pre-medical students, and partly because the sector is a five-minute drive from PIMS, where several of our MDCAT tutors are house officers. Home sessions save Islamabad Model College and ISOI students a 45-minute round trip to academies in Blue Area.",
      "Rates in F-10 sit around PKR 1,800–3,500/hr with no travel allowance for the F-sectors. Same-day matching is standard for O/A Level; MDCAT tutors sometimes require 3–5 days of notice during peak season. Your first 30-minute trial class is free.",
    ],
  },
};
