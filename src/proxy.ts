import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseConfig } from "@/lib/supabase/config";

/**
 * Proxy (formerly Middleware). OPTIMISTIC checks only:
 *   1. Refresh the Supabase session cookies (per @supabase/ssr) so Server Components see a valid token.
 *   2. Send signed-out visitors of /app and /admin to /login?next=...
 * The real authorization lives in the Data Access Layer (src/lib/auth/dal.ts), which every page,
 * Server Action and Route Handler calls close to the data. Never rely on this file for security.
 *
 * Runs only on the logged-in and auth routes (see `config.matcher`), so marketing pages stay static.
 */
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isProtected = pathname === "/app" || pathname.startsWith("/app/") || pathname === "/admin" || pathname.startsWith("/admin/");

  const config = getSupabaseConfig();
  if (!config) {
    // Sign-in isn't configured: let the pages render their "isn't configured yet" panel.
    return withNoStore(NextResponse.next({ request }), isProtected);
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        Object.entries(headers ?? {}).forEach(([key, value]) => response.headers.set(key, value));
      },
    },
  });

  // Do not put code between client creation and this call: it refreshes the session.
  // getClaims() verifies the JWT; it is still only an optimistic check here.
  let signedIn = false;
  try {
    const { data } = await supabase.auth.getClaims();
    signedIn = Boolean(data?.claims?.sub);
  } catch {
    signedIn = false;
  }

  if (isProtected && !signedIn) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    url.searchParams.set("next", `${pathname}${search}`.slice(0, 512));
    return copyCookies(response, NextResponse.redirect(url));
  }

  if (signedIn && (pathname === "/login" || pathname === "/signup")) {
    const url = request.nextUrl.clone();
    url.pathname = "/app";
    url.search = "";
    return copyCookies(response, NextResponse.redirect(url));
  }

  return withNoStore(response, isProtected);
}

/** Keep refreshed auth cookies when we answer with a redirect instead of `response`. */
function copyCookies(from: NextResponse, to: NextResponse) {
  from.cookies.getAll().forEach((cookie) => to.cookies.set(cookie));
  to.headers.set("Cache-Control", "private, no-store");
  return to;
}

/** Per-user pages must never be stored by shared caches or CDNs. */
function withNoStore(response: NextResponse, isProtected: boolean) {
  if (isProtected) response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = {
  matcher: ["/app/:path*", "/admin/:path*", "/login", "/signup", "/reset-password", "/auth/:path*"],
};
