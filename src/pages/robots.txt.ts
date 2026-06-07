// robots.txt.ts — Generates /robots.txt at build time
// Astro API endpoint: https://docs.astro.build/en/guides/endpoints/
import type { APIRoute } from "astro";
import site from "../data/site";

export const GET: APIRoute = () => {
  const content = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /impressum",
    "Disallow: /datenschutz",
    "",
    `Sitemap: ${site.url}/sitemap-index.xml`,
  ].join("\n");

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
