"use client";

import { useSyncExternalStore } from "react";
import { attributionFieldValue } from "@/lib/attribution";

const noop = () => () => {};
let cached: string | null = null;
const snapshot = () => (cached ??= attributionFieldValue());

/**
 * Hidden form field carrying first-touch attribution (UTM, click IDs, referrer host, landing page)
 * as JSON. Empty on the server; filled after hydration. Validated and capped by the server action.
 */
export function AttributionField({ name = "attribution" }: { name?: string }) {
  const value = useSyncExternalStore(noop, snapshot, () => "");
  return <input type="hidden" name={name} value={value} />;
}
