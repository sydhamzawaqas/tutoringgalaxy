"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  Inbox,
  LayoutDashboard,
  PenLine,
  Settings,
  ShieldCheck,
  TrendingUp,
  UserCog,
  Users,
  ArrowLeft,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ShellNavIcon =
  | "dashboard"
  | "practice"
  | "progress"
  | "children"
  | "students"
  | "settings"
  | "admin"
  | "leads"
  | "tutors"
  | "users"
  | "back";

const ICONS: Record<ShellNavIcon, LucideIcon> = {
  dashboard: LayoutDashboard,
  practice: PenLine,
  progress: TrendingUp,
  children: Users,
  students: GraduationCap,
  settings: Settings,
  admin: ShieldCheck,
  leads: Inbox,
  tutors: GraduationCap,
  users: UserCog,
  back: ArrowLeft,
};

export type ShellNavItem = { href: string; label: string; icon: ShellNavIcon; exact?: boolean };

/** Sidebar links. Horizontal scroll on small screens, vertical list from lg. */
export function AppNav({ items, label }: { items: ShellNavItem[]; label: string }) {
  const pathname = usePathname();
  return (
    <nav aria-label={label}>
      <ul className="flex gap-1 overflow-x-auto px-2 pb-2 lg:flex-col lg:overflow-visible lg:px-3 lg:pb-0">
        {items.map((item) => {
          const Icon = ICONS[item.icon];
          const active = item.exact || item.href === "/app" || item.href === "/admin"
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-10 items-center gap-3 rounded-control px-3 text-button font-semibold text-muted-foreground transition-colors duration-150 hover:bg-background hover:text-foreground",
                  active && "bg-background text-foreground",
                )}
              >
                <Icon aria-hidden className="size-5" strokeWidth={1.5} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
