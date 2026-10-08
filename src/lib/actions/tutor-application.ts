"use server";

import "server-only";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { curricula } from "@/data/content/curricula";
import { site } from "@/data/content/site";

/**
 * Tutor application (public form at /join-as-tutor).
 *
 * Storage: if SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set, the application is inserted into
 * `tutor_applications`. Suggested table (RLS on, no public policies; only the service role writes):
 *
 *   create table public.tutor_applications (
 *     id uuid primary key default gen_random_uuid(),
 *     created_at timestamptz not null default now(),
 *     full_name text not null, email text not null, whatsapp text not null,
 *     city text not null, country text not null, qualification text not null,
 *     experience text not null, curricula text[] not null, subjects text not null,
 *     modes text[] not null, about text not null, consent boolean not null
 *   );
 *   alter table public.tutor_applications enable row level security;
 *
 * Without that config: in development we log a redacted summary and report success; in production
 * we return an error asking the applicant to WhatsApp us instead, so nothing is silently lost.
 *
 * TODO: add rate limiting (per IP) before launch, e.g. in proxy.ts or a KV-backed limiter.
 */

export type TutorApplicationField =
  | "fullName"
  | "email"
  | "whatsapp"
  | "city"
  | "country"
  | "qualification"
  | "experience"
  | "curricula"
  | "subjects"
  | "modes"
  | "about"
  | "consent";

export type TutorApplicationState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<TutorApplicationField, string[]>>;
  /** Echoed back on validation errors so the form keeps what was typed. */
  values?: Partial<Record<TutorApplicationField, string | string[]>>;
};

const curriculumSlugs = curricula.map((c) => c.slug) as [string, ...string[]];

const experienceOptions = ["0-1", "1-3", "3-5", "5-10", "10+"] as const;

const text = (label: string, min: number, max: number) =>
  z
    .string()
    .trim()
    .min(min, { error: min <= 1 ? `Enter your ${label}.` : `Enter at least ${min} characters for your ${label}.` })
    .max(max, { error: `Keep your ${label} under ${max} characters.` });

const schema = z.object({
  fullName: text("full name", 2, 100),
  email: z
    .string()
    .trim()
    .max(254, { error: "Enter a shorter email address." })
    .pipe(z.email({ error: "Enter an email address like name@example.com." })),
  whatsapp: z
    .string()
    .trim()
    .max(25, { error: "Enter a WhatsApp number with country code, e.g. +92 300 1234567." })
    .regex(/^\+?[0-9][0-9 ()-]{6,23}$/, { error: "Enter a WhatsApp number with country code, e.g. +92 300 1234567." })
    .refine((v) => {
      const digits = v.replace(/\D/g, "").length;
      return digits >= 8 && digits <= 15;
    }, { error: "Enter a WhatsApp number with country code, e.g. +92 300 1234567." }),
  city: text("city", 2, 80),
  country: text("country", 2, 80),
  qualification: text("highest qualification", 2, 150),
  experience: z.enum(experienceOptions, { error: "Choose how long you've been teaching." }),
  curricula: z
    .array(z.enum(curriculumSlugs))
    .min(1, { error: "Choose at least one curriculum you've taught." })
    .max(curriculumSlugs.length),
  subjects: text("subjects", 2, 300),
  modes: z
    .array(z.enum(["online", "home"]))
    .min(1, { error: "Choose online, home or both." })
    .max(2),
  about: text("answer", 50, 2000),
  consent: z.literal("yes", { error: "Please confirm so we can contact you about your application." }),
});

type Application = z.infer<typeof schema>;

/** Read one field as a string. Non-string values (e.g. files) are ignored. */
function str(fd: FormData, key: string) {
  const v = fd.get(key);
  return typeof v === "string" ? v.slice(0, 5000) : "";
}

/** Read a multi-value field, de-duplicated, strings only, capped in count and length. */
function list(fd: FormData, key: string) {
  const vals = fd
    .getAll(key)
    .filter((v): v is string => typeof v === "string")
    .map((v) => v.slice(0, 50));
  return Array.from(new Set(vals)).slice(0, 20);
}

const whatsappFallback = `Please send your details to us on WhatsApp at ${site.phone.display} instead.`;

export async function submitTutorApplication(
  _prev: TutorApplicationState,
  formData: FormData,
): Promise<TutorApplicationState> {
  // Honeypot: real people never see or fill this field. Pretend it worked and store nothing.
  if (str(formData, "website").trim() !== "") {
    return { status: "success" };
  }

  const raw = {
    fullName: str(formData, "fullName"),
    email: str(formData, "email"),
    whatsapp: str(formData, "whatsapp"),
    city: str(formData, "city"),
    country: str(formData, "country"),
    qualification: str(formData, "qualification"),
    experience: str(formData, "experience"),
    curricula: list(formData, "curricula"),
    subjects: str(formData, "subjects"),
    modes: list(formData, "modes"),
    about: str(formData, "about"),
    consent: str(formData, "consent"),
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Some details need fixing. Check the highlighted fields.",
      errors: z.flattenError(parsed.error).fieldErrors as TutorApplicationState["errors"],
      values: { ...raw, consent: undefined },
    };
  }

  const result = await saveApplication(parsed.data);
  if (!result.ok) {
    return { status: "error", message: result.message, values: { ...raw, consent: undefined } };
  }

  return {
    status: "success",
    message: "Thank you. We've received your application and will contact you on WhatsApp or email.",
  };
}

async function saveApplication(a: Application): Promise<{ ok: true } | { ok: false; message: string }> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (url && key) {
    try {
      const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
      const { error } = await supabase.from("tutor_applications").insert({
        full_name: a.fullName,
        email: a.email,
        whatsapp: a.whatsapp,
        city: a.city,
        country: a.country,
        qualification: a.qualification,
        experience: a.experience,
        curricula: a.curricula,
        subjects: a.subjects,
        modes: a.modes,
        about: a.about,
        consent: true,
      });
      if (error) {
        console.error("[tutor-application] insert failed", { code: error.code });
        return { ok: false, message: `We couldn't save your application just now. ${whatsappFallback}` };
      }
      return { ok: true };
    } catch {
      console.error("[tutor-application] storage unavailable");
      return { ok: false, message: `We couldn't save your application just now. ${whatsappFallback}` };
    }
  }

  if (process.env.NODE_ENV !== "production") {
    // Redacted: no name, full email, phone or free text in logs.
    console.info("[tutor-application] storage not configured; dev summary", {
      emailDomain: a.email.split("@")[1],
      country: a.country,
      experience: a.experience,
      curricula: a.curricula,
      modes: a.modes,
      aboutLength: a.about.length,
    });
    return { ok: true };
  }

  console.error("[tutor-application] storage not configured in production");
  return { ok: false, message: `Online applications aren't available right now. ${whatsappFallback}` };
}
