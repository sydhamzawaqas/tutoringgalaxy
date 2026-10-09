import { curricula, getCurriculum } from "@/data/content/curricula";
import { getSubject } from "@/data/content/subjects";
import type { Difficulty } from "./gemini";

/**
 * Practice catalogue built from the site's content data. Everything sent to the model about
 * WHAT to practise comes from this allowlist, never from free text (prompt-injection safe).
 */
export type PracticeSelection = {
  curriculum: { slug: string; name: string; short: string };
  subject: { slug: string; name: string };
  topic: string;
  difficulty: Difficulty;
};

export const DIFFICULTIES: { value: Difficulty; label: string }[] = [
  { value: "foundation", label: "Foundation" },
  { value: "standard", label: "Standard" },
  { value: "challenge", label: "Challenge" },
];

export function isDifficulty(value: unknown): value is Difficulty {
  return value === "foundation" || value === "standard" || value === "challenge";
}

export function practiceCurricula() {
  return curricula.map((c) => ({ slug: c.slug, name: c.name, short: c.short }));
}

export function practiceSubjects(curriculumSlug: string) {
  const c = getCurriculum(curriculumSlug);
  if (!c) return [];
  return c.subjects.flatMap((slug) => {
    const s = getSubject(slug);
    return s && s.topics.length > 0 ? [{ slug: s.slug, name: s.name, topics: s.topics }] : [];
  });
}

/** Validate a selection against the allowlist. Returns null for anything unknown. */
export function resolveSelection(input: {
  curriculum?: unknown;
  subject?: unknown;
  topic?: unknown;
  difficulty?: unknown;
}): PracticeSelection | null {
  if (typeof input.curriculum !== "string" || typeof input.subject !== "string" || typeof input.topic !== "string") {
    return null;
  }
  const c = getCurriculum(input.curriculum);
  if (!c || !c.subjects.includes(input.subject)) return null;
  const s = getSubject(input.subject);
  if (!s) return null;
  const topic = s.topics.find((t) => t === input.topic);
  if (!topic) return null;
  return {
    curriculum: { slug: c.slug, name: c.name, short: c.short },
    subject: { slug: s.slug, name: s.name },
    topic,
    difficulty: isDifficulty(input.difficulty) ? input.difficulty : "standard",
  };
}
