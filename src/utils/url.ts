/**
 * url.ts — Basis-Pfad-Helfer
 *
 * Die Seite wird auf GitHub Pages unter einem Unterpfad ausgeliefert
 * (`/offyx-landingpage/`). Astro präfixiert den `base` nur für Assets,
 * die durch die Build-Pipeline laufen.
 *
 * NICHT präfixiert werden:
 *   - Dateien aus `public/` (Logo, Favicons, Bilder, Sitemap)
 *   - interne `<a href>`-Links
 *
 * Genau dafür sind die beiden Helfer da.
 *
 *   base   → "/" im Dev, "/offyx-landingpage/" im Production-Build
 */

const BASE = import.meta.env.BASE_URL; // endet immer auf "/"

/** Asset aus `public/`:  asset("images/logo.png") → "/offyx-landingpage/images/logo.png" */
export function asset(path: string): string {
  return `${BASE.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

/** Interner Seiten-Link:  url("impressum") → "/offyx-landingpage/impressum"
 *  Ohne Argument: die Startseite ("/offyx-landingpage/") */
export function url(path = ""): string {
  return `${BASE}${path.replace(/^\/+/, "")}`;
}

export { BASE };
