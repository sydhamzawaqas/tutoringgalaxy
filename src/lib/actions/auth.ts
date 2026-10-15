"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { site } from "@/data/content/site";
import { createClient } from "@/lib/supabase/server";
import { getSession } from "@/lib/auth/dal";
import { getClientIp, rateLimit } from "@/lib/auth/rate-limit";
import { safeNextPath } from "@/lib/auth/roles";

/**
 * Auth Server Actions. Messages are deliberately generic so they don't reveal whether an
 * email has an account (no user enumeration). Sign-in is rate limited per IP and per
 * IP+email in memory (see rate-limit.ts for the production caveat); Supabase Auth adds its own limits.
 */

export type FormState = { status: "idle" | "error" | "success"; message?: string; fieldErrors?: Record<string, string> };

const NOT_CONFIGURED: FormState = { status: "error", message: "Sign-in isn't configured yet. Please try again later." };
const TOO_MANY: FormState = {
  status: "error",
  message: "Too many attempts. Please wait 15 minutes and try again, or WhatsApp us for help.",
};
const LINK_SENT: FormState = {
  status: "success",
  message: "If an account exists for that email, we've sent a link. It expires in an hour, so check your inbox (and spam) soon.",
};

const WINDOW = 15 * 60_000;

const emailSchema = z.string().trim().toLowerCase().pipe(z.email().max(254));

function callbackUrl(next: string) {
  const url = new URL("/auth/confirm", site.url);
  url.searchParams.set("next", next);
  return url.toString();
}

export async function signInWithPassword(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = emailSchema.safeParse(formData.get("email"));
  const password = z.string().min(1).max(256).safeParse(formData.get("password"));
  if (!email.success || !password.success) {
    return {
      status: "error",
      message: "Enter your email and password.",
      fieldErrors: {
        ...(email.success ? {} : { email: "Enter the email address you were invited with, e.g. name@example.com" }),
        ...(password.success ? {} : { password: "Enter your password." }),
      },
    };
  }

  const ip = await getClientIp();
  if (!rateLimit(`login:ip:${ip}`, 20, WINDOW).ok || !rateLimit(`login:ip-email:${ip}:${email.data}`, 5, WINDOW).ok) {
    console.warn("[auth] login rate limited", { ip });
    return TOO_MANY;
  }

  const supabase = await createClient();
  if (!supabase) return NOT_CONFIGURED;

  const { error } = await supabase.auth.signInWithPassword({ email: email.data, password: password.data });
  if (error) {
    console.warn("[auth] login failed", { ip, code: error.code ?? "unknown" });
    return {
      status: "error",
      message: "That email and password don't match an active account. Check them and try again, or use a sign-in link.",
    };
  }

  redirect(safeNextPath(formData.get("next")));
}

export async function sendMagicLink(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = emailSchema.safeParse(formData.get("email"));
  if (!email.success) {
    return { status: "error", fieldErrors: { email: "Enter your email address, e.g. name@example.com" } };
  }

  const ip = await getClientIp();
  if (!rateLimit(`email-link:ip:${ip}`, 5, WINDOW).ok || !rateLimit(`email-link:email:${email.data}`, 3, WINDOW).ok) {
    return TOO_MANY;
  }

  const supabase = await createClient();
  if (!supabase) return NOT_CONFIGURED;

  const { error } = await supabase.auth.signInWithOtp({
    email: email.data,
    options: {
      // Invite-only: never create an account from the sign-in form.
      shouldCreateUser: false,
      emailRedirectTo: callbackUrl(safeNextPath(formData.get("next"))),
    },
  });
  if (error) console.warn("[auth] magic link not sent", { ip, code: error.code ?? "unknown" });
  // Same answer either way, so the form can't be used to discover accounts.
  return LINK_SENT;
}

export async function requestPasswordReset(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = emailSchema.safeParse(formData.get("email"));
  if (!email.success) {
    return { status: "error", fieldErrors: { email: "Enter your email address, e.g. name@example.com" } };
  }

  const ip = await getClientIp();
  if (!rateLimit(`email-link:ip:${ip}`, 5, WINDOW).ok || !rateLimit(`email-link:email:${email.data}`, 3, WINDOW).ok) {
    return TOO_MANY;
  }

  const supabase = await createClient();
  if (!supabase) return NOT_CONFIGURED;

  const { error } = await supabase.auth.resetPasswordForEmail(email.data, {
    redirectTo: callbackUrl("/reset-password"),
  });
  if (error) console.warn("[auth] reset link not sent", { ip, code: error.code ?? "unknown" });
  return LINK_SENT;
}

// A short list of the most common passwords (ASVS 6.2.4 asks for a much longer list; enable
// Supabase's leaked-password protection for that).
const COMMON_PASSWORDS = new Set([
  "password1234",
  "123456789012",
  "qwertyuiop12",
  "iloveyou1234",
  "passwordpassword",
  "tutoringgalaxy",
  "tutoringgalaxy1",
  "111111111111",
  "abc123456789",
  "pakistan1234",
]);

const newPasswordSchema = z
  .string()
  .min(12, "Use at least 12 characters. A short sentence works well.")
  .max(128, "Use 128 characters or fewer.")
  .refine((p) => !COMMON_PASSWORDS.has(p.toLowerCase()), "That password is too common. Choose something more personal.");

export async function updatePassword(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await getSession();
  if (!user) {
    return { status: "error", message: "Your reset link has expired. Request a new one below." };
  }

  const ip = await getClientIp();
  if (!rateLimit(`pw-update:user:${user.id}`, 5, WINDOW).ok) return TOO_MANY;

  const password = newPasswordSchema.safeParse(formData.get("password"));
  if (!password.success) {
    return { status: "error", fieldErrors: { password: password.error.issues[0]?.message ?? "Choose a stronger password." } };
  }
  if (formData.get("confirm") !== password.data) {
    return { status: "error", fieldErrors: { confirm: "The two passwords don't match. Type the same password twice." } };
  }

  const supabase = await createClient();
  if (!supabase) return NOT_CONFIGURED;

  const { error } = await supabase.auth.updateUser({ password: password.data });
  if (error) {
    console.warn("[auth] password update failed", { ip, code: error.code ?? "unknown" });
    return { status: "error", message: "We couldn't update your password. Choose a different one and try again." };
  }
  console.info("[auth] password updated", { userId: user.id });
  // Sign out other sessions after a password change.
  await supabase.auth.signOut({ scope: "others" });
  redirect("/app");
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  if (supabase) await supabase.auth.signOut({ scope: "local" });
  redirect("/login");
}

const profileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Enter your name.")
    .max(120, "Use 120 characters or fewer.")
    .refine((s) => !/[\u0000-\u001f\u007f<>]/.test(s), "Use letters, spaces and simple punctuation only."),
});

export async function updateProfile(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await getSession();
  if (!user) return { status: "error", message: "Your session has ended. Please sign in again." };

  const parsed = profileSchema.safeParse({ fullName: formData.get("fullName") });
  if (!parsed.success) {
    return { status: "error", fieldErrors: { fullName: parsed.error.issues[0]?.message ?? "Check your name." } };
  }

  const supabase = await createClient();
  if (!supabase) return NOT_CONFIGURED;

  // RLS + column grants only allow a user to change their own full_name.
  const { error } = await supabase.from("profiles").update({ full_name: parsed.data.fullName }).eq("id", user.id);
  if (error) return { status: "error", message: "We couldn't save your name. Please try again." };
  return { status: "success", message: "Saved." };
}
