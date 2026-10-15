/**
 * Guides for parents (/resources). Evergreen and general on purpose: no dates, fees, statistics or
 * weightings that change each year. Where a rule is set by an exam board or regulator, the guide says
 * to check the official source. The client should review these before launch.
 */
export type ResourceSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type Resource = {
  slug: string;
  title: string;
  summary: string;
  /** Curriculum slugs this guide relates to, for links back to curriculum pages. */
  curricula: string[];
  sections: ResourceSection[];
  /** Prefilled WhatsApp message for the closing call to action. */
  whatsappMessage: string;
};

export const resources: Resource[] = [
  {
    slug: "o-level-or-igcse",
    title: "O Level or IGCSE: what's the difference?",
    summary:
      "Both are Cambridge qualifications taken at around 16, and universities treat them the same way. The differences are in tiers, subject options and how some papers are set.",
    curricula: ["o-level", "igcse"],
    whatsappMessage: "Hi Tutoring Galaxy, I'd like advice on O Level or IGCSE and a free trial lesson.",
    sections: [
      {
        id: "the-short-answer",
        heading: "The short answer",
        paragraphs: [
          "Cambridge O Level and Cambridge IGCSE are both set and marked by Cambridge International. They are taken at the same age, usually over Grades 9 to 11, and lead to the same next steps: A Level, the IB Diploma, FSc or other pre-university courses.",
          "Universities and schools treat a good grade in either as the same level of achievement. For most families the choice is made by the school, because a school usually offers one or the other for each subject. Where you do have a choice, the differences below are the ones worth knowing.",
        ],
      },
      {
        id: "how-they-differ",
        heading: "How they differ",
        paragraphs: [
          "O Level is offered in a smaller group of countries, mainly in South Asia, the Gulf and parts of Africa. IGCSE is offered much more widely and has a larger range of subjects.",
          "The biggest practical difference is tiers. Many IGCSE subjects have a Core and an Extended tier. The Extended tier covers more content and is needed for the top grades, while Core caps the highest grade available. O Level subjects are generally taken at a single level, so every student sits the same papers.",
        ],
        list: [
          "Syllabus codes differ for the same subject, for example O Level Mathematics is 4024 and IGCSE Mathematics is 0580.",
          "Some IGCSE subjects offer coursework or alternative practical papers. O Level science is assessed through written papers, including an alternative to practical paper.",
          "Content overlaps a lot, but it isn't identical. Topic order, the depth of some topics and the style of questions vary.",
        ],
      },
      {
        id: "which-is-harder",
        heading: "Is one harder than the other?",
        paragraphs: [
          "Not in a simple way. A student taking Extended IGCSE and a student taking O Level in the same subject are working at a similar level. Because O Level has no lower tier, some students find it less forgiving if they are weaker in a subject, while IGCSE Core gives them a safer route to a pass.",
          "The more useful question is which syllabus your child is actually entered for. Past papers, mark schemes and textbooks are written for a specific syllabus code, so practising from the wrong one wastes time.",
        ],
      },
      {
        id: "for-students-in-pakistan",
        heading: "For students in Pakistan",
        paragraphs: [
          "If your child plans to continue in Pakistan, for example into FSc, a local university or a medical or engineering college, they will usually need an equivalence certificate from the Inter Board Committee of Chairmen (IBCC). IBCC sets which subjects are needed for equivalence with Matric, and these normally include Urdu, Islamiyat and Pakistan Studies for Pakistani students.",
          "Requirements can change, so check the current IBCC rules before choosing subjects, not after the exams.",
        ],
      },
      {
        id: "how-to-decide",
        heading: "How to decide",
        paragraphs: ["If your school gives you a choice, these questions usually settle it:"],
        list: [
          "Which subjects does your child want for A Level or the IB? Make sure the route keeps those doors open.",
          "Is your child confident in the subject? If not, an IGCSE Core option may be a sensible safety net.",
          "Will your child move country or school? IGCSE is recognised and offered in more places.",
          "Which exam series can your child sit, and where? Check with the school or exam centre.",
        ],
      },
      {
        id: "how-a-tutor-helps",
        heading: "How a tutor helps",
        paragraphs: [
          "A good tutor starts by confirming the exact syllabus code and tier, then works from past papers for that syllabus. When you book a free trial with us, tell us the code if you know it, or the school and year group if you don't, and we will match a tutor who has taught it.",
        ],
      },
    ],
  },
  {
    slug: "how-to-use-past-papers",
    title: "How to use past papers well",
    summary:
      "Past papers are the most useful revision tool there is, but only when they are used in the right order and marked honestly. Here is a simple way to get the most from them.",
    curricula: ["o-level", "igcse", "a-level", "gcse", "matric", "fsc"],
    whatsappMessage: "Hi Tutoring Galaxy, I'd like help with past-paper practice and a free trial lesson.",
    sections: [
      {
        id: "why-past-papers-work",
        heading: "Why past papers work",
        paragraphs: [
          "Exam boards test the same syllabus in similar ways each year. Past papers show your child the style of questions, the command words, how marks are shared out and how long each section really takes. Mark schemes then show exactly what earns credit, which is often more precise than a textbook explanation.",
          "Many boards, including Cambridge, also publish examiner reports. These describe common mistakes students made in each question, and they are some of the best revision reading available.",
        ],
      },
      {
        id: "start-with-topics",
        heading: "Start with topics, not whole papers",
        paragraphs: [
          "Sitting full papers too early is discouraging and hides where the real gaps are. Earlier in the course, work through past-paper questions topic by topic. Once a topic is taught, do the questions on it from several years, mark them, and note what went wrong.",
          "Full papers belong in the final months, when most of the syllabus has been covered.",
        ],
      },
      {
        id: "mark-it-properly",
        heading: "Mark it properly",
        paragraphs: [
          "The learning happens in the marking, not the writing. Use the official mark scheme and be strict: if the answer is close but uses the wrong word, or misses a unit, it usually doesn't get the mark. Then write the correct answer in a different colour so it stands out when revising.",
        ],
        list: [
          "Read the command word in each question again: state, describe, explain and evaluate ask for different things.",
          "Check how many marks the question was worth and count the points made.",
          "Look for working that would earn method marks even when the final answer is wrong.",
        ],
      },
      {
        id: "keep-a-mistakes-log",
        heading: "Keep a mistakes log",
        paragraphs: [
          "A simple notebook or document with three columns works well: the question, what went wrong, and what to do next time. Over a few weeks patterns appear, such as losing marks on units, misreading graphs or running out of time. Fixing a pattern is worth more than doing another paper.",
        ],
      },
      {
        id: "timed-practice",
        heading: "Then practise under timed conditions",
        paragraphs: [
          "In the final stretch, sit full papers in one go, with the real time limit, no notes and no phone. This builds stamina and shows whether time is being spent wisely. Afterwards, mark the paper and add any new mistakes to the log.",
          "Save the most recent papers for this stage, so they feel unseen.",
        ],
      },
      {
        id: "common-traps",
        heading: "Common traps to avoid",
        paragraphs: ["A few habits make past-paper practice much less useful:"],
        list: [
          "Looking at the mark scheme before finishing the question.",
          "Only doing the questions your child already finds easy.",
          "Using papers from a different syllabus code or an old syllabus without checking what changed.",
          "Counting papers done instead of mistakes fixed.",
        ],
      },
      {
        id: "where-a-tutor-fits",
        heading: "Where a tutor fits in",
        paragraphs: [
          "A tutor can choose the right questions for each topic, mark them the way an examiner would and explain why marks were lost. Our tutors use past papers and mark schemes from the start, and set practice between lessons so lesson time goes on the hard parts.",
        ],
      },
    ],
  },
  {
    slug: "online-or-home-tutoring",
    title: "Choosing between online and home tutoring",
    summary:
      "Both can work very well. The right choice depends on your child, your location and how lessons fit into the week. Here is how to think it through.",
    curricula: [],
    whatsappMessage: "Hi Tutoring Galaxy, I'm deciding between online and home tutoring and would like a free trial lesson.",
    sections: [
      {
        id: "what-matters-most",
        heading: "What matters most",
        paragraphs: [
          "The tutor matters more than the format. A tutor who knows your child's exact syllabus, explains clearly and gives useful feedback will help more than the wrong tutor in the right room. So it makes sense to decide on the format after you know which tutors are available for the subject and level.",
        ],
      },
      {
        id: "online-tutoring",
        heading: "When online tutoring works well",
        paragraphs: [
          "Online lessons give you a much wider choice of tutors, because distance stops mattering. This is especially useful for specialist subjects such as Further Mathematics or IB Higher Level courses, where the right tutor may not live nearby.",
        ],
        list: [
          "No travel time, so lessons are easier to fit around school and activities.",
          "Shared whiteboards and documents make it easy to work through past papers together.",
          "Lessons can continue during holidays or if the family moves.",
          "Works well for independent, motivated students who are comfortable on a screen.",
        ],
      },
      {
        id: "home-tutoring",
        heading: "When home tutoring works well",
        paragraphs: [
          "Some children concentrate better with someone beside them, especially younger students or those who find screens distracting. Home lessons also make it easier for the tutor to see handwriting and working as it happens.",
        ],
        list: [
          "Helpful for younger students and those who need more structure.",
          "Easier for hands-on work and checking written working closely.",
          "Parents can meet the tutor in person.",
          "Depends on having a suitable tutor within travelling distance.",
        ],
      },
      {
        id: "making-online-work",
        heading: "Making online lessons work",
        paragraphs: ["If you choose online lessons, a little setup makes a big difference:"],
        list: [
          "A quiet space with a table, and the same place for each lesson.",
          "A laptop or tablet rather than a phone, with a stable connection.",
          "A way to show written work: a phone camera, a scanner app or a tablet with a pen.",
          "Past papers and a notebook ready before the lesson starts.",
        ],
      },
      {
        id: "safety-and-trust",
        heading: "Safety and trust",
        paragraphs: [
          "Whichever format you choose, you should know who the tutor is, what they will cover and how you will hear about progress. For home lessons, agree where the lesson will take place and whether an adult will be at home. For online lessons, check which platform is used and whether lessons can be joined by a parent.",
        ],
      },
      {
        id: "questions-to-ask",
        heading: "Questions to ask any tutor",
        paragraphs: [
          "Whether lessons are online or at home, a short conversation before the first lesson tells you a lot. A good tutor will be happy to answer these:",
        ],
        list: [
          "Which syllabus and exam board have you taught, and at which level?",
          "How will you find out what my child already knows?",
          "How do you use past papers and mark schemes?",
          "What practice will you set between lessons?",
          "How and how often will you tell me about progress?",
        ],
      },
      {
        id: "try-before-deciding",
        heading: "Try before you decide",
        paragraphs: [
          "The simplest way to decide is to try a lesson. We teach online in every country we serve, and offer home tutoring in Islamabad and Rawalpindi. The first lesson is free, and you can switch format later if it isn't working.",
        ],
      },
    ],
  },
  {
    slug: "mdcat-preparation-plan",
    title: "Preparing for MDCAT: a month-by-month plan",
    summary:
      "A calm, step-by-step way to prepare for MDCAT over several months, built around the official syllabus, regular MCQ practice and honest review of mistakes.",
    curricula: ["mdcat", "fsc", "a-level"],
    whatsappMessage: "Hi Tutoring Galaxy, I'd like help preparing for MDCAT and a free trial lesson.",
    sections: [
      {
        id: "before-you-start",
        heading: "Before you start",
        paragraphs: [
          "MDCAT is a multiple-choice test covering Biology, Chemistry, Physics, English and Logical Reasoning. The syllabus, the share of questions per subject, the test date and the passing rules are set by the regulator and can change from year to year. Download the current official syllabus first and use it as the checklist for everything below.",
          "The plan assumes about six months. If you have less time, shorten the early stages but keep the mock tests and review at the end.",
        ],
      },
      {
        id: "month-1",
        heading: "Month 1: map the syllabus and find the gaps",
        paragraphs: [
          "Go through the official syllabus topic by topic and mark each one as strong, shaky or not yet studied. Take one short diagnostic test in each subject to check those guesses. Then build a weekly timetable that covers every subject each week, with more time for the weakest.",
        ],
      },
      {
        id: "months-2-3",
        heading: "Months 2 and 3: build the foundations",
        paragraphs: [
          "Work through the syllabus in order, using the FSc textbooks the syllabus is based on. After each topic, do a short set of MCQs on it and review every wrong answer. Biology usually carries the most questions, so keep it moving steadily rather than leaving it for later.",
        ],
        list: [
          "Read the textbook carefully: many questions test exact facts and definitions.",
          "Make short notes or flashcards for facts that need memorising.",
          "Practise Physics and Chemistry numericals without a calculator if calculators aren't allowed.",
        ],
      },
      {
        id: "month-4",
        heading: "Month 4: finish the syllabus and mix topics",
        paragraphs: [
          "Complete any remaining topics and start mixed practice, where questions from different topics come in random order. This is closer to the real test and shows whether knowledge holds up without the chapter heading as a clue. Keep adding to a mistakes log.",
        ],
      },
      {
        id: "month-5",
        heading: "Month 5: full mock tests",
        paragraphs: [
          "Sit full-length mock tests under real conditions, at the same time of day as the actual test if possible. After each mock, spend at least as long reviewing it as sitting it. Sort errors into three groups: didn't know it, knew it but misread, and ran out of time. Each group needs a different fix.",
        ],
      },
      {
        id: "final-month",
        heading: "Final month: revise and stay steady",
        paragraphs: [
          "Cut back on new material. Revise from your notes and mistakes log, do one or two mocks a week, and focus on topics that keep coming up wrong. In the last few days, rest properly, check the test centre, admit card and allowed items, and keep the routine calm.",
        ],
      },
      {
        id: "every-week",
        heading: "Every week, whatever the month",
        paragraphs: [
          "A few habits matter more than any single month of the plan. Steady weekly work beats long, irregular sessions, and it keeps every subject from going cold.",
        ],
        list: [
          "Do some MCQs every day, even on busy days, and review each wrong answer.",
          "Touch every subject each week, including English and Logical Reasoning.",
          "Keep one day lighter each week to catch up and rest.",
          "Check the plan against the syllabus checklist at the end of each week.",
        ],
      },
      {
        id: "how-we-help",
        heading: "How a tutor can help",
        paragraphs: [
          "A tutor can turn the syllabus into a realistic weekly plan, explain difficult topics, and review mock tests with your child so the same mistakes stop repeating. Our MDCAT tutors use syllabus-mapped MCQs and timed practice, and the first lesson is free.",
        ],
      },
    ],
  },
];

export const getResource = (slug: string) => resources.find((r) => r.slug === slug);

/** Rough word count for a guide, used for reading time. */
export function resourceWordCount(r: Resource) {
  const text = [r.summary, ...r.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.list ?? [])])].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}
