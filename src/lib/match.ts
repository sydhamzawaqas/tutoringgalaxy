/**
 * Smart Tutor Match: weighted scoring ported from the old site's lib/match.ts.
 * Pure functions, safe on server and client. Persistence helpers touch localStorage only when called.
 */
import { tutors as ALL, type Tutor } from "@/data/content/tutors";

export type MatchGoal = "grades" | "exam" | "concepts" | "confidence" | "any";
export type MatchWhen = "weekday-evening" | "weekend" | "any";
export type MatchMode = "online" | "home" | "any";

export type MatchPrefs = {
  subject: string; // slug or "any"
  curriculum: string; // slug or "any"
  goal: MatchGoal;
  budget: number; // USD-equivalent per hour cap; 0 = no limit
  when: MatchWhen;
  mode: MatchMode;
  country: string; // country slug or "any"
};

export const DEFAULT_PREFS: MatchPrefs = {
  subject: "any",
  curriculum: "any",
  goal: "any",
  budget: 0,
  when: "any",
  mode: "any",
  country: "any",
};

export type ScoredTutor = { tutor: Tutor; score: number; pct: number; reasons: string[] };

const WEEKDAY = /mon|tue|wed|thu|fri|sun–thu|sat–wed/i;
const EVENING = /pm\b/i;
const WEEKEND = /sat|sun|fri|weekend/i;

export function scoreTutor(t: Tutor, p: MatchPrefs): Omit<ScoredTutor, "pct"> {
  let score = 0;
  const reasons: string[] = [];

  // Subject (heavy)
  if (p.subject === "any") score += 10;
  else if (t.subjects.includes(p.subject)) {
    score += 35;
    reasons.push("Teaches your subject");
  }

  // Curriculum (heavy)
  if (p.curriculum === "any") score += 8;
  else if (t.curricula.includes(p.curriculum)) {
    score += 30;
    reasons.push("Expert in your curriculum");
  }

  // Country: based there beats "serves families there".
  if (p.country !== "any") {
    if (t.countrySlug === p.country) {
      score += 10;
      reasons.push("Based in your country");
    } else if (t.countriesServed.includes(p.country as Tutor["countrySlug"])) {
      score += 6;
      reasons.push("Teaches families in your country");
    }
  }

  // Rating, reviews, experience
  score += (t.rating - 4) * 8; // up to ~8
  score += Math.min(t.reviews / 30, 6); // up to 6
  score += Math.min(t.experienceYears, 10) * 0.6; // up to 6

  // Budget, compared in USD so PKR, GBP, AED… are fair
  if (p.budget > 0) {
    if (t.rate.usd <= p.budget) {
      score += 8;
      reasons.push("Within your budget");
    } else score -= Math.min(15, (t.rate.usd - p.budget) * 0.5);
  }

  // Schedule
  const avail = t.availability.join(" ");
  if (p.when === "weekday-evening" && WEEKDAY.test(avail) && EVENING.test(avail)) {
    score += 5;
    reasons.push("Available weekday evenings");
  }
  if (p.when === "weekend" && WEEKEND.test(avail)) {
    score += 5;
    reasons.push("Available at weekends");
  }

  // Mode
  if (p.mode === "online" && t.modes.includes("online")) {
    score += 4;
    reasons.push("Teaches online");
  }
  if (p.mode === "home") {
    if (t.modes.includes("home")) {
      score += 8;
      reasons.push(`Home lessons in ${t.city}`);
    } else score -= 6;
  }

  // Goal → highlights / bio heuristic
  const text = `${t.highlights.join(" ")} ${t.bio} ${t.intro}`.toLowerCase();
  if (p.goal === "exam" && /(pass rate|a\*|score|exam|band 6|atar|mdcat|sat)/.test(text)) {
    score += 4;
    reasons.push("Exam-focused results");
  }
  if (p.goal === "grades" && /(a\*|pass rate|grade|band 6|results)/.test(text)) {
    score += 3;
    reasons.push("Strong grade record");
  }
  if (p.goal === "concepts" && /(concept|clarity|foundation|visual|simple|intuitive)/.test(text)) {
    score += 3;
    reasons.push("Concept-first teaching");
  }
  if (p.goal === "confidence" && /(patient|confidence|friendly|warm|encourag)/.test(text)) {
    score += 3;
    reasons.push("Builds confidence");
  }

  return { tutor: t, score: Math.max(0, Math.round(score)), reasons: reasons.slice(0, 4) };
}

/** All tutors ranked best-first, with a match % relative to the top result. */
export function rankTutors(p: MatchPrefs, list: Tutor[] = ALL): ScoredTutor[] {
  const scored = list.map((t) => scoreTutor(t, p)).sort((a, b) => b.score - a.score || b.tutor.rating - a.tutor.rating);
  const max = scored[0]?.score || 1;
  return scored.map((s) => ({ ...s, pct: Math.max(1, Math.round((s.score / max) * 100)) }));
}

const KEY = "tg_match_prefs_v1";

export function savePrefs(p: MatchPrefs) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    // Private mode or storage blocked: matching still works, it just isn't remembered.
  }
}

/** Saved answers, validated against the current shape (old or tampered values fall back to defaults). */
export function loadPrefs(): MatchPrefs | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as Partial<MatchPrefs>;
    const str = (x: unknown, d: string) => (typeof x === "string" && x.length < 40 ? x : d);
    return {
      subject: str(v.subject, "any"),
      curriculum: str(v.curriculum, "any"),
      goal: (["grades", "exam", "concepts", "confidence", "any"] as const).includes(v.goal as MatchGoal) ? (v.goal as MatchGoal) : "any",
      budget: typeof v.budget === "number" && v.budget >= 0 && v.budget <= 1000 ? v.budget : 0,
      when: (["weekday-evening", "weekend", "any"] as const).includes(v.when as MatchWhen) ? (v.when as MatchWhen) : "any",
      mode: (["online", "home", "any"] as const).includes(v.mode as MatchMode) ? (v.mode as MatchMode) : "any",
      country: str(v.country, "any"),
    };
  } catch {
    return null;
  }
}
