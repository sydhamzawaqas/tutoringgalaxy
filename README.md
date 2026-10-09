# Tutoring Galaxy

One website for Tutoring Galaxy: the public site, free-trial booking, a tutor directory, parent guides,
an invite-only app for students, parents and tutors with AI practice (Gemini), and an admin area.
It replaces the old Lovable site, the Google AI Studio practice app and the Manus "Interactive Lab".

- **Stack:** Next.js 16.4 (App Router, Cache Components, Turbopack), React 19, TypeScript, Tailwind CSS v4, Radix,
  Supabase (Auth + Postgres), Google Gemini (`@google/genai`).
- **Design:** "The Exam Paper" design language. The rules are in [`docs/design/DESIGN.md`](docs/design/DESIGN.md)
  and the logo is in [`docs/brand/logo`](docs/brand/logo).
- **Planning docs:** [audit](docs/audit/01-current-state-audit.md), [site structure](docs/plan/02-site-structure.html),
  [inspiration](docs/plan/03-inspiration.html) and [components](docs/plan/04-components.html).

## Run it

```bash
npm install
cp .env.example .env.local   # fill in what you have; the site runs without any of it
npm run dev                  # http://localhost:3000
```

Checks (run all before pushing):

```bash
npm run lint
npm run typecheck
npm run check:design   # fails on raw colours / one-off sizes outside the design tokens
npm run build
```

## What works without configuration

| Feature | Without env vars | Needs |
|---|---|---|
| Public pages, guides, tutor directory, SEO | ✅ Fully works | none |
| Free-trial booking (`/book`) | In development, logged (no personal data). In production, shows a "please WhatsApp us" fallback | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` |
| Tutor applications (`/join-as-tutor`) | Same as booking | same |
| Sign-in, `/app`, `/admin` | Shows "Sign-in isn't configured yet" | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` |
| AI practice | Shows "AI practice isn't configured yet" | `GEMINI_API_KEY` (+ Supabase) |

All variables are documented in [`.env.example`](.env.example). `NEXT_PUBLIC_*` values are baked in at build time.
Never expose the service-role key or the Gemini key to the browser.

## Supabase setup

1. Run `supabase/migrations/0001_leads.sql` then `0002_app.sql`. Every table has row-level security (RLS); leads and
   applications are server-only.
2. In Auth settings:
   - turn **off** public sign-ups (accounts are invite-only);
   - add `<SITE_URL>/auth/confirm` to the redirect URLs;
   - turn on leaked-password protection and "Secure password change".
3. Point the Invite, Magic link and Reset password email templates at
   `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=<invite|magiclink|recovery>`.
4. Create the first admin: `update public.profiles set role = 'admin' where id = '<auth user id>';`

## Project map

```
src/
  app/
    (marketing)/   public pages: home, tutoring, curricula, subjects, tutors, pricing, book, resources, legal…
    (auth)/        login, signup (invite explainer), reset-password, auth/confirm
    (app)/app/     student / parent / tutor area, AI practice
    (admin)/admin/ leads, tutor applications, users
    sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg, not-found.tsx
  components/      ui/ (design-system primitives), layout/, sections/, forms/, app/, brand/
  data/content/    site facts, curricula, subjects, pricing, FAQs, tutors (examples), guides
  lib/             seo, auth (DAL), supabase clients, ai (Gemini), actions (Server Actions), leads
  proxy.ts         optimistic auth redirect + no-store on private areas (real checks live in lib/auth/dal.ts)
supabase/migrations/
docs/              audit, plan, design, brand
```

## Before launch (client input needed)

- **Real content:** replace the four example tutor profiles with real, consenting tutors (they're `noindex` and
  out of the sitemap until then). Add real testimonials only with permission.
- **Confirm facts:**
  - home-tutoring cities;
  - the Facebook handle (the old site linked `tutoringalaxy`);
  - the "usually within a day" matching claim;
  - the Starter plan's lesson count;
  - refund terms (no money-back promise is made);
  - office hours and address.
- **Legal:** privacy, terms and refund pages are drafts and need review by a legal adviser.
- **Production hardening:**
  - move the in-memory rate limits (booking, login, AI bursts) to a shared store (Redis or a Postgres table);
  - add a nonce-based script Content-Security-Policy;
  - set `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` when running more than one instance;
  - test Gemini against the live API.
- **Not built yet:** `/app/reports/[id]`, `/admin/content`, `/admin/questions` and `/admin/ai`. Old admin URLs
  currently redirect to `/admin`.
