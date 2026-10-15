# Tutoring Galaxy: full feature-parity plan

_11 Oct 2026 · replaces the "slim it down" approach of the first build_

## Why this plan exists

The first build of the new site **cut too much**. It treated the old products as reference only and kept a small agency
site. The client wants **everything** from both zip files on the new site, organised properly and in one consistent
design.

So the rule from now on is:

> **Every page, feature, tool and piece of content in the two zips gets a home in the new site.**
> We keep the *function and content*. We fix the *structure, design, security and fake data*.

**Sources** (unzip both into `reference/` locally; this folder is git-ignored):

| Zip | What it is | Size |
|---|---|---|
| `tg_8_oct_26_lovable-project` | Marketing site + marketplace + assessments + admin (tutoringgalaxy.com) | ~100 routes, 43 migrations, 64 blog posts, 743 MCQs |
| `tutoring-galaxy-oct-8-2026` | Practice Engine (tutoringgalaxy.ai.studio) | ~75 tools, 22 interactive labs, ~1,500 written questions, 25 AI endpoints |

**Status key:**
- ✅ built in the new site
- 🟡 partly built (exists but thinner than the old one)
- ❌ missing

---

## 1. Gap matrix: marketing site (Lovable)

### 1.1 Global chrome

| Old feature | Status | Plan |
|---|---|---|
| Header with utility bar (Parent Dashboard, Leaderboard, Star Finder, Become a Tutor, socials) | 🟡 | Mega-menu: **Tutoring · Curricula · Subjects · Tutors · Practice · Assessments · Resources** + utility bar |
| Region selector + IP auto-detect (11 regions; changes hero copy, curricula order, footer) | ❌ | Port `region-context` as a cookie + `proxy.ts` geo header (no client IP calls) |
| WhatsApp floating button with rotating tooltip | ❌ | Port, one component, tracked |
| Sticky mobile CTA (Trial / WhatsApp / Call) | ✅ | Keep |
| Exit-intent modal (trial or Star Finder) | ❌ | Port, once per session |
| Footer: region-aware curricula, subjects, top cities | 🟡 | Port the region-aware columns |
| GA4 + WhatsApp/call/outbound click tracking + web vitals | ❌ | Port (`@next/third-parties` GA4 + event helper) |
| Lead attribution (UTM, gclid, fbclid, first touch) | ❌ | Port into `lib/leads.ts` |
| Old WhatsApp-number rewrite | ❌ | Not needed (one number in `site.ts`) |

### 1.2 Homepage: all 19 old sections

Every section's content comes back. Where the same thing appeared twice, the duplicates are merged, so nothing is lost.

| # | Old section | Status | New home |
|---|---|---|---|
| 1 | Hero: region-aware hook, rotating featured-tutor carousel, "recent result" pill, guarantee strip, curriculum chips | 🟡 | Hero (add the carousel + region hook) |
| 2 | Outcomes band ("ledger" stats) | ✅ | Stats band |
| 3 | Region/curriculum band with search + 11 region cards | ❌ | "Find your region" band with search |
| 4 | Tutor finder form (subject/curriculum/grade/country) | ❌ | Inline in the hero or right after it |
| 5 | Why choose us (6) | ✅ | |
| 6 | How it works (5 steps) | ✅ | |
| 7 | Learning journey (5 stages) | ❌ | Merged into How it works as a second track |
| 8 | Services grid (6) | ❌ | Services band |
| 9 | Popular curricula (8) | ✅ | |
| 10 | Tutors preview with chip filters | 🟡 | Add the filters |
| 11 | Tutor verification (3 steps) | ✅ | |
| 12 | Global teachers showcase with filters | ❌ | Merged with #10 (one filterable tutor block) |
| 13 | Regions showcase (11 cards) | ❌ | Merged with #3 |
| 14 | Islamabad/Rawalpindi areas grid | ❌ | "Home tutoring near you" chips |
| 15 | Comparison table vs typical agencies | ❌ | Port |
| 16 | Testimonials with city/subject filters | 🟡 | Add the filters + all 13 |
| 17 | FAQ (8) + JSON-LD | ✅ | |
| 18 | Founder mission | ✅ | |
| 19 | Final CTA | ✅ | |

### 1.3 Pages

| Old route(s) | Count | Status | New route |
|---|---|---|---|
| `/about`, `/contact`, `/faq`, `/pricing` | 4 | ✅ | same |
| `/services` | 1 | ❌ | `/services` |
| `/results` (grade wins, 8 exam wins, 9 university admissions) | 1 | ❌ | `/results` |
| `/growing-stars` (program, 3 plans: 3,500 / 7,500 / 14,000) | 1 | ❌ | `/growing-stars` |
| `/leaderboard` (city filter) | 1 | ❌ | `/leaderboard`, with real data from attempts (the old one was a sample list) |
| `/match` (Smart Tutor Match, 6-step wizard, weighted scoring) | 1 | ❌ | `/match` |
| `/join-as-tutor` (process, requirements, form) | 1 | 🟡 | Add the process + requirements content |
| `/tutors`, `/tutors/$slug` (14) | 15 | 🟡 | 4 examples now → all 14 |
| `/tutors/subject/$subject` | 21 | ❌ | `/tutors/subject/[subject]` |
| `/teachers`, `/teachers/$slug` (24), country/curriculum/subject hubs | ~60 | ❌ | Merge into `/tutors` with 5-facet filters (subject/curriculum/country/certification/mode); `/teachers/*` 301s to it |
| `/subjects`, `/subjects/$subject` | 22 | 🟡 | Add the depth content from `subject-content.ts` |
| `/syllabus`, `/syllabus/$curriculum` | 21 | 🟡 (`/curricula`) | Add the 20 curricula + `curriculum-content.ts`; `/syllabus/*` 301s |
| `/prep`, `/prep/$slug` (8: 12-week plans, success stories) | 9 | ❌ | `/exam-prep/[exam]` |
| `/academy`, `/academy/$slug` (4: modules, faculty, certification) | 5 | ❌ | `/academy/[slug]` |
| `/regions`, `/regions/$region` (11, with ticker, leaderboard, FAQ, schema) | 12 | ❌ | `/regions/[region]` |
| `/regions/$region/$slug` | 451 | ❌ | Behind the quality gate (below) |
| `/cities`, `/cities/$city` (65; Islamabad flagship layout) | 66 | 🟡 (`/locations`) | `/cities/[city]`, with the Islamabad layout ported |
| `/locations/$area` (65; 5 long-form Islamabad sectors) | 65 | ❌ | `/areas/[area]` |
| `/$city/$curriculum`, `/$city/$curriculum/$subject` | ~5,800 | ❌ | Port **with the old `seo-eligibility` gate**: only pages that pass get indexed |
| `/world`, `/world/$region` (7 continents) | 8 | ❌ | `/world/[continent]` |
| `/blog`, `/blog/$slug` (64 posts, 27 categories) | 65 | ❌ (data copied, not shown) | `/blog`, `/blog/[slug]`, category filter |
| `/resources` library (DB-backed, filters, hubs) + subject/curriculum hubs + topic practice | ~40 | 🟡 | DB-backed library + hubs |
| `/auth` | 1 | ✅ (`/login`) | |
| Legacy redirects (`/city`, `/curriculum`, `/subject`) | | ✅ | Keep + add new ones |

### 1.4 Assessments ("TGA" / Star Finder)

| Old feature | Status | Plan |
|---|---|---|
| `/assessments` landing (14 sections: library with URL filters, radar "Galaxy Score", sample report, benchmarking, grade prediction, gamification…) | ❌ | `/assessments` |
| `/assessments/$subject`, `/$subject/$level` (5 TGA subjects, AU Years 1–6, OC, Selective, NAPLAN, 77 curriculum diagnostics) | ❌ | `/assessments/[subject]/[level]` |
| `/assessments/pricing` (Free / $29 / $79 / School) | ❌ | `/assessments/pricing` |
| `/quiz/$slug` runner (timer, pause, resume, adaptive order, MCQ/numeric/fill-in, server grading, XP) | ❌ | `/quiz/[slug]` |
| `/quiz/$slug/results` (radar, mastery, speed/accuracy, tutor recommendation, AI explanations behind a lead gate, PDF) | ❌ | `/quiz/[slug]/results` |
| Question bank: 743 questions / 22 banks + 77 diagnostic definitions | ❌ | Seed into Postgres |
| AI explain + AI coach summary | 🟡 | Reuse `lib/ai` |

### 1.5 Admin (Lovable)

| Old admin area | Status |
|---|---|
| Leads, tutor applications, users | ✅ |
| Tutor management + assignment + matching | ❌ |
| Enrollments, payments, attribution | ❌ |
| Analytics, growth funnel, retention | ❌ |
| Question bank, MCQ import (CSV/JSON), resources CMS + import | ❌ |
| AI content batches + quality review | ❌ |
| Exam blueprints + exam generator | ❌ |
| Content factory, content pilot, gap analysis, SEO performance | ❌ |
| Regions, FAQs, announcements, leaderboard, business stats editors | ❌ |

---

## 2. Gap matrix: Practice Engine (AI Studio)

The old engine is one 3,500-line `App.tsx` with about 75 tools opened as modals. In the new site each tool gets a
**real URL** under `/practice` (public tools) or `/app` (signed-in), so it can be linked, bookmarked and indexed.

### 2.1 Core learning loop

| Old feature | Status | New route |
|---|---|---|
| Curriculum → subject → topic selector (IGCSE, O-Level, FBISE SSC/HSSC, SAT, ACT, MDCAT, FSc, GED, AU/HSC/VCE/NAPLAN) | 🟡 | `/practice/[curriculum]/[subject]/[topic]` |
| MCQ practice: 3-level hints, Ask Tutor panel, method-mark checking, trap diagnostics, Try Similar, bookmarks, resume | 🟡 (AI practice only) | `/practice/.../[topic]` |
| Student dashboard: resume, daily goal, streak, weekly summary, smart recommendations, 11 "academic intelligence" cards | 🟡 | `/app` |
| Mistake Bank (Leitner 1/3/7/21 days, AI explainer, 3 similar questions, PDF export) | ❌ | `/app/mistakes` |
| Mistake rehab (variant testing) | ❌ | `/app/mistakes/rehab` |
| Flashcards (21 cards, recall ratings) | ❌ | `/practice/flashcards` |
| Formula sheet (KaTeX, searchable) + Formula Forge (SM-2) + formula trainer | ❌ | `/practice/formulas` |
| Revision notes (16 notes: definitions, formulas, pitfalls, worked example, checklist; printable) | ❌ | `/practice/notes/[topic]` |
| Past papers (13 refs, filters, mark scheme, examiner notes, "drill as MCQ", animated walkthrough) | ❌ | `/practice/past-papers` |
| Subtopic mastery tracker (weights, 7 states) + skill graph + exam readiness | ❌ | `/app/mastery`, `/app/readiness` |
| Exam hall: full sims, timed mocks, topic tests, custom builder, flagging, grade estimate, review, print | ❌ | `/app/exam-hall` |
| Mock exams: Maths 33, Physics 82, Chemistry 80, Biology 41 | ❌ | `/practice/mocks/[subject]` |
| Adaptive practice / next best action / quiz generator / diagnostic test / weak-spot quest / 48h cram / daily mission | ❌ | `/app/adaptive` + dashboard widgets |
| Learning path (Now/Next/Later), assignments | ❌ | `/app/path` |
| Achievements (12 badges), analytics, weekly digest, certified transcript, honours vault | ❌ | `/app/progress` (🟡) + `/app/achievements` |
| Printable reports (diagnostic, progress, adaptive worksheet, homework cover, weak-spot booklet) | 🟡 | `/app/reports/[id]` + print CSS |
| Revision planner (4 weeks, .ics export), exam countdown, syllabus auditor, exam radar | ❌ | `/app/planner` |
| Grade calculators (Cambridge 0580, boundary forecaster) | ❌ | `/tools/grade-calculator` (public, good for SEO) |
| Digital scratchpad + method-mark inspector | ❌ | Panel inside practice |
| Ctrl+K command palette, keyboard shortcuts, dark mode, offline banner, PWA install | ❌ | App shell |

### 2.2 AI features (Gemini, server-side)

| Old endpoint / feature | Status |
|---|---|
| AI tutor (hint 1–3, explain, next step, explain mistake, solve, practise, revise, chat) | 🟡 |
| Grade working (typed or photo → M1/A1 marks) | ❌ |
| Scan handwritten maths (camera → LaTeX + clues) | ❌ |
| Evaluate handwritten mock exam (multi-page, red pen) | ❌ |
| Generate similar questions | ❌ |
| Mistake explainer | ❌ |
| Socratic solve-step (algebra sandbox) | ❌ |
| Voice Socratic coach, viva voce examiner, Socratic crucible | ❌ |
| Parent AI briefing | ❌ |
| Parse mark scheme (admin ingestion) | ❌ |

### 2.3 Interactive labs and tools (22 + studios)

| Group | Items | Status | New route |
|---|---|---|---|
| Maths labs | Graph Lab, Linear 3D, Chance Lab, Complex 2D, DiffEq, Proof Vault, Visual Proofs, Circle Theorems, Function Grapher, Algebra Sandbox | ❌ | `/labs/maths/[lab]` |
| Science labs | Mechanics, Circuits, Optics, Astro-gravity, Thermo, Nuclear, Lorentz, Quantum Wave, Electrochem, Titration, Reaction Forge, Synth Flow, Bio Genetics, Virtual Science Labs, Physics Canvas | ❌ | `/labs/science/[lab]` |
| Subject studios | Chemistry (periodic table, bonding, equation balancer), Biology, Physics solver | ❌ | `/labs/[subject]` |
| Calculators | Casio keystroke trainer, virtual calculator | ❌ | `/tools/casio` |
| Paper makers | Exam booklet generator, Exam Press, custom paper creator | ❌ | `/app/papers` (tutor role) |
| Social | Speed duel (PIN rooms + WebSocket), live arena, study rooms + Pomodoro, whiteboards | ❌ | Phase 6 (needs realtime: Supabase Realtime) |
| Interactive Lab (Manus) | external link | ❌ | Replaced by `/labs` |

### 2.4 Roles

| Old role tool | Status | New route |
|---|---|---|
| Parent portal + grade predictor + WhatsApp milestone card | 🟡 (`/app/children`) | `/app/children/[id]` |
| Tutor: reporting workspace, interventions (before/after), lesson notes export, assignment dispatch | 🟡 (`/app/students`) | `/app/students/[id]/*` |
| Teacher: roster, cohort heatmap, classroom sessions | ❌ | `/app/classes` (new `teacher` role) |
| School dashboard (charts) | ❌ | `/app/school` |
| Examiner audit mode | ❌ | `/app/examiner` |
| **Hard-coded PINs (1234 / 9876 / 4321)** | 🔴 replaced | Real Supabase accounts + row-level security. Never port the PINs |

### 2.5 Content to load into the database

| Content | Amount |
|---|---|
| IGCSE Maths written question sets | ~900 (9 topics × 10 tests × 10) |
| Algebra pool + curated + `questionsData` | ~110 |
| Physics / Chemistry / Biology banks | ~70 / 24 / 14 |
| SAT, ACT, MDCAT, ECAT, GED banks + generators | ~120 + generated |
| Mock exam papers | 236 questions |
| Lovable assessment bank | 743 |
| Revision notes / flashcards / past-paper refs / examiner audits | 16 / 21 / 13 / 10 |
| Resource catalog | ~39 + DB resources |
| Curriculum catalog (declared topics) | 6,185 declared questions; AU/HSC/VCE/NAPLAN "planned" |

A one-off script, `scripts/import-legacy-questions.ts`, normalises both question shapes into one `questions` table:
slug, curriculum, subject, topic, LaTeX, 4 options, answer, explanation, hints 1–3, traps, difficulty, source.
It also de-duplicates.

---

## 3. Things we deliberately do NOT copy as-is

| Old thing | Why | What we do instead |
|---|---|---|
| Fake "N families booked in {city}" ticker | Fake social proof (consumer-law risk) | Real recent-bookings count, or remove |
| Sample leaderboard, simulated peers, test-residue evidence data | Fake data | Real data from attempts |
| Hard-coded PINs, unauthenticated student-data endpoints, open AI endpoints | Security | Supabase auth + RLS + rate limits |
| JSON-file storage on Cloud Run | Data loss on redeploy | Postgres |
| ~5,800 thin city combo pages all indexed | Google "scaled content abuse" | Same pages, but the old quality gate decides what's indexed |
| Unconfirmed claims (money-back, top 1%, 4 in 100, <24h match) | Trust and legal | Client confirms, or the wording softens |
| Jargon tool names ("Chronos", "Lorentz Lab 3D"…) | Confusing | Plain names, with the old name in brackets |

---

## 4. Design: why it looked basic, and the fix

The first two homepage options were judged "basic". The root causes:
- too few visual layers;
- no real imagery beyond one photo;
- no motion;
- flat cards everywhere.

**Plan:**

1. **References first.** The client picks 3 to 5 live sites they love (e.g. from Dribbble, Awwwards, or competitors
   like Outschool, Preply, Cambridge, Khan Academy). We extract their real tokens (spacing, type scale, motion) with the
   `ui-scrape` skill instead of guessing.
2. **A richer component kit** (Aceternity / Magic UI-style, built on our tokens):
   - animated hero background;
   - bento grids;
   - marquee of curricula and universities;
   - 3D tilt tutor cards;
   - animated counters;
   - testimonial carousel;
   - spotlight cards;
   - animated timeline;
   - glowing CTA;
   - scroll-reveal.
   We'll use `motion` for animation and respect reduced-motion settings.
3. **Real imagery.** Photos of students, tutors and Pakistan/UK cities, subject illustrations, flags, and the real
   founder photo.
4. **One shell for everything.** The marketing site, assessments and practice app share the header, tokens and
   components. The old dark "TGA" theme becomes a dark mode, not a separate brand.
5. **Homepage first, then rollout.** We sign off one page at a time with screenshots.

---

## 5. Phases (in order)

| Phase | Scope | Rough size |
|---|---|---|
| **0. Design direction** | Reference sites → tokens → component kit → homepage sign-off | 1–2 sessions |
| **1. Marketing parity** ✅ | Chrome (region, WhatsApp FAB, exit intent, GA4, attribution); full homepage; services, results, growing-stars, leaderboard, match wizard; all 14 tutors + 24 teachers merged with filters; 64 blog posts; subjects, curricula, prep, academy content | 3–4 sessions |
| **2. Local SEO pages** | Regions (11), cities (65), areas (65), world (7), combo pages with the quality gate, sitemap, llms.txt, schema | 1–2 sessions |
| **3. Question DB + assessments** | Import script for all questions; `/assessments` landing + library; quiz runner; results analytics; lead gate | 2–3 sessions |
| **4. Practice engine core** | Topic practice with hints and AI; mistake bank (Leitner); flashcards; formulas; notes; past papers; mocks; mastery; exam hall; dashboard cards; achievements; reports; planner | 4–6 sessions |
| **5. AI vision + voice** | Grade working, scan maths, evaluate mock, similar questions, voice coach, viva voce, parent briefing | 2 sessions |
| **6. Labs + tools** | 25 labs and studios, calculators, paper makers; then realtime duels and study rooms | 4–6 sessions |
| **7. Roles + admin** | Teacher and school roles; tutor interventions and assignments; full admin (enrollments, payments, question bank CMS, imports, AI batches, analytics, growth, content ops) | 3–4 sessions |

Each phase ends with:
- lint, typecheck, `check:design` and build all passing;
- screenshots at 1440 and 390;
- a commit to the PR branch.

---

## 6. Working locally (handoff)

```bash
git clone https://github.com/sydhamzawaqas/tutoringgalaxy.git
cd tutoringgalaxy
git checkout claude/funny-faraday-ywxfla      # latest work (PR #1); main has the first build
npm install
cp .env.example .env.local                    # optional: Supabase + Gemini keys
npm run dev                                    # http://localhost:3000

# put the two original zips here for reference (git-ignored):
mkdir -p reference && cd reference
unzip ~/Downloads/tg_8_oct_26_lovable-project-*.zip -d lovable
unzip ~/Downloads/tutoring-galaxy-oct-8-2026-*.zip -d aistudio
```

Tell the local Claude session: _"Read `docs/plan/05-feature-parity-plan.md` and `README.md`, then start Phase N.
The old code is in `reference/`."_

**Where things are:**
- Old site content already copied: `src/data/legacy/` (tutors, teachers, testimonials, 64 blog posts, cities,
  regions, subjects, curricula, FAQs, stats).
- New homepage copy: `src/data/content/home.ts`.
- Design rules: `docs/design/DESIGN.md`. Tokens: `src/app/globals.css`. Logo: `docs/brand/logo`.
- Temporary design comparison page: `/design-b`. Delete it once the design is chosen.
