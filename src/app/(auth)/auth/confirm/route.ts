import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { safeNextPath } from "@/lib/auth/roles";

const OTP_TYPES: EmailOtpType[] = ["signup", "invite", "magiclink", "recovery", "email_change", "email"];

/**
 * Email link landing route (magic link, invite, password recovery).
 * Supabase email templates should link to:
 *   {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=<type>&next=<path>
 * PKCE `?code=` links are also accepted. `next` is restricted to in-app paths (no open redirect).
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const code = searchParams.get("code");
  // Invites and recoveries must set a password before using the app.
  const defaultNext = type === "invite" || type === "recovery" ? "/reset-password" : "/app";
  const next = safeNextPath(searchParams.get("next"), defaultNext);

  const fail = () => {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = "?error=link";
    return NextResponse.redirect(url, { headers: { "Cache-Control": "private, no-store" } });
  };

  const supabase = await createClient();
  if (!supabase) return fail();

  let ok = false;
  if (tokenHash && type && (OTP_TYPES as string[]).includes(type) && tokenHash.length <= 512) {
    const { error } = await supabase.auth.verifyOtp({ type: type as EmailOtpType, token_hash: tokenHash });
    ok = !error;
  } else if (code && code.length <= 512) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    ok = !error;
  }
  if (!ok) return fail();

  const url = request.nextUrl.clone();
  const [pathname, query = ""] = (type === "invite" || type === "recovery" ? "/reset-password" : next).split("?");
  url.pathname = pathname;
  url.search = query ? `?${query}` : "";
  return NextResponse.redirect(url, { headers: { "Cache-Control": "private, no-store" } });
}
