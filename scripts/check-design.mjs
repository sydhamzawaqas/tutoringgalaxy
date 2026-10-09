#!/usr/bin/env node
// Design-system guard (docs/design/DESIGN.md §8): components must use tokens, not raw values.
// Fails on raw hex colours and arbitrary Tailwind colour / font-size / radius / shadow values
// anywhere in src/ except globals.css (where the tokens are defined) and generated icon files.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SRC = join(ROOT, "src");
const ALLOW_FILES = new Set(["src/app/globals.css", "src/lib/brand-colors.ts"]);
// Image generators (OG images) can't use CSS variables, so they may use brand hex values.
const ALLOW_PATTERNS = [/opengraph-image\.tsx$/, /twitter-image\.tsx$/, /icon\.tsx$/, /apple-icon\.tsx$/];

const RULES = [
  { name: "raw hex colour", re: /#[0-9a-fA-F]{3,8}\b(?![\w-]*=)/g, skipInStrings: /url\(|href=|id=/ },
  { name: "arbitrary colour", re: /\b(?:text|bg|border|ring|fill|stroke|outline|from|to|via|decoration|shadow)-\[(?:#|rgb|hsl|oklch|color:)[^\]]*\]/g },
  { name: "arbitrary font size", re: /\btext-\[\d[^\]]*(?:px|rem|em)\]/g },
  { name: "arbitrary radius", re: /\brounded(?:-[a-z]{1,2})?-\[[^\]]+\]/g },
  { name: "arbitrary shadow", re: /\bshadow-\[[^\]]+\]/g },
];

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return walk(p);
    return /\.(tsx?|css|mjs)$/.test(name) ? [p] : [];
  });
}

const problems = [];
for (const file of walk(SRC)) {
  const rel = relative(ROOT, file);
  if (ALLOW_FILES.has(rel) || ALLOW_PATTERNS.some((r) => r.test(rel))) continue;
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    if (/^\s*(\/\/|\*|\/\*)/.test(line)) return; // comments
    for (const rule of RULES) {
      for (const m of line.matchAll(rule.re)) {
        if (rule.name === "raw hex colour" && /&#|\\u|%23/.test(line.slice(Math.max(0, m.index - 2), m.index + 1))) continue;
        problems.push(`${rel}:${i + 1}  ${rule.name}: ${m[0]}`);
      }
    }
  });
}

if (problems.length) {
  console.error(`Design check failed (${problems.length}). Use tokens from src/app/globals.css instead:\n`);
  console.error(problems.map((p) => `  ${p}`).join("\n"));
  process.exit(1);
}
console.log("Design check passed: no raw colours or one-off sizes outside the tokens.");
