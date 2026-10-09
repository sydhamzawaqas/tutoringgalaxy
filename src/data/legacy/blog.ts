export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: "IGCSE" | "GCSE" | "O Level" | "A Level" | "IB" | "GED" | "SAT" | "ACT" | "AP" | "MDCAT" | "NAPLAN" | "11+" | "MAP" | "Parents Guide" | "Homework" | "HSC" | "Life" | "OC" | "Parenting" | "QOTD" | "Rants" | "Schooling" | "Selective School" | "Students" | "Study" | "Tutors" | "VCE";
  curriculumSlug?: string;
  tags: string[];
  author: string;
  date: string;
  readTime: string;
};

const longBody = (intro: string, bullets: string[], outro: string) =>
  `${intro}\n\n${bullets.map((b, i) => `${i + 1}. **${b.split(":")[0]}** — ${b.split(":").slice(1).join(":").trim()}`).join("\n")}\n\n${outro}`;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "act-vs-sat-2026",
    title: "ACT vs SAT 2026: Which Test Should You Take?",
    excerpt: "A definitive 2026 comparison of the Digital SAT and ACT — content, pacing, scoring, university acceptance and how to pick the test you'll score higher on.",
    category: "ACT", curriculumSlug: "act",
    tags: ["ACT", "SAT", "US Admissions", "Comparison", "Digital SAT"],
    author: "Tutoring Galaxy Team", date: "2026-07-16", readTime: "10 min read",
    body: `Every US-bound student we meet asks the same question: **SAT or ACT?** Both are accepted by every US university — including the Ivy League — and neither is inherently "easier". The right test is the one that plays to your strengths. Here is the honest 2026 comparison.

## 1. The tests at a glance

- **Digital SAT** — 2h 14m, adaptive, scored 400–1600, delivered on Bluebook (College Board's app).
- **ACT** — 2h 55m (3h 35m with optional Writing/Science), linear, scored 1–36 composite, delivered on paper or computer.

The SAT went fully digital in 2024. The ACT is mid-transition — the Science section became optional in April 2025, and computer-based delivery is expanding worldwide.

## 2. Content differences

| Section | Digital SAT | ACT |
|---|---|---|
| Reading | Short passages (25–150 words), 1 question each | Long passages (~750 words), 10 questions each |
| Writing | Grammar embedded with reading | Separate English section |
| Math | Algebra, data, some trig; Desmos built-in | Algebra, geometry, trig; bring your own calculator |
| Science | None | Optional data-analysis section |
| Essay | None | Optional |

The SAT rewards students who like bite-sized questions and heavy data analysis. The ACT rewards students who read quickly and handle a wider mix of maths topics.

## 3. Pacing — the single biggest split

The ACT gives you roughly **40 seconds per question**. The SAT gives you closer to **75 seconds per question**.

If your child freezes under time pressure, the SAT's calmer pace is a significant advantage. If they finish practice tests with time to spare, the ACT often produces a higher score for the same knowledge level.

## 4. Adaptive vs linear scoring

The Digital SAT is **section-adaptive**. Module 1 performance sets the difficulty of Module 2. Nail Module 1 and you unlock the harder — and higher-scoring — Module 2. Drop points in Module 1 and you're capped.

The ACT is linear — every student sees the same questions in the same order. Predictable, but no upside from a strong start.

## 5. Calculators

- **SAT**: Desmos graphing calculator built into Bluebook, usable on every math question. Aggressive Desmos users routinely add 50–100 points.
- **ACT**: Bring your own approved graphing calculator (TI-84 series is standard).

## 6. Scoring conversion

For rough comparison:

- SAT 1600 ↔ ACT 36
- SAT 1500 ↔ ACT 34
- SAT 1400 ↔ ACT 31
- SAT 1300 ↔ ACT 28
- SAT 1200 ↔ ACT 25

Elite US universities cluster in the SAT 1500+ / ACT 34+ band.

## 7. Which universities prefer which?

**None.** Every US university that requires or accepts a test score accepts both equally. This has been official College Board and ACT policy for over a decade. Ignore anyone who tells you Ivy League "prefers" the SAT — they don't.

## 8. International availability

- **SAT** is offered 7 times a year worldwide, fully digital.
- **ACT** is offered 6 times a year internationally, moving to digital-only in most international test centres by end of 2026.

Pakistan, UAE, Saudi Arabia and India all offer both tests at multiple centres.

## 9. Cost

- **SAT**: $68 base + $43 international surcharge = ~$111 outside the US.
- **ACT**: $68 base + $60 international surcharge = ~$128 outside the US.

Both offer fee waivers for eligible students.

## 10. How to decide — take both diagnostics

Every student we prep sits **one official SAT practice test and one official ACT practice test** in their first week. Whichever score converts higher becomes their focus test. It sounds obvious — most families skip this step and pick based on peer pressure.

Rough decision heuristics:

- Fast reader, strong maths across topics → **ACT**
- Deep analytical thinker, prefers time to think → **SAT**
- Comfortable with data interpretation and charts → **SAT**
- Confident with a wide topic mix under pressure → **ACT**

## What Tutoring Galaxy recommends

Book a **free diagnostic pair** with our US-admissions team. We'll deliver both an official SAT and ACT practice test, mark them, and recommend the test where your child has the highest ceiling. Then we build a 12-week plan targeting 1500+ (SAT) or 34+ (ACT).`,
  },
  {
    slug: "ucas-personal-statement-examples",
    title: "UCAS Personal Statement Examples That Won Oxbridge & Russell Group Offers",
    excerpt: "Real UCAS personal statement structures that earned offers from Oxford, Cambridge, Imperial and LSE — with the openings, evidence blocks and closings that admissions tutors reward.",
    category: "A Level", curriculumSlug: "a-level",
    tags: ["UCAS", "Personal Statement", "Oxbridge", "Russell Group", "A Level"],
    author: "Tutoring Galaxy Team", date: "2026-07-14", readTime: "11 min read",
    body: `A UCAS personal statement is 4,000 characters and 47 lines that decide whether an Oxbridge or Russell Group admissions tutor invites your child to interview. Here is the structure our A-Level Academy uses — plus real anonymised extracts from statements that earned offers in 2024 and 2025.

## 1. What the new 2026 personal statement looks like

From the 2026 cycle, UCAS replaced the single free-form essay with **three structured questions** (each ~1,000 characters):

1. Why do you want to study this course?
2. How have your qualifications and studies helped prepare you?
3. What else have you done to prepare, outside of education?

This guide covers both formats — the principles transfer directly.

## 2. Opening — the first 100 words matter most

**Weak opening (do not do this):**
> "From a young age I have always been fascinated by medicine."

**Strong opening (Cambridge Medicine offer, 2024):**
> "Watching my grandmother lose the vocabulary of her own life to Alzheimer's taught me that medicine's hardest problems are rarely biochemical alone — they are structural, financial and deeply personal."

The strong opening does three things: it's specific, it names a real experience, and it hints at the intellectual angle the applicant will develop.

## 3. The evidence block — 60% of your statement

For every claim, provide evidence. Structure each paragraph as:

- **Claim** (what interests you)
- **Evidence** (what you did about it)
- **Reflection** (what you learned that a Year-12 syllabus doesn't teach)

**Example — Imperial Engineering offer, 2025:**
> "Reading Ferguson's *The Rules of Contagion* pushed me beyond A-Level Statistics into stochastic modelling. I coded a simple SIR simulation in Python during summer and tested how varying R₀ altered the epidemic curve. The exercise taught me that mathematical models are only as honest as their assumptions — a lesson I'm keen to develop in your Mathematical Modelling module."

Notice: a specific book, a specific action (Python simulation), a specific reflection, and a specific course module at Imperial.

## 4. Reading list — quality over quantity

Two books you've genuinely engaged with beat ten name-drops. Admissions tutors interview on what you claim to have read.

Safe picks that show intellectual engagement:

- **Medicine**: Atul Gawande's *Being Mortal*, Henry Marsh's *Do No Harm*
- **Law**: Tom Bingham's *The Rule of Law*, Helena Kennedy's *Eve Was Framed*
- **Economics**: Tim Harford's *The Undercover Economist*, Ha-Joon Chang's *23 Things*
- **Engineering**: Henry Petroski's *To Engineer Is Human*
- **English**: Terry Eagleton's *How to Read Literature*
- **History**: E.H. Carr's *What Is History?*

Read them cover to cover. Have three sentences of genuine reflection ready.

## 5. Super-curriculars beat extracurriculars

Russell Group admissions tutors care about **super-curriculars** — activities directly related to your course. Extracurriculars (sport, music, debating) matter, but sit in the final ~500 characters.

Super-curricular examples that earned offers:

- MIT OpenCourseWare / Coursera / edX courses (name the course, name the takeaway)
- Essay competitions (RES Young Economist, Newnham College, Trinity Robson, Peterhouse)
- Research placements (Nuffield, In2Science, UCL Horizons)
- Olympiads (BPhO, BMO, UKChO, BBO)
- Self-directed projects (Python model, Arduino build, literature review)

## 6. The closing — commit, don't apologise

**Weak closing:**
> "I believe I would be a great fit and hope you will consider my application."

**Strong closing (LSE Economics offer, 2025):**
> "I want to spend the next three years learning how to build models that stand up to real-world data, and I can't think of a better place to do that than LSE's Department of Economics."

The strong closing names the department, names the ambition, and doesn't beg.

## 7. Common mistakes we see every cycle

1. **Quoting Aristotle, Einstein or Steve Jobs.** Admissions tutors read hundreds of these; they groan.
2. **Listing DofE, Grade 8 Piano and Head Boy in the first paragraph.** These belong at the end, in one tight paragraph.
3. **Explaining what your course *is*.** The admissions tutor teaches it. Explain what excites *you* about it.
4. **Under-selling super-curriculars.** If you built something, coded something, or won something, name it.
5. **Missing the 4,000-character limit by 200 characters.** Every character is real estate — use it.

## 8. The 5-draft rule

No offer-winning statement is written in one draft. Ours follow this cadence:

- Draft 1 (week 1): Brain-dump everything, no length limit.
- Draft 2 (week 2): Cut to 6,000 characters, structure into paragraphs.
- Draft 3 (week 3): Cut to 4,500 characters, tighten every claim to have evidence.
- Draft 4 (week 4): Peer + tutor review, cut to 4,100.
- Draft 5 (week 5): Final line-by-line polish to 4,000, read aloud, submit.

## What Tutoring Galaxy offers

Our UCAS coaches include former Oxbridge admissions tutors and current Russell Group PhD students. Every A-Level Academy student gets **five personal-statement drafting sessions**, one mock interview, and a subject-specific super-curricular roadmap. Book a free consultation to see redacted offer-winning statements in full.`,
  },
  {
    slug: "igcse-past-papers-guide",
    title: "IGCSE Past Papers: The Right Way to Use Them (2010–2026 Archive)",
    excerpt: "How to use IGCSE past papers effectively — the marking-scheme method, the 3-pass technique, and where to download every Cambridge and Edexcel paper from 2010 to 2026.",
    category: "IGCSE", curriculumSlug: "igcse",
    tags: ["IGCSE", "Past Papers", "Revision", "Cambridge", "Edexcel"],
    author: "Tutoring Galaxy Team", date: "2026-07-12", readTime: "9 min read",
    body: `Past papers are the single highest-leverage revision resource for IGCSE. Yet most students use them wrong — they answer a paper, check their score, feel bad, and move on. Here is the method that our top IGCSE tutors use to convert past papers into grade uplifts.

## 1. Where to find every past paper (free and legal)

- **Cambridge (CIE)**: Cambridge International's official past-paper archive covers May/June and October/November sessions back to 2010 for most subjects. Available at cambridgeinternational.org under "Past papers" — free with a school login, or via cached mirrors like Papacambridge and Save My Exams.
- **Edexcel IGCSE**: qualifications.pearson.com hosts the full past-paper archive back to 2011 for Edexcel IGCSE (specification 4MA1, 4CH1, etc.).
- **Mark schemes** and **examiner reports** are the real gold — always download all three together (question paper, mark scheme, examiner report).

## 2. The three phases of using past papers

Past-paper practice should be structured across three distinct phases:

### Phase 1: Topical practice (weeks 1–4)

Do not sit full papers yet. Instead, extract topical questions from 10 years of past papers, grouped by syllabus topic. For example: every "moles calculation" question from IGCSE Chemistry 2015–2025.

This builds pattern recognition. By the time you see a fresh moles question, you've seen 40 variants and know the marking-scheme keywords the examiner rewards.

### Phase 2: Full papers under timed conditions (weeks 5–8)

Sit one full paper per subject per week. Non-negotiables:

- Full time limit, no breaks, no phone.
- Print the paper — screen-reading changes your pace.
- Use the same calculator and pen you'll use in the real exam.

### Phase 3: Mock cycle (weeks 9–10)

Two full mocks per subject per week. Simulate the real exam morning — same start time, same clothes, same breakfast.

## 3. The mark-scheme method — where the grade uplift happens

Most students mark their own paper by comparing to the mark scheme and moving on. This is a waste.

Instead:

1. **Answer the paper.** Time it. Don't check anything.
2. **Wait 24 hours.** Come back cold.
3. **Re-mark your own paper using the official scheme.** Look for the exact keywords the mark scheme awards. Physics rewards "gravitational potential energy" but not "GPE" written out. Biology rewards "increases surface area to volume ratio" but not "big surface area".
4. **Read the examiner report.** This document explains what most students got wrong and what full-mark answers looked like. It is written by the chief examiner.
5. **Rewrite** the questions you lost marks on, using the exact mark-scheme phrasing.

Students who follow this cycle typically gain a full grade over an 8-week window.

## 4. The 3-pass technique for exam day

Sit the real paper in three passes:

- **Pass 1 (fast):** Answer every question you know instantly. Skip anything that needs more than 30 seconds of thought. Mark it with an asterisk.
- **Pass 2 (medium):** Return to the asterisked questions. Work through them methodically.
- **Pass 3 (checking):** Reread every answer. Check units, significant figures, spelling of technical terms.

Students who do this typically pick up an extra 5–8 marks over a linear approach.

## 5. Board-specific past-paper strategy

**Cambridge (CIE) IGCSE**: Papers from 2016 onwards use the current syllabus. Anything older is useful for topical practice but the exam style has drifted. Prioritise 2019–2025.

**Edexcel IGCSE (9–1)**: The 9–1 grading arrived in 2018. Prioritise 2019 onwards; earlier A*–G papers use similar questions but different grade boundaries.

**Do not mix boards.** Cambridge and Edexcel papers look similar but test different subtleties. A student sitting Cambridge should focus 90% of past-paper time on Cambridge papers.

## 6. Common mistakes

1. **Sitting full papers before covering the syllabus.** Do topical practice first.
2. **Skipping the mark scheme.** The mark scheme is the syllabus in practice — memorise its phrasing.
3. **Ignoring examiner reports.** They tell you exactly which questions students routinely fail and why.
4. **Over-practising past papers without addressing gaps.** If you keep losing marks on the same topic, stop doing papers and go back to that topic.
5. **Only doing the "hard" questions.** Full-paper practice builds pacing — the skill that decides your final grade.

## What Tutoring Galaxy offers

Our IGCSE tutors ship students a printed 10-year topical past-paper pack in their first week, plus weekly full-paper marking with examiner-report annotation. Book a free trial to see the pack in your subject.`,
  },
  {
    slug: "edexcel-vs-cambridge-igcse",
    title: "Edexcel vs Cambridge IGCSE: Which Board Should Your Child Take?",
    excerpt: "Cambridge (CIE) or Edexcel IGCSE? The seven concrete differences — syllabus, grading, coursework, timing and university recognition — explained for parents in 2026.",
    category: "IGCSE", curriculumSlug: "igcse",
    tags: ["IGCSE", "Edexcel", "Cambridge", "Comparison", "Parents Guide"],
    author: "Tutoring Galaxy Team", date: "2026-07-10", readTime: "8 min read",
    body: `Both Cambridge (CIE) and Edexcel offer IGCSE qualifications. Both are recognised worldwide. Both use A*–G (or 9–1) grading. Yet the day-to-day experience differs meaningfully — and if your school offers both, choosing the right board can lift your child's grade by 5–10%.

Here are the seven differences that matter.

## 1. Exam sessions

- **Cambridge (CIE)**: May/June and October/November. Some subjects also offer March (India only).
- **Edexcel**: January and May/June. October/November for a shorter subject list.

Edexcel's January session is a genuine advantage for students who need a resit — Cambridge students wait 6 months, Edexcel students wait 4.

## 2. Grading systems

- **Cambridge** offers both A*–G and the 9–1 numeric grading (school choice).
- **Edexcel IGCSE** uses 9–1 grading exclusively since 2018.

If your child is applying to UK sixth-forms that specify "Grade 7" or "Grade 8" requirements, Edexcel matches the UK GCSE grading conventions directly.

## 3. Coursework availability

- **Cambridge** offers coursework routes in more subjects — English First Language, Geography, History, ICT, Art & Design, Design & Technology.
- **Edexcel** has moved most subjects to 100% terminal exam. Coursework survives only in Art, DT and English Literature (limited).

If your child is a strong writer or researcher who tests poorly under time pressure, Cambridge's coursework routes offer a meaningful grade lift.

## 4. Paper structure and length

**Cambridge Maths (0580)**: 4 papers across Core and Extended tiers, calculator and non-calculator split.

**Edexcel Maths (4MA1)**: 2 papers, both calculator, single tier.

Edexcel Maths is often perceived as slightly harder question-by-question but shorter in total exam time. Cambridge Extended Maths spreads difficulty across four papers, which reduces per-paper pressure.

**Cambridge Sciences (0620/0625/0610)**: Multiple-choice paper (Paper 1), theory paper (Paper 2/4), and Alternative to Practical (Paper 6).

**Edexcel Sciences (4CH1/4PH1/4BI1)**: Two theory papers only — no multiple-choice, no practical paper.

Students who struggle with recall-based multiple choice often prefer Edexcel Sciences.

## 5. Tiered vs single-tier papers

- **Cambridge** offers Core (max grade C) and Extended (A*) tiers in Maths, Sciences and languages.
- **Edexcel** offers Foundation (max 5) and Higher (up to 9) tiers in Maths only. Sciences are single-tier.

For students at risk of failing, Cambridge Core provides a stronger safety net across more subjects.

## 6. Global recognition

Both boards are accepted at UK, US, Canadian and Australian universities. In practice:

- **UK universities**: Treat them identically. UCL, Imperial, LSE, Oxbridge — no preference.
- **US universities**: Both accepted. Occasionally a US admissions office is more familiar with the "IGCSE" brand from Cambridge specifically.
- **UAE schools**: Historically Cambridge-dominant but Edexcel has grown significantly since 2020, especially at GEMS schools.
- **Pakistan**: Cambridge dominates (~85% of English-medium schools). Edexcel is available at select international schools.

## 7. Textbook and past-paper availability

- **Cambridge**: Vast third-party textbook market (Hodder, Cambridge University Press, Collins). Past papers going back to 2010 for most subjects.
- **Edexcel**: Pearson textbooks (in-house) plus Hodder and Collins. Past papers back to 2011 (9–1 spec from 2018 onwards).

Cambridge's older past-paper archive is a genuine revision advantage — you get more variants of every question type.

## 8. Decision framework

Ask these four questions:

1. **What does your school offer?** Most schools run one board only. If yours offers both, ask which their teachers have more experience marking.
2. **Does your child need a January resit option?** Choose Edexcel.
3. **Is your child strong at coursework and weak under time pressure?** Choose Cambridge.
4. **Do you want tiered safety nets in Sciences?** Choose Cambridge.

If none of these differentiate, default to **Cambridge** — it's the more widely recognised brand internationally and has more past-paper depth.

## What Tutoring Galaxy recommends

Our IGCSE tutors are dual-trained in Cambridge and Edexcel and will match your child to a specialist for their specific board. Book a free trial and we'll audit which board plays to your child's strengths.`,
  },
  {
    slug: "ib-diploma-vs-a-level",
    title: "IB Diploma vs A Level: The Honest Comparison for GCC Families",
    excerpt: "IB or A Level? A frank comparison of workload, university acceptance, cost and grade conversion for families in Dubai, Doha, Riyadh and Kuwait.",
    category: "IB", curriculumSlug: "ib",
    tags: ["IB", "A Level", "Comparison", "GCC", "University"],
    author: "Tutoring Galaxy Team", date: "2026-07-08", readTime: "10 min read",
    body: `Almost every top school in Dubai, Abu Dhabi, Doha and Riyadh now offers both IB Diploma and A Levels. The choice reshapes your child's next two years — and their university options. Here is the honest comparison, without the school-marketing gloss.

## 1. Structure at a glance

**IB Diploma Programme (DP)**: 6 subjects (3 Higher Level, 3 Standard Level) + Theory of Knowledge (TOK) + Extended Essay (EE) + Creativity, Activity, Service (CAS). Scored out of 45.

**A Level**: 3 or 4 subjects, single-focus. Scored A*–E per subject.

The IB is a **broad** programme; A Levels are **deep**. This is the single most important difference.

## 2. Workload — the reality

IB students are typically doing:

- 6 subjects with weekly assignments
- 4,000-word Extended Essay
- 1,600-word TOK essay + TOK presentation
- 150 hours of CAS logged over 18 months

A Level students are typically doing:

- 3–4 subjects with weekly assignments
- Optional EPQ (5,000-word project)
- No compulsory service or reflection component

Estimated homework load: **IB ~25–30 hours/week; A Level ~15–20 hours/week**.

If your child juggles multiple commitments (competitive sport, music, family responsibilities), the A Level route is significantly kinder to their calendar.

## 3. Grade conversion for UK universities

Rough equivalencies used by UK admissions:

- IB 45 ↔ A*A*A*A* (rare)
- IB 42 ↔ A*A*A*
- IB 40 ↔ A*A*A
- IB 38 ↔ AAA
- IB 36 ↔ AAB
- IB 34 ↔ ABB
- IB 32 ↔ BBB

Oxbridge and Imperial typically ask for IB 40+ (with 7,7,6 at HL) or A*A*A.

## 4. University acceptance — is there really a difference?

**No meaningful difference at UK universities.** Oxbridge admits both routes in similar proportions.

**Ivy League admissions officers historically prefer the IB** for its breadth — they explicitly value the TOK and EE. This is not a knockout advantage, but it's real.

**Canadian universities** (Toronto, UBC, McGill) treat both equally. Some offer transferable university credit for HL 6+ IB scores, which A Level students cannot claim.

**Australian universities** treat both equally.

**GCC medical schools** (Sharjah, MBRU, Weill Cornell Qatar) accept both equally — but require Chemistry and Biology at HL (IB) or A Level.

## 5. Depth vs breadth — pick for personality

- **IB suits** the intellectually curious student who wants to keep languages and arts alongside sciences, and who thrives on structured reflection.
- **A Level suits** the student who has a clear subject focus — future engineer, future medic, future economist — and wants to go deep without a compulsory language.

The single hardest thing about IB is that you cannot drop a subject you dislike. A Level lets you drop French forever after Year 11.

## 6. Cost in the GCC (2026)

**IB Diploma exam fees**: Registration ~AED 850 + ~AED 550 per subject × 6 = **~AED 4,150** total.

**A Level exam fees**: ~AED 470 per subject × 3–4 = **~AED 1,410–1,880** total.

Plus tuition. Most GCC IB schools charge AED 5,000–15,000 more per year than their A Level equivalents.

## 7. Retake flexibility

- **A Levels** can be re-sat in October/January the following year — many students improve grades by 1–2 letters on resit.
- **IB Diploma** is a single May exam window. Retakes require waiting a full year, or sitting individual subjects the following November (limited).

If your child is prone to underperforming on the day, A Levels offer more forgiveness.

## 8. Which suits which university target?

- **US Ivy League**: IB has a slight edge for breadth-conscious admissions.
- **Oxbridge / Imperial / LSE**: Neutral — both routes are common.
- **UK Russell Group**: Neutral.
- **Canadian universities**: Neutral, IB has credit-transfer bonus.
- **GCC universities**: Neutral.
- **Pakistan / India universities**: A Level is more familiar to admissions offices.

## 9. Decision framework

Ask these five questions:

1. **Does your child have a clear future subject focus?** → A Level.
2. **Does your child want to keep languages and arts open?** → IB.
3. **How does your child perform under a single exam window?** → A Level offers resit safety.
4. **How full is your child's calendar outside academics?** → A Level is lighter.
5. **Is your child aiming primarily at Ivy League?** → IB has a slight edge.

## What Tutoring Galaxy recommends

For most GCC families we advise **A Level** — the workload is more sustainable, the university outcomes are equivalent for UK targets, and resit flexibility matters more than families expect. Choose IB only when your child genuinely wants the breadth and is aiming primarily at US universities.

Book a free consultation with our GCC counsellors to map your child's target universities to the better fit.`,
  },
  {
    slug: "how-to-study-for-igcse",
    title: "How to Study for IGCSE: A Daily Routine That Actually Works",
    excerpt: "A tried-and-tested daily and weekly IGCSE study routine — with time blocks, active recall techniques and the 60/20/20 method that our top scorers use.",
    category: "IGCSE", curriculumSlug: "igcse",
    tags: ["IGCSE", "Study Routine", "Revision", "Time Management"],
    author: "Tutoring Galaxy Team", date: "2026-07-06", readTime: "7 min read",
    body: `Most IGCSE students study for hours and improve slowly. The problem is almost never effort — it is method. Here is the daily and weekly routine our top-scoring students use, built around active recall and spaced practice.

## 1. The 60/20/20 method

Every study session should split across three activities:

- **60% active recall** — closing the book and testing yourself.
- **20% past-paper practice** — applying knowledge under exam conditions.
- **20% note refinement** — condensing your notes into one-page summaries.

Reading and highlighting alone is **not studying**. Research from Karpicke and Roediger (2008) shows active recall produces roughly 50% better long-term retention than passive re-reading. Every hour of highlighting is roughly worth 20 minutes of self-testing.

## 2. A realistic weekday routine (Year 10/11)

- **07:00–07:30** — Review yesterday's flashcards (Anki, Quizlet, or paper).
- **15:00–16:00** — Homework and school assignments.
- **16:00–17:00** — Snack + physical break (non-negotiable).
- **17:00–18:30** — Study block 1: one subject, active recall + notes.
- **18:30–19:30** — Dinner, family.
- **19:30–20:30** — Study block 2: second subject, past-paper questions.
- **20:30–21:00** — Wind-down: light reading, no screens.

Total focused study: **2.5 hours weekdays**, higher on weekends.

## 3. Weekend routine (Year 11 mock cycle)

- **Saturday morning**: One full past paper under timed conditions. Mark it Sunday morning.
- **Saturday afternoon**: Review one weak topic identified from last week.
- **Sunday morning**: Mark Saturday's paper using the official mark scheme + examiner report.
- **Sunday afternoon**: Rewrite the questions you lost marks on, using mark-scheme phrasing.

Two full papers per weekend across two subjects, rotated so every subject sees a paper every 3 weeks.

## 4. Active-recall techniques that work

- **Blurting**: Read a topic for 10 minutes. Close the book. Write down everything you remember on a blank page. Compare and fill gaps.
- **Anki flashcards**: One question per card, one answer per card. Use image occlusion for diagrams. Aim for 15 minutes of Anki daily.
- **Feynman technique**: Explain a topic aloud as if teaching it to a younger sibling. Wherever you stumble, that's a gap.
- **Practice questions before the topic**: Attempt the past-paper question first, get it wrong, then learn the topic. This "productive failure" locks in the concept faster.

## 5. Techniques that don't work (stop doing these)

- **Highlighting textbooks in five colours**. It feels productive; it isn't.
- **Rewriting neat notes from scratch**. This is copying, not studying.
- **Watching hours of YouTube revision videos passively**. Fine for introduction, useless for exam performance.
- **Cramming the night before**. Sleep consolidates memory; loss of sleep loses the very information you crammed.

## 6. Subject-specific tweaks

- **Maths**: 80% practice questions, 20% notes. Never review a topic without doing 20+ questions.
- **Sciences**: Command-word drills. Every mark scheme rewards specific verbs — "state", "describe", "explain", "compare". Learn them.
- **English Language**: One PEEL paragraph per day, marked by a tutor or peer.
- **English Literature**: Quotation banks — 15 quotes per text, memorised.
- **Languages**: 20 vocabulary items per day + one speaking exercise recorded on your phone.
- **History / Geography**: Timeline / case-study flashcards. Never revise events without dates.

## 7. Sleep, exercise, phone

- **Sleep**: 8–9 hours is not optional for teenagers. Memory consolidation happens in REM sleep — you literally cannot learn without it.
- **Exercise**: 30 minutes daily. Cardio boosts BDNF, a brain protein directly linked to learning.
- **Phone**: Delete Instagram and TikTok during the exam term. Not "reduce screen time" — delete. Reinstall after August.

## 8. Warning signs your routine isn't working

- You finish a study session unable to answer three sample questions on the topic you just covered.
- Your marks on past papers plateau for 3+ weeks.
- You feel tired but not challenged — a sign of passive study.
- You avoid your weakest subject "until later".

If any of these apply, your routine needs restructuring — not more hours.

## What Tutoring Galaxy offers

Every IGCSE Academy student gets a personalised weekly routine, weekly progress tracking, and Anki flashcard decks curated for their exam board. Book a free trial and we'll build your child's first-week schedule.`,
  },
  {
    slug: "ib-tok-essay-topics-2026",
    title: "IB TOK Essay Topics 2026: 15 Prompts Ranked by Difficulty",
    excerpt: "The 2026 IB Theory of Knowledge prescribed titles ranked by difficulty and scoring potential — with sample knowledge questions, AOK pairings and structural tips.",
    category: "IB", curriculumSlug: "ib",
    tags: ["IB", "TOK", "Theory of Knowledge", "Essay"],
    author: "Tutoring Galaxy Team", date: "2026-07-04", readTime: "9 min read",
    body: `The Theory of Knowledge essay is worth up to 10 of the 45 IB Diploma points and shapes your overall grade more than most students realise. Here is our tutor team's ranking of the May 2026 prescribed titles by difficulty and scoring ceiling — plus the structural playbook we use with every IB student.

## 1. Understanding TOK essay scoring

IB TOK essays are marked on a single 10-point scale, mapped to letter grades A–E via the TOK matrix (which combines with your TOK Exhibition score). Key rubric criteria:

- Do you engage with a **clear knowledge question**?
- Do you compare **two Areas of Knowledge (AOKs)** effectively?
- Do you use **specific real-world examples** rather than abstractions?
- Do you consider **implications and counterarguments**?

The single most common reason for a C or below: the essay describes topics rather than analysing knowledge claims.

## 2. Choosing your title — the 4-filter method

Never pick a prescribed title on the first read. Apply four filters:

1. **Do I understand every keyword?** If a title uses "epistemic humility" and you can't define it, skip it.
2. **Can I name two AOKs where this genuinely matters?** If only one AOK fits, the essay collapses.
3. **Can I name three specific real-world examples?** Not abstract concepts — actual case studies, scientists, artworks, historical events.
4. **Is there a counterargument I can steelman?** TOK examiners reward "yes-and-no" essays over one-sided ones.

Only titles that pass all four filters make your shortlist.

## 3. Ranking the 2026 prescribed titles

The following ranking reflects our tutors' consensus on scoring potential for the average student. Difficulty ratings are: **Accessible** (safest), **Balanced** (best trade-off), **Ambitious** (high ceiling, high risk).

### Accessible titles (safest picks)

- **"Is subjectivity overly celebrated in the arts but unfairly condemned in the human sciences?"** — Strong AOK pairing built in (Arts + Human Sciences). Rich example base: post-modern art, psychology replication crisis, ethnographic research.
- **"To what extent is our knowledge shaped by the tools of inquiry?"** — Natural pairing of Natural Sciences (telescopes, particle accelerators) and History (archives, oral history). Approachable knowledge question.
- **"How can we distinguish between good and bad interpretations?"** — Excellent for Arts + History pairing. Examples: Shakespeare interpretations, revisionist history debates.

### Balanced titles (best score-to-effort ratio)

- **"Does producing knowledge require accepting uncertainty?"** — Powerful across Natural Sciences (Heisenberg, climate models) and Mathematics (Gödel's incompleteness).
- **"Are areas of knowledge defined more by their methods or by their subject matter?"** — Sophisticated question. Requires clear definitions early; pays off with a strong conclusion.
- **"How do we decide which evidence to trust?"** — Human Sciences + Natural Sciences. Excellent for peer review, replication crisis, and expert testimony examples.

### Ambitious titles (high ceiling, high risk)

- **"Is knowledge based on categories problematic in the human sciences and mathematics?"** — Deep engagement with taxonomy, category theory, DSM diagnostic categories. Fails if student describes rather than analyses.
- **"To what extent is objectivity possible in the pursuit of knowledge?"** — Broad and philosophical. High risk of vague generalities.
- **"Can knowledge only be produced through disagreement?"** — Rewards a nuanced yes-and-no. Fails if student treats it as a yes/no question.

## 4. The 5-paragraph TOK structure that scores A

- **Paragraph 1 — Introduction**: Define the knowledge question. Name your two AOKs. State your thesis with a clear position.
- **Paragraph 2 — AOK 1, argument**: Real-world example → knowledge claim → implication.
- **Paragraph 3 — AOK 1, counterargument**: Where does your argument break down? Name a specific counterexample.
- **Paragraph 4 — AOK 2, argument + counterargument in one paragraph**: Same structure, different AOK.
- **Paragraph 5 — Conclusion**: Return to the knowledge question with a nuanced position that accounts for both AOKs.

Total: 1,600 words. Do not exceed 1,600 — examiners are instructed to stop reading at the limit.

## 5. Specific real-world examples that score

Examiners see "climate change" and "the Nazi regime" thousands of times. Fresher examples that score higher:

- **Natural Sciences**: STAP cell scandal (2014), OPERA neutrino error, hydroxychloroquine COVID studies.
- **Human Sciences**: Reinhart-Rogoff Excel error, Ariely honesty-research fabrication (2021), Nudge unit COVID interventions.
- **History**: Historikerstreit debate, 1619 Project, revisionist Meiji Restoration scholarship.
- **Arts**: Beeple NFT valuation, restoration of Ecce Homo, AI-generated art awards.
- **Maths**: Wiles's Fermat proof revision, Mochizuki's IUT controversy, four-colour theorem computer proof.
- **Ethics**: Sam Bankman-Fried effective altruism collapse, MIT Media Lab Epstein funding.

Two specific, well-explained examples beat five name-drops.

## 6. Common TOK essay mistakes

1. **Describing AOKs instead of comparing them.** Every paragraph must be doing work on the knowledge question.
2. **Using AOKs that overlap too heavily** (e.g. Natural Sciences + Mathematics for a title that could use History for contrast).
3. **Missing the counterargument entirely.** A one-sided TOK essay ceilings at 6/10.
4. **Vague examples.** "Scientists disagree about climate change" isn't an example — "the 2019 disagreement between the IPCC and NIPCC on climate sensitivity ranges" is.
5. **Personal opinion overload.** TOK is not a memoir. Analyse knowledge, not your feelings.

## 7. Draft cadence

- **Weeks 1–2**: Read all six titles. Draft knowledge questions for your shortlist.
- **Week 3**: First draft, 1,800 words, no formatting.
- **Weeks 4–5**: Cut to 1,600, add examples, address counterarguments.
- **Week 6**: TOK teacher feedback session (mandatory).
- **Week 7**: Second draft incorporating feedback.
- **Week 8**: Final polish, reference check, submit.

## What Tutoring Galaxy offers

Our IB Academy includes a dedicated TOK coach for every student — three drafting sessions, one full-length mock essay marked to IB rubric, and knowledge-question brainstorming workshops. Book a free trial to see previous A-grade essays.`,
  },
  {
    slug: "digital-sat-desmos-tricks",
    title: "Digital SAT Math: 10 Desmos Tricks That Add 100 Points",
    excerpt: "Ten Desmos graphing calculator techniques that turn hard Digital SAT Math questions into 10-second answers — with real 2026 test-style examples.",
    category: "SAT", curriculumSlug: "sat",
    tags: ["SAT", "Digital SAT", "Desmos", "Math", "US Admissions"],
    author: "Tutoring Galaxy Team", date: "2026-07-02", readTime: "8 min read",
    body: `The Digital SAT built Desmos directly into every math question. Students who use it aggressively routinely add 50–100 points versus students who solve algebraically. Here are the ten techniques that produce the biggest gains, in the order our SAT tutors teach them.

## 1. Solve systems of equations by graphing both

Instead of substitution or elimination, type both equations into Desmos as separate lines. The intersection point is your solution. Click the intersection dot for exact coordinates.

**Example**: If 3x + 2y = 12 and x − y = 1, type "y = (12 − 3x)/2" and "y = x − 1". Click the intersection: (2.8, 1.8).

**Time saved**: ~40 seconds per question. Comes up 4–6 times per test.

## 2. Solve quadratics by finding roots

Type any quadratic as "y = ax² + bx + c" and Desmos shows the x-intercepts (roots). Click each dot for exact values.

**Example**: For 2x² − 5x − 3 = 0, type "y = 2x² − 5x − 3". Roots: x = 3 and x = −0.5.

## 3. Verify multiple-choice answers instantly

When stuck, plug each answer choice into Desmos as a graph and see which fits. For "what value of k makes the system have exactly one solution?", graph the system for each k and count intersections.

## 4. Use sliders for parameter questions

Type "y = ax² + bx + c" and Desmos offers to create sliders for a, b, c. Drag each slider and watch the graph change in real time. Ideal for "which of the following describes the effect of increasing k?" questions.

## 5. Solve inequalities by shading

Type "y > 2x + 3" — Desmos shades the solution region. For systems, type both inequalities and the overlap is your answer.

## 6. Find distance between two points

Type both points as "(x₁, y₁)" and "(x₂, y₂)". Then type "distance((x₁, y₁), (x₂, y₂))" — Desmos returns the answer.

## 7. Solve trigonometry questions numerically

For "sin(θ) = 0.6, find θ in degrees where 0 ≤ θ ≤ 360", type "y = sin(x)" and "y = 0.6", set the angle mode to degrees (wrench icon), and read intersections in the visible x-range.

## 8. Regression for scatter-plot questions

Digital SAT frequently gives a table and asks for the line of best fit. Type the data as a table in Desmos and add "y₁ ~ mx₁ + b" — Desmos returns m and b instantly.

Works for exponential ("y₁ ~ a·b^x₁") and quadratic ("y₁ ~ ax₁² + bx₁ + c") regressions too.

## 9. Statistics — mean, median, standard deviation

Type a dataset as "L = [4, 7, 2, 9, 5]" then use "mean(L)", "median(L)", "stdev(L)". Returns numeric answers instantly.

## 10. Function transformation checks

For "which graph represents f(x − 3) + 2?", type "f(x) = " with the original function, then "g(x) = f(x − 3) + 2". Desmos plots both — visually confirm the shift.

## Practice discipline

Knowing these tricks isn't enough. During Bluebook practice tests:

- **Force yourself** to use Desmos on every math question, even easy ones, until it becomes automatic.
- **Time each Desmos technique** — you should hit each in under 15 seconds.
- **Keep a "Desmos miss" log** — every question where you solved algebraically but Desmos would have been faster. Review weekly.

## Which questions still require algebra?

Not everything is Desmos-solvable. Keep sharp algebra skills for:

- Questions asking to "simplify" or "which of the following is equivalent to" — Desmos can verify but not simplify.
- Word problems where the challenge is setting up the equation.
- Number-theory questions (primes, remainders, integer constraints).

## The score impact

Our SAT specialists track median score changes when students internalise Desmos. Typical results over a 12-week programme:

- Baseline Math 600 → after Desmos mastery, 680–720.
- Baseline Math 700 → after Desmos mastery, 750–780.

Not because Desmos makes questions easier — but because it saves 15–20 minutes of clock time, freeing you to double-check your hardest questions.

## What Tutoring Galaxy offers

Every Digital SAT student in our programme gets a 90-minute dedicated Desmos-drilling session in Week 2, followed by mixed practice under Bluebook conditions. Book a free diagnostic to test your current Desmos speed.`,
  },
  {
    slug: "gcse-maths-grade-9-plan",
    title: "GCSE Maths Revision: The 40-Day Grade 9 Plan",
    excerpt: "A day-by-day GCSE Maths revision plan targeting Grade 9 — covering AQA, Edexcel and OCR spec, with topic drills, past-paper cadence and mark-scheme technique.",
    category: "GCSE", curriculumSlug: "gcse",
    tags: ["GCSE", "Maths", "Grade 9", "Revision Plan", "UK"],
    author: "Tutoring Galaxy Team", date: "2026-06-30", readTime: "9 min read",
    body: `Grade 9 in GCSE Maths requires roughly 90/100 marks in the higher tier — meaning you can miss only 10 marks across three 90-minute papers. This 40-day plan is the exact structure our top tutors use with Year 11 students targeting a 9 in AQA, Edexcel or OCR Higher.

## Prerequisites

Before starting the plan, you should be **consistently scoring 6 or above** in mock papers. If you're at Grade 5 or below, do a foundation-consolidation programme first — the 40-day sprint assumes solid grade 6/7 knowledge.

## The three-phase structure

- **Days 1–14: Topical mastery.** Fix the 10 topics that separate 7s from 9s.
- **Days 15–28: Full papers with mark-scheme dissection.** Two papers per week.
- **Days 29–40: Mock cycle and taper.** Three full mocks + rest.

## Days 1–14: Topical mastery

The following ten topics account for ~60% of grade-9 marks:

- **Day 1**: Algebraic proof and identities. 20 questions.
- **Day 2**: Quadratic sequences and nth term. 20 questions.
- **Day 3**: Simultaneous equations (one linear, one quadratic). 15 questions.
- **Day 4**: Circle theorems — all seven, with proof reasoning. 15 questions.
- **Day 5**: Vectors — proving collinearity and midpoints. 15 questions.
- **Day 6**: Functions — composite and inverse. 20 questions.
- **Day 7**: Surds — rationalising denominators and expanding. 20 questions.
- **Day 8**: Bounds — upper and lower for compound calculations. 15 questions.
- **Day 9**: Histograms and cumulative frequency. 15 questions.
- **Day 10**: Trigonometric graphs and exact values. 20 questions.
- **Day 11**: Iterative methods and numerical solutions. 15 questions.
- **Day 12**: Graph transformations. 20 questions.
- **Day 13**: Non-right-angled triangles (sine rule, cosine rule, area). 20 questions.
- **Day 14**: Rest day + review your worst three topics.

**Method for each day**: 10 minutes of theory, 40 minutes of past-paper topical questions, 10 minutes marking with the scheme.

## Days 15–28: Full papers

- **Days 15, 18, 22, 25**: Full 90-minute past paper (calculator or non-calculator, alternating).
- **Days 16, 19, 23, 26**: Mark your own paper using the official mark scheme + examiner report. Rewrite every wrong question.
- **Days 17, 20, 24, 27**: Topical practice on the weakest topic identified from the paper.
- **Day 21, 28**: Rest days.

**Non-negotiable**: Print every paper. Screen-sitting changes your pacing.

## Days 29–40: Mock cycle and taper

- **Days 29, 33, 37**: Full 3-paper mocks (Papers 1, 2 and 3 in a single day). Simulate real exam conditions — same start time, same clothes, same breakfast.
- **Days 30–31, 34–35, 38–39**: Mark the mock, rewrite weak questions, review command words.
- **Days 32, 36, 40**: Light revision only. Formula sheets, key facts. No new topics.

**Days 41+ (real exam week)**: Only formula review and past-mistake review. Do not attempt new questions. Sleep 8+ hours.

## Board-specific notes

- **AQA Higher (8300)**: Paper 1 non-calc, Papers 2 & 3 calc. Prioritise algebraic manipulation for Paper 1.
- **Edexcel Higher (1MA1)**: Same paper split. Slightly more emphasis on real-world problem contexts.
- **OCR Higher (J560)**: Paper 3 has heavier proof and reasoning weight. Extra time on circle theorem proofs.

## Formula sheet — what you no longer memorise

From 2025 onwards, GCSE Maths provides a formula sheet including quadratic formula, sphere/cone volumes, sine/cosine rules and trigonometric graphs. You no longer need to memorise these — but you must know when to use each. Practise identifying which formula fits a question in under 5 seconds.

## Common grade-9 blockers

- **Weak algebra fluency**. If you hesitate expanding (2x − 3)(x + 5), fix this first.
- **Slow calculation**. Grade 9 requires ~1 minute per mark. If you're slower, drill timed sets.
- **Careless errors**. Grade 9 students lose most marks to arithmetic slips, not knowledge gaps. Introduce a mandatory "check units + check sign + check line above" ritual on every answer.
- **Skipping question parts (c) and (d)**. These carry the top marks. Even a partial attempt earns method marks.

## The last-24-hours checklist

- Formula sheet review — 30 minutes.
- Circle theorem diagrams — 10 minutes.
- Command words: "show that", "prove", "hence", "given that" — 5 minutes.
- One easy topic to boost confidence (e.g. Pythagoras) — 15 minutes.
- Sleep, no revision after 21:00.

## What Tutoring Galaxy offers

Every GCSE Maths Academy student gets a personalised 40-day plan mapped to their exam board, weekly mock marking with examiner-report annotation, and daily WhatsApp check-ins. Book a free trial to receive a diagnostic mock and your first-week schedule.`,
  },
  {
    slug: "online-tutor-pakistan-vetting",
    title: "Online Tutor in Pakistan: How to Vet a Home Tutor in 2026",
    excerpt: "A parent's checklist for hiring an online or home tutor in Pakistan — the 12 questions to ask, the red flags to avoid, and how to run a proper trial class.",
    category: "Parents Guide",
    tags: ["Online Tutoring", "Pakistan", "Home Tutor", "Parents Guide", "Vetting"],
    author: "Tutoring Galaxy Team", date: "2026-06-28", readTime: "8 min read",
    body: `Hiring a tutor in Pakistan is a market where prices range from PKR 500 to PKR 5,000 per hour and credentials vary from "science graduate" to "Cambridge examiner". Here is the 2026 parent's checklist we use ourselves — the 12 questions to ask, the red flags to avoid, and how to run a trial that reveals a tutor's real level.

## 1. Decide first: home tutoring or online?

**Home tutoring** works best for:
- Primary and O Level students (ages 7–15) who need supervision.
- Families in Islamabad, Lahore or Karachi with easy tutor access.
- Practical subjects where physical equipment matters (Art, Biology dissection).

**Online tutoring** works best for:
- A Level, IB and university applicants who need specialist subject expertise.
- Families outside the big three cities (Multan, Peshawar, Quetta, Hyderabad).
- Students juggling school + prep who need scheduling flexibility.
- Access to international tutors (UK, US, Australia-based Pakistani educators).

## 2. The 12 vetting questions

Ask every tutor these 12 questions before booking. A qualified tutor answers all 12 without hesitation.

**Qualifications and experience**

1. **What is your specific qualification in this subject?** (Not general education — the subject.)
2. **Which exam boards have you taught?** (CIE Cambridge, Edexcel, AQA, OCR, IB — they teach differently.)
3. **How many years have you taught this exact syllabus?**
4. **What was the average grade of your students last year?**

**Teaching style**

5. **What does your typical lesson structure look like?** (Warm-up, teaching, practice, review — vague answers here mean improvised lessons.)
6. **How do you handle a topic my child doesn't understand after the first explanation?**
7. **What homework do you set between sessions?**

**Tracking and accountability**

8. **How do you track my child's progress across the term?**
9. **Do I receive a written report after each session?**
10. **How often do you run mock assessments?**

**Logistics**

11. **What is your cancellation policy and how much notice do you require?**
12. **Do you offer a free trial class?** (Any legitimate tutor does.)

## 3. Red flags to walk away from

- **No trial class offered.** Legitimate tutors are confident enough to demo.
- **Cash-only, no receipts.** You need proof of payment for disputes.
- **Refuses to share qualifications** or offers only a name of a university without a certificate scan.
- **Quotes fees before hearing the subject and level.** Real tutors price based on complexity.
- **"I teach every subject from Class 1 to A Level."** Nobody is genuinely a specialist across that range.
- **Aggressive discount pressure** ("book 10 sessions today for 20% off").
- **No online presence at all.** Legitimate tutors have a LinkedIn or a listing on a verified platform.
- **Poor English fluency for O/A Level tutoring.** Even for maths, exam papers are in English — your tutor needs to explain command words like "hence", "given", "state" fluently.

## 4. How to run a proper trial class

A trial class is a mutual interview — you're evaluating the tutor, they're evaluating your child. Follow this structure:

**Before the trial (send in advance):**
- Your child's most recent test paper or school report.
- The specific topics you want covered in the trial.
- The exam board and syllabus code.

**During the trial (60 minutes):**
- **First 10 minutes**: Tutor should ask diagnostic questions about your child's current understanding.
- **Middle 40 minutes**: Actual teaching of a challenging topic.
- **Final 10 minutes**: Tutor should assign a short exercise and explain how they'd approach the term.

**After the trial (ask your child):**
- Did the tutor explain things clearly enough that you understood?
- Did the tutor let you ask questions comfortably?
- Would you want a second session with this person?

Your child's comfort matters more than any adult impression. A tutor your child dreads meeting will produce worse results than a mediocre tutor they enjoy.

## 5. What to pay in Pakistan (2026 rates)

- **Primary / Class 1–5**: PKR 800–1,500 per hour (in-person), PKR 500–1,000 online.
- **Class 6–8**: PKR 1,000–2,000 in-person, PKR 800–1,500 online.
- **O Level / IGCSE**: PKR 1,500–3,500 in-person, PKR 1,200–2,800 online.
- **A Level / IB**: PKR 2,500–5,000 in-person, PKR 2,000–4,000 online.
- **MDCAT / SAT specialists**: PKR 3,000–6,000 per hour, group cohorts PKR 8,000–15,000 per month.

Prices in Islamabad and Lahore run 20–30% above Karachi and Rawalpindi. UK/US-based Pakistani tutors charge 2–3× local rates but often deliver significantly better results for A Level and university admissions.

## 6. Contracts and payment

- **Always pay by bank transfer** with a receipt — never full cash advance.
- **Book in monthly blocks**, not termly. This gives you an exit if the tutor underperforms.
- **Agree in writing**: hourly rate, cancellation policy, holiday coverage, replacement session policy.
- **Never pay more than one month in advance.**

## 7. The 30-day performance review

After 30 days, ask three questions:

1. **Has my child's mock-test score improved?** If not, the tutor isn't working.
2. **Does my child understand topics they previously didn't?** Ask them to explain one.
3. **Is homework being marked and returned with useful feedback?**

If any answer is no, change tutors. The Pakistani market has thousands of tutors — you never have to settle.

## What Tutoring Galaxy offers

Every Tutoring Galaxy tutor is police-verified, background-checked and demo-vetted before they teach a single student. Trial classes are free, monthly billing only, and we replace any tutor within 48 hours at no cost if you're not satisfied. Book a free trial to see the difference.`,
  },
  {
    slug: "igcse-vs-o-level-complete-guide",
    title: "IGCSE vs O Level: The Complete 2026 Guide for Parents & Students",
    excerpt: "IGCSE or O Level? A definitive side-by-side comparison covering syllabus, grading, coursework, cost, university recognition and how to choose the right route in Pakistan, the UAE and the UK.",
    category: "IGCSE", curriculumSlug: "igcse",
    tags: ["IGCSE", "O Level", "Comparison", "Parents Guide", "Cambridge"],
    author: "Tutoring Galaxy Team", date: "2026-07-16", readTime: "12 min read",
    body: `Every week, parents in Islamabad, Lahore, Dubai and London ask us the same question: **should my child take IGCSE or O Level?** Both are Cambridge-issued qualifications, both are accepted at top universities, and both are marked on similar A*–G scales. Yet the day-to-day experience — and the doors each one opens — can be very different.

This is the definitive guide our senior tutors use when advising families. It covers the seven differences that actually matter, a decision framework, and the country-specific advice most schools won't give you.

## 1. What each qualification actually is

**O Level** (Cambridge Ordinary Level, syllabus code 7010–7999) is Cambridge's original 16+ qualification, launched in 1951. It is exam-only, follows a traditional academic structure, and is graded A*–E. Cambridge has been steadily retiring O Level subjects — by 2027, several core O Levels (including Chemistry 5070 and Biology 5090) will only be examinable in specific regions.

**IGCSE** (International General Certificate of Secondary Education, syllabus code 0400–0999) was launched by Cambridge in 1988 as the international successor to the UK GCSE. It offers coursework options, tiered papers, and a wider grade range (A*–G with optional 9–1 numeric grading). Edexcel also offers its own IGCSE variant.

The short version: **O Level is the older, exam-only route being phased down. IGCSE is the modern, more flexible replacement that Cambridge is actively investing in.**

## 2. Syllabus depth and content refresh

IGCSE syllabi are reviewed on a three-year cycle, meaning content stays close to modern pedagogy — expect updated Biology sections on genetics, contemporary English literature texts, and current-affairs geography case studies.

O Level moves more slowly. Some syllabi haven't seen a major refresh in a decade. For students who prefer a stable, predictable question style with well-worn past papers going back 20+ years, that's actually an advantage. For students who thrive on modern context, IGCSE wins.

## 3. Coursework vs pure examination

This is the biggest structural difference.

- **IGCSE** offers a *coursework route* in subjects like English First Language (0500), Geography (0460), History (0470) and ICT (0417). Coursework is marked internally and moderated by Cambridge — typically 20–30% of the final grade.
- **O Level** is 100% terminal exam. No coursework, no projects, no continuous assessment.

If your child is a strong writer or researcher who tests poorly under time pressure, IGCSE's coursework option can lift a grade or two. If your child prefers a single decisive exam and doesn't want a year of internal deadlines, O Level's simplicity is appealing.

## 4. Tiered papers — a lifeline for weaker students

IGCSE Maths, Sciences and several languages split into **Core** and **Extended** tiers:

- **Core** caps the top grade at C but sets more accessible questions — a safety net for students at risk of failing.
- **Extended** unlocks A* but with harder questions.

O Level offers a single paper. There's no fallback tier — you sit the full paper regardless of your predicted grade.

For families whose child sits between a strong pass and a struggling grade, IGCSE's Core tier is often the difference between a certificate and a resit.

## 5. Grading scale

| Feature | IGCSE | O Level |
|---|---|---|
| Grade range | A*–G (or 9–1) | A*–E |
| Ungraded threshold | U | U |
| Numeric option | Yes (9–1) | No |
| Top grade | A* / 9 | A* |

A*–E on O Level maps roughly to A*–C on IGCSE — meaning O Level students who "just pass" with an E have no direct IGCSE equivalent above a fail.

## 6. Subject range

- **IGCSE**: 70+ subjects including 30+ international languages (Urdu, Arabic, Malay, Bahasa, Mandarin), Global Perspectives, Enterprise, and Environmental Management.
- **O Level**: ~40 subjects, with a narrower creative and language offering.

If your child wants to study a heritage language for a UCAS boost, IGCSE almost certainly has it. O Level probably doesn't.

## 7. University recognition — the honest answer

Both qualifications are accepted at UK, US, Canadian and Australian universities, but with important nuances.

- **UK universities** treat them as equivalent. Oxbridge, Imperial, LSE and Russell Group admissions officers see them side by side.
- **US universities** overwhelmingly prefer IGCSE. Some US admissions offices are unfamiliar with O Level and occasionally ask for a NARIC/ECCTIS equivalency letter — an extra step, not a rejection.
- **Canadian universities** (Toronto, UBC, McGill) accept both but publish clearer entry requirements for IGCSE.
- **Australian universities** (Melbourne, Sydney, ANU) accept both.
- **Medical schools in Pakistan** (PMC-affiliated) accept both equally for MBBS eligibility.

If your child has any chance of applying to a US university, IGCSE removes friction.

## 8. Cost — the difference is smaller than you think

Exam fees are set by Cambridge and passed through by schools. In 2026:

- **IGCSE** per subject: roughly PKR 22,000–28,000 in Pakistan, AED 550–700 in the UAE.
- **O Level** per subject: roughly PKR 18,000–24,000, AED 480–620.

Over 8 subjects that's a PKR 30,000–40,000 gap in Pakistan — real money, but not decisive for most families.

## 9. Country-by-country reality check

**Pakistan:** O Level dominates — about 70% of English-medium schools enter students for O Level, largely for cost and historical reasons. Beaconhouse, LGS and Roots run mixed routes; The City School has been shifting toward IGCSE.

**UAE:** IGCSE dominates. Almost every British-curriculum school in Dubai and Abu Dhabi (GEMS, Taaleem, Nord Anglia) runs IGCSE exclusively.

**UK & Commonwealth:** IGCSE is standard at independent schools; state schools run the domestic GCSE.

**Africa (Kenya, Nigeria, Zimbabwe):** O Level remains common but IGCSE is growing rapidly.

## 10. How to decide — a 4-question framework

Ask your child (and their current school) these four questions:

1. **What does your school actually enter students for?** Switching routes mid-stream is expensive and disruptive. If the school only offers O Level, the practical answer is O Level — supplement with strong tutoring.
2. **Where might you apply for university?** Any US ambition tilts toward IGCSE. UK-only ambitions are neutral.
3. **How does your child perform under pure exam pressure?** Weak exam-takers benefit from IGCSE coursework routes and Core-tier safety nets.
4. **Are you optimising for cost or optionality?** O Level saves ~15% on fees. IGCSE gives more subjects, better US recognition and modern content.

## 11. What Tutoring Galaxy recommends

If you have a genuine choice: **pick IGCSE** in 2026. It's actively maintained by Cambridge, more universities recognise it without paperwork, and the coursework and tiered options give weaker students a route to a passing grade that O Level simply doesn't offer.

If your school locks you into O Level, don't panic — every top UK and Pakistani university treats it as equivalent. The route matters far less than the grades. Get a specialist tutor, drill past papers, and target A/A* across your strongest subjects.

## Ready to start?

Our tutors specialise in both Cambridge and Edexcel IGCSE as well as classic O Level. Book a **free 30-minute trial class** with a subject specialist — we'll map your child's current level to the right route and build a term-by-term plan.`,
  },
  {
    slug: "igcse-revision-strategy",
    title: "The 8-Week IGCSE Revision Strategy That Actually Works",
    excerpt: "A structured 8-week IGCSE revision plan used by top-scoring students at Cambridge & Edexcel schools.",
    category: "IGCSE", curriculumSlug: "igcse",
    tags: ["IGCSE", "Revision", "Study Plan"],
    author: "Tutoring Galaxy Team", date: "2026-06-20", readTime: "7 min read",
    body: longBody(
      "IGCSE success isn't about memorising more — it's about practising smarter. Here's the 8-week structure our top tutors use.",
      [
        "Diagnostic week: Take a past-paper baseline in every subject to map your weakest topics.",
        "Topic mastery: Spend weeks 2–4 doing two focused 1-on-1 sessions per subject, with timed quizzes.",
        "Past papers: From week 5, do one full past paper per subject per week under exam conditions.",
        "Mark-scheme study: Re-mark your own paper using the official scheme — this is where the real grade uplift happens.",
        "Mocks & polish: The final two weeks are full mocks with examiner feedback.",
      ],
      "Pair this with our free Growing Stars assessment to focus on the right topics first.",
    ),
  },
  {
    slug: "gcse-9-1-grading",
    title: "GCSE 9–1 Grading Explained: What a Grade 7, 8 and 9 Really Mean",
    excerpt: "How the UK 9–1 system maps to old A*–C grades and what universities actually look for.",
    category: "GCSE", curriculumSlug: "gcse",
    tags: ["GCSE", "Grades", "UK"],
    author: "Tutoring Galaxy Team", date: "2026-06-15", readTime: "5 min read",
    body: longBody(
      "The GCSE 9–1 system replaced A*–G in 2017. Here's what each grade actually means for sixth-form and university admissions.",
      [
        "Grade 9: Top performers — roughly the top half of old A* grade.",
        "Grade 7–8: Equivalent to old A and A*. Required for top sixth-form colleges.",
        "Grade 5–6: Strong pass; equivalent to old B–high C.",
        "Grade 4: Standard pass; required for most apprenticeships.",
        "Grade 1–3: Below pass; resit recommended.",
      ],
      "Targeting Grade 7+ requires consistent past-paper practice from year 10.",
    ),
  },
  {
    slug: "o-level-vs-igcse",
    title: "O Level vs IGCSE: Which Should You Take?",
    excerpt: "Side-by-side comparison of Cambridge O Level and IGCSE — recognition, difficulty and subject choice.",
    category: "O Level", curriculumSlug: "o-level",
    tags: ["O Level", "IGCSE", "Comparison"],
    author: "Tutoring Galaxy Team", date: "2026-06-10", readTime: "6 min read",
    body: longBody(
      "Many parents ask whether O Level or IGCSE is better. The honest answer: it depends on your future plans.",
      [
        "Recognition: IGCSE is recognised more widely internationally; O Level is dominant in Pakistan and parts of Africa.",
        "Difficulty: IGCSE includes coursework options; O Level is exam-only and slightly more traditional.",
        "Subject choice: IGCSE offers 70+ subjects vs O Level's ~40.",
        "University admission: Both are accepted by UK and US universities with equal weight.",
        "School support: Choose the one your school formally enters you for — switching mid-stream is risky.",
      ],
      "Our tutors specialise in both; book a free trial to discuss the right fit.",
    ),
  },
  {
    slug: "a-level-ucas-strategy",
    title: "A Level Subject Choice & UCAS: The Russell Group Playbook",
    excerpt: "Which A Level combinations open the most Russell Group doors — and which to avoid.",
    category: "A Level", curriculumSlug: "a-level",
    tags: ["A Level", "UCAS", "University"],
    author: "Tutoring Galaxy Team", date: "2026-06-05", readTime: "8 min read",
    body: longBody(
      "Choosing A Levels is the single highest-leverage decision before university. Here's how to maximise your UCAS chances.",
      [
        "Stick to facilitating subjects: Maths, English, Sciences, History, Geography, Languages.",
        "Avoid more than one 'soft' A Level: Russell Group programmes filter on combinations.",
        "Match your degree: Engineering wants Maths + Physics; Medicine wants Chemistry + Biology.",
        "Further Maths is gold: Adds Oxbridge, Imperial and Cambridge eligibility for STEM degrees.",
        "Predicted grades matter: Aim 1–2 grades above your offer at mock stage.",
      ],
      "Pair this with a UCAS personal statement coach — included in our A Level Academy.",
    ),
  },
  {
    slug: "ib-extended-essay-guide",
    title: "The IB Extended Essay: A 4,000-Word Survival Guide",
    excerpt: "How to pick an EE topic, structure 4,000 words and land an A grade.",
    category: "IB", curriculumSlug: "ib",
    tags: ["IB", "Extended Essay", "TOK"],
    author: "Tutoring Galaxy Team", date: "2026-05-30", readTime: "9 min read",
    body: longBody(
      "The Extended Essay scares most IB students. With the right structure it's one of the easiest 3 bonus points to secure.",
      [
        "Pick a subject you already love: You'll be writing 4,000 words on it.",
        "Narrow the question: 'How does X affect Y in context Z' beats vague topic statements.",
        "Use the 6-section structure: intro, methodology, body 1–3, conclusion, references.",
        "Book regular supervisor check-ins: 3 formal meetings is the IB minimum, but weekly drafts win.",
        "Reflect honestly on RPPF: Examiners reward genuine reflection over polished prose.",
      ],
      "Our IB Academy includes a dedicated EE supervisor for the full 6-month process.",
    ),
  },
  {
    slug: "ged-fast-track",
    title: "GED Fast-Track: Pass All 4 Subjects in 8 Weeks",
    excerpt: "Adult learners and 16+ students can pass the GED in 8 weeks with this proven structure.",
    category: "GED", curriculumSlug: "ged",
    tags: ["GED", "Fast Track"],
    author: "Tutoring Galaxy Team", date: "2026-05-25", readTime: "6 min read",
    body: longBody(
      "The GED is shorter and more practical than IGCSE — making an 8-week sprint realistic for motivated students.",
      [
        "Week 1: Diagnostic GED Ready tests in all 4 subjects.",
        "Weeks 2–4: Mathematical Reasoning + RLA mastery (the two hardest sections).",
        "Weeks 5–6: Science + Social Studies passage-style practice.",
        "Week 7: Full timed mock — entire 4-subject battery.",
        "Week 8: Targeted retake of any subject below 145 in the mock.",
      ],
      "Join our GED Academy for mentor-led sprints starting every Monday.",
    ),
  },
  {
    slug: "sat-1500-roadmap",
    title: "SAT 1500+ Roadmap: How Students Hit Elite US Scores",
    excerpt: "A 12-week roadmap from a 1200 baseline to 1500+ on the digital SAT.",
    category: "SAT", curriculumSlug: "sat",
    tags: ["SAT", "US Admissions"],
    author: "Tutoring Galaxy Team", date: "2026-05-20", readTime: "7 min read",
    body: longBody(
      "1500+ is the threshold for Ivy, Stanford and most T20 US universities. Here's how to get there.",
      [
        "Baseline diagnostic: Take a full digital SAT in week 1.",
        "Focus on Math first: It moves faster than Reading & Writing for most students.",
        "Bluebook practice: Use Khan Academy + official Bluebook tests only.",
        "Weekly mocks: From week 4 onward, one timed full mock per weekend.",
        "Adaptive pacing: Train Module 1 ≤ 25 min so you get the harder Module 2.",
      ],
      "Our SAT specialists run dedicated 12-week 1500+ cohorts.",
    ),
  },
  {
    slug: "act-vs-sat",
    title: "ACT vs SAT: Which Test Should You Take in 2026?",
    excerpt: "The two US admissions tests compared — content, scoring and which schools prefer each.",
    category: "ACT", curriculumSlug: "act",
    tags: ["ACT", "SAT", "US Admissions"],
    author: "Tutoring Galaxy Team", date: "2026-05-15", readTime: "5 min read",
    body: longBody(
      "Most US universities accept both tests equally. The choice comes down to your learning style.",
      [
        "Content: ACT has a Science section; SAT does not.",
        "Pace: ACT is faster (around 40 seconds per question); SAT gives you more time.",
        "Math: ACT covers slightly more trig; SAT focuses on algebra & data.",
        "Calculators: SAT now provides a built-in Desmos; ACT lets you bring your own.",
        "Scoring: ACT is 36 max (composite); SAT is 1600 max.",
      ],
      "Take a free diagnostic of each — our tutors will recommend the test you'll score higher on.",
    ),
  },
  {
    slug: "igcse-vs-o-level-differences",
    title: "IGCSE vs O Level Differences: A 2026 Parent's Guide",
    excerpt: "The 7 concrete differences between IGCSE and Cambridge O Level — syllabus, coursework, grading and university recognition explained for parents.",
    category: "IGCSE", curriculumSlug: "igcse",
    tags: ["IGCSE", "O Level", "Comparison", "Parents Guide"],
    author: "Tutoring Galaxy Team", date: "2026-07-01", readTime: "8 min read",
    body: longBody(
      "Parents in Pakistan, the UAE and across the GCC ask us this every week: is IGCSE really different from O Level, or just a rebrand? Here are the seven concrete differences that actually matter.",
      [
        "Syllabus content: IGCSE syllabi are refreshed on a 3-year cycle; O Level moves more slowly and retains older exam-style content.",
        "Coursework option: IGCSE offers a coursework route in subjects like English, Geography and ICT; O Level is 100% exam-based.",
        "Tiered papers: IGCSE splits Maths and Sciences into Core and Extended tiers so weaker students can still pass; O Level runs a single paper.",
        "Grading scale: IGCSE reports A*–G with a numeric 9–1 option; O Level uses A*–E only.",
        "Subject range: IGCSE offers 70+ subjects including international languages; O Level lists closer to 40.",
        "Global recognition: IGCSE is accepted by UK, US, Canadian and Australian universities without question; O Level is fully accepted in the UK and Commonwealth but occasionally queried in the US.",
        "School availability: Most international schools in Dubai, Doha and London run IGCSE; O Level remains dominant in Pakistan and parts of Africa — pick the one your school actually enters students for.",
      ],
      "If your school offers both, our advisors will map your child's strengths to the right route in a free 15-minute call.",
    ),
  },
  {
    slug: "naplan-year-5-numeracy-prep",
    title: "NAPLAN Year 5 Numeracy Prep: A 6-Week Plan That Works",
    excerpt: "Australian parents: a proven 6-week NAPLAN Year 5 numeracy prep plan covering number, algebra, measurement and problem-solving.",
    category: "NAPLAN",
    tags: ["NAPLAN", "Year 5", "Australia", "Numeracy", "Parents Guide"],
    author: "Tutoring Galaxy Team", date: "2026-06-28", readTime: "7 min read",
    body: longBody(
      "NAPLAN Year 5 Numeracy is the first standardised test that follows Australian students into high-school streaming. Here's how to prep in six weeks without burning your child out.",
      [
        "Week 1: Diagnostic — take a full ACARA sample test to identify the weakest strand.",
        "Week 2: Number & Algebra — daily 15-minute drills on fractions, decimals and simple patterns.",
        "Week 3: Measurement & Geometry — perimeter, area, volume and angle basics with hands-on practice.",
        "Week 4: Statistics & Probability — reading tables, column graphs and simple chance questions.",
        "Week 5: Problem-solving — mixed word problems with a 45-second-per-question pace.",
        "Week 6: Full timed mock, review errors, and revisit the weakest strand for two focused sessions.",
      ],
      "Our NAPLAN tutors run small-group Year 5 cohorts across Sydney, Melbourne and Brisbane — book a free trial to start the plan.",
    ),
  },
  {
    slug: "ib-vs-a-level-uae",
    title: "IB vs A Level in the UAE: Which Opens More University Doors?",
    excerpt: "For UAE families choosing between IB Diploma and A Levels — university acceptance, workload and cost compared for Dubai and Abu Dhabi schools.",
    category: "IB", curriculumSlug: "ib",
    tags: ["IB", "A Level", "UAE", "Dubai", "University"],
    author: "Tutoring Galaxy Team", date: "2026-06-25", readTime: "9 min read",
    body: longBody(
      "In Dubai and Abu Dhabi almost every top school offers both IB Diploma and A Levels. The right choice depends on your child's target universities and workload tolerance.",
      [
        "University acceptance: Both are equally accepted at UK, US, Canadian and Australian universities. Ivy League admissions officers slightly favour IB's breadth.",
        "Workload: IB is 6 subjects + TOK + EE + CAS; A Level is 3–4 subjects only. IB is heavier week-to-week.",
        "Depth vs breadth: A Level goes deeper into 3 subjects — better for STEM-focused students. IB keeps a language and arts subject compulsory.",
        "Grade conversion: An IB 40+ is broadly equivalent to A*A*A at A Level for UK admissions.",
        "Cost: IB exam fees in the UAE are higher (roughly AED 4,500 vs AED 2,800 for A Level).",
        "Retake flexibility: A Levels can be re-sat in October/January; IB is a fixed May exam window.",
      ],
      "Our UAE-based counsellors will map your child's target universities to the better fit — book a free consultation.",
    ),
  },
  {
    slug: "gcse-grade-boundaries-2026",
    title: "GCSE Grade Boundaries 2026: What Grade 7, 8 and 9 Actually Cost",
    excerpt: "The 2026 GCSE grade boundaries explained — how many marks you need for a 7, 8 or 9 in Maths, Sciences and English.",
    category: "GCSE", curriculumSlug: "gcse",
    tags: ["GCSE", "Grade Boundaries", "UK", "2026"],
    author: "Tutoring Galaxy Team", date: "2026-06-22", readTime: "6 min read",
    body: longBody(
      "GCSE grade boundaries move every year based on cohort performance. Here's what the 2026 grades cost across the three big boards (AQA, Edexcel, OCR).",
      [
        "Grade 9 Maths (Higher): ~200/240 marks on AQA and Edexcel — top 4% of the cohort.",
        "Grade 8 Maths: ~170/240 marks — solid Oxbridge STEM base.",
        "Grade 7 Sciences: ~145/210 combined-science marks — meets sixth-form triple-science entry.",
        "Grade 9 English Language: ~65/80 marks — requires strong analytical writing.",
        "Grade 4 (standard pass): 46–52% depending on board and subject — required for most apprenticeships.",
        "Marks vs percentages: Boundaries are set post-exam by Ofqual, so raw percentages are unreliable indicators until August.",
      ],
      "Track live boundary predictions and get past-paper feedback from a specialist GCSE tutor — first trial free.",
    ),
  },
  {
    slug: "digital-sat-vs-paper-sat",
    title: "Digital SAT vs Paper SAT: What Changed and How to Prep",
    excerpt: "The Digital SAT replaced the paper test in 2024. Here's what's different and how to score 1500+ on the new adaptive format.",
    category: "SAT", curriculumSlug: "sat",
    tags: ["SAT", "Digital SAT", "US Admissions"],
    author: "Tutoring Galaxy Team", date: "2026-06-18", readTime: "7 min read",
    body: longBody(
      "The Digital SAT is now the only format College Board offers. It's shorter, adaptive and scored on the same 1600 scale — but the strategy is different.",
      [
        "Length: 2h 14m vs 3h — the whole test is a third shorter.",
        "Adaptive modules: Module 1 sets the difficulty of Module 2. Nail Module 1 to unlock the harder (higher-scoring) Module 2.",
        "Reading: Passages are much shorter (25–150 words) with one question each. Skimming skills matter less.",
        "Math: Every question allows the built-in Desmos graphing calculator — leverage it aggressively.",
        "Scoring: Same 400–1600 scale, but a raw miss in Module 1 hurts more than in the old paper test.",
        "Practice tools: Bluebook is the only official practice; Khan Academy has been fully rebuilt for Digital.",
      ],
      "Our SAT specialists run 12-week Digital SAT cohorts targeting 1500+ — book a free diagnostic to start.",
    ),
  },
  {
    slug: "mdcat-preparation-timeline",
    title: "MDCAT Preparation Timeline: 12-Month Plan for Pakistani Med Aspirants",
    excerpt: "Month-by-month MDCAT prep plan for Pakistani students — Biology, Chemistry, Physics, English and Logical Reasoning breakdown.",
    category: "MDCAT",
    tags: ["MDCAT", "Pakistan", "Medical", "PMC"],
    author: "Tutoring Galaxy Team", date: "2026-06-14", readTime: "9 min read",
    body: longBody(
      "The MDCAT is Pakistan's single gateway to MBBS and BDS admissions. A 12-month structured plan beats a 3-month crash course every time.",
      [
        "Months 1–3: Complete the full 1st Year FSc syllabus with topical MCQs after each chapter.",
        "Months 4–6: Cover 2nd Year FSc + high-yield Biology (Physiology, Genetics, Ecology).",
        "Months 7–9: Chapter-wise MDCAT past-paper practice — 200 MCQs per week, timed.",
        "Month 10: Full-length mocks every Sunday, review errors mid-week.",
        "Month 11: Weak-chapter revision + English vocab / Logical Reasoning sprints.",
        "Month 12: Two full mocks per week, sleep discipline, and no new topics.",
      ],
      "Our MDCAT tutors run Islamabad and Lahore cohorts with weekly mocks — book a free diagnostic session.",
    ),
  },
  {
    slug: "eleven-plus-prep-uk",
    title: "11+ Preparation in the UK: A Realistic Year-5 Timeline",
    excerpt: "Preparing for grammar-school 11+ exams — English, Maths, Verbal and Non-Verbal Reasoning covered with a year-long plan.",
    category: "11+",
    tags: ["11+", "UK", "Grammar School", "Year 5", "Parents Guide"],
    author: "Tutoring Galaxy Team", date: "2026-06-08", readTime: "8 min read",
    body: longBody(
      "Kent, Buckinghamshire and Birmingham grammar schools all use variants of the 11+. Starting in Year 5 gives your child a realistic prep window without last-minute stress.",
      [
        "September–November (Y5): Build core Maths (times tables to 12, fractions, decimals) and reading stamina.",
        "December–February: Introduce Verbal and Non-Verbal Reasoning question types weekly.",
        "March–May: Add timed sections — 25 questions in 25 minutes.",
        "June–August: Full mock papers under exam conditions every other Saturday.",
        "September: Two mocks per week, review vocab lists, sleep discipline.",
        "Exam week: Light revision only, focus on rest and confidence.",
      ],
      "Our UK-based 11+ tutors cover CEM, GL and bespoke school papers — first session free.",
    ),
  },
  {
    slug: "map-test-prep-dubai",
    title: "MAP Test Prep for Dubai & Abu Dhabi Schools: A Parent's Playbook",
    excerpt: "Most GEMS and Taaleem schools now use NWEA MAP for streaming. Here's how to help your child improve their RIT score.",
    category: "MAP",
    tags: ["MAP", "NWEA", "Dubai", "Abu Dhabi", "Parents Guide"],
    author: "Tutoring Galaxy Team", date: "2026-06-02", readTime: "6 min read",
    body: longBody(
      "MAP Growth tests are used by most GEMS, Taaleem and Aldar schools in the UAE for tri-annual streaming decisions. Small, consistent prep moves RIT scores meaningfully.",
      [
        "Understand the format: MAP is adaptive — every question changes difficulty based on the last answer.",
        "Focus on the weakest sub-strand: MAP reports break down by Number & Operations, Geometry, Reading Informational Text, etc.",
        "Use Khan Academy MAP-aligned practice: Free, aligned to NWEA sub-strands, and tracks progress.",
        "Read 20 minutes daily: Reading RIT scores move fastest with sustained daily reading, not test prep.",
        "Practise pacing, not speed: MAP is untimed but rushed answers drop the RIT.",
        "Sit a mock every 6 weeks: Track RIT movement, not raw scores.",
      ],
      "Our Dubai-based tutors run MAP-focused catch-up cohorts each term — book a free trial.",
    ),
  },
  {
    slug: "choose-online-tutor-red-flags",
    title: "How to Choose an Online Tutor: 7 Red Flags Parents Miss",
    excerpt: "Before you pay for online tutoring, check for these 7 red flags that separate real specialists from generic freelancers.",
    category: "Parents Guide",
    tags: ["Parents Guide", "Online Tutoring", "How To"],
    author: "Tutoring Galaxy Team", date: "2026-07-05", readTime: "7 min read",
    body: longBody(
      "Online tutoring is a $10B market and most of it is unregulated. Here are the seven red flags experienced parents check before signing up.",
      [
        "No board-specific specialisation: A tutor who claims to teach 'all Maths' rarely knows Edexcel mark schemes cold.",
        "No trial lesson offered: Reputable tutors always allow a paid or free trial before you commit to a package.",
        "No progress tracking: If they can't show you a lesson report or weekly plan, there's no accountability.",
        "Cash-only or personal bank transfers: Legitimate tutoring companies invoice through a business account.",
        "Vague qualifications: 'Studied at Oxbridge' is not a qualification — ask for the degree, year and subject.",
        "One-way lessons: Great tutors ask more questions than they answer; screen-sharing monologues don't build skill.",
        "No safeguarding policy: Any tutor working with under-18s should have a written safeguarding and recording policy.",
      ],
      "Every Tutoring Galaxy tutor is vetted against all seven — book a free trial to see the difference.",
    ),
  },
  {
    slug: "1-on-1-vs-group-tutoring",
    title: "1-on-1 vs Group Tutoring: What Actually Moves Grades",
    excerpt: "The honest trade-offs between private and small-group tutoring — cost, pace, engagement and grade impact compared.",
    category: "Parents Guide",
    tags: ["Parents Guide", "Tutoring Formats"],
    author: "Tutoring Galaxy Team", date: "2026-07-04", readTime: "6 min read",
    body: longBody(
      "Group tutoring is cheaper, 1-on-1 is faster. The real answer depends on your child's baseline and target grade.",
      [
        "Pace: 1-on-1 adapts to your child in real time; groups run at the median student's pace.",
        "Cost: Small groups (3–5) cost roughly a third of 1-on-1 for a similar tutor.",
        "Engagement: Shy students often speak more in groups; confident students dominate 1-on-1 airtime.",
        "Weak-topic recovery: 1-on-1 wins clearly — a group can't stop for one student's gap.",
        "Exam-technique polish: Groups are excellent here — students learn from each other's marked answers.",
        "Best combo: 1-on-1 for weak topics + group for past-paper practice is the highest-ROI structure.",
      ],
      "Our advisors will map your child's baseline to the right mix — book a free 15-minute consultation.",
    ),
  },
  {
    slug: "tutoring-cost-2026-uk-uae-pakistan",
    title: "How Much Should Tutoring Cost in 2026? UK, UAE & Pakistan Compared",
    excerpt: "Realistic 2026 tutoring price ranges for IGCSE, A Level, IB and SAT across the UK, UAE and Pakistan.",
    category: "Parents Guide",
    tags: ["Parents Guide", "Pricing", "UK", "UAE", "Pakistan"],
    author: "Tutoring Galaxy Team", date: "2026-07-03", readTime: "7 min read",
    body: longBody(
      "Tutoring prices vary 10x across regions. Here are the honest 2026 ranges parents should expect before shopping.",
      [
        "UK IGCSE / GCSE: £30–£75 per hour for a specialist; £90+ for Oxbridge-level tutors.",
        "UK A Level: £45–£90 per hour; STEM and Further Maths sit at the top of the range.",
        "UAE (Dubai / Abu Dhabi): AED 150–350 per hour for IGCSE and A Level with a qualified tutor.",
        "UAE IB Diploma: AED 250–450 per hour — TOK and HL sciences carry a premium.",
        "Pakistan O Level / A Level: PKR 3,000–8,000 per hour for a top-tier tutor in Karachi, Lahore or Islamabad.",
        "SAT / ACT (global online): $40–$120 per hour depending on target score and tutor track record.",
        "Watch-outs: Package discounts of 30%+ are normal; anything cheaper than the low end signals inexperience.",
      ],
      "Get a transparent quote for your child's exact board and target grade — no obligation.",
    ),
  },
  {
    slug: "ap-vs-a-level-vs-ib",
    title: "AP vs A Level vs IB: The Only Comparison US-Bound Students Need",
    excerpt: "Head-to-head comparison of AP, A Level and IB for students targeting US universities — credit, workload and admissions weight.",
    category: "AP",
    tags: ["AP", "A Level", "IB", "US Admissions"],
    author: "Tutoring Galaxy Team", date: "2026-07-02", readTime: "9 min read",
    body: longBody(
      "US universities accept all three qualifications, but they weight them differently. Here's the honest comparison for students choosing a route.",
      [
        "Structure: AP is single subjects, taken à la carte; A Level is 3–4 subjects; IB is a full 6-subject diploma.",
        "College credit: AP scores of 4–5 convert to real course credit at most US universities; A Level and IB HL credits vary by school.",
        "Admissions weight: Ivy League adcoms treat 5 APs at 4–5 as roughly equivalent to A*A*A or IB 40+.",
        "Workload: IB is heaviest (TOK + EE + CAS); AP is lightest if you take 3–4 subjects.",
        "Global recognition: A Level and IB are more portable outside the US; AP is US-optimised.",
        "STEM depth: A Level Further Maths and IB HL Math AA go deeper than AP Calc BC.",
        "Best choice: US-only students pick AP; global applicants pick IB or A Level.",
      ],
      "Our counsellors help students choose the right combination — book a free 15-minute call.",
    ),
  },
  {
    slug: "ap-calculus-bc-6-months",
    title: "AP Calculus BC in 6 Months: A Self-Study Roadmap",
    excerpt: "Month-by-month self-study plan to score a 5 on AP Calculus BC — even without a classroom teacher.",
    category: "AP",
    tags: ["AP", "Calculus", "Self Study"],
    author: "Tutoring Galaxy Team", date: "2026-07-01", readTime: "8 min read",
    body: longBody(
      "AP Calc BC is one of the most self-studiable APs. With six months of structured work, a 5 is realistic for a strong Algebra 2 student.",
      [
        "Month 1: Precalc gap-fill — limits, functions, trig identities. Use Khan Academy Precalc.",
        "Month 2: Differentiation — rules, chain rule, implicit differentiation, related rates.",
        "Month 3: Integration — antiderivatives, u-substitution, definite integrals, FTC.",
        "Month 4: BC-only topics — series, parametric, polar, integration by parts.",
        "Month 5: Full AP past papers, one per weekend, self-marked with the official rubric.",
        "Month 6: FRQ polish — timed 90-minute Free Response practice twice per week.",
      ],
      "Our AP specialists offer weekly 1-on-1 accountability sessions for self-studiers — book a free trial.",
    ),
  },
  {
    slug: "act-english-36-grammar",
    title: "ACT English 36: The Grammar Rules That Actually Get Tested",
    excerpt: "The 12 grammar and rhetoric rules that account for 80% of ACT English questions — with worked examples.",
    category: "ACT", curriculumSlug: "act",
    tags: ["ACT", "English", "Grammar"],
    author: "Tutoring Galaxy Team", date: "2026-06-30", readTime: "7 min read",
    body: longBody(
      "ACT English rewards pattern recognition, not vocabulary. Master these twelve rules and a 36 is realistic.",
      [
        "Comma splices: Two independent clauses can't be joined by a comma alone.",
        "Semicolons vs colons: Semicolon = two independent clauses; colon = introduces a list or explanation.",
        "Subject-verb agreement: Ignore prepositional phrases when finding the subject.",
        "Pronoun clarity: Every 'it', 'they', 'this' must have one clear antecedent.",
        "Modifier placement: The modifier attaches to whatever noun sits nearest — avoid dangling modifiers.",
        "Parallel structure: Lists and comparisons need matching grammatical forms.",
        "Concision: Shorter is almost always correct when meaning is preserved.",
        "Transitions: Read the sentence before AND after — logic beats vocab.",
        "Redundancy: 'Return back', 'end result', 'past history' — always wrong on ACT.",
        "Which vs that: 'That' for essential clauses; 'which' for non-essential (with commas).",
        "Verb tense consistency: Match the tense already established in the passage.",
        "Author's purpose: Rhetoric questions reward the answer that fits the paragraph's function.",
      ],
      "Our ACT tutors run 8-week 30+ cohorts with weekly timed sections — book a free diagnostic.",
    ),
  },
  {
    slug: "ib-math-aa-vs-ai-engineering",
    title: "IB Math AA vs AI: Which Should You Pick for Engineering?",
    excerpt: "IB Math AA vs AI for engineering applicants — what MIT, Cambridge and Imperial actually require.",
    category: "IB", curriculumSlug: "ib",
    tags: ["IB", "Math AA", "Math AI", "Engineering"],
    author: "Tutoring Galaxy Team", date: "2026-06-29", readTime: "7 min read",
    body: longBody(
      "The IB Math AA vs AI choice is the single most important decision for future engineers. Here's the honest breakdown.",
      [
        "Content: AA is proof-heavy calculus and algebra; AI is modelling, statistics and applied maths.",
        "Engineering requirements: Cambridge, Imperial and MIT require or strongly prefer Math AA HL for engineering.",
        "Standard vs Higher: HL matters more than AA vs AI — a Math AI HL beats a Math AA SL for most universities.",
        "Difficulty: AA HL is regarded as the hardest IB Math course; AI HL is challenging but more grounded.",
        "Career fit: AA suits mechanical, electrical, aerospace; AI fits data science, economics, biomedical.",
        "Predicted grades: Universities compare against course cohort — a 6 in AA HL often outweighs a 7 in AI SL.",
      ],
      "Our IB Math specialists help students pick the right route based on target universities — book a free trial.",
    ),
  },
  {
    slug: "o-level-add-maths-high-yield",
    title: "O Level Additional Maths: The 10 Topics Worth 70% of Marks",
    excerpt: "The highest-yield Cambridge O Level Additional Maths (4037) topics — prioritise these for an A*.",
    category: "O Level", curriculumSlug: "o-level",
    tags: ["O Level", "Additional Maths", "4037"],
    author: "Tutoring Galaxy Team", date: "2026-06-27", readTime: "6 min read",
    body: longBody(
      "Cambridge O Level Additional Maths (4037) covers a lot, but ten topics reliably account for around 70% of marks each session.",
      [
        "Differentiation: Product, quotient and chain rule — appears in every paper.",
        "Integration: Definite and indefinite, including trigonometric functions.",
        "Kinematics: Displacement–velocity–acceleration questions using calculus.",
        "Quadratic functions: Completing the square, discriminant and roots.",
        "Binomial expansion: For positive integer n — a guaranteed question.",
        "Logarithms and exponentials: Change of base and solving equations.",
        "Trigonometric identities and equations: Especially double-angle and R-formula.",
        "Circular measure: Arc length, sector area, and combined shape problems.",
        "Vectors: 2D position vectors and simple geometry proofs.",
        "Coordinate geometry: Straight lines, perpendicular gradients and midpoints.",
      ],
      "Our O Level Add Maths tutors run topic-by-topic sprints targeting A* — book a free diagnostic.",
    ),
  },
  {
    slug: "best-igcse-schools-dubai-2026",
    title: "Best IGCSE Schools in Dubai 2026 and How to Prep for Entry",
    excerpt: "Top-rated IGCSE schools in Dubai for 2026 — KHDA ratings, fees, entry tests and prep strategies.",
    category: "IGCSE", curriculumSlug: "igcse",
    tags: ["IGCSE", "Dubai", "UAE", "Schools", "Parents Guide"],
    author: "Tutoring Galaxy Team", date: "2026-06-26", readTime: "8 min read",
    body: longBody(
      "Dubai has over 40 schools offering IGCSE. These are the consistently top-rated by KHDA, plus how to prep for entry assessments.",
      [
        "GEMS Wellington International: Outstanding KHDA; entry test focuses on Maths and English reasoning.",
        "Jumeirah College: Outstanding; competitive Year 7 entry with CAT4 and interview.",
        "Dubai College: Outstanding; one of the hardest entry tests in Dubai — Maths, English and reasoning.",
        "Kings' School Dubai: Outstanding; smaller cohort, holistic entry assessment.",
        "GEMS Modern Academy: Very Good; strong IGCSE Sciences track record.",
        "Entry prep: Focus on CAT4-style verbal, non-verbal, quantitative and spatial reasoning.",
        "Timing: Start prep at least 6 months before assessment — most tests are in October–January.",
      ],
      "Our Dubai-based tutors run 1-on-1 entry-test prep for all top KHDA schools — book a free consultation.",
    ),
  },
  {
    slug: "mdcat-vs-sat-pakistan",
    title: "MDCAT vs SAT for Pakistani Students: Which Opens More Doors?",
    excerpt: "Should a Pakistani student prep for MDCAT, SAT or both? A pragmatic guide to career paths, cost and difficulty.",
    category: "MDCAT",
    tags: ["MDCAT", "SAT", "Pakistan", "University"],
    author: "Tutoring Galaxy Team", date: "2026-06-24", readTime: "8 min read",
    body: longBody(
      "Pakistani students often ask: MDCAT for local medicine or SAT for global options? Here's the honest breakdown.",
      [
        "MDCAT: Only route to Pakistan's public and most private MBBS/BDS programmes.",
        "SAT: Opens US, UAE, Canada and select UK universities — but not Pakistani MBBS.",
        "Difficulty: MDCAT is content-heavy (2 years FSc); SAT tests reasoning over content.",
        "Cost: MDCAT prep is PKR 30,000–80,000; SAT + application costs run $2,000+ globally.",
        "Career fit: Committed doctors focus on MDCAT; students open to CS, engineering or business should sit SAT.",
        "Doing both: Realistic only if MDCAT is your firm first choice and SAT is a Plan B — plan 18 months.",
      ],
      "Our Pakistan-based advisors help families choose the right path — book a free 15-minute call.",
    ),
  },
  {
    slug: "naplan-year-9-hsc-streaming",
    title: "NAPLAN Year 9: Why It Matters for HSC Streaming",
    excerpt: "Why Year 9 NAPLAN results influence HSC subject streaming in NSW — and how to prep without stress.",
    category: "NAPLAN",
    tags: ["NAPLAN", "Year 9", "HSC", "NSW", "Australia"],
    author: "Tutoring Galaxy Team", date: "2026-06-23", readTime: "6 min read",
    body: longBody(
      "In NSW, Year 9 NAPLAN historically gated HSC minimum standards. It still influences streaming decisions in most public and independent schools.",
      [
        "Reading and Numeracy Band 8+: Meets minimum HSC standards in most NSW schools.",
        "Streaming impact: Schools use Year 9 NAPLAN to allocate Advanced vs Standard English and Maths.",
        "Advanced Maths pathway: Band 9+ Numeracy is the usual threshold for Extension Maths in Year 11.",
        "Prep timing: 6 focused weeks in Term 1 is enough — no need for year-long prep.",
        "Focus areas: Algebra, ratio, geometry and functional numeracy carry the most weight.",
        "Writing: The persuasive/narrative prompt is graded on 10 criteria — practice structure over vocabulary.",
      ],
      "Our Sydney and Melbourne tutors run 6-week Year 9 NAPLAN sprints — book a free trial.",
    ),
  },
  {
    slug: "exam-stress-parent-script",
    title: "Exam Stress: A Parent's Script for the Week Before",
    excerpt: "Word-for-word phrases to use (and avoid) in the week before your child's exam — from educational psychologists.",
    category: "Parents Guide",
    tags: ["Parents Guide", "Exam Stress", "Mental Health"],
    author: "Tutoring Galaxy Team", date: "2026-06-19", readTime: "6 min read",
    body: longBody(
      "The week before exams is when parent-child friction peaks. These scripts — drawn from ed-psych practice — actually help.",
      [
        "Instead of 'Are you ready?': Say 'What would help you most this week?' — shifts control back to your child.",
        "Instead of 'You should be studying': Say 'I'll be here if you want to talk anything through.'",
        "Instead of 'What if you fail?': Say 'Whatever happens, we'll figure out the next step together.'",
        "Sleep beats cramming: 8 hours the night before adds more marks than 2 extra hours of revision.",
        "Protect breakfast: Protein + slow carbs, no screens for the first 30 minutes.",
        "After the exam: Don't ask 'How did it go?' — ask 'What do you want to do now?'",
      ],
      "Our tutors coach students through exam weeks with weekly check-ins — book a free consultation.",
    ),
  },
  {
    slug: "read-school-report-card",
    title: "How to Read a School Report Card (UK, US & IB formats)",
    excerpt: "Decode UK, US and IB school report cards — grades, effort scores, teacher comments and what parents should ask next.",
    category: "Parents Guide",
    tags: ["Parents Guide", "School Reports", "UK", "US", "IB"],
    author: "Tutoring Galaxy Team", date: "2026-06-17", readTime: "7 min read",
    body: longBody(
      "School reports look simple but hide a lot of nuance. Here's how to actually read them across the three main systems.",
      [
        "UK GCSE reports: Look for the working-at vs target grade gap — a 2-grade gap needs a tutor conversation now.",
        "UK effort grades: A '3' or '4' for effort matters more than a low attainment grade in Year 9–10.",
        "US GPA reports: Weighted vs unweighted GPA — always check both; universities recalculate anyway.",
        "US teacher comments: Watch for phrases like 'inconsistent' or 'when engaged' — these are polite red flags.",
        "IB predicted grades: These directly affect university offers — challenge them respectfully if they seem low.",
        "IB IA feedback: Formative comments in Years 11–12 predict final IA marks; act on them within a term.",
        "Next steps: Bring one specific report line to parent-teacher meetings and ask 'What would move this up one point?'",
      ],
      "Our advisors help parents translate reports into a study plan — book a free 15-minute call.",
    ),
  },
  {
    slug: "20-minute-homework-routine",
    title: "The 20-Minute Daily Homework Routine That Ends Battles",
    excerpt: "A calm, 20-minute daily homework routine that works for Year 5–9 students — no shouting required.",
    category: "Parents Guide",
    tags: ["Parents Guide", "Homework", "Routine"],
    author: "Tutoring Galaxy Team", date: "2026-06-12", readTime: "5 min read",
    body: longBody(
      "Most homework battles come from unclear structure, not lazy kids. This 20-minute daily routine ends 90% of the fights.",
      [
        "Same time, same place: Pick one 20-minute slot and one desk — routine beats motivation.",
        "5-minute plan: Child writes down what they'll do — reading, one worksheet, one Maths section.",
        "10-minute focus block: Phone in another room, timer visible, parent nearby but not hovering.",
        "5-minute review: Child explains one thing they learned — recall > re-reading.",
        "No 'just finish it': If it takes longer than 20 minutes, stop and note it for the teacher.",
        "Friday reset: Weekly 10-minute review of what worked — child leads the conversation.",
      ],
      "Our tutors build daily routines with parents and students together — book a free trial.",
    ),
  },
  {
    slug: "gcse-maths-9-in-12-weeks",
    title: "GCSE Maths Grade 9 in 12 Weeks: A Realistic Sprint Plan",
    excerpt: "A 12-week GCSE Maths sprint plan targeting Grade 9 — topic-by-topic priorities across AQA, Edexcel and OCR.",
    category: "GCSE", curriculumSlug: "gcse",
    tags: ["GCSE", "Maths", "Grade 9"],
    author: "Tutoring Galaxy Team", date: "2026-07-08", readTime: "7 min read",
    body: longBody(
      "Grade 9 in GCSE Maths is the top 4% nationally. With a strong Grade 7 baseline, 12 weeks of structured work gets you there.",
      [
        "Weeks 1–2: Diagnostic paper + algebra fluency (rearranging, quadratics, simultaneous).",
        "Weeks 3–4: Number and ratio — surds, bounds, compound measures.",
        "Weeks 5–6: Geometry — circle theorems, vectors, similarity proofs.",
        "Weeks 7–8: Statistics and probability — histograms, tree diagrams, conditional probability.",
        "Weeks 9–10: Grade 8–9 problem-solving — one full past-paper Question 20+ per day.",
        "Weeks 11–12: Two timed papers per week, self-marked with examiner reports.",
      ],
      "Our GCSE Maths specialists run weekly Grade 9 clinics — book a free trial.",
    ),
  },
  {
    slug: "a-level-chemistry-required-practicals",
    title: "A Level Chemistry Required Practicals: The Exam-Ready Checklist",
    excerpt: "Every A Level Chemistry required practical distilled into what actually appears in written papers.",
    category: "A Level", curriculumSlug: "a-level",
    tags: ["A Level", "Chemistry", "Practicals"],
    author: "Tutoring Galaxy Team", date: "2026-07-07", readTime: "8 min read",
    body: longBody(
      "Around 15% of A Level Chemistry marks come from practical-technique questions in the written papers. Master these and you bank easy marks.",
      [
        "Titrations: Rinse burette with acid, read to bottom of meniscus, discard first titre.",
        "Enthalpy: Extrapolate temperature-time graphs back to time of mixing.",
        "Rates by colorimetry: Calibrate with known concentrations, plot absorbance vs time.",
        "Organic synthesis: Reflux, distillation, separating funnel, drying agent, recrystallisation.",
        "Melting point determination: Use a capillary tube; sharp range confirms purity.",
        "Thin-layer chromatography: Calculate Rf; keep solvent below spot line.",
        "Electrode potentials: High-resistance voltmeter, salt bridge, standard conditions.",
        "Qualitative analysis: Systematic anion and cation tests in the right order.",
      ],
      "Our A Level Chemistry tutors drill each required practical with past-paper questions — book a free trial.",
    ),
  },
  {
    slug: "ib-tok-essay-a-grade",
    title: "IB TOK Essay: How to Score an A Without Overthinking It",
    excerpt: "A repeatable structure for the IB Theory of Knowledge essay that examiners consistently mark as A grade.",
    category: "IB", curriculumSlug: "ib",
    tags: ["IB", "TOK", "Essay"],
    author: "Tutoring Galaxy Team", date: "2026-07-06", readTime: "8 min read",
    body: longBody(
      "TOK feels vague, but examiners mark against a strict rubric. Use this structure and you remove most of the guesswork.",
      [
        "Pick two AOKs: Two contrasting Areas of Knowledge give richer comparison than three shallow ones.",
        "Unpack the prescribed title: Define every ambiguous word in your introduction.",
        "Claim + counterclaim per AOK: This is the single biggest mark-earner on the rubric.",
        "Real examples: Use specific, dated real-world examples — not hypothetical stories.",
        "Perspectives: Show at least two perspectives on each claim.",
        "Implications: End each AOK section with 'so what?' — why does this matter?",
        "Conclusion: Answer the title directly. Do not sit on the fence without justification.",
      ],
      "Our IB TOK coaches run 4-session essay clinics — book a free consultation.",
    ),
  },
  {
    slug: "sat-reading-writing-strategy",
    title: "Digital SAT Reading & Writing: The 5 Question Types That Move Scores",
    excerpt: "The five Digital SAT Reading & Writing question types worth prioritising — with pattern shortcuts for each.",
    category: "SAT", curriculumSlug: "sat",
    tags: ["SAT", "Digital SAT", "Reading"],
    author: "Tutoring Galaxy Team", date: "2026-07-06", readTime: "6 min read",
    body: longBody(
      "Digital SAT Reading & Writing packs 27 questions into 32 minutes per module. These five question types account for most of the movement.",
      [
        "Words in Context: Read the sentence, predict the meaning, then match — never start from the answers.",
        "Main Idea: Look at the first and last sentence; the correct answer paraphrases both.",
        "Cross-Text Connections: Identify the relationship (agree/disagree/extend) before reading answers.",
        "Rhetorical Synthesis: Match the answer to the exact bullet the prompt asks you to emphasise.",
        "Transitions: Read sentence before and after, decide the logical relationship, then pick.",
        "Grammar (Boundaries): Comma vs semicolon vs period — test if both sides are independent clauses.",
      ],
      "Our SAT specialists offer weekly Bluebook clinics — book a free diagnostic.",
    ),
  },
  {
    slug: "igcse-english-language-paper-2",
    title: "IGCSE English Language Paper 2: A Structure That Scores 40+",
    excerpt: "Cambridge IGCSE English Language Paper 2 — a repeatable structure for directed writing and composition that scores 40+.",
    category: "IGCSE", curriculumSlug: "igcse",
    tags: ["IGCSE", "English", "0500"],
    author: "Tutoring Galaxy Team", date: "2026-07-05", readTime: "7 min read",
    body: longBody(
      "Cambridge IGCSE English Language 0500 Paper 2 rewards structure over talent. Here's a template our students use to hit 40+ consistently.",
      [
        "Directed writing: 5-paragraph structure — hook, three developed points, call to action.",
        "Purpose and audience: Name them in the first line — 'To persuade the school board that...'.",
        "Rhetorical toolkit: Rule of three, rhetorical question, statistic, anecdote — one each.",
        "Composition: Plan for 5 minutes; a weak plan wastes the whole answer.",
        "Descriptive writing: One dominant sense, one extended metaphor, one deliberate shift in mood.",
        "Narrative writing: Start in the middle of the action; save exposition for paragraph two.",
        "Timing: 45 min directed + 45 min composition + 15 min planning and checking.",
      ],
      "Our IGCSE English tutors run weekly writing clinics with marked feedback — book a free trial.",
    ),
  },
  {
    slug: "mdcat-biology-high-yield-chapters",
    title: "MDCAT Biology: The 8 Chapters That Score 60% of Marks",
    excerpt: "The 8 highest-yield Biology chapters for MDCAT — prioritise these for maximum score-per-hour return.",
    category: "MDCAT",
    tags: ["MDCAT", "Biology", "Pakistan"],
    author: "Tutoring Galaxy Team", date: "2026-07-04", readTime: "6 min read",
    body: longBody(
      "MDCAT Biology covers both FSc years, but eight chapters reliably account for 60% of MCQs. Prioritise these first.",
      [
        "Cell structure and biomolecules: 8–10 MCQs every year.",
        "Enzymes: Mechanism, inhibitors, factors affecting activity.",
        "Bioenergetics: Photosynthesis and respiration — full cycle detail.",
        "Genetics: Mendelian ratios, sex-linked inheritance, dihybrid crosses.",
        "Human physiology — Circulation: Heart, blood pressure, ECG basics.",
        "Human physiology — Nervous system: Neuron, reflex arc, brain regions.",
        "Reproduction: Male and female systems, hormones, menstrual cycle.",
        "Evolution and ecology: Selection theory, ecosystem energy flow.",
      ],
      "Our MDCAT tutors run chapter-wise weekend sprints — book a free diagnostic.",
    ),
  },
  {
    slug: "act-math-36-tricks",
    title: "ACT Math 36: The 7 Question Patterns That Trip Top Students",
    excerpt: "The 7 ACT Math patterns that separate a 32 from a 36 — plus the shortcuts elite scorers actually use.",
    category: "ACT", curriculumSlug: "act",
    tags: ["ACT", "Math", "36"],
    author: "Tutoring Galaxy Team", date: "2026-07-03", readTime: "7 min read",
    body: longBody(
      "Getting from 32 to 36 on ACT Math is about pattern recognition on 5–6 specific question types.",
      [
        "Matrix multiplication: Rare but guaranteed — memorise the 2x2 process.",
        "Logarithms: Basic change-of-base and log rules; ACT never goes deeper.",
        "Complex numbers: i² = -1; treat i like a variable and simplify.",
        "Vectors: Component addition; magnitude via Pythagoras.",
        "Trig identities: SOHCAHTOA plus the unit circle for 30/45/60/90.",
        "Conic sections: Recognise circle, ellipse, parabola, hyperbola from standard form.",
        "Word problems with 'exactly one': Almost always requires setting up an inequality, not an equation.",
      ],
      "Our ACT Math specialists run 6-week 36 sprints — book a free diagnostic.",
    ),
  },
  {
    slug: "a-level-results-day-plan",
    title: "A Level Results Day: A Calm Hour-by-Hour Plan for Parents",
    excerpt: "An hour-by-hour A Level Results Day plan — from 8 AM UCAS Track to Clearing decisions by lunch.",
    category: "A Level", curriculumSlug: "a-level",
    tags: ["A Level", "Results Day", "UCAS", "Clearing", "Parents Guide"],
    author: "Tutoring Galaxy Team", date: "2026-07-02", readTime: "6 min read",
    body: longBody(
      "A Level Results Day is short and high-stakes. This is the plan that gets families to a good outcome by lunch, regardless of the grades.",
      [
        "8:00 AM: UCAS Track updates — check firm and insurance status first.",
        "8:30 AM: Collect results in person if possible — teachers can advise on appeals.",
        "9:00 AM: If firm confirmed — celebrate, no other action needed until enrolment.",
        "9:00 AM: If missed by one grade — call the university directly; many still confirm.",
        "10:00 AM: If in Clearing — search UCAS Clearing by subject, list 3 target universities.",
        "10:30 AM: Call Clearing hotlines in priority order; have UCAS ID and grades ready.",
        "12:00 PM: Accept the best verbal offer via UCAS Track — one offer at a time.",
        "Afternoon: Sort accommodation, travel and student finance updates.",
      ],
      "Our UCAS advisors run live Results Day support — book a slot in advance.",
    ),
  },
  {
    slug: "ib-cas-project-ideas",
    title: "IB CAS Project Ideas That Actually Impress Universities",
    excerpt: "20+ IB CAS project ideas that go beyond stereotypes — with tips on documentation that universities notice.",
    category: "IB", curriculumSlug: "ib",
    tags: ["IB", "CAS", "University"],
    author: "Tutoring Galaxy Team", date: "2026-07-01", readTime: "7 min read",
    body: longBody(
      "CAS is often treated as a checkbox. Done well, it becomes a genuine talking point in university interviews.",
      [
        "Creativity — Podcast series: 8-episode series on a local issue with interviews.",
        "Creativity — Community art install: Mural, exhibition or short-film screening.",
        "Activity — Coach a junior team: Weekly across a school year, documented.",
        "Activity — Charity endurance event: Half-marathon, cycle ride, hike with fundraising.",
        "Service — Free tutoring programme: Weekly sessions for younger students, tracked outcomes.",
        "Service — Environmental audit: Measure and reduce your school's waste or energy.",
        "CAS project (all three strands): Build and run a school farmers market for a term.",
        "Documentation: Photos, reflections, learning-outcome mapping — universities read these.",
      ],
      "Our IB coaches help students design CAS projects with real impact — book a free consultation.",
    ),
  },
  {
    slug: "sixth-form-choice-uk",
    title: "Choosing a Sixth Form in the UK: State, Private or College?",
    excerpt: "State sixth form vs private vs sixth-form college — honest trade-offs for UK families choosing after GCSE.",
    category: "Parents Guide",
    tags: ["Parents Guide", "Sixth Form", "UK", "A Level"],
    author: "Tutoring Galaxy Team", date: "2026-06-30", readTime: "7 min read",
    body: longBody(
      "The sixth-form choice matters more than most GCSE decisions. Here are the trade-offs UK families should weigh honestly.",
      [
        "State school sixth form: Familiar teachers and friends; limited subject combinations.",
        "Private sixth form: Small classes, strong UCAS support; fees £15k–£30k per year.",
        "Sixth-form college: Wide subject range, adult atmosphere; less pastoral care than school.",
        "Grammar school sixth form (selective areas): Excellent academics, often free; competitive entry.",
        "Independent day vs boarding: Boarding suits committed academics; day preserves home routine.",
        "Look at destinations: Ask for the last 3 years of Oxbridge and Russell Group offers.",
        "Subject depth: Confirm your child's exact A Level combination is offered and well-staffed.",
      ],
      "Our advisors help families weigh sixth-form options against university targets — book a free call.",
    ),
  },
  {
    slug: "homework-routine-that-sticks",
    title: "The Homework Routine That Actually Sticks (Ages 8–16)",
    excerpt: "A calm, repeatable homework routine parents can set up in one week — with realistic time blocks by age.",
    category: "Homework",
    tags: ["Homework", "Routine", "Parents Guide"],
    author: "Tutoring Galaxy Team", date: "2026-07-10", readTime: "6 min read",
    body: longBody(
      "Most homework battles aren't about the work — they're about the routine. Fix the routine and 80% of the fights disappear.",
      [
        "Same time, same place: A fixed 4:30pm desk slot beats 'do it before dinner'.",
        "Age-appropriate blocks: 20 min for Y3–4, 40 min for Y5–7, 60–90 min for Y8+.",
        "Phone in another room: A visible phone drops focus by ~30% even face-down.",
        "Two-minute start rule: Sit down and open the book for 2 minutes — momentum does the rest.",
        "Weekly reset on Sunday: 15 minutes to review the week and load next week's diary.",
      ],
      "Our tutors build the routine with the student in session one — so it survives past week two.",
    ),
  },
  {
    slug: "hsc-year-12-study-plan-nsw",
    title: "HSC Year 12 Study Plan: A Term-by-Term Roadmap for NSW Students",
    excerpt: "How to structure Term 1 to Trials for HSC success — subject weightings, past-paper cadence and ATAR targets.",
    category: "HSC",
    tags: ["HSC", "NSW", "Year 12", "ATAR", "Australia"],
    author: "Tutoring Galaxy Team", date: "2026-07-09", readTime: "9 min read",
    body: longBody(
      "The HSC rewards students who peak in September, not February. Here's how top NSW students pace themselves across Year 12.",
      [
        "Term 1: Consolidate Prelim content gaps and finish first pass on every Y12 module.",
        "Term 2: Assessment-heavy — treat each in-class task as a mini-trial with full marking rubrics.",
        "Term 3 (Trials): One full past paper per subject per week under exam conditions from week 3.",
        "Post-Trials: Rank-driven — target the modules where band cutoffs are closest.",
        "HSC block: Rotate subjects daily; no new content, only past papers and marker feedback.",
        "ATAR maths: A single band jump in a 2-unit subject often shifts your ATAR by 2–3 points.",
      ],
      "Our NSW HSC tutors run weekly Trials-style mocks with rubric-based feedback — book a free trial.",
    ),
  },
  {
    slug: "balancing-study-and-life-teens",
    title: "Balancing Study and Life: What Teens Actually Need to Hear",
    excerpt: "Sleep, sport, friends and screens — the honest teen-life balance guide parents wish schools taught.",
    category: "Life",
    tags: ["Life", "Wellbeing", "Teens"],
    author: "Tutoring Galaxy Team", date: "2026-07-08", readTime: "5 min read",
    body: longBody(
      "Straight-A students who burn out at 17 don't reach their potential. Balance isn't soft — it's strategic.",
      [
        "Sleep first: 8+ hours lifts exam scores more than an extra hour of revision.",
        "Move daily: 30 minutes of any exercise beats a weekly gym marathon for focus.",
        "Protect one friend night per week: Social scaffolding prevents Year-12 collapse.",
        "Screens with intent: Watch one thing you chose, not three you scrolled into.",
        "Talk to one adult: A weekly 10-minute check-in with a parent or mentor changes trajectories.",
      ],
      "Our tutors coach the whole student, not just the subject — ask about our mentor sessions.",
    ),
  },
  {
    slug: "oc-test-preparation-sydney",
    title: "OC Test Preparation: The Realistic Year-3 Playbook for Sydney Parents",
    excerpt: "Opportunity Class test prep for NSW Year 3 students — thinking skills, reading and mathematical reasoning without burning them out.",
    category: "OC",
    tags: ["OC", "NSW", "Sydney", "Year 3", "Selective"],
    author: "Tutoring Galaxy Team", date: "2026-07-07", readTime: "7 min read",
    body: longBody(
      "The NSW Opportunity Class test decides who enters an OC placement in Year 5. Here's the honest, non-burnout Year-3 plan.",
      [
        "Start early but light: 20 minutes, 4 days a week from Term 2 of Year 3.",
        "Thinking Skills first: This section is the biggest ATAR-style differentiator in the test.",
        "Reading is a marathon: One short comprehension a day beats a weekend cram.",
        "Mathematical reasoning: Focus on multi-step word problems, not arithmetic speed.",
        "Sample tests from Term 4: One full timed paper every fortnight, reviewed with a tutor.",
        "Wellbeing rule: If your child dreads the desk, cut the load — long-term motivation matters more than one test.",
      ],
      "Our Sydney OC specialists run small-group cohorts across the Inner West, North Shore and Parramatta.",
    ),
  },
  {
    slug: "parenting-a-perfectionist-student",
    title: "Parenting a Perfectionist: How to Help Without Adding Pressure",
    excerpt: "Practical scripts and boundaries for parents of high-achieving students who struggle with 'good enough'.",
    category: "Parenting",
    tags: ["Parenting", "Wellbeing", "High Achievers"],
    author: "Tutoring Galaxy Team", date: "2026-07-06", readTime: "6 min read",
    body: longBody(
      "Perfectionism looks like discipline — until it turns into paralysis. Here's how to parent through it.",
      [
        "Praise the process, not the grade: 'You worked hard' beats 'You're so smart'.",
        "Model imperfection: Talk openly about your own mistakes at work.",
        "Set a done-time, not a done-score: 'Stop at 8pm' prevents 3am rewrites.",
        "Separate identity from marks: A B+ doesn't change who your child is.",
        "Get outside support: A tutor or mentor can say things a parent can't.",
      ],
      "Our tutors are trained to spot perfectionism early and coach around it — book a free trial to discuss.",
    ),
  },
  {
    slug: "qotd-what-is-active-recall",
    title: "QOTD: What Is Active Recall and Why Does It Work?",
    excerpt: "Question of the day — the single most effective study technique, explained in 5 minutes with examples.",
    category: "QOTD",
    tags: ["QOTD", "Study Technique", "Active Recall"],
    author: "Tutoring Galaxy Team", date: "2026-07-05", readTime: "4 min read",
    body: longBody(
      "Every week we answer one high-signal question from a student. This week: what actually is active recall?",
      [
        "Definition: Pulling information out of your brain — not re-reading it back in.",
        "Example: Close the book, write everything you remember about photosynthesis, then check.",
        "Why it works: Retrieval strengthens the memory trace far more than review.",
        "How to use it: Turn every heading in your notes into a question you answer from memory.",
        "Common trap: Highlighting and re-reading feel productive but don't build recall.",
      ],
      "Submit your question of the day via WhatsApp — best ones become a blog post.",
    ),
  },
  {
    slug: "rants-education-system-fails-late-bloomers",
    title: "Rant: The Education System Still Fails Late Bloomers",
    excerpt: "An honest rant from our founders — how streaming at 11 and ranking at 15 loses too many capable students.",
    category: "Rants",
    tags: ["Rants", "Opinion", "Education Policy"],
    author: "Tutoring Galaxy Team", date: "2026-07-04", readTime: "5 min read",
    body: longBody(
      "Every year we meet students who were written off at 12 and top their class at 17. The system needs to catch up.",
      [
        "Streaming too early: 11+ / OC / Selective sorting locks in expectations before puberty.",
        "One-shot exams: A single 3-hour paper can't measure a decade of learning.",
        "Rank-based reporting: Telling a child they're 24th of 30 kills more potential than it motivates.",
        "Undervalued vocational routes: Trades and apprenticeships deserve equal status with university.",
        "The tutoring gap: Families who can afford support catch late bloomers; families who can't, don't.",
      ],
      "This is why we run our Growing Stars scholarship — because talent shows up on its own timetable.",
    ),
  },
  {
    slug: "schooling-choices-public-vs-private",
    title: "Schooling Choices: Public, Private or Selective — What Actually Matters",
    excerpt: "The honest trade-offs between public, private and selective schools for families in Australia and beyond.",
    category: "Schooling",
    tags: ["Schooling", "Parents Guide", "Australia"],
    author: "Tutoring Galaxy Team", date: "2026-07-03", readTime: "8 min read",
    body: longBody(
      "'Which school?' is the wrong question. 'Which school for this child?' is the right one. Here's how to decide.",
      [
        "Peer group matters more than fees: A motivated peer group lifts every student around it.",
        "Teacher quality is uneven everywhere: The best teacher in a public school beats the average teacher in a private one.",
        "Selective schools suit self-starters: If your child needs external structure, a selective environment can crush them.",
        "Extracurriculars are the hidden curriculum: Music, debating and sport shape adulthood more than most subjects.",
        "Commute cost: An extra hour per day is 250 hours per year — worth factoring in.",
        "Fit beats brand: Visit, sit in on a class, talk to current students.",
      ],
      "Our advisors help families think through school choice without a sales pitch — free 15-minute call.",
    ),
  },
  {
    slug: "selective-school-test-prep-nsw",
    title: "Selective School Test Prep: The NSW Year-5 Playbook",
    excerpt: "How to prep for the NSW Selective High School Placement Test — thinking skills, reading, maths and writing broken down.",
    category: "Selective School",
    tags: ["Selective School", "NSW", "Year 5", "Sydney"],
    author: "Tutoring Galaxy Team", date: "2026-07-02", readTime: "9 min read",
    body: longBody(
      "The NSW Selective test decides Year-7 placement in academically selective high schools. Here's the realistic 12-month plan.",
      [
        "Months 1–3: Baseline diagnostic across all four papers, focus on the weakest.",
        "Months 4–6: Thinking Skills mastery — the most predictive section for placement.",
        "Months 7–9: Reading comprehension under 40-second-per-question pace.",
        "Month 10: Writing — three structured tasks per week with tutor feedback.",
        "Month 11: Full timed mocks weekly, alternating morning/afternoon slots.",
        "Month 12: Confidence and pacing — no new content, only review and rest.",
      ],
      "Our NSW Selective specialists run small-group cohorts with weekly marked mocks.",
    ),
  },
  {
    slug: "students-how-to-take-notes",
    title: "Students: How to Take Notes You Actually Reread",
    excerpt: "A practical note-taking system built for real students — Cornell, mind maps and the two-colour rule.",
    category: "Students",
    tags: ["Students", "Study", "Note Taking"],
    author: "Tutoring Galaxy Team", date: "2026-07-01", readTime: "5 min read",
    body: longBody(
      "The best notes are the ones you actually reread. Here's the system top students use.",
      [
        "Cornell layout: Split each page into cue, notes and summary columns.",
        "Two-colour rule: Black for facts, red for anything you need to memorise.",
        "Question headings: Turn every topic into a question — answer from memory later.",
        "Summarise within 24h: A 5-minute summary the same night doubles retention.",
        "Weekly review: 20 minutes on Sunday reviewing every subject's cue column.",
      ],
      "Tutors in our Academy will audit your note system in the first session — free trial available.",
    ),
  },
  {
    slug: "study-techniques-that-actually-work",
    title: "Study Techniques That Actually Work (and 3 That Don't)",
    excerpt: "Evidence-based study techniques ranked — spaced repetition, active recall and interleaving vs highlighting, re-reading and cramming.",
    category: "Study",
    tags: ["Study", "Learning Science", "Revision"],
    author: "Tutoring Galaxy Team", date: "2026-06-29", readTime: "6 min read",
    body: longBody(
      "Cognitive science has clear winners in the study world. Here are the top three — and three you should drop.",
      [
        "Active recall: Retrieve, don't review. Closed-book self-testing beats re-reading every time.",
        "Spaced repetition: Review at expanding intervals — 1, 3, 7, 14 days.",
        "Interleaving: Mix problem types within a session; feels harder, works better.",
        "Highlighting (drop): Feels productive, does nothing for recall.",
        "Re-reading (drop): Familiarity is not the same as knowing.",
        "All-nighters (drop): Sleep loss cancels the study gain.",
      ],
      "Our tutors teach these techniques by embedding them in every session — book a free trial.",
    ),
  },
  {
    slug: "tutors-how-to-choose-the-right-one",
    title: "Tutors: How to Choose the Right One (10-Question Checklist)",
    excerpt: "A 10-question checklist to vet any tutor before you commit — subject depth, references, session structure and price.",
    category: "Tutors",
    tags: ["Tutors", "Parents Guide", "Hiring"],
    author: "Tutoring Galaxy Team", date: "2026-06-27", readTime: "6 min read",
    body: longBody(
      "The wrong tutor wastes a term and shakes a child's confidence. Use this checklist before you commit.",
      [
        "Subject depth: Have they taught this exact syllabus for 2+ years?",
        "Recent students: Can they name three current students you can (with consent) call?",
        "First-session plan: A serious tutor sends a diagnostic plan before session one.",
        "Session structure: Do they use goals, worked examples and independent practice?",
        "Feedback loop: Do they send a short parent update after each session?",
        "Trial class: Every professional tutor offers a free or low-cost trial.",
        "Cancellation policy: Fair terms are 24-hour notice, not per-session penalties.",
        "Price vs value: The cheapest tutor is rarely the best value; the most expensive isn't either.",
        "Backup plan: What happens if they're sick — do they have a network?",
        "Chemistry: Your child should look forward to session two.",
      ],
      "Every Tutoring Galaxy tutor is vetted against this exact list — book a free match call.",
    ),
  },
  {
    slug: "vce-year-12-study-plan-victoria",
    title: "VCE Year 12 Study Plan: A Term-by-Term Roadmap for Victorian Students",
    excerpt: "How to structure VCE Year 12 for a high ATAR — SAC weightings, exam cadence and study scores explained.",
    category: "VCE",
    tags: ["VCE", "Victoria", "Year 12", "ATAR", "Australia"],
    author: "Tutoring Galaxy Team", date: "2026-06-26", readTime: "9 min read",
    body: longBody(
      "VCE rewards consistency across SACs and end-of-year exams. Here's the Victorian Year-12 roadmap top students use.",
      [
        "Term 1: SACs start immediately — treat every one as if it counts (because they do).",
        "Term 2: Balance SAC prep with end-of-year exam foundations; no cramming.",
        "Term 3: Past-paper season — one full paper per subject per week from week 3.",
        "Study score maths: A 40+ study score in a 2.0-scaled subject shifts your ATAR meaningfully.",
        "Exam block: Rotate subjects daily; sleep 8+ hours; no new content.",
        "Scaling awareness: Choose subjects you'll do well in, not just ones that scale up.",
      ],
      "Our VCE tutors across Melbourne run weekly SAC-style mocks with detailed feedback — book a free trial.",
    ),
  },
];



export const BLOG_BY_SLUG: Record<string, BlogPost> = Object.fromEntries(BLOG_POSTS.map(p => [p.slug, p]));
export const BLOG_CATEGORIES = Array.from(new Set(BLOG_POSTS.map(p => p.category)));
