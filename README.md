# KMU Mini Astro Template

> **Production-ready Astro-Template für kleine bis mittlere statische Kundenwebsites.**  
> Für Elektriker, Handwerksbetriebe, Praxen, Steuerberater und andere lokale Dienstleister.

---

## Was ist dieses Template?

Ein schlankes, wartbares Starter-Repo für Freelancer, die schnell professionelle statische Websites für lokale Kunden erstellen. Basiert auf [Astro](https://astro.build), nutzt pure CSS Custom Properties für Branding und benötigt kein State Management.

**Kernprinzipien:**

- 🚀 Sehr schnell — minimales JS, Systemfonts, statischer Build
- 🎨 Komplett per 2 Dateien brandbar (`site.ts` + `theme.ts`)
- 🇩🇪 Deutsche Standardinhalte & Rechtsseiten-Vorlagen
- ♿ Accessibel — semantisches HTML, Fokuszustände, ausreichender Kontrast
- 🤖 Agent-friendly — selbsterklärende Struktur, klare Konventionen

---

## Für wen ist dieses Template?

- Freelancer, die regelmäßig statische Websites für lokale Kunden erstellen
- Agenturen, die einen schlanken, wartbaren Startpunkt brauchen
- Entwickler, die mit Coding Agents arbeiten (GitHub Copilot, Cursor, etc.)

---

## Quick Start (3 Schritte)

```bash
# 1. Repository als Template nutzen (GitHub: "Use this template")
#    oder lokal klonen:
git clone https://github.com/DEIN-USERNAME/DEIN-REPO.git mein-kundenprojekt
cd mein-kundenprojekt

# 2. Abhängigkeiten installieren
npm install

# 3. Entwicklungsserver starten
npm run dev
```

Öffne `http://localhost:4321` im Browser.

---

## Neues Kundenprojekt erstellen

### Schritt 1 — Kundendaten eintragen

Öffne **`src/data/site.ts`** und ersetze alle Werte:

```ts
const site: SiteData = {
  company: "Elektro Kundenname GmbH",
  tagline: "Ihr zuverlässiger Elektriker in Kundenstadt",
  url: "https://kundenname.de",
  contact: {
    email: "info@kundenname.de",
    phone: "+49 123 456789",
    address: { street: "Musterstraße 1", zip: "12345", city: "Kundenstadt" },
  },
  // ...
};
```

### Schritt 2 — Branding anpassen

Öffne **`src/data/theme.ts`** und passe Farben und Logo an:

```ts
const theme: ThemeData = {
  colors: {
    primary: "#c0392b", // Kundenfarbe
    primaryDark: "#922b21",
    accent: "#e67e22",
    // ...
  },
  logo: {
    src: "/images/logo.svg", // Kundenlogo ablegen
    alt: "Kundenname Logo",
    width: 160,
  },
};
```

### Schritt 3 — Seiteninhalte anpassen

Seiteninhalte befinden sich direkt in den Astro-Dateien unter **`src/pages/`**:

| Datei                         | Inhalt                                         |
| ----------------------------- | ---------------------------------------------- |
| `src/pages/index.astro`       | Startseite (Hero, Services, Testimonials, FAQ) |
| `src/pages/leistungen.astro`  | Leistungsseite                                 |
| `src/pages/ueber-uns.astro`   | Über-uns-Seite                                 |
| `src/pages/kontakt.astro`     | Kontaktseite                                   |
| `src/pages/impressum.astro`   | Impressum (Pflichtseite)                       |
| `src/pages/datenschutz.astro` | Datenschutzerklärung (Pflichtseite)            |

---

## Branding ändern

Alle Designwerte sind in **`src/data/theme.ts`** zentral definiert und werden als CSS Custom Properties in jede Seite injiziert.

**Wichtigste Felder:**

```ts
colors.primary; // Primärfarbe (Buttons, Links, Akzente)
colors.primaryDark; // Hover-Zustand
colors.accent; // Highlights
colors.text; // Textfarbe
logo.src; // Pfad zur Logodatei (unter /public/images/)
```

**Logo ersetzen:** Datei unter `public/images/logo.svg` (oder `.png`) ablegen und Pfad in `theme.ts` aktualisieren.

---

## Inhalte ändern

### Bestehende Seiten

Jede Seite in `src/pages/` enthält ihre Inhalte direkt als Props/Variablen am Anfang der Datei, klar strukturiert und kommentiert.

**Beispiel `index.astro`:**

```astro
const services = [
  { title: "Elektroinstallation", description: "...", icon: "⚡" },
  // Einfach weitere Einträge hinzufügen
];
```

### Neue Seite hinzufügen

```astro
---
// src/pages/referenzen.astro
import PageLayout from "@layouts/PageLayout.astro";
---

<PageLayout title="Referenzen" description="Unsere abgeschlossenen Projekte.">
  <section class="section">
    <div class="container">
      <h1>Referenzen</h1>
      <!-- Inhalte hier -->
    </div>
  </section>
</PageLayout>
```

Fertig — die Seite ist automatisch unter `/referenzen` erreichbar.

---

## Kontaktformular

Das Kontaktformular (`ContactSection.astro`) verwendet standardmäßig einen **mailto-Fallback**. Für ein echtes Formular:

**Formspree:**

```astro
<ContactSection formAction="https://formspree.io/f/DEIN-FORMSPREE-ID" />
```

**Basin:**

```astro
<ContactSection formAction="https://usebasin.com/f/DEIN-BASIN-ID" />
```

---

## Deployment

### Cloudflare Pages (empfohlen)

1. Repository auf GitHub pushen
2. Cloudflare Pages → „Create a project" → GitHub verbinden
3. Build-Einstellungen:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy → fertig 🎉

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting   # public: dist, single-page: no
npm run build
firebase deploy
```

### GitHub Pages

In `.github/workflows/deploy.yml`:

```yaml
- name: Build
  run: npm run build
- name: Deploy to GitHub Pages
  uses: actions/deploy-pages@v4
  with:
    artifact: dist
```

Für GitHub Pages in `astro.config.mjs` ggf. `base: "/REPO-NAME"` setzen.

---

## ⚠️ Rechtlicher Hinweis — Impressum & Datenschutz

> **Die Dateien `src/pages/impressum.astro` und `src/pages/datenschutz.astro` enthalten ausschließlich Vorlagen-Platzhalter. Sie sind NICHT automatisch rechtssicher.**

**Vor dem Go-Live unbedingt:**

- [ ] Alle `[TODO]`-Markierungen mit echten Kundendaten ausfüllen
- [ ] Datenschutzerklärung an tatsächlich genutzte Dienste anpassen (Hosting, Formulare, Analytics)
- [ ] Impressum von einem Rechtsanwalt prüfen lassen **oder** einen seriösen Impressum-Generator nutzen (z. B. eRecht24, Trusted Shops, Händlerbund)
- [ ] Datenschutzerklärung juristisch prüfen

---

## Workflow mit Coding Agents

Dieses Repository ist agent-optimiert. Beim Einsatz von GitHub Copilot, Cursor oder ähnlichen Tools:

1. **`AGENTS.md` zuerst lesen lassen** — enthält alle Konventionen
2. `src/data/site.ts` und `src/data/theme.ts` als Kontext mitgeben
3. Neue Komponenten in `src/components/` ablegen
4. Keine Client-JS-Libraries hinzufügen wenn nicht zwingend nötig
5. Jede Komponente klein und fokussiert halten

---

## Projektstruktur

```
src/
├── components/       # Wiederverwendbare UI-Komponenten
│   ├── Header.astro
│   ├── Footer.astro
│   ├── Hero.astro
│   ├── ServicesGrid.astro
│   ├── TrustIndicators.astro
│   ├── AboutTeaser.astro
│   ├── Process.astro
│   ├── Testimonials.astro
│   ├── FAQ.astro
│   ├── CTA.astro
│   └── ContactSection.astro
├── layouts/          # Seiten-Layouts
│   ├── BaseLayout.astro    # HTML-Grundstruktur, Meta, CSS-Tokens
│   └── PageLayout.astro    # Layout mit Header + Footer
├── pages/            # Astro-Seiten (= URL-Routen)
│   ├── index.astro         # /
│   ├── leistungen.astro    # /leistungen
│   ├── ueber-uns.astro     # /ueber-uns
│   ├── kontakt.astro       # /kontakt
│   ├── impressum.astro     # /impressum
│   ├── datenschutz.astro   # /datenschutz
│   ├── 404.astro           # Fehlerseite
│   └── robots.txt.ts       # /robots.txt (generiert)
├── data/             # Konfigurationsdaten (HIER ANFANGEN)
│   ├── site.ts             # Firmendaten, Kontakt, Social, CTA
│   └── theme.ts            # Farben, Fonts, Layout, Logo
└── styles/
    └── global.css          # Reset, Typografie, Utility-Klassen

public/               # Statische Assets (direkt serviert)
├── favicon.svg
└── images/
    └── logo.svg            # TODO: Kundenlogo ersetzen
```
