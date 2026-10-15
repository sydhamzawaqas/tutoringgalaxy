#!/usr/bin/env node
// Builds a static snapshot of the running site for the GitHub Pages preview.
//
// Usage (from the repo root):
//   NEXT_PUBLIC_BASE_PATH=/tutoringgalaxy NEXT_PUBLIC_SITE_URL=https://<user>.github.io/tutoringgalaxy npm run build
//   NEXT_PUBLIC_BASE_PATH=/tutoringgalaxy npx next start -p 3100 &
//   node scripts/snapshot-pages.mjs http://127.0.0.1:3100 /tutoringgalaxy out-pages
//
// The preview is static: pages, navigation and the design all work, but anything that needs the
// server (booking and tutor-application forms, sign-in, the app, filters) does not.
import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const [origin, base, outDir] = process.argv.slice(2);
if (!origin || !base || !outDir) {
  console.error("usage: node scripts/snapshot-pages.mjs <origin> <basePath> <outDir>");
  process.exit(1);
}

const NOINDEX = '<meta name="robots" content="noindex, nofollow"/>';
// Banner drawn with CSS only, so the HTML React hydrates stays exactly as rendered.
const BANNER =
  '<style>body::before{content:"Preview build. Booking, sign-in and the app need the real server and are not active here.";' +
  "display:block;background:#14284b;color:#fff;font:600 13px/1.4 system-ui,sans-serif;padding:8px 16px;text-align:center}</style>";

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

// Every public page from the sitemap, plus pages the sitemap deliberately leaves out.
const sitemap = await (await fetch(`${origin}${base}/sitemap.xml`)).text();
const fromSitemap = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname.replace(base, "") || "/");
const extra = [
  "/book/thanks",
  "/login",
  "/signup",
  "/reset-password",
  "/tutors/example-maths-tutor",
  "/tutors/example-chemistry-tutor",
  "/tutors/example-physics-tutor",
  "/tutors/example-english-tutor",
];
const routes = [...new Set([...fromSitemap.map((p) => (p === "" ? "/" : p)), ...extra])];

async function savePage(route, file) {
  const res = await fetch(`${origin}${base}${route === "/" ? "" : route}`);
  if (!res.ok && res.status !== 404) throw new Error(`${route} -> ${res.status}`);
  let html = await res.text();
  html = html.replace("<head>", `<head>${NOINDEX}${BANNER}`);
  const dest = join(outDir, file);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, html);
  return res.status;
}

for (const route of routes) {
  const file = route === "/" ? "index.html" : `${route.slice(1)}/index.html`;
  const status = await savePage(route, file);
  console.log(status, route);
}
console.log(await savePage("/this-page-does-not-exist", "404.html"), "404.html");

// Static assets: Next bundles, public/ files and metadata files.
cpSync(".next/static", join(outDir, "_next/static"), { recursive: true });
cpSync("public", outDir, { recursive: true });
for (const f of ["favicon.ico", "icon.svg", "apple-icon.png", "opengraph-image"]) {
  const res = await fetch(`${origin}${base}/${f}`);
  if (res.ok) writeFileSync(join(outDir, f), Buffer.from(await res.arrayBuffer()));
}
// Keep the preview out of search engines; GitHub Pages must not run Jekyll over _next/.
writeFileSync(join(outDir, "robots.txt"), "User-agent: *\nDisallow: /\n");
writeFileSync(join(outDir, ".nojekyll"), "");
console.log(`Snapshot written to ${outDir} (${routes.length} pages).`);
