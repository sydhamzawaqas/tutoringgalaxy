#!/usr/bin/env node
// Task-based price calculator. Keep the table in sync with docs/pricing.md.
// Usage: node pricing/price.mjs <type> <complexity> [--urgent]

const BASE = {
  bugfix: { simple: [30, 60], medium: [80, 150], complex: [200, 350] },
  website: { simple: [120, 250], medium: [300, 600], complex: [700, 1200] },
  webapp: { simple: [500, 900], medium: [1000, 2500], complex: [3000, 6000] },
  "ai-agent": { simple: [200, 400], medium: [500, 1200], complex: [1500, 3500] },
  automation: { simple: [50, 120], medium: [150, 400], complex: [500, 1000] },
  "vibe-fix": { simple: [100, 200], medium: [250, 600], complex: [800, 1500] },
};
const URGENCY = 1.3;
const FEE_BUFFER = 1.1;

const roundTo5 = (n) => Math.round(n / 5) * 5;

const [type, complexity] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const urgent = process.argv.includes("--urgent");

const range = BASE[type]?.[complexity];
if (!range) {
  console.error("Usage: node pricing/price.mjs <type> <complexity> [--urgent]");
  console.error(`  type:       ${Object.keys(BASE).join(" | ")}`);
  console.error("  complexity: simple | medium | complex");
  process.exit(1);
}

const factor = (urgent ? URGENCY : 1) * FEE_BUFFER;
const [low, high] = range.map((n) => roundTo5(n * factor));
const mid = roundTo5((low + high) / 2);

console.log(`${type} / ${complexity}${urgent ? " / urgent" : ""}`);
console.log(`  range:     $${low} – $${high}`);
console.log(`  suggested: $${mid}  (low end for review-building, high end for strong clients)`);
if (mid > 300) console.log("  split into milestones (> $300)");
