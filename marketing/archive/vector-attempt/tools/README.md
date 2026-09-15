# offyx — Logo-Generator

Erzeugt die offyx-Wordmark als SVG mit **echten Vektor-Pfaden**
(keine Font-Abhängigkeit zur Laufzeit).

## Voraussetzungen

```bash
python3 -m pip install --user fonttools
```

## Verwendung

```bash
# Aus dem marketing/-Verzeichnis:
python3 tools/generate-logo.py svg/final
```

Erzeugt 9 SVG-Dateien: Wordmark in 5 Varianten + Icon in 4 Varianten.

## Wie es funktioniert

1. Lädt `PlayfairDisplay-Italic[wght].ttf` (variable font, OFL-Lizenz)
2. Instanziiert das Gewicht **650**
3. Setzt die Glyphen `o` + `f_f` (**Ligatur**) + `y` + `x` + `period`
   mit Tracking **28** units
4. Wandelt die Outlines via `fontTools.pens` in SVG-Pfade um —
   die Transformation (y-Flip, Positionierung) wird **direkt in die
   Koordinaten eingebacken**, damit keine `transform`-Attribute nötig sind
5. Der `period`-Glyph wird in Copper `#B5632A` eingefärbt — das ist der
   markante Punkt nach dem `x`

## Kalibrierung

Die Parameter sind auf die freigegebene AI-Vorlage
(`ai-drafts/nb2-02-copper-dot.png`) abgestimmt:

| Parameter | Wert | Zielwert AI | Ergebnis |
|---|---|---|---|
| Gewicht | 650 | Strichstärke/Höhe 0.1399 | 0.1417 |
| Tracking | 28 units | Seitenverhältnis 2.549 | 2.547 |

## Anpassen

Im Skript oben:

```python
WEIGHT   = 650    # 400–900
TRACKING = 28.0   # units (upm = 1000)
SIZE     = 1000   # Em-Größe
```

`build()` akzeptiert zusätzlich: `ink`, `copper`, `bg`, `pad`,
`glyphs`, `square`.

## Lizenz

Playfair Display steht unter der **SIL Open Font License 1.1** —
die daraus erzeugten Pfade dürfen kommerziell verwendet werden.
