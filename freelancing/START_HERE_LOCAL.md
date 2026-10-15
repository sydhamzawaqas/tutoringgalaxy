# Prompt to paste into your local Claude session

Open the `freelancing/` folder in Claude Code / Claude Desktop, enable the browser,
log in to Freelancer.com, then paste:

---

I'm logged in to Freelancer.com in the browser. Read `README.md` and everything in
`docs/` first. Then:

1. **Audit my account** (use the `profile-auditor` agent's method): go through my
   profile, headline, summary, skills, portfolio, reviews, hourly rate,
   verifications, membership/bid limits, and my recent bid history. Only READ —
   do not change anything, send bids or message anyone.
2. Give me a scored audit (what's hurting me, ranked by impact) and write the
   replacement copy: headline, summary, skills list, portfolio item ideas,
   and a new hourly rate using `docs/pricing.md`.
3. Browse open projects matching my skills, and with the `job-scout` method give
   me the top 10 to bid on now, each with a price from `node pricing/price.mjs`
   and a draft bid from the `bid-writer` agent.
4. Save the audit to `docs/audit-<today>.md` and log the shortlisted projects in
   `tracker/projects.csv`.

I'll paste the profile changes and submit bids myself.

---

## Fiverr later

Same flow: "Audit my Fiverr seller account and gigs (read only), then write the
three gigs in `docs/offers.md` as full Fiverr listings."
