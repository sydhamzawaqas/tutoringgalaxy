import { site } from "@/data/content/site";
import { cn } from "@/lib/utils";

/** Simple monochrome brand glyphs (Lucide no longer ships brand icons). */
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5Z" fill="currentColor" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z" fill="currentColor" />
    </svg>
  );
}

export const socials = [
  { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.social.x, label: "X", Icon: XIcon },
] as const;

export function SocialLinks({ className, itemClassName, iconClassName = "size-3.5" }: { className?: string; itemClassName?: string; iconClassName?: string }) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {socials.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${site.name} on ${label}`}
            className={cn("grid size-8 place-items-center rounded-pill transition-colors", itemClassName)}
          >
            <Icon className={iconClassName} />
          </a>
        </li>
      ))}
    </ul>
  );
}
