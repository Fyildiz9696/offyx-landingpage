# offyx — Marketing Assets

Alle Marketing-Dateien für die Marke **offyx**.

---

## 🏛 Das Logo

**Freigegeben:** September 2026

Das offyx-Logo ist ein **reiner Wordmark** — kein Symbol, kein Icon.
Die Marke ist die Typografie selbst:

```
offyx.
```

| Eigenschaft | Wert |
|---|---|
| Wortlaut | `offyx` — immer **kleingeschrieben**, nie `Offyx` / `OFFYX` |
| Copper-Punkt | Das Satzende-Zeichen nach dem `x` — eigenständiges Markenelement |
| Schriftbild | Playfair Display **Italic** |
| Wortmark | Ink `#352E28` |
| Punkt | Copper `#B5632A` |

### Herkunft

1. **Referenz** — ein kursiver „offyx"-Schriftzug gab die Richtung vor
2. **AI-Generierung** — via fal.ai `nano-banana-2/edit` in die offyx-CI übersetzt
3. **Freigabe** — die Variante mit Copper-Punkt
   (`ai-drafts/nb2-02-copper-dot.png`) wurde als Logo festgelegt

> Eine vektorisierte Fassung wurde zwischenzeitlich erprobt, aber **verworfen**.
> Sie liegt unter `archive/vector-attempt/`.

### Farbpalette

| Name   | Hex       | Verwendung                                   |
|--------|-----------|----------------------------------------------|
| Ink    | `#352E28` | Wortmark, Headlines — **nie reines Schwarz** |
| Copper | `#B5632A` | Der Punkt, CTA, Badges                       |
| Cream  | `#FBF7F1` | Logo-Hintergrund, Cards                      |
| Paper  | `#F7F1E8` | Seitenhintergrund                            |

### Typografie (Website)

- **Display:** Playfair Display
- **UI:** Work Sans

---

## 📁 Dateien

### `logo/` — die produktiven Logo-Dateien

| Datei | Beschreibung |
|---|---|
| `offyx-logo.png` | **Master** · transparent · 1022×424 |
| `offyx-logo-{120,240,480,800}h.png` | Web-Größen (Höhe in px) |
| `offyx-logo-dark.png` | für dunkle Hintergründe (Cream-Wortmark, Copper-Punkt) |
| `offyx-logo-dark-{120,240,480,800}h.png` | dito, Web-Größen |
| `offyx-logo-cream.png` | auf Cream-Hintergrund (Dokumente, Präsentationen) |
| `offyx-icon.png` | quadratische Icon-Kachel (1019×1019, Cream) |
| `offyx-icon-{32,64,128,192,256,512}.png` | Favicon / App-Icon |
| `offyx-og-image.png` | Open-Graph-Bild 1200×630 |

### `tools/` — Reproduzierbarkeit

| Datei | Zweck |
|---|---|
| `build-logo-assets.py` | Baut **alle** PNG-Assets aus der AI-Vorlage neu — inkl. Website-Sync |

```bash
cd marketing
python3 tools/build-logo-assets.py
```

Das Skript macht in einem Durchlauf:

1. **Color-to-Alpha** — entfernt den uniformen Cream-Hintergrund der AI-Vorlage
   und rechnet die Kantenpixel per Farbunmischung frei
   (`pixel = alpha·fg + (1−alpha)·bg`) → **kein heller Halo**
2. **Trimmen + 2 % Padding**
3. **Dunkle Variante** — Tinte → Cream, Copper bleibt
   (Unterscheidung über den Rotkanal: Tinte R≈40–60, Copper R≈180–200)
4. **Exportgrößen** 120–800 px Höhe
5. **Icon-Kachel** + Favicon-Größen
6. **Sync nach `public/`** — `logo.png`, `logo-dark.png`, `favicon.*`,
   `apple-touch-icon.png`, `icon-{192,512}.png`, `images/og-default.png`

### `ai-drafts/` — Generierungen & Originale

| Datei | Beschreibung |
|---|---|
| `nb2-02-copper-dot.png` | **Das freigegebene Logo** (Quelldatei der Pipeline) |
| `nb2-icon-o.png` | Icon-Generierung (Quelle der Icon-Kachel) |
| `nb2-01/03/04-*.png` | Weitere Generierungen (verworfen) |
| `preview-ai.html` | Übersicht der AI-Drafts |
| `verify.html` | Verifikationsseite |

### `archive/` — nicht für die Produktion

| Ordner | Inhalt |
|---|---|
| `vector-attempt/` | Die verworfene SVG-Version (Master, Generator, Font) |
| `concepts-v1/` | 10 frühe Konzepte (Siegel, Badge, Raute, Kolophon …) |
| `concepts-v2/` | 10 Kursiv-Varianten (Punkt, Signatur, Marker, Descender …) |
| `old-seal-{svg,png,webp}/` | Das vorherige Siegel-Logo |

---

## 🎨 Anwendung

| Kontext | Datei |
|---|---|
| **Website Header / Footer** | `public/images/logo.png` (`<img>`) |
| **Favicon / Browser-Tab** | `public/favicon.ico`, `public/favicon.png` |
| **iOS Homescreen** | `public/apple-touch-icon.png` |
| **PWA / App-Icon** | `public/icon-192.png`, `public/icon-512.png` |
| **Social-Sharing (OG)** | `public/images/og-default.png` |
| **Dokumente, Präsentationen** | `logo/offyx-logo-cream.png` |
| **Dunkler Hintergrund** | `logo/offyx-logo-dark.png` |
| **Social-Media-Avatar** | `logo/offyx-icon-512.png` |

### ✅ Do
- Wortmark immer **kleingeschrieben**: `offyx`
- Copper-Punkt **immer** mitführen — er ist Teil der Marke
- Freiraum rund um das Logo: mindestens die Höhe des `x`
- Auf hell: Ink-Wortmark. Auf dunkel: `offyx-logo-dark.png`

### 🚫 Don't
- Punkt weglassen, umfärben oder vergrößern
- Logo verzerren, drehen oder mit Schatten versehen
- Wortmark nachsetzen oder in anderer Schrift setzen
- Reines Schwarz `#000` statt Ink verwenden

---

## ⚠️ Hinweis zur Auflösung

Das Logo liegt als **Raster** vor. Für Web, Social Media und Dokumente
in den bereitgestellten Größen ist das unproblematisch.

Für Anwendungen, die echte Vektordaten brauchen — **Stickerei, Lasergravur,
Folienschnitt, Großformat** — ist keine Vektordatei verfügbar, da die
vektorisierte Fassung verworfen wurde. In dem Fall:
`logo/offyx-logo-800h.png` als Vorlage zum Nachzeichnen verwenden.

---

*Stand: 2026-09-15 · fyAI Solutions*
