"use server";

import { z } from "zod";
import { getAuthorizedUser, isUuid } from "@/lib/auth/dal";
import { createAdminClient, isServiceRoleConfigured } from "@/lib/supabase/admin";
import { isAiConfigured } from "@/lib/ai/config";
import { resolveSelection } from "@/lib/ai/catalog";
import { generateQuestion, markAnswer, markValue } from "@/lib/ai/gemini";
import { spendAiQuota, type QuotaResult } from "@/lib/ai/quota";
import { generatedQuestionSchema, type StoredFeedback } from "@/lib/ai/schemas";

/**
 * AI practice Server Actions. Each one is a public POST endpoint, so each one:
 *   - verifies the session and role (DAL) before anything else,
 *   - validates input against allowlists / zod,
 *   - spends quota before calling Gemini,
 *   - keeps the mark scheme and worked answer on the server (the client only gets an attempt id),
 *   - writes with the service role, always scoped to the session user's id.
 */

export type ActionError = { ok: false; error: string; code?: "auth" | "not_configured" | "quota" | "invalid" | "failed" };

export type StartQuestionResult =
  | { ok: true; attemptId: string; question: string; marks: number }
  | ActionError;

export type CheckAnswerResult = { ok: true; feedback: StoredFeedback; correct: boolean } | ActionError;

const NOT_CONFIGURED: ActionError = {
  ok: false,
  code: "not_configured",
  error: "AI practice isn't configured yet. Please ask your tutor or try again later.",
};
const AUTH: ActionError = { ok: false, code: "auth", error: "Your session has ended. Please sign in again." };
const FAILED: ActionError = {
  ok: false,
  code: "failed",
  error: "We couldn't reach the AI examiner just now. Please try again in a minute.",
};

function quotaError(result: Exclude<QuotaResult, { ok: true }>): ActionError {
  if (result.reason === "daily") {
    return { ok: false, code: "quota", error: "You've reached today's AI practice limit. It resets at midnight (UTC)." };
  }
  if (result.reason === "burst") {
    return { ok: false, code: "quota", error: "That's a lot of questions in a short time. Please wait a minute and try again." };
  }
  return NOT_CONFIGURED;
}

const startSchema = z.object({
  curriculum: z.string().max(40),
  subject: z.string().max(60),
  topic: z.string().max(120),
  difficulty: z.string().max(20).optional(),
});

export async function startQuestion(input: unknown): Promise<StartQuestionResult> {
  const user = await getAuthorizedUser("student", "admin");
  if (!user) return AUTH;

  const parsed = startSchema.safeParse(input);
  const selection = parsed.success ? resolveSelection(parsed.data) : null;
  if (!selection) return { ok: false, code: "invalid", error: "Choose a curriculum, subject and topic from the list." };

  if (!isAiConfigured() || !isServiceRoleConfigured()) return NOT_CONFIGURED;

  const quota = await spendAiQuota(user.id);
  if (!quota.ok) return quotaError(quota);

  const generated = await generateQuestion({
    curriculum: selection.curriculum.name,
    subject: selection.subject.name,
    topic: selection.topic,
    difficulty: selection.difficulty,
  });
  if (!generated.ok) return generated.error === "not_configured" ? NOT_CONFIGURED : FAILED;

  const admin = createAdminClient();
  if (!admin) return NOT_CONFIGURED;

  const { data, error } = await admin
    .from("practice_attempts")
    .insert({
      student_id: user.id,
      curriculum: selection.curriculum.slug,
      subject: selection.subject.slug,
      topic: selection.topic,
      question: { ...generated.data, difficulty: selection.difficulty },
    })
    .select("id")
    .single();
  if (error || !data) {
    console.error("[practice] insert attempt failed", error?.code ?? "unknown");
    return FAILED;
  }

  // Only the question text and marks go to the browser. The mark scheme stays server-side.
  return { ok: true, attemptId: data.id as string, question: generated.data.question, marks: generated.data.marks };
}

const checkSchema = z.object({
  attemptId: z.string().refine(isUuid),
  answer: z
    .string()
    .transform((s) => s.replace(/\r\n/g, "\n").trim())
    .pipe(z.string().min(1, "Write your answer first.").max(4000, "Keep your answer under 4,000 characters.")),
});

export async function checkAnswer(input: unknown): Promise<CheckAnswerResult> {
  const user = await getAuthorizedUser("student", "admin");
  if (!user) return AUTH;

  const parsed = checkSchema.safeParse(input);
  if (!parsed.success) {
    const message = parsed.error.issues.find((i) => i.path[0] === "answer")?.message;
    return { ok: false, code: "invalid", error: message ?? "Something went wrong with that question. Start a new one." };
  }
  const { attemptId, answer } = parsed.data;

  if (!isAiConfigured() || !isServiceRoleConfigured()) return NOT_CONFIGURED;
  const admin = createAdminClient();
  if (!admin) return NOT_CONFIGURED;

  // Ownership check: the attempt must belong to the session user and be unanswered.
  const { data: attempt } = await admin
    .from("practice_attempts")
    .select("id, curriculum, subject, topic, question, answer")
    .eq("id", attemptId)
    .eq("student_id", user.id)
    .maybeSingle();
  if (!attempt) return { ok: false, code: "invalid", error: "We couldn't find that question. Start a new one." };
  if (attempt.answer !== null) {
    return { ok: false, code: "invalid", error: "This question has already been marked. Try a new one." };
  }

  const question = generatedQuestionSchema.safeParse(attempt.question);
  if (!question.success) return FAILED;

  const quota = await spendAiQuota(user.id);
  if (!quota.ok) return quotaError(quota);

  const selection = resolveSelection({ curriculum: attempt.curriculum, subject: attempt.subject, topic: attempt.topic });
  const marked = await markAnswer({
    question: question.data,
    answer,
    curriculum: selection?.curriculum.name ?? String(attempt.curriculum),
    subject: selection?.subject.name ?? String(attempt.subject),
    topic: String(attempt.topic),
  });
  if (!marked.ok) return marked.error === "not_configured" ? NOT_CONFIGURED : FAILED;

  // Compute the score ourselves from the mark scheme; never trust a model-supplied total.
  const available = question.data.marks;
  const schemeCodes = new Set(question.data.mark_scheme.map((m) => m.code));
  const marks = marked.data.on_topic ? marked.data.marks.filter((m) => schemeCodes.has(m.code)) : [];
  const awarded = Math.min(
    available,
    marks.reduce((sum, m) => sum + (m.awarded ? markValue(m.code) : 0), 0),
  );

  const feedback: StoredFeedback = {
    marksAwarded: awarded,
    marksAvailable: available,
    marks,
    feedback: marked.data.on_topic
      ? marked.data.feedback
      : "This doesn't look like an attempt at the question. Have a go at it and I'll mark your working.",
    nextStep: marked.data.next_step,
    onTopic: marked.data.on_topic,
  };
  const correct = awarded === available;

  const { error } = await admin
    .from("practice_attempts")
    .update({ answer, feedback, correct })
    .eq("id", attemptId)
    .eq("student_id", user.id)
    .is("answer", null);
  if (error) {
    console.error("[practice] save marking failed", error.code ?? "unknown");
    return FAILED;
  }

  return { ok: true, feedback, correct };
}
