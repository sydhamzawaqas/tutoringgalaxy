/**
 * Optional sub-path the site is served under (e.g. "/tutoringgalaxy" for the GitHub Pages preview).
 * Empty in production. next/link and next/navigation add it automatically; use withBase() only for
 * plain <img src>, <form action> and similar raw URLs.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const withBase = (path: string) => `${basePath}${path}`;
