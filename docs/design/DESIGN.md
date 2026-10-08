# Tutoring Galaxy design language: "The Exam Paper"

This is the source of truth for how every page looks: marketing site, AI practice app, parent reports and admin.
If a screen needs something this file doesn't cover, add it here first, then build it.
Visual reference: [`design-language.html`](design-language.html) (drawn before the logo choice; the live site uses the Orbit logo and Manrope headings described below). Logo: [`../brand/logo/README.md`](../brand/logo/README.md).

## 1. The idea

Our families live inside Cambridge, Edexcel and IB exam papers. The most recognisable objects in their world are:

- the **question paper**, with numbered questions and marks in the right margin `[3]`;
- the **answer lines** where working goes;
- the **examiner's marking**: a tick, `M1 A1`, a short margin note;
- the **teacher's gold star** for work that earned it.

So the whole product is designed like a well-made exam paper that a great tutor has just marked:
calm, structured and precise, with one human, encouraging touch.

**The one bold thing** is the *margin*. Every page has a right-hand margin column, like an exam paper, that
holds marks, durations, prices and tutor notes. Everything else stays quiet.

### What we avoid (and why)

| Avoid | Why |
|---|---|
| Cream backgrounds with serif headlines and a warm accent | Currently the most common "AI-generated" look. Exam paper is white. |
| Purple/blue gradients, glass cards, glowing orbs | The old site's generic AI look. "Galaxy" lives in the star and the name, not in space imagery. |
| A different card style per section | The main problem in the audit. Two card types only (see §6). |
| ALL-CAPS eyebrow labels, `A · B · C` meta strings, `→` on buttons | Template chrome that says nothing. |
| Emoji, 3D illustrations, stock photos of smiling laptops | Untrustworthy for parents. Real tutor photos or initials only. |
| Numbered markers on things that aren't a sequence | Numbers mean "question order" in this language. Only real steps get numbers. |

## 2. Colour

Six named colours. Nothing else is used directly in components; everything goes through the semantic tokens.

| Name | Hex | Role |
|---|---|---|
| Paper | `#FFFFFF` | Page background (exam paper is white) |
| Rule | `#E6EDF5` | Ruled lines, dividers, graph-paper grid, subtle surfaces (`#F6F9FC`) |
| Ink | `#14284B` | Blue-black fountain-pen ink: text, primary buttons, the logo |
| Graphite | `#55637A` | Secondary text, captions, margin marks |
| Marking red | `#B83227` | Examiner annotations only: margin notes, corrections, `[marks]` highlights. Never for buttons or errors-as-decoration |
| Star gold | `#E0A21B` | The gold star. Earned achievement only (results, mastery, logo). Never for text |

Semantic tokens (light / dark):

| Token | Light | Dark | Use |
|---|---|---|---|
| `--background` | `#FFFFFF` | `#0D1A2E` | Page |
| `--surface` | `#F6F9FC` | `#13243D` | Margin column, quiet panels |
| `--foreground` | `#14284B` | `#E8EEF6` | Body text |
| `--muted-foreground` | `#55637A` | `#A7B4C7` | Secondary text |
| `--border` | `#DCE4EE` | `#253957` | Card and input borders |
| `--rule` | `#E6EDF5` | `#1C2F4B` | Answer lines, grid |
| `--primary` | `#14284B` | `#E8EEF6` | Primary button background |
| `--primary-foreground` | `#FFFFFF` | `#0D1A2E` | Primary button text |
| `--annotation` | `#B83227` | `#F08A80` | Margin notes, marks |
| `--star` | `#E0A21B` | `#F2C14E` | Gold star |
| `--success` | `#1D7A4C` | `#5CC795` | Correct, confirmed |
| `--destructive` | `#B42318` | `#F97066` | Errors |
| `--focus` | `#2F6FD6` | `#8DB4F5` | Focus ring |

Contrast (WCAG): Ink on Paper 14.6:1 · Graphite on Paper 6.1:1 · Marking red on Paper 6.0:1 · white on Ink 14.6:1 · dark-mode text 14.9:1.
Star gold is for shapes only (2.25:1 on white is fine for a non-text graphic, not for text).

## 3. Typography

Two families, both free on Google Fonts and self-hosted with `next/font`:

- **Manrope**: the logo's typeface (the Orbit wordmark is Manrope Bold). Used for headings (700), body, UI, buttons, forms and
  tables, with `tabular-nums` for prices, scores and times.
- **Newsreader italic**: only for the examiner's voice, meaning tutor and AI notes (`<Note>`), handwritten-style working and maths on
  marketing pages. Nowhere else. The app renders maths with KaTeX.

Scale (rem at a 16px base, from the classic typographic scale):

| Step | Size / line height | Use |
|---|---|---|
| `display` | 3.75rem / 1.05 (2.5rem on mobile) | Homepage H1 only |
| `h1` | 3rem / 1.1 (2.25rem mobile) | Page titles |
| `h2` | 2.25rem / 1.15 | Section titles |
| `h3` | 1.5rem / 1.25 | Card and sub-section titles |
| `lead` | 1.125rem / 1.6 | Intro paragraphs |
| `body` | 1rem / 1.6 | Default |
| `small` | 0.875rem / 1.5 | Captions, margin marks |
| `micro` | 0.75rem / 1.4 | Legal, chart labels only |

Rules: sentence case everywhere, measure under 72 characters, headings in Manrope 700 with -0.02em tracking, and never more than three sizes in one card.

## 4. Space, shape, depth, motion

- **Spacing:** 4px base. Use only `4 8 12 16 24 32 48 64 96 128`. Sections are 96px apart on desktop, 64px on mobile.
- **Grid:** 12 columns at a 1200px max width. On wide pages the last 3 columns form the **margin column**. On mobile the margin content drops below its item, still right-aligned.
- **Radius:** two values. `6px` for controls (buttons, inputs, badges) and `10px` for containers (cards, dialogs). Paper isn't round.
- **Borders over shadows:** cards are paper on paper, separated by a 1px `--border`. One shadow token is reserved for floating layers (menus, dialogs, toasts).
- **Lines:** answer lines are `1px dashed var(--rule)` and dividers are `1px solid var(--rule)`.
- **Motion:** 150ms for hover and press, 200ms ease-out for open and close. There's one signature moment: the **examiner tick** draws itself when something is confirmed (trial booked, answer correct). No scroll-triggered entrances. Everything respects `prefers-reduced-motion`.

## 5. Motifs (use these, consistently)

| Motif | Looks like | Where |
|---|---|---|
| Margin marks | Right-aligned Graphite `[3]`, `[1 day]`, `[PKR 15,000]` | Steps, pricing, practice questions, report rows |
| Answer lines | Dashed ruled lines | Forms, the practice working area, section ends |
| Question numbering | `1`, `2 (a)` in Manrope Bold, tabular | Only for real sequences: how it works, booking steps, questions |
| Examiner annotation | Marking red, Newsreader *italic* note, a tick | Testimonial highlights, AI feedback, tutor notes |
| Gold star | The gold star (the logo's moon is the same gold) | Results, mastery achieved, "top tutor". Earned, never decorative |
| Graph paper | A 24px grid in `--rule` | App practice area, charts. Not on marketing pages |

## 6. Components (built on shadcn/ui, themed with the tokens above)

- **Buttons:** `primary` (Ink fill), `secondary` (Paper with Ink border) and `ghost`. One primary per view. Labels name the action: "Book a free trial", "WhatsApp us", "Check my answer".
- **Two card types only:**
  1. **Sheet card:** white, 1px border, 10px radius. Used for tutors, pricing, articles and questions.
  2. **Margin panel:** `--surface`, no border. Used for side information and summaries.
- **Badges:** 6px radius, `--surface` background with Graphite text. Curriculum badges such as "IGCSE" and "A Level" use the same style. No rainbow subject colours.
- **Forms:** label above the field, help text below, errors in `--destructive` with a fix ("Enter a WhatsApp number with country code, e.g. +92 300 1234567").
- **Icons:** Lucide only, 1.5px stroke, 20px. No emoji.
- **Imagery:** real tutor photos (head and shoulders, natural light, plain background) or Ink initials on `--surface`. No AI illustrations.

## 7. Voice

- Talk to parents first, plainly: "We match your child with a tutor who has taught their exact syllabus."
- Make specific, provable claims only. No "best", "#1" or "guaranteed A*".
- The same action keeps the same name everywhere: "Book a free trial" leads to "Trial booked".
- Errors say what happened and how to fix it. Empty states invite the next step.

## 8. How consistency is enforced

1. **Tokens live in code once.** They go in `src/app/globals.css` (Tailwind v4 `@theme`) and are generated from this file.
   Components use `bg-primary`, `text-muted-foreground` and so on, never raw hex.
2. **Components come from one place.** That's `src/components/ui` (shadcn, themed). Pages compose sections from
   `src/components/sections`; they don't style from scratch.
3. **Page templates:** Marketing page, Directory (tutors and subjects), Article and App page share the header, grid and margin column.
4. **A living style guide** at `/styleguide` (not indexed) renders every token and component, so drift is visible.
5. **Automated checks in CI:**
   - fail on raw hex colours or arbitrary Tailwind values (`text-[13px]`, `bg-[#...]`) outside `globals.css`;
   - run ESLint with jsx-a11y;
   - run Playwright screenshots of key pages at 390 and 1440px.
6. **Review checklist on every PR that touches UI:** tokens only, one primary action, sentence case, real content, focus visible,
   reduced motion, 390px checked.
