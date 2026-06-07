// astro.config.mjs — Astro build configuration
// Docs: https://docs.astro.build/en/reference/configuration-reference/

import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// Use base path only for GitHub Pages production build
const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  site: "https://fyildiz9696.github.io",
  base: isProd ? "/offyx-landingpage/" : "/",

  // Static output — no server-side rendering
  output: "static",

  integrations: [
    sitemap(),
    icon(),
  ],
});
