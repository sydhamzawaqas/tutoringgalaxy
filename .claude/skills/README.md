# Project skills

Claude Code loads every `SKILL.md` in this folder automatically for anyone working in this repo.
Each skill was copied from GitHub and reviewed before it was added. Its license sits in its own folder.

| Skill | Area | Source | License |
| --- | --- | --- | --- |
| `owasp-security` | Cybersecurity: OWASP Top 10:2025, ASVS 5.0, LLM/agent security reviews | [agamm/claude-code-owasp](https://github.com/agamm/claude-code-owasp) @ `8ac7965` | MIT |
| `frontend-design` | UI design: visual direction, typography, layout | [anthropics/skills](https://github.com/anthropics/skills) @ `683bc88` | See `LICENSE.txt` |
| `nextjs-shadcn` | UI design: Next.js + shadcn/ui interfaces and theming | [laguagu/claude-code-nextjs-skills](https://github.com/laguagu/claude-code-nextjs-skills) @ `c51d9c8` | MIT |
| `web-design-guidelines` | UI review: accessibility and UX audit | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) @ `063bee9` | MIT |
| `gemini-api-dev` | Google AI Studio / Gemini API (`@google/genai`) | [google-gemini/gemini-skills](https://github.com/google-gemini/gemini-skills) @ `832c8f9` | Apache-2.0 |
| `nextjs-seo` | SEO: metadata, sitemap/robots, JSON-LD, Core Web Vitals | [laguagu/claude-code-nextjs-skills](https://github.com/laguagu/claude-code-nextjs-skills) @ `c51d9c8` | MIT |
| `security-review` | Cybersecurity: checklist for auth, input validation, secrets, XSS/CSRF, rate limiting | [affaan-m/ECC](https://github.com/affaan-m/ECC) @ `ef648e0` | MIT |
| `seo` | SEO: technical audit, on-page rules, keyword mapping, internal linking | [affaan-m/ECC](https://github.com/affaan-m/ECC) @ `ef648e0` | MIT |
| `design-system` | UI design: extract design tokens, visual consistency audit | [affaan-m/ECC](https://github.com/affaan-m/ECC) @ `ef648e0` | MIT |
| `make-interfaces-feel-better` | UI design: polish details (spacing, motion, hit areas, states) | [affaan-m/ECC](https://github.com/affaan-m/ECC) @ `ef648e0` | MIT |
| `frontend-a11y` | UI: accessibility patterns for React/Next.js | [affaan-m/ECC](https://github.com/affaan-m/ECC) @ `ef648e0` | MIT |
| `frontend-patterns` | React/Next.js component, state and performance patterns | [affaan-m/ECC](https://github.com/affaan-m/ECC) @ `ef648e0` | MIT |
| `react-patterns` | React 19 patterns: server/client components, forms, Suspense | [affaan-m/ECC](https://github.com/affaan-m/ECC) @ `ef648e0` | MIT |
| `nextjs-turbopack` | Next.js 16 + Turbopack, `proxy.ts` (formerly `middleware.ts`) | [affaan-m/ECC](https://github.com/affaan-m/ECC) @ `ef648e0` | MIT |

Notes:
- `web-design-guidelines` downloads its rules at run time from
  `raw.githubusercontent.com/vercel-labs/web-interface-guidelines`, so its checks follow that upstream file.
- `nextjs-shadcn` mentions an `icons` skill that is not included here. It still works without that skill.
- From ECC only the skills that fit this stack were taken. Its hooks, agents and installer were left out.
  `security-review` has a Solana section that doesn't apply here, and `design-system` mentions slash-command
  flags and a browser MCP that ECC provides. Its audit still works without them.
- To update a skill, copy the new version from its source, review the diff, and change the commit hash above.
