"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/primitives";
import { tint } from "@/components/home/parts";
import { cn } from "@/lib/utils";
import { megaNav, type NavColumn, type NavGroup, type NavLink } from "./nav";
import { navIcons } from "./nav-icons";

/**
 * Desktop mega-menu (lg and up). Disclosure pattern: each top-level item is a button with
 * aria-expanded controlling a panel. Opens on click or hover (with a short delay), closes on
 * Escape, outside click, focus leaving the menu, or following a link.
 */
export function MegaMenu() {
  const [openId, setOpenId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const timer = useRef<number | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const clearTimer = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = null;
  };
  const close = useCallback(() => {
    clearTimer();
    setOpenId(null);
  }, []);
  const openSoon = (id: string) => {
    clearTimer();
    timer.current = window.setTimeout(() => setOpenId(id), openId ? 0 : 120);
  };
  const closeSoon = () => {
    clearTimer();
    timer.current = window.setTimeout(() => setOpenId(null), 200);
  };

  useEffect(() => {
    if (!openId) return;
    function onPointer(e: PointerEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) close();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        const id = openId;
        close();
        if (id) triggerRefs.current[id]?.focus();
      }
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [openId, close]);

  useEffect(() => clearTimer, []);

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      className="hidden lg:block"
      onMouseLeave={closeSoon}
      onMouseEnter={clearTimer}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) close();
      }}
    >
      <ul className="flex items-center">
        {megaNav.map((group) => {
          const open = openId === group.id;
          return (
            <li key={group.id}>
              <button
                ref={(el) => {
                  triggerRefs.current[group.id] = el;
                }}
                type="button"
                aria-expanded={open}
                aria-controls={`mega-${group.id}`}
                onClick={() => {
                  clearTimer();
                  setOpenId(open ? null : group.id);
                }}
                onMouseEnter={() => openSoon(group.id)}
                className={cn(
                  "inline-flex items-center gap-1 rounded-control px-2.5 py-2 text-button font-semibold transition-colors",
                  open ? "bg-surface text-foreground" : "text-muted-foreground hover:bg-surface hover:text-foreground",
                )}
              >
                {group.label}
                <ChevronDown aria-hidden className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")} strokeWidth={2} />
              </button>
              <div
                id={`mega-${group.id}`}
                hidden={!open}
                className="absolute inset-x-0 top-full border-t border-rule bg-background shadow-lift"
              >
                <MegaPanel group={group} onNavigate={close} />
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function MegaPanel({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  return (
    <Container className="grid gap-8 py-8 lg:grid-cols-12">
      <div className={cn("grid gap-8", group.feature ? "lg:col-span-8" : "lg:col-span-12", group.columns.length > 1 && "sm:grid-cols-2")}>
        {group.columns.map((col) => (
          <MegaColumn key={col.title} col={col} onNavigate={onNavigate} />
        ))}
      </div>
      {group.feature ? (
        <div className="starfield relative overflow-hidden rounded-panel p-6 text-on-dark lg:col-span-4">
          <p className="inline-flex items-center gap-2 rounded-pill bg-on-dark/10 px-3 py-1 text-label font-semibold">
            <span aria-hidden className="size-1.5 rounded-pill bg-gold" />
            {group.feature.eyebrow}
          </p>
          <p className="mt-4 text-h3 font-bold">{group.feature.title}</p>
          <p className="mt-2 text-small text-on-dark-muted">{group.feature.body}</p>
          <Link
            href={group.feature.cta.href}
            onClick={onNavigate}
            data-track={`mega_${group.id}_feature`}
            className="mt-5 inline-flex h-11 items-center gap-2 rounded-control bg-gold px-4.5 text-button font-semibold text-navy-deep transition-colors hover:bg-gold/90"
          >
            {group.feature.cta.label}
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      ) : null}
    </Container>
  );
}

function MegaColumn({ col, onNavigate }: { col: NavColumn; onNavigate: () => void }) {
  const described = col.links.some((l) => l.description);
  return (
    <div>
      <p className="text-label font-semibold text-muted-foreground uppercase">{col.title}</p>
      {described ? (
        <ul className="mt-3 grid gap-1">
          {col.links.map((link, i) => (
            <li key={link.href}>
              <DescribedLink link={link} i={i} onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-3 grid grid-cols-2 gap-2 xl:grid-cols-3">
          {col.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onNavigate}
                className="flex items-center rounded-control border border-rule px-3 py-2.5 text-small font-semibold transition-colors hover:border-border hover:bg-surface"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {col.all ? (
        <Link
          href={col.all.href}
          onClick={onNavigate}
          className="mt-4 inline-flex items-center gap-1.5 text-small font-semibold text-navy-soft underline-offset-4 hover:underline"
        >
          {col.all.label}
          <ArrowRight aria-hidden className="size-3.5" />
        </Link>
      ) : null}
    </div>
  );
}

function DescribedLink({ link, i, onNavigate }: { link: NavLink; i: number; onNavigate: () => void }) {
  const Icon = navIcons[link.href];
  return (
    <Link href={link.href} onClick={onNavigate} className="group flex items-start gap-3 rounded-container p-2.5 transition-colors hover:bg-surface">
      {Icon ? (
        <span aria-hidden className={cn("grid size-10 shrink-0 place-items-center rounded-control", tint(i))}>
          <Icon className="size-4.5" strokeWidth={1.75} />
        </span>
      ) : null}
      <span className="min-w-0">
        <span className="block text-small font-semibold text-foreground">{link.label}</span>
        {link.description ? <span className="mt-0.5 block text-small text-muted-foreground">{link.description}</span> : null}
      </span>
    </Link>
  );
}
