# AGENTS.md — Projektüberblick für Coding Agents

Dieses Dokument ist der schnelle Einstieg für KI-Assistenten und Entwickler,
die an diesem Repository arbeiten. Bitte zuerst lesen.

---

## Was ist dieses Projekt?

Ein statisches **OnePager-Template** für lokale Dienstleister (Handwerk, Praxen, Gewerbe).
Optimiert für den Freelancer-Workflow: Repository forken, `site.ts` anpassen, deployen.

- **Framework:** Astro (statischer Output, kein Server-Rendering)
- **Styling:** Globale CSS Custom Properties + Theme-Presets (kein Tailwind, kein CSS-in-JS)
- **Icons:** Lucide via `astro-icon` (SVG, tree-shaken, kein Runtime-JS)
- **Sprache:** TypeScript (strikt)
- **Deployment:** Cloudflare Pages / Firebase / GitHub Pages

---

## Die wichtigste Datei

| Datei | Was sie tut |
|---|---|
| `src/data/site.ts` | **ALLES:** Firma, Kontakt, Theme-Auswahl, Hero, Services, About, Process, Testimonials, FAQ, Sektions-Überschriften |

→ **Für ein neues Projekt: NUR `site.ts` ändern. Theme-Preset wählen (z.B. `theme: "warm-craft"`), Inhalte eintragen — fertig.**

Unterstützende Dateien:
| Datei | Was sie tut |
|---|---|
| `src/data/themes.ts` | 5 vorgefertigte Theme-Presets (Farben, Fonts, Spacing) |
| `src/data/theme.ts` | Resolver: merged Preset + optionale Overrides aus site.ts |

---

## Seitenstruktur (OnePager)

```
src/pages/
├── index.astro          ← OnePager (alle Sektionen)
├── impressum.astro      ← Pflichtseite
├── datenschutz.astro    ← Pflichtseite
├── 404.astro            ← Fehlerseite
└── robots.txt.ts        ← SEO
```

Sektionen auf dem OnePager (Reihenfolge):
Header → Hero → TrustBar → Services → About → Process → Testimonials → FAQ → Contact → Footer

---

## Dateien, die pro Kundenprojekt geändert werden

| Datei | Wann ändern |
|---|---|
| `src/data/site.ts` | Immer — enthält alle Kundendaten und Inhalte |
| `src/pages/impressum.astro` | Pflicht: echte Kundendaten eintragen (TODO-Felder) |
| `src/pages/datenschutz.astro` | Pflicht: auf genutzte Dienste anpassen (TODO-Felder) |
| `public/images/logo.svg` | Kundenlogo ersetzen |
| `public/favicon.svg` | Kundenfavicon ersetzen |
| `astro.config.mjs` | `site`-URL auf Produktionsdomäne setzen |

---

## Theme-Presets

In `site.ts` nur `theme: "preset-name"` setzen:

| Preset | Zielgruppe |
|---|---|
| `professional-blue` | Handwerk, Dienstleister, Beratung |
| `warm-craft` | Schreinerei, Bäckerei, traditionelles Handwerk |
| `fresh-green` | Gesundheit, Natur, Bio, Gartenbau |
| `elegant-dark` | Premium, Fotografie, Architektur |
| `minimal-mono` | Clean, modern, universell |

Individuelle Overrides via `themeOverrides` in `site.ts` möglich.

---

## Dateien, die NICHT geändert werden sollten

| Datei | Warum |
|---|---|
| `src/layouts/BaseLayout.astro` | Injektion der CSS Tokens; nur ändern bei echten Layout-Anforderungen |
| `src/layouts/PageLayout.astro` | Standardlayout; selten ändern nötig |
| `src/styles/global.css` | Basis-Reset und Utility-Klassen; stabil halten |
| `src/data/themes.ts` | Theme-Presets; neue hinzufügen ist OK, bestehende nicht ändern |
| `node_modules/` | Nie manuell ändern |
| `dist/` | Build-Ausgabe; wird generiert |

---

## Neue Section hinzufügen

1. Neue Datei in `src/components/` anlegen (Naming: `PascalCase.astro`)
2. Daten in `site.ts` hinzufügen (Interface erweitern)
3. Icon via `<Icon name="lucide:icon-name" />` einbinden
4. CSS-Klasse `reveal` für Scroll-Animation verwenden
5. In `index.astro` importieren und einbinden

**Vorlage:**

```astro
---
import { Icon } from "astro-icon/components";
import site from "@data/site";
---

<section class="section" id="my-section" aria-labelledby="my-section-heading">
  <div class="container">
    <div class="section-header centered">
      <h2 class="section-heading" id="my-section-heading">Überschrift</h2>
    </div>
    <!-- Inhalt mit class="reveal" für Scroll-Animation -->
  </div>
</section>
```

---

## Icons

Lucide Icons via `astro-icon`. Keine Emojis verwenden.

```astro
import { Icon } from "astro-icon/components";

<Icon name="lucide:phone" size={20} aria-hidden="true" />
```

Icon-Namen werden in `site.ts` als Strings konfiguriert (z.B. `icon: "hammer"`).
Verfügbare Icons: https://lucide.dev/icons

---

## Branding ändern

Alle Farbwerte, Schriften und Layout-Maße kommen aus dem gewählten Theme-Preset.
Sie werden per `BaseLayout.astro` als CSS Custom Properties gesetzt:

```css
--color-primary
--color-primary-dark
--color-accent
--color-background
--color-surface
--color-text
--color-text-muted
--color-on-primary
--color-border
--font-body
--font-heading
--container-max
--section-spacing
--radius / --radius-lg
--shadow-sm / --shadow-md
```

Um das Branding zu ändern: `theme: "preset-name"` in `site.ts` setzen.
Für Feintuning: `themeOverrides` in `site.ts` nutzen.

---

## Prinzipien beim Bearbeiten

1. **Statisch-first** — Kein Client-JavaScript wenn nicht zwingend nötig
2. **Simpel** — Lieber wiederholter Code als komplexe Abstraktion
3. **Wenig Dependencies** — Keine neuen npm-Pakete ohne guten Grund
4. **Keine Emojis** — Lucide Icons für alle visuellen Elemente
5. **Datengetrieben** — Alle Inhalte kommen aus `site.ts`
6. **CSS Custom Properties** — Keine Inline-Styles außer dynamischen Tokens
7. **Accessibility** — Semantic HTML, ARIA-Labels wo nötig, `focus-visible` States
8. **Animations** — CSS `reveal` Klasse + `prefers-reduced-motion` respektieren

---

## Build & Deployment

```bash
pnpm install       # Abhängigkeiten installieren
pnpm run dev       # Entwicklungsserver starten (localhost:4321)
pnpm run build     # Statischen Build in /dist erzeugen
pnpm run preview   # Build lokal testen
```

Cloudflare Pages: Build command `pnpm run build`, output `dist`.

---

## Bekannte Konventionen

- `.astro`-Dateien: PascalCase für Komponenten/Layouts, kebab-case für Seiten
- CSS-Klassen: BEM-ähnlich (`.section`, `.section--surface`, `.card`, `.btn`, `.btn--primary`)
- Deutsche Inhalte als Standard; technische Kommentare können Englisch sein
- Sektionen bekommen immer ein `aria-labelledby` + eine `id` für Anker-Navigation
- Scroll-Animationen: `reveal` CSS-Klasse auf Container-Elementen
