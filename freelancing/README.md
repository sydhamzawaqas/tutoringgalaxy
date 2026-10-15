# Freelancing — AI-assisted freelancing system

A human-in-the-loop setup where Claude Code agents do the research, writing and
drafting, and you approve and send. Built for programming work that Claude Code
delivers well (AI agents, Next.js apps, automations, bug fixes).

> **Rule #1:** agents draft, you click send. Marketplaces (Fiverr, Freelancer.com)
> ban accounts for bot activity. Use the browser for *reading*; publish profiles,
> send bids and message clients yourself.

## Start here (local machine)

1. Open this `freelancing/` folder in Claude Code on your computer
   (Claude Desktop app or `cd freelancing && claude`). The agents in
   `.claude/agents/` load automatically.
2. Turn on the browser (Claude Desktop built-in browser or Claude in Chrome)
   and make sure you're logged in to Freelancer.com.
3. Paste the prompt from [`START_HERE_LOCAL.md`](START_HERE_LOCAL.md).

## The agents

| Agent | Job | You do |
|---|---|---|
| `profile-auditor` | Audits your Freelancer.com / Fiverr profile and rewrites it | Paste changes into the site |
| `job-scout` | Finds and scores the best open projects for you | Pick which to bid on |
| `bid-writer` | Writes a personalised bid + price for one project | Review and submit the bid |
| `client-assistant` | Drafts replies, scope questions, offers, revision answers | Send the message |
| `delivery-planner` | Turns a won project into a spec + build plan for Claude Code | Review the delivery |
| `tracker` | Keeps `tracker/projects.csv` up to date, weekly review | Enter stats you see |

Call one with e.g. *"Use the bid-writer agent on this project: <paste>"*.

## Files

| Path | What |
|---|---|
| `docs/market-research.md` | What's trending (2026 data) and the niches to target |
| `docs/profile-audit-checklist.md` | Everything to check and fix on the account |
| `docs/pricing.md` | Medium, task-based pricing table and formula |
| `docs/bid-playbook.md` | Bid structure, templates, client-reply templates |
| `docs/offers.md` | Ready-made service offers / gig listings |
| `pricing/price.mjs` | Price calculator: `node pricing/price.mjs webapp medium --urgent` |
| `tracker/projects.csv` | Bids, wins, revenue log |

## Daily routine (~20 min)

1. `job-scout` → shortlist of 5–10 projects posted in the last hours.
2. `bid-writer` on the top 3–5 → review → submit yourself (fast bids win).
3. `client-assistant` on any new messages → review → send.
4. Log everything in `tracker/projects.csv`.
5. Fridays: `tracker` weekly review → adjust profile, skills and prices.

## Roadmap (later)

- Job-finder that uses the official Freelancer.com developer API instead of the
  browser (check their terms; keep bids human-approved).
- Small dashboard (Next.js + Supabase) over the tracker data.
