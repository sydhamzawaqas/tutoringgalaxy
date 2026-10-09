export const trialSteps = [
  { title: "Tell us what you need", body: "Subject, exam board and level, and whether you want online or home lessons.", mark: "2 minutes" },
  { title: "Meet your matched tutor", body: "We suggest a tutor who has taught that syllabus and send their profile on WhatsApp.", mark: "within 1 day" },
  { title: "Take the first lesson free", body: "Afterwards you get a short note on level, gaps and a plan. Continue only if it's right.", mark: "free" },
] as const;

export const ongoingSteps = [
  { title: "Weekly lessons", body: "One-to-one, at times that suit you, following a plan built around the syllabus and your child's gaps." },
  { title: "Practice between lessons", body: "Exam-style questions with feedback, so lesson time goes on what's hardest." },
  { title: "Progress you can see", body: "Notes after lessons and a monthly report for parents: what was covered, how practice went, what's next." },
] as const;
