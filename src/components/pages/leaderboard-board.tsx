"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { Crown, Medal, Sparkles, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LeaderboardEntry } from "@/data/content/leaderboard";
import type { StarTier } from "@/data/content/growing-stars";
import { TierBadge } from "./star-tier";
import { cn } from "@/lib/utils";

type CityGroup = { region: string; cities: string[] };

const TIERS: StarTier[] = ["Diamond", "Gold", "Silver", "Bronze"];

/**
 * Filterable leaderboard: city select, tier chips, podium for the top three and a ranked table.
 * Renders an honest empty state while `entries` is empty.
 */
export function LeaderboardBoard({
  entries,
  cityGroups,
  period,
  emptyTitle,
  emptyBody,
  assessmentHref,
}: {
  entries: LeaderboardEntry[];
  cityGroups: CityGroup[];
  period: string | null;
  emptyTitle: string;
  emptyBody: string;
  assessmentHref: string;
}) {
  const [city, setCity] = useState("all");
  const [tier, setTier] = useState<StarTier | "all">("all");
  const selectId = useId();

  const ranked = useMemo(
    () =>
      entries
        .filter((e) => (city === "all" || e.city === city) && (tier === "all" || e.tier === tier))
        .sort((a, b) => b.score - a.score),
    [entries, city, tier],
  );
  const podium = ranked.slice(0, 3);
  const hasAny = entries.length > 0;

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-panel border border-border bg-background p-4 shadow-card sm:p-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <label htmlFor={selectId} className="text-label font-semibold">City</label>
          <select
            id={selectId}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="select-chevron mt-1.5 block h-11 w-full appearance-none rounded-control border border-border bg-background pr-10 pl-3 text-body sm:w-72"
          >
            <option value="all">All cities</option>
            {cityGroups.map((g) => (
              <optgroup key={g.region} label={g.region}>
                {g.cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <fieldset className="min-w-0">
          <legend className="text-label font-semibold">Star tier</legend>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {(["all", ...TIERS] as const).map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={tier === t}
                onClick={() => setTier(t)}
                className={cn(
                  "h-9 rounded-pill border px-3.5 text-small font-semibold transition-colors",
                  tier === t ? "border-navy bg-navy text-on-dark" : "border-border bg-background text-muted-foreground hover:bg-surface hover:text-foreground",
                )}
              >
                {t === "all" ? "All tiers" : t}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <p className="mt-4 text-small text-muted-foreground" aria-live="polite">
        {hasAny
          ? `${ranked.length} ${ranked.length === 1 ? "student" : "students"}${city !== "all" ? ` in ${city}` : ""}${period ? ` · ${period}` : ""}`
          : "No rankings published yet."}
      </p>

      {!hasAny || ranked.length === 0 ? (
        <div className="mt-6 flex flex-col items-center rounded-panel border border-dashed border-border bg-surface px-6 py-14 text-center">
          <span className="grid size-16 place-items-center rounded-pill bg-gold-tint text-gold-deep">
            <Trophy aria-hidden className="size-8" />
          </span>
          <h3 className="mt-5 max-w-lg text-h3">{hasAny ? "No students match these filters yet" : emptyTitle}</h3>
          <p className="mt-3 max-w-lg text-muted-foreground">{hasAny ? "Try another city or tier." : emptyBody}</p>
          {!hasAny ? (
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link href={assessmentHref}><Sparkles aria-hidden />Take the AI assessment</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/growing-stars">About Growing Stars</Link>
              </Button>
            </div>
          ) : null}
        </div>
      ) : (
        <>
          {/* Podium */}
          <ol className="mt-6 grid gap-4 sm:grid-cols-3 sm:items-end">
            {podium.map((e, i) => (
              <li
                key={e.handle}
                className={cn(
                  "flex flex-col items-center rounded-panel p-6 text-center shadow-card",
                  i === 0 ? "starfield text-on-dark sm:order-2 sm:pb-10" : "bg-background",
                  i === 1 && "sm:order-1",
                  i === 2 && "sm:order-3",
                )}
              >
                <span className={cn("grid size-12 place-items-center rounded-pill", i === 0 ? "bg-gold text-navy-deep" : "bg-sky-tint text-navy-soft")}>
                  {i === 0 ? <Crown aria-hidden className="size-6" /> : <Medal aria-hidden className="size-6" />}
                </span>
                <p className={cn("mt-3 text-label font-semibold", i === 0 ? "text-gold" : "text-muted-foreground")}>#{i + 1}</p>
                <p className={cn("mt-1 text-lead font-bold", i === 0 && "text-on-dark")}>{e.firstName}</p>
                <p className={cn("text-label", i === 0 ? "text-on-dark-muted" : "text-muted-foreground")}>{e.handle} · {e.city}</p>
                <p className={cn("mt-3 text-h2-sm font-bold tabular-nums", i === 0 && "text-gold")}>{e.score}</p>
                <TierBadge tier={e.tier} className="mt-2" />
              </li>
            ))}
          </ol>

          {/* Table */}
          <div className="mt-6 overflow-x-auto rounded-panel border border-border bg-background shadow-card">
            <table className="w-full min-w-xl text-small">
              <caption className="sr-only">Growing Stars rankings</caption>
              <thead className="bg-surface text-left text-label text-muted-foreground">
                <tr>
                  <th scope="col" className="p-3 font-semibold">Rank</th>
                  <th scope="col" className="p-3 font-semibold">Star ID</th>
                  <th scope="col" className="p-3 font-semibold">First name</th>
                  <th scope="col" className="p-3 font-semibold">City</th>
                  <th scope="col" className="p-3 font-semibold">Tier</th>
                  <th scope="col" className="p-3 text-right font-semibold">GSS</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((e, i) => (
                  <tr key={e.handle} className="border-t border-rule">
                    <td className="p-3 font-bold tabular-nums">#{i + 1}</td>
                    <td className="p-3 text-muted-foreground tabular-nums">{e.handle}</td>
                    <td className="p-3 font-semibold">{e.firstName}</td>
                    <td className="p-3 text-muted-foreground">{e.city}</td>
                    <td className="p-3"><TierBadge tier={e.tier} /></td>
                    <td className="p-3 text-right font-bold tabular-nums">{e.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
