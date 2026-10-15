# Pricing — medium, task-based

Not the cheapest, not premium. Price on **value of the task**, not on hours:
Claude Code makes delivery fast, so charge what a solid developer charges and
deliver sooner.

## Formula

```
price = base(task type, complexity) × urgency + platform fee buffer
complexity: simple | medium | complex
urgency:    ×1.0 normal, ×1.3 if deadline < 48h
fee buffer: +10% (covers the platform's project fee)
```

Calculator: `node pricing/price.mjs <type> <complexity> [--urgent]`

## Base table (USD, before urgency/fee)

| Task type (`type`) | Simple | Medium | Complex |
|---|---|---|---|
| Bug fix / small change (`bugfix`) | 30–60 | 80–150 | 200–350 |
| Landing page / website, Next.js (`website`) | 120–250 | 300–600 | 700–1,200 |
| Web app / SaaS MVP (`webapp`) | 500–900 | 1,000–2,500 | 3,000–6,000 |
| AI chatbot / agent (`ai-agent`) | 200–400 | 500–1,200 | 1,500–3,500 |
| Automation: n8n, scripts, scraping, Excel/PDF (`automation`) | 50–120 | 150–400 | 500–1,000 |
| Fix / finish vibe-coded app (`vibe-fix`) | 100–200 | 250–600 | 800–1,500 |

**Hourly:** $25–35/hr now → $40–50/hr after 5+ fresh 5★ reviews.

## Complexity guide

- **Simple:** one feature/page, clear spec, no integrations, ≤ 1 day.
- **Medium:** several features, 1–2 integrations (auth, payments, an API), 2–5 days.
- **Complex:** many features, multiple integrations, data model design, unclear spec, 1–3 weeks.

## Rules

- Bid inside the range; go to the **low end** only for small projects you need
  for reviews, the **high end** when the client is detailed, verified and has a
  good budget/history.
- Never bid below the client's budget floor by more than ~10% — it looks cheap.
- Unclear scope → bid the simple/medium price for a **paid first milestone**
  (spec + first feature), then quote the rest.
- Always split > $300 projects into milestones.
- Revisions: 2 included; extra scope = new milestone.
