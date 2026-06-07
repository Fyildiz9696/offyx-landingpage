// astro.config.mjs — Astro build configuration
// Docs: https://docs.astro.build/en/reference/configuration-reference/

import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

export default defineConfig({
  // Set to your production domain before going live
  site: "https://example.com",

  // Static output — no server-side rendering
  output: "static",

  integrations: [
    sitemap(),
    icon(),
  ],
});
