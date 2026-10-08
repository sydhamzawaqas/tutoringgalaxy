import type { NextConfig } from "next";

/**
 * Old Lovable routes → new pages (docs/plan/02-site-structure.html, "Old routes → new pages").
 * `permanent: true` sends 308, which search engines treat like a 301. Query strings pass through.
 * Order matters: the first matching rule wins, so specific rules come before catch-alls.
 * The slug lists mirror `page: true` in src/data/content/curricula.ts and subjects.ts; update them
 * when a new curriculum or subject page is published.
 */
const CURRICULUM_PAGES = "o-level|a-level|igcse|gcse|ib|matric|fsc|mdcat|ecat|sat";
const SUBJECT_PAGES = "mathematics|physics|chemistry|biology|english|economics|accounting|computer-science";
const HOME_CITIES = "islamabad|rawalpindi";
// Old top-level /$city/$curriculum pages for cities without home tutors go to online tutoring.
const ONLINE_CITIES =
  "lahore|karachi|peshawar|faisalabad|multan|quetta|dubai|abu-dhabi|sharjah|riyadh|jeddah|dammam|doha|muscat|manama|kuwait-city|london|toronto|new-york|sydney";

const legacyRedirects = [
  // Tutors (filters become query parameters on /tutors)
  { source: "/teachers", destination: "/tutors" },
  { source: "/teachers/:path*", destination: "/tutors" },
  { source: "/tutors/subject/:path*", destination: "/tutors" },
  { source: "/tutors/curriculum/:path*", destination: "/tutors" },
  { source: "/tutors/country/:path*", destination: "/tutors" },

  // Curricula and syllabus outlines
  { source: `/curriculum/:slug(${CURRICULUM_PAGES})`, destination: "/curricula/:slug" },
  { source: "/curriculum/:path*", destination: "/curricula" },
  { source: `/syllabus/:slug(${CURRICULUM_PAGES})/:rest*`, destination: "/curricula/:slug" },
  { source: "/syllabus/:path*", destination: "/curricula" },

  // Subjects
  { source: `/subject/:slug(${SUBJECT_PAGES})`, destination: "/subjects/:slug" },
  { source: "/subject/:path*", destination: "/subjects" },

  // Places: only Islamabad has a page; everywhere else goes to home or online tutoring
  { source: `/city/:city(${HOME_CITIES})`, destination: "/locations/islamabad" },
  { source: "/city/:path*", destination: "/tutoring/home" },
  { source: `/cities/:city(${HOME_CITIES})/:rest*`, destination: "/locations/islamabad" },
  { source: "/cities/:path*", destination: "/tutoring/home" },
  { source: "/locations", destination: "/tutoring/home" },
  { source: "/locations/rawalpindi/:rest*", destination: "/locations/islamabad" },
  { source: "/locations/:place((?!islamabad$).*)", destination: "/tutoring/home" },
  { source: "/regions/:path*", destination: "/tutoring/online" },
  { source: "/world/:path*", destination: "/tutoring/online" },
  { source: `/:city(${HOME_CITIES})/:rest*`, destination: "/locations/islamabad" },
  { source: `/:city(${ONLINE_CITIES})/:rest*`, destination: "/tutoring/online" },

  // Content library
  { source: "/blog/:path*", destination: "/resources" },
  { source: "/academy/:path*", destination: "/resources" },
  { source: "/prep/:path*", destination: "/resources" },
  { source: "/resources/curriculum/:path*", destination: "/resources" },
  { source: "/resources/subject/:path*", destination: "/resources" },
  { source: "/resources/:a/:b/:rest*", destination: "/resources" },

  // Booking and services
  { source: "/match/:path*", destination: "/book" },
  { source: "/growing-stars/:path*", destination: "/book" },
  { source: "/services/:path*", destination: "/tutoring/online" },
  { source: "/results", destination: "/about" },

  // Assessments and practice (login required now)
  { source: "/assessments/about", destination: "/about" },
  { source: "/assessments/pricing", destination: "/pricing" },
  { source: "/assessments/contact", destination: "/contact" },
  { source: "/assessment/:path*", destination: "/app/practice" },
  { source: "/assessments/:path*", destination: "/app/practice" },
  { source: "/quiz/:path*", destination: "/app/practice" },
  { source: "/practice/:path*", destination: "/app/practice" },
  { source: "/learn/:path*", destination: "/app/practice" },
  { source: "/leaderboard/:path*", destination: "/app/practice" },

  // Dashboards: one /app URL, content depends on role
  { source: "/dashboard/:path*", destination: "/app" },
  { source: "/parent/:path*", destination: "/app" },
  { source: "/app/student", destination: "/app" },
  { source: "/app/parent", destination: "/app" },
  { source: "/app/school/:path*", destination: "/app" },
  { source: "/app/tutor/:studentId", destination: "/app/students/:studentId" },
  { source: "/app/tutor", destination: "/app" },
  { source: "/progress/report/:path*", destination: "/app" },
  { source: "/progress", destination: "/app/progress" },

  // Auth and old admin screens
  { source: "/auth/:path*", destination: "/login" },
  { source: "/admin/content-factory/:path*", destination: "/admin/content" },
  { source: "/admin/content-pilot/:path*", destination: "/admin/content" },
  { source: "/admin/exams/:path*", destination: "/admin/questions" },
  { source: "/admin/mcqs/:path*", destination: "/admin/questions" },
  { source: "/admin/ai-quality/:path*", destination: "/admin/ai" },
  { source: "/admin/growth/:path*", destination: "/admin" },
  { source: "/admin/gap-analysis/:path*", destination: "/admin" },
].map((r) => ({ ...r, permanent: true }));

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;
