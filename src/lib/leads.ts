import "server-only";

import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { getCurriculum } from "@/data/content/curricula";
import { getSubject } from "@/data/content/subjects";
import { getTutor } from "@/data/content/tutors";
import { plans } from "@/data/content/pricing";
import { whatsappLink } from "@/data/content/site";

/**
 * Lead storage adapter (server only).
 *
 * - With SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY set, leads are inserted into the `leads` table
 *   (supabase/migrations/0001_leads.sql). The service role key bypasses RLS, so it must never reach
 *   the browser: this module imports "server-only" and the key has no NEXT_PUBLIC_ prefix.
 * - Without them in development, a redacted summary (no name, phone or email) is logged and a
 *   generated id is returned, so the form can be tested end to end.
 * - Without them in production, a LeadStorageError is thrown so the caller can point the family
 *   to WhatsApp instead of silently losing the request.
 */

export type LessonMode = "online" | "home";

/** A validated trial request, ready to store. */
export type Lead = {
  curriculum: string; // curriculum slug
  subject: string; // subject slug
  level: string;
  challenge: string | null;
  mode: LessonMode;
  city: string | null;
  preferredTimes: string | null;
  parentName: string;
  whatsapp: string; // normalised, e.g. +923001234567
  email: string | null;
  consent: boolean;
  sourcePath: string | null;
  plan: string | null; // plan slug
  tutorSlug: string | null;
};

export type SavedLead = { id: string; ref: string };

export class LeadStorageError extends Error {
  readonly code: "not_configured" | "insert_failed";
  constructor(code: LeadStorageError["code"], message: string) {
    super(message);
    this.name = "LeadStorageError";
    this.code = code;
  }
}

/** Short, human-friendly reference derived from the row id (first 8 hex characters). */
export function leadRef(id: string) {
  return `TG-${id.replace(/-/g, "").slice(0, 8).toUpperCase()}`;
}

export const leadRefPattern = /^TG-[0-9A-F]{8}$/;

function supabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? { url, key } : null;
}

export async function saveLead(lead: Lead): Promise<SavedLead> {
  const config = supabaseConfig();

  if (!config) {
    if (process.env.NODE_ENV === "production") {
      throw new LeadStorageError("not_configured", "Lead storage is not configured (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).");
    }
    const id = crypto.randomUUID();
    // Redacted: never log name, phone, email or free-text answers.
    console.info("[leads] Supabase not configured; trial request not stored (development only).", {
      id,
      curriculum: lead.curriculum,
      subject: lead.subject,
      mode: lead.mode,
      city: lead.city,
      plan: lead.plan,
      tutorSlug: lead.tutorSlug,
      hasEmail: Boolean(lead.email),
    });
    return { id, ref: leadRef(id) };
  }

  const supabase = createClient(config.url, config.key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });

  const { data, error } = await supabase
    .from("leads")
    .insert({
      curriculum: lead.curriculum,
      subject: lead.subject,
      level: lead.level,
      challenge: lead.challenge,
      mode: lead.mode,
      city: lead.city,
      preferred_times: lead.preferredTimes,
      parent_name: lead.parentName,
      whatsapp: lead.whatsapp,
      email: lead.email,
      consent: lead.consent,
      source_path: lead.sourcePath,
      plan: lead.plan,
      tutor_slug: lead.tutorSlug,
    })
    .select("id")
    .single<{ id: string }>();

  if (error || !data) {
    // Log the database error code/message only; it never contains the submitted values.
    console.error("[leads] Insert failed", error?.code, error?.message);
    throw new LeadStorageError("insert_failed", "Could not save the trial request.");
  }

  return { id: data.id, ref: leadRef(data.id) };
}

/* ------------------------------------------------------------------------------------------------
 * WhatsApp summary
 * ---------------------------------------------------------------------------------------------- */

/** The non-personal parts of a lead: enough to summarise the request, nothing that identifies the family. */
export type LeadSummary = Pick<Lead, "curriculum" | "subject" | "level" | "mode" | "city" | "preferredTimes" | "plan" | "tutorSlug"> & {
  ref?: string;
};

/**
 * A wa.me link to the business number with the request summarised, so the family can also send it
 * instantly. Deliberately leaves out name, phone, email and the free-text "challenge" answer: the
 * message is sent from the family's own WhatsApp, and the ref lets us find the full record.
 */
export function createLeadNotificationLink(lead: LeadSummary) {
  const curriculum = getCurriculum(lead.curriculum)?.short ?? lead.curriculum;
  const subject = getSubject(lead.subject)?.name ?? lead.subject;
  const tutor = lead.tutorSlug ? getTutor(lead.tutorSlug) : undefined;
  const plan = lead.plan ? plans.find((p) => p.slug === lead.plan) : undefined;

  const lines = [
    `Hi Tutoring Galaxy, I've just requested a free trial lesson on your website${lead.ref ? ` (ref ${lead.ref})` : ""}.`,
    `Student: ${curriculum} ${subject}, ${lead.level}`,
    `Lessons: ${lead.mode === "home" ? `at home${lead.city ? ` in ${lead.city}` : ""}` : "online"}`,
    lead.preferredTimes ? `Preferred times: ${lead.preferredTimes}` : null,
    tutor ? `Tutor I asked about: ${tutor.name}` : null,
    plan ? `Plan: ${plan.name}` : null,
  ].filter(Boolean);

  return whatsappLink(lines.join("\n"));
}

/* ------------------------------------------------------------------------------------------------
 * Short-lived summary cookie, read by /book/thanks to prefill the WhatsApp message.
 * Holds the LeadSummary only (no name, phone, email or challenge text).
 * ---------------------------------------------------------------------------------------------- */

export const LEAD_SUMMARY_COOKIE = "tg_trial";

const leadSummarySchema = z.object({
  ref: z.string().regex(leadRefPattern),
  curriculum: z.string().max(40),
  subject: z.string().max(40),
  level: z.string().max(60),
  mode: z.enum(["online", "home"]),
  city: z.string().max(40).nullable(),
  preferredTimes: z.string().max(200).nullable(),
  plan: z.string().max(40).nullable(),
  tutorSlug: z.string().max(80).nullable(),
});

export function encodeLeadSummary(lead: Lead, ref: string) {
  const summary: LeadSummary & { ref: string } = {
    ref,
    curriculum: lead.curriculum,
    subject: lead.subject,
    level: lead.level,
    mode: lead.mode,
    city: lead.city,
    preferredTimes: lead.preferredTimes,
    plan: lead.plan,
    tutorSlug: lead.tutorSlug,
  };
  return JSON.stringify(summary);
}

export function decodeLeadSummary(raw: string | undefined): (LeadSummary & { ref: string }) | null {
  if (!raw) return null;
  try {
    const parsed = leadSummarySchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}
