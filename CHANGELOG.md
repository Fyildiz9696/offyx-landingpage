# Changelog

Alle wichtigen Änderungen werden in dieser Datei dokumentiert.

Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/).

---

## [Unreleased]

### Geändert

- **Neues Logo (v2.0)** — reiner Wordmark `offyx.` : kursives „offyx" in
  Ink `#352E28` mit Copper-Punkt `#B5632A`
  - `Header.astro` / `Footer.astro`: Siegel-Icon + Text-Wordmark ersetzt durch
    das freigegebene Logo (`/images/logo.png`)
  - Favicon-Set neu: `favicon.ico` (16/32/48), `favicon.png` (32),
    `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png`
  - `favicon.svg` entfernt — das Logo liegt als PNG vor
  - OG-Bild von SVG auf PNG umgestellt (`/images/og-default.png`);
    SVG wird von Social-Plattformen nicht zuverlässig unterstützt
- Marketing-Assets neu strukturiert:
  - `logo/` — 17 produktive PNG-Dateien
  - `tools/build-logo-assets.py` — reproduzierbare Pipeline, erzeugt alle
    Assets aus der AI-Vorlage inkl. Website-Sync
  - `archive/` — verworfene Vektor-Fassung, frühe Konzepte, altes Siegel
- `pnpm-workspace.yaml`: `allowBuilds`-Platzhalter durch gültige Werte ersetzt
  (esbuild, sharp) — Build war zuvor blockiert

---

## [1.0.0] — 2024-01

### Hinzugefügt

- Initiales Template-Release
- Astro-Basiskonfiguration mit statischem Build
- Globales Design-Token-System via `theme.ts` und CSS Custom Properties
- Stammdaten-Konfiguration via `site.ts`
- Layouts: `BaseLayout.astro`, `PageLayout.astro`
- Komponenten: `Header`, `Footer`, `Hero`, `ServicesGrid`, `TrustIndicators`, `AboutTeaser`, `Process`, `Testimonials`, `FAQ`, `CTA`, `ContactSection`
- Seiten: Startseite, Leistungen, Über uns, Kontakt, Impressum, Datenschutz, 404
- Sitemap via `@astrojs/sitemap`
- `robots.txt` als Astro-Endpoint
- Demo-Inhalt „Muster Elektrotechnik"
- Platzhalter-Rechtsseiten (Impressum, Datenschutz) mit TODO-Markierungen
- `README.md` mit Quick Start und Deployment-Anleitungen
- `AGENTS.md` für Coding-Agent-Workflows
- `.editorconfig` für konsistente Code-Formatierung
- `.gitignore` für Astro-Projekte
- `LICENSE` (MIT)
