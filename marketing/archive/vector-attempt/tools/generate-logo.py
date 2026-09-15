#!/usr/bin/env python3
"""
offyx — Logo SVG Generator (final)
==================================
Freigegebenes Logo: "offyx." · kursiv · Ink + Copper-Punkt
Schrift: Playfair Display Italic, Gewicht 650, Tracking 28
→ geometrisch kalibriert auf die freigegebene AI-Vorlage (nb2-02)

Alle Pfade sind echte Vektoren (keine Font-Abhängigkeit).
"""
import os, sys
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Transform

import pathlib
FONT = str(pathlib.Path(__file__).parent / "PlayfairDisplay-Italic[wght].ttf")
INK, COPPER, CREAM, PAPER = "#352E28", "#B5632A", "#FBF7F1", "#F7F1E8"
WEIGHT, TRACKING, SIZE = 650, 28.0, 1000


def load(w=WEIGHT):
    f = TTFont(FONT)
    return instancer.instantiateVariableFont(f, {"wght": w}) if "fvar" in f else f


def _paths_and_box(font, names, tracking, scale):
    """Positioniert Glyphen, gibt (Pfad-Daten, Bounds) zurück."""
    gs = font.getGlyphSet()
    entries, x = [], 0.0
    for i, n in enumerate(names):
        bp = BoundsPen(gs); gs[n].draw(bp)
        entries.append({"name": n, "b": bp.bounds, "x": x * scale})
        x += font["hmtx"][n][0]
        if i < len(names) - 1:
            x += tracking
    x_min = min(e["x"] + e["b"][0] * scale for e in entries)
    x_max = max(e["x"] + e["b"][2] * scale for e in entries)
    y_min = min(e["b"][1] for e in entries) * scale
    y_max = max(e["b"][3] for e in entries) * scale
    return entries, (x_min, y_min, x_max, y_max)


def build(weight=WEIGHT, tracking=TRACKING, size=SIZE,
          ink=INK, copper=COPPER, bg=None, pad=0.15,
          glyphs=("o", "f_f", "y", "x", "period"),
          square=False):
    font = load(weight)
    scale = size / font["head"].unitsPerEm
    entries, (x0, y0, x1, y1) = _paths_and_box(font, list(glyphs), tracking, scale)

    p = size * pad
    cw, ch = (x1 - x0), (y1 - y0)

    if square:                                   # quadratische Leinwand
        side = max(cw, ch) + p * 2
        off_x = (side - cw) / 2 - x0
        off_y = (side - ch) / 2 + y1
        vb_w = vb_h = side
    else:
        vb_w, vb_h = cw + p * 2, ch + p * 2
        off_x, off_y = -x0 + p, y1 + p

    # Pfade mit eingebackener Transformation
    gs = font.getGlyphSet()
    parts = []
    for e in entries:
        pen = SVGPathPen(None, ntos=lambda v: f"{v:.2f}")
        gs[e["name"]].draw(TransformPen(
            pen, Transform(scale, 0, 0, -scale, e["x"] + off_x, off_y)))
        fill = copper if e["name"] == "period" else ink
        parts.append(f'  <path d="{pen.getCommands()}" fill="{fill}"/>')

    bgs = {"cream": CREAM, "paper": PAPER, "ink": INK}
    bgrect = ""
    if bg in bgs:
        bgrect = f'  <rect width="{vb_w:.1f}" height="{vb_h:.1f}" fill="{bgs[bg]}"/>\n'

    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vb_w:.1f} {vb_h:.1f}">\n'
           f'  <!-- offyx · Playfair Display Italic {weight} · Vektor-Pfade · '
           f'CC BY 4.0 / OFL -->\n{bgrect}{chr(10).join(parts)}\n</svg>\n')
    return svg, vb_w, vb_h


OUT = """\
offyx-logo-wordmark.svg              | transparent, Standard
offyx-logo-wordmark-cream.svg        | auf Cream
offyx-logo-wordmark-paper.svg        | auf Paper
offyx-logo-wordmark-dark.svg         | invertiert auf Ink
offyx-logo-wordmark-dark-trans.svg   | invertiert, transparent
offyx-icon.svg                       | quadratisch, Cream
offyx-icon-dark.svg                  | quadratisch, Ink
"""


def main(out):
    os.makedirs(out, exist_ok=True)

    def w(name, svg):
        with open(os.path.join(out, name), "w") as fh:
            fh.write(svg)
        return name

    rep = []
    svg, a, b = build()
    w("offyx-logo-wordmark.svg", svg); rep.append(("offyx-logo-wordmark.svg", a, b))

    w("offyx-logo-wordmark-cream.svg", build(bg="cream")[0])
    w("offyx-logo-wordmark-paper.svg", build(bg="paper")[0])
    w("offyx-logo-wordmark-dark.svg", build(ink=CREAM, bg="ink")[0])
    w("offyx-logo-wordmark-dark-trans.svg", build(ink=CREAM)[0])

    # Icons: "o." quadratisch
    w("offyx-icon.svg", build(glyphs=("o", "period"), tracking=TRACKING,
                              bg="cream", square=True, pad=0.18)[0])
    w("offyx-icon-trans.svg", build(glyphs=("o", "period"), tracking=TRACKING,
                                     square=True, pad=0.18)[0])
    w("offyx-icon-dark.svg", build(glyphs=("o", "period"), tracking=TRACKING,
                                   ink=CREAM, bg="ink", square=True, pad=0.18)[0])
    w("offyx-icon-dark-trans.svg", build(glyphs=("o", "period"), tracking=TRACKING,
                                         ink=CREAM, square=True, pad=0.18)[0])

    print(f"{'Datei':34s} {'viewBox':>13s}")
    print("-" * 50)
    for n, a, b in rep:
        print(f"{n:34s} {a:6.0f}×{b:<6.0f}")
    print(f"\n  {len(os.listdir(out))} Dateien → {out}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else ".")
