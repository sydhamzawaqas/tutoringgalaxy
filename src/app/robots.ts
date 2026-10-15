import type { MetadataRoute } from "next";
import { site } from "@/data/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/app", "/admin", "/login", "/signup", "/reset-password", "/book/thanks", "/api"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
