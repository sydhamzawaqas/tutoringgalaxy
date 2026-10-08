import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge our custom type-scale tokens (globals.css). Without this it treats
// `text-button` as a colour and drops real colour classes like `text-primary-foreground`.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["micro", "label", "small", "button", "body", "note", "lead", "h3", "h2-sm", "h2", "h1-sm", "h1", "display"] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
