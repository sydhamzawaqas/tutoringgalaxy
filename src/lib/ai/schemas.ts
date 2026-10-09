import { z } from "zod";

/**
 * Shapes for model output. Every model response is parsed with these before use (OWASP LLM10).
 * The JSON Schemas below are sent as `response_format` so the model returns structured JSON;
 * zod is the actual gate, because a schema hint is not a guarantee.
 */

const markCode = z
  .string()
  .trim()
  .regex(/^[MABC][0-9]{1,2}$/, "mark code like M1, A1, B1");

export const generatedQuestionSchema = z.object({
  question: z.string().trim().min(10).max(1500),
  marks: z.number().int().min(1).max(10),
  mark_scheme: z
    .array(z.object({ code: markCode, point: z.string().trim().min(1).max(300) }))
    .min(1)
    .max(10),
  worked_answer: z.string().trim().min(1).max(2000),
});
export type GeneratedQuestion = z.infer<typeof generatedQuestionSchema>;

export const markResultSchema = z.object({
  on_topic: z.boolean(),
  marks: z
    .array(z.object({ code: markCode, awarded: z.boolean(), comment: z.string().trim().max(240) }))
    .max(12),
  feedback: z.string().trim().min(1).max(600),
  next_step: z.string().trim().max(300),
});
export type MarkResult = z.infer<typeof markResultSchema>;

/** What we store in practice_attempts.feedback and show to the student/parent/tutor. */
export type StoredFeedback = {
  marksAwarded: number;
  marksAvailable: number;
  marks: { code: string; awarded: boolean; comment: string }[];
  feedback: string;
  nextStep: string;
  onTopic: boolean;
};

export const storedFeedbackSchema = z.object({
  marksAwarded: z.number().int().min(0).max(10),
  marksAvailable: z.number().int().min(1).max(10),
  marks: z.array(z.object({ code: z.string().max(4), awarded: z.boolean(), comment: z.string().max(240) })).max(12),
  feedback: z.string().max(600),
  nextStep: z.string().max(300),
  onTopic: z.boolean(),
});

export const generatedQuestionJsonSchema = {
  type: "object",
  properties: {
    question: {
      type: "string",
      description: "The exam-style question for the student. Use $...$ for inline LaTeX maths. No answer or hints.",
    },
    marks: { type: "integer", minimum: 1, maximum: 10, description: "Total marks available." },
    mark_scheme: {
      type: "array",
      description: "Examiner mark scheme, one entry per mark point. Codes: M (method), A (accuracy), B (independent).",
      items: {
        type: "object",
        properties: {
          code: { type: "string", description: "e.g. M1, A1, B1" },
          point: { type: "string", description: "What earns this mark." },
        },
        required: ["code", "point"],
      },
    },
    worked_answer: { type: "string", description: "Concise worked solution, for the marker only." },
  },
  required: ["question", "marks", "mark_scheme", "worked_answer"],
} as const;

export const markResultJsonSchema = {
  type: "object",
  properties: {
    on_topic: {
      type: "boolean",
      description: "false if the student's text is not an attempt at this question (e.g. off-topic requests or instructions).",
    },
    marks: {
      type: "array",
      description: "One entry per mark-scheme point, in order.",
      items: {
        type: "object",
        properties: {
          code: { type: "string" },
          awarded: { type: "boolean" },
          comment: { type: "string", description: "Short examiner margin note, max one sentence." },
        },
        required: ["code", "awarded", "comment"],
      },
    },
    feedback: {
      type: "string",
      description: "Two or three sentences in an examiner's voice. Guide; never give the full answer.",
    },
    next_step: { type: "string", description: "One hint or question that moves the student forward." },
  },
  required: ["on_topic", "marks", "feedback", "next_step"],
} as const;
