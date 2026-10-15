export type Faq = { q: string; a: string; topics: ("general" | "pricing" | "trial" | "online" | "home" | "ai")[] };

export const faqs: Faq[] = [
  { q: "How does the free trial lesson work?", a: "Tell us the subject, exam board and level. We match a tutor who has taught that syllabus, usually within a day, and the first lesson is free. You don't need to give payment details.", topics: ["general", "trial"] },
  { q: "Do you teach online and at home?", a: "Online lessons are available in every country we serve. Home tutoring is available in cities where we have tutors near you, starting with Islamabad and Rawalpindi.", topics: ["general", "online", "home"] },
  { q: "Which curricula do you cover?", a: "Cambridge O Level, IGCSE and A Level, Edexcel, GCSE, IB, Matric and FSc, MDCAT, ECAT, SAT, AP and GED.", topics: ["general"] },
  { q: "How do you choose a tutor for my child?", a: "We look at the exact syllabus and level, the topics your child finds hard, your preferred times, and whether you want online or home lessons. Then we suggest a tutor and share their profile before the trial.", topics: ["general", "trial"] },
  { q: "Can we change tutors?", a: "Yes. If the tutor isn't the right fit, tell us and we'll match someone else at no extra cost.", topics: ["general"] },
  { q: "How do parents see progress?", a: "After lessons the tutor sends a short note. On monthly plans you also get a progress report showing topics covered, scores on practice and what comes next.", topics: ["general", "pricing"] },
  { q: "How much does tutoring cost?", a: "Monthly plans start at PKR 15,000 for one subject. Exam programmes are quoted after the free trial. Families abroad are quoted in local currency.", topics: ["pricing"] },
  { q: "What is AI practice?", a: "Between lessons, students can practise exam-style questions and get step-by-step feedback checked against the mark scheme. It guides students to the answer rather than giving it away, and tutors can see what was practised.", topics: ["ai"] },
];

export const faqsFor = (topic: Faq["topics"][number]) => faqs.filter((f) => f.topics.includes(topic));
