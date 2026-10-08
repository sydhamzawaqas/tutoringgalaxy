"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { curricula } from "@/data/content/curricula";
import { subjects } from "@/data/content/subjects";
import { tutors } from "@/data/content/tutors";
import { plans } from "@/data/content/pricing";
import { countries } from "@/data/content/countries";
import { LEAD_SUMMARY_COOKIE, LeadStorageError, encodeLeadSummary, saveLead, type Lead } from "@/lib/leads";

/*
 * "Book a free trial" Server Action.
 *
 * Reachable by direct POST, so everything is validated here regardless of what the form allows.
 * Returns state for useActionState (works without JS too: Next renders the page with this state),
 * or redirects to /book/thanks?ref=... on success.
 */

export type BookTrialField =
  | "curriculum"
  | "subject"
  | "level"
  | "challenge"
  | "mode"
  | "city"
  | "preferredTimes"
  | "parentName"
  | "whatsapp"
  | "email"
  | "consent";

export type BookTrialState = {
  status: "idle" | "invalid" | "error";
  /** One message per field, already written to tell the parent how to fix it. */
  errors?: Partial<Record<BookTrialField, string>>;
  /** Form-level problem (storage or rate limit). Plain text, rendered escaped. */
  message?: string;
  /** What was submitted, so the form can be shown again without retyping (rendered escaped by React). */
  values?: Partial<Record<BookTrialField | "tutor" | "plan", string>>;
};

const LIMITS = {
  level: 60,
  challenge: 1000,
  city: 40,
  preferredTimes: 200,
  parentName: 80,
  whatsapp: 30,
  email: 254,
  slug: 80,
} as const;

const MESSAGES: Record<BookTrialField, string> = {
  curriculum: "Choose the curriculum or exam board",
  subject: "Choose the subject",
  level: "Enter the year or grade, for example Year 10 or Grade 9",
  challenge: `Keep this under ${LIMITS.challenge} characters`,
  mode: "Choose online or home lessons",
  city: "Choose a city for home lessons, or choose online lessons",
  preferredTimes: `Keep this under ${LIMITS.preferredTimes} characters`,
  parentName: "Enter your name",
  whatsapp: "Enter a WhatsApp number with country code, e.g. +92 300 1234567",
  email: "Enter an email address like name@example.com, or leave it blank",
  consent: "Tick the box so we can contact you on WhatsApp about the trial",
};

const homeCities: string[] = [...countries.flatMap((c) => c.homeCities), "Other"];

/** Strip control characters (keeping line breaks where asked) and trim. */
function clean(value: string, keepNewlines = false) {
  const pattern = keepNewlines ? /[\u0000-\u0009\u000B\u000C\u000E-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g;
  return value.replace(pattern, "").trim();
}

/**
 * Normalise a WhatsApp number to E.164-style digits: "+" then 8 to 15 digits.
 * Accepts spaces, dashes, dots and brackets, a "00" international prefix, and a Pakistani mobile
 * written locally (03xx xxxxxxx → +923xx xxxxxxx), since most of our families are in Pakistan.
 */
function normaliseWhatsApp(raw: string): string | null {
  let n = raw.replace(/[\s().\-]/g, "");
  if (n.startsWith("00")) n = `+${n.slice(2)}`;
  else if (/^03\d{9}$/.test(n)) n = `+92${n.slice(1)}`;
  return /^\+[1-9]\d{7,14}$/.test(n) ? n : null;
}

const oneOf = (list: readonly string[]) => (v: string) => list.includes(v);

const schema = z
  .object({
    curriculum: z.string().refine(oneOf(curricula.map((c) => c.slug)), MESSAGES.curriculum),
    subject: z.string().refine(oneOf(subjects.map((s) => s.slug)), MESSAGES.subject),
    level: z.string().min(1, MESSAGES.level).max(LIMITS.level, `Keep this under ${LIMITS.level} characters`),
    challenge: z.string().max(LIMITS.challenge, MESSAGES.challenge),
    mode: z.enum(["online", "home"], { error: MESSAGES.mode }),
    city: z.string().max(LIMITS.city),
    preferredTimes: z.string().max(LIMITS.preferredTimes, MESSAGES.preferredTimes),
    parentName: z.string().min(1, MESSAGES.parentName).max(LIMITS.parentName, `Keep your name under ${LIMITS.parentName} characters`),
    whatsapp: z.string().max(LIMITS.whatsapp, MESSAGES.whatsapp),
    email: z.string().max(LIMITS.email, MESSAGES.email).refine((v) => v === "" || z.email().safeParse(v).success, MESSAGES.email),
    consent: z.literal("yes", { error: MESSAGES.consent }),
    // Prefill context from /book?tutor=&plan=. Unknown values are dropped, not rejected.
    tutor: z.string().max(LIMITS.slug),
    plan: z.string().max(LIMITS.slug),
  })
  .superRefine((d, ctx) => {
    if (!normaliseWhatsApp(d.whatsapp)) ctx.addIssue({ code: "custom", path: ["whatsapp"], message: MESSAGES.whatsapp });
    if (d.mode === "home" && !homeCities.includes(d.city)) ctx.addIssue({ code: "custom", path: ["city"], message: MESSAGES.city });
  });

/* ------------------------------------------------------------------------------------------------
 * Rate limit: 5 accepted requests per IP per 10 minutes.
 * NOTE: this Map lives in one server instance's memory. It resets on deploy/restart and is not
 * shared between serverless instances or regions, so in production replace it with a shared store
 * (for example Upstash Redis, or a Supabase table/RPC keyed by IP hash) before relying on it.
 * ---------------------------------------------------------------------------------------------- */
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, times] of hits) if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(k);
  }
  return false;
}

function clientIp(h: Headers) {
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip")?.trim() || "unknown";
}

/** Path the form was submitted from (no host), for attribution. */
function sourcePathFrom(h: Headers) {
  const referer = h.get("referer");
  if (!referer) return null;
  try {
    const url = new URL(referer);
    return `${url.pathname}${url.search}`.slice(0, 200);
  } catch {
    return null;
  }
}

function field(formData: FormData, name: string, max: number, keepNewlines = false) {
  const v = formData.get(name);
  // Truncate generously above the limit so an oversized value still fails validation, but a huge
  // payload is never processed or echoed back in full.
  return typeof v === "string" ? clean(v, keepNewlines).slice(0, max + 1) : "";
}

export async function bookTrial(_prev: BookTrialState, formData: FormData): Promise<BookTrialState> {
  // Honeypot: real people never see or fill this field. Pretend it worked and store nothing.
  if (field(formData, "website", 200)) redirect("/book/thanks");

  const raw = {
    curriculum: field(formData, "curriculum", LIMITS.slug),
    subject: field(formData, "subject", LIMITS.slug),
    level: field(formData, "level", LIMITS.level),
    challenge: field(formData, "challenge", LIMITS.challenge, true),
    mode: field(formData, "mode", 10),
    city: field(formData, "city", LIMITS.city),
    preferredTimes: field(formData, "preferredTimes", LIMITS.preferredTimes),
    parentName: field(formData, "parentName", LIMITS.parentName),
    whatsapp: field(formData, "whatsapp", LIMITS.whatsapp),
    email: field(formData, "email", LIMITS.email),
    consent: field(formData, "consent", 10),
    tutor: field(formData, "tutor", LIMITS.slug),
    plan: field(formData, "plan", LIMITS.slug),
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: BookTrialState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as BookTrialField | undefined;
      if (key && key in MESSAGES && !errors[key]) errors[key] = issue.message;
    }
    return { status: "invalid", errors, values: raw };
  }

  const h = await headers();
  if (rateLimited(clientIp(h))) {
    return {
      status: "error",
      message: "We've had several requests from this connection in the last few minutes. Please WhatsApp us and we'll help straight away.",
      values: raw,
    };
  }

  const d = parsed.data;
  const lead: Lead = {
    curriculum: d.curriculum,
    subject: d.subject,
    level: d.level,
    challenge: d.challenge || null,
    mode: d.mode,
    city: d.mode === "home" ? d.city : null,
    preferredTimes: d.preferredTimes || null,
    parentName: d.parentName,
    whatsapp: normaliseWhatsApp(d.whatsapp)!,
    email: d.email ? d.email.toLowerCase() : null,
    consent: true,
    sourcePath: sourcePathFrom(h),
    plan: plans.some((p) => p.slug === d.plan) ? d.plan : null,
    tutorSlug: tutors.some((t) => t.slug === d.tutor) ? d.tutor : null,
  };

  let ref: string;
  try {
    ({ ref } = await saveLead(lead));
  } catch (error) {
    if (!(error instanceof LeadStorageError)) console.error("[book-trial] Unexpected error while saving lead");
    return {
      status: "error",
      message: "We couldn't save your request. Please WhatsApp us and we'll book the trial with you there.",
      values: raw,
    };
  }

  // Non-personal summary for the thanks page's prefilled WhatsApp message. Expires in an hour.
  (await cookies()).set(LEAD_SUMMARY_COOKIE, encodeLeadSummary(lead, ref), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/book/thanks",
    maxAge: 60 * 60,
  });

  redirect(`/book/thanks?ref=${encodeURIComponent(ref)}`);
}
