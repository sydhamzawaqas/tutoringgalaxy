# Build progress and handoff

_Last updated: 15 Oct 2026 · branch `claude/funny-faraday-ywxfla`_

**Read this first in any new session**, then [`05-feature-parity-plan.md`](05-feature-parity-plan.md) (the full
gap matrix and the phase list).

To start a new session, paste this:

> Read `docs/plan/PROGRESS.md` and `docs/plan/05-feature-parity-plan.md`. The old projects are unzipped in
> `reference/lovable` and `reference/aistudio`. Continue with the next phase that isn't done.

## Status

| Phase | Status |
|---|---|
| 0. Design direction (client sends 3–5 reference sites) | ⏳ waiting on client references |
| **1. Marketing parity** | ✅ done (15 Oct) |
| 2. Local SEO pages (regions, cities, areas, world, combos) | ⏭ next |
| 3. Question DB + assessments + quiz | — |
| 4. Practice engine core | — |
| 5. AI vision + voice | — |
| 6. Labs + tools | — |
| 7. Roles + full admin | — |

## Phase 1: what was built

### Global chrome
Files are in `src/components/layout/*`, `src/lib/{region,region-context,analytics,attribution}.ts(x)`.
- Mega-menu (Tutoring, Curricula, Subjects, Tutors, Programs, Resources) plus a utility bar. Mobile menu has the same
  groups. **All links live in `src/components/layout/nav.ts`.**
- Region selector for 11 regions. Detection happens in the browser only: cookie `tg_region`, then time zone, then
  browser language, then Pakistan. The footer has region-aware columns. Use `useRegion()`.
- WhatsApp floating button (hidden on phones, where the bottom CTA bar already has WhatsApp).
- Exit-intent modal: desktop only, once per session.
- GA4: loads only when `NEXT_PUBLIC_GA_ID` is set. It tracks page views, web vitals and WhatsApp, call, outbound and
  CTA clicks.
- First-touch lead attribution (UTM, gclid, fbclid, referrer) is saved with each booking. **Run
  `supabase/migrations/0003_lead_attribution.sql`.**

### Homepage (`src/components/home/*`)
All 19 old sections are merged into 15 bands:
1. Hero with a rotating tutor carousel and a recent result
2. Tutor finder
3. Stats
4. Find your region (search)
5. Why us
6. How it works and learning journey (tabs)
7. Services
8. Curricula
9. Filterable tutors
10. Vetting
11. Comparison table
12. Testimonials with filters
13. Home tutoring areas
14. Founder
15. Pricing, FAQ and CTA

### Pages added or rebuilt
| Route | Count |
|---|---|
| `/services`, `/results`, `/growing-stars`, `/leaderboard` (honest empty state), `/match` (6-step wizard) | 5 |
| `/exam-prep` + `/exam-prep/[exam]` | 1 + 8 |
| `/academy` + `/academy/[slug]` | 1 + 4 |
| `/blog` + `/blog/[slug]` + `/blog/category/[category]` | 1 + 64 + 27 |
| `/subjects/[subject]` (now with full content) | 24 |
| `/curricula/[curriculum]` (now with full content) | 20 |
| `/tutors` (5 filters synced to the URL) + `/tutors/[tutor]` | 1 + 24 |
| `/tutors/subject\|country\|curriculum/[x]` hubs | 21 + 12 + 22 |
| `/join-as-tutor` (process, requirements, pay) | 1 |

- Old URLs (`/teachers/*`, `/prep/*`, `/syllabus/*`, `/subject/<short name>`) redirect to the new ones. See
  `next.config.ts`.
- The sitemap has 213 URLs.

**Checks run:** lint, typecheck, `check:design` and `next build` all pass. Every page above returns 200. No
horizontal scroll at 390px. No page errors.

## Data map

| What | Where |
|---|---|
| Old site content, copied verbatim | `src/data/legacy/*` |
| Tutors (24, merged tutors + teachers) | `src/data/content/tutors.ts`. Add a slug to `CONFIRMED` to make a profile indexable |
| Blog (64 posts) | `src/data/legacy/blog.ts` → `src/data/content/blog.ts` |
| Subjects / curricula | `src/data/content/{subjects,curricula}.ts` |
| Page content | `src/data/content/{home,services,results,growing-stars,leaderboard,exam-prep,academy}.ts` |

## Client must confirm before launch
39 places in the code are marked `// CONFIRM:`. Find them with `grep -rn "CONFIRM" src`. The main ones:
- **Tutor profiles:** all 24 must be real, consenting people. Ratings, rates and qualifications must be accurate.
- **Testimonials:** consent from all 12 families. Results page: the 8 exam wins and 9 admissions.
- **Claims:** money-back guarantee, "top 1%", "fewer than 4 in 100", matching within 24 hours.
- **Academy outcome numbers:** 92% pass, 78% A*/A, and the others.
- **Growing Stars prices** (PKR 3,500 / 7,500 / 14,000) vs the main pricing (from PKR 15,000).
- **Tutor pay ranges** on `/join-as-tutor`.
- **GA4 measurement ID.** The Facebook handle (`tutoringalaxy` vs `tutoringgalaxy`).

## Phase 2 notes (next)
- **Remove the temporary redirects** for `/regions/*`, `/areas/*`, `/cities/*` and `/world/*` in `next.config.ts`.
  The homepage and footer already link to `/regions/<slug>`, `/areas/<slug>` and `/cities/<slug>`.
- **City links:** switch them in `src/components/catalog/places.ts`. It's a one-line change.
- **Port the quality gate:** the old `reference/lovable/src/lib/seo-eligibility.ts` decides which combo pages get
  indexed.
- **Hero region hook:** wire it up with `useRegion()` and `REGION_HOOK` from `src/lib/region.ts`.
- **`/assessments` is still redirected** to `/app/practice`. Phase 3 builds the public page. The constant
  `ASSESSMENT_HREF` is in `src/data/content/growing-stars.ts`.

## How to run

```bash
npm install && npm run dev          # http://localhost:3000
npm run lint && npm run typecheck && npm run check:design && npm run build
```
