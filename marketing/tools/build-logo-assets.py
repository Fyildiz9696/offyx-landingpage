#!/usr/bin/env python3
"""
offyx — Logo-Pipeline (PNG)
===========================
Erzeugt aus der freigegebenen AI-Vorlage die produktiven Logo-Dateien.

Quelle:  ai-drafts/nb2-02-copper-dot.png   (Wordmark)
         ai-drafts/nb2-icon-o.png         (quadratisches Icon)
Ausgabe: logo/*.png

Ablauf:
  1. Hintergrund entfernen (Color-to-Alpha + Farbunmischung → kein Halo)
  2. Auf Inhalt trimmen, 2 % Padding
  3. Dunkle Variante ableiten (Tinte → Cream, Copper bleibt)
  4. Exportgrößen erzeugen
  5. Icon: auf Cream-Kachel setzen, Favicon-Größen erzeugen

Aufruf:
  python3 tools/build-logo-assets.py

Voraussetzung:  pip install Pillow numpy
"""
import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "ai-drafts" / "nb2-02-copper-dot.png"
SRC_ICON = ROOT / "ai-drafts" / "nb2-icon-o.png"
OUT = ROOT / "logo"
ICON_SIZES = (32, 64, 128, 192, 256, 512)

CREAM = (251, 247, 241)     # #FBF7F1
COPPER = (181, 99, 42)      # #B5632A
PAD = 0.02                  # 2 % Padding
TRIM_ALPHA = 20             # Alpha-Schwelle gegen Rauschen
COPPER_RED_MIN = 120        # Rotkanal über diesem Wert = Copper


def color_to_alpha(img: Image.Image) -> Image.Image:
    """Entfernt den uniformen Hintergrund und rechnet Kantenpixel frei.

    Modell:  pixel = alpha * fg + (1 - alpha) * bg
    """
    a = np.array(img.convert("RGB")).astype(np.float64)

    # Hintergrund = Median der äußeren 8-px-Ränder
    edge = np.concatenate([
        a[:8].reshape(-1, 3), a[-8:].reshape(-1, 3),
        a[:, :8].reshape(-1, 3), a[:, -8:].reshape(-1, 3),
    ])
    bg = np.median(edge, axis=0)

    dev = np.abs(a - bg).max(axis=2)
    T = np.percentile(dev, 99.9) * 0.92

    alpha = np.clip(dev / T, 0.0, 1.0)
    alpha[alpha < 0.02] = 0.0

    fg = np.zeros_like(a)
    nz = alpha > 1e-6
    al = alpha[nz][:, None]
    fg[nz] = (a[nz] - (1.0 - al) * bg) / al
    fg = np.clip(fg, 0, 255)

    print(f"    bg={bg.round(1)}  T={T:.1f}  deckende Pixel={(alpha > 0.9).sum():,}")
    return Image.fromarray(
        np.dstack([fg, alpha * 255.0]).astype(np.uint8), "RGBA")


def trim_pad(img: Image.Image, pad_ratio=PAD) -> Image.Image:
    """Auf Inhalt trimmen und mit relativem Rand versehen."""
    return _pad(img.crop(content_box(img)), pad_ratio)


def content_box(img: Image.Image):
    al = np.array(img)[:, :, 3]
    ys, xs = np.where(al > TRIM_ALPHA)
    return (xs.min(), ys.min(), xs.max() + 1, ys.max() + 1)


def _pad(img: Image.Image, pad_ratio=PAD) -> Image.Image:
    w, h = img.size
    p = int(w * pad_ratio)
    canvas = Image.new("RGBA", (w + 2 * p, h + 2 * p), (0, 0, 0, 0))
    canvas.paste(img, (p, p))
    return canvas


def make_dark(img: Image.Image) -> Image.Image:
    """Tinte → Cream, Copper bleibt Copper (Unterscheidung über Rotkanal)."""
    a = np.array(img)
    rgb = a[:, :, :3].astype(float)
    al = a[:, :, 3]
    is_copper = rgb[:, :, 0] > COPPER_RED_MIN
    out = rgb.copy()
    out[~is_copper] = CREAM
    out[is_copper] = COPPER
    print(f"    Copper-Pixel={is_copper.sum():,}  Ink-Pixel={(~is_copper).sum():,}")
    return Image.fromarray(np.dstack([out, al]).astype(np.uint8), "RGBA")


def main():
    if not SRC.exists():
        sys.exit(f"Quelldatei fehlt: {SRC}")

    OUT.mkdir(exist_ok=True)
    print(f"Quelle: {SRC.name}\n")

    print("1) Color-to-Alpha")
    transparent = color_to_alpha(Image.open(SRC))

    print("2) Trimmen + Padding")
    content = transparent.crop(content_box(transparent))
    master = _pad(content)
    master.save(OUT / "offyx-logo.png")
    print(f"    Master: {master.size[0]}×{master.size[1]}")

    print("3) Dunkle Variante (Tinte → Cream)")
    dark = _pad(make_dark(content))
    dark.save(OUT / "offyx-logo-dark.png")
    print(f"    Dunkel: {dark.size[0]}×{dark.size[1]}")

    print("4) Exportgrößen")
    for h in (120, 240, 480, 800):
        for name, img in (("offyx-logo", master), ("offyx-logo-dark", dark)):
            w = round(img.size[0] * h / img.size[1])
            img.resize((w, h), Image.LANCZOS).save(OUT / f"{name}-{h}h.png")
            print(f"    {name}-{h}h.png  ({w}×{h})")

    # Auf Cream (Dokumente, Präsentationen)
    cream_bg = Image.new("RGB", master.size, CREAM)
    cream_bg.paste(master, (0, 0), master)
    cream_bg.save(OUT / "offyx-logo-cream.png")

    print("\n5) Icon-Kachel (Favicon / App)")
    if SRC_ICON.exists():
        ic = Image.open(SRC_ICON).convert("RGB")
        a = np.array(ic).astype(int)
        bg = np.median(np.concatenate([
            a[:20].reshape(-1, 3), a[-20:].reshape(-1, 3),
            a[:, :20].reshape(-1, 3), a[:, -20:].reshape(-1, 3)]), axis=0)
        ink = np.abs(a - bg).max(axis=2) > 60
        # enger Inhalt (Rauschpixel ausschliessen)
        rows = np.where(ink.sum(axis=1) >= 8)[0]
        cols = np.where(ink.sum(axis=0) >= 8)[0]
        crop = ic.crop((cols.min(), rows.min(), cols.max() + 1, rows.max() + 1))
        w, h = crop.size
        side = int(max(w, h) * 1.42)          # grosszuegiger Rand
        tile = Image.new("RGB", (side, side), CREAM)
        tile.paste(crop, ((side - w) // 2, (side - h) // 2))
        tile.save(OUT / "offyx-icon.png")
        print(f"    offyx-icon.png  ({side}×{side}, Cream-Kachel)")
        for s in ICON_SIZES:
            tile.resize((s, s), Image.LANCZOS).save(OUT / f"offyx-icon-{s}.png")
        print(f"    + {len(ICON_SIZES)} Favicon-Groessen")
    else:
        print(f"    uebersprungen — {SRC_ICON.name} fehlt")

    print("\n6) Website-Assets synchronisieren")
    pub = ROOT.parent / "public"
    (pub / "images").mkdir(parents=True, exist_ok=True)
    tile.resize((512, 512), Image.LANCZOS).save(pub / "icon-512.png")
    tile.resize((192, 192), Image.LANCZOS).save(pub / "icon-192.png")
    tile.resize((180, 180), Image.LANCZOS).save(pub / "apple-touch-icon.png")
    tile.resize((32, 32), Image.LANCZOS).save(pub / "favicon.png")
    tile.save(pub / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

    # OG-Bild (1200×630): Logo + Tagline
    try:
        from PIL import ImageDraw, ImageFont
        og = Image.new("RGB", (1200, 630), CREAM)
        lw = 520
        lg = master.resize((lw, round(master.size[1] * lw / master.size[0])),
                           Image.LANCZOS)
        og.paste(lg, ((1200 - lw) // 2, 150), lg)
        d = ImageDraw.Draw(og)
        for fp in ("/tmp/offyx-font/WorkSans-400.ttf",
                   "/System/Library/Fonts/Helvetica.ttc"):
            if Path(fp).exists():
                f = ImageFont.truetype(fp, 27)
                break
        else:
            f = ImageFont.load_default()
        txt = "Deine Geschäftsadresse in Berlin."
        tb = d.textbbox((0, 0), txt, font=f)
        d.text(((1200 - (tb[2] - tb[0])) / 2, 460), txt,
               font=f, fill=(122, 110, 103))
        og.save(pub / "images" / "og-default.png")
        og.save(OUT / "offyx-og-image.png")
        print("    images/og-default.png")
    except Exception as e:
        print(f"    OG-Bild uebersprungen: {e}")
    # Header/Footer-Logo (240 px hoch reicht fuer 3x bei 80 px Anzeige)
    master.resize((round(master.size[0] * 240 / master.size[1]), 240),
                  Image.LANCZOS).save(pub / "images" / "logo.png")
    dark.resize((round(dark.size[0] * 240 / dark.size[1]), 240),
                Image.LANCZOS).save(pub / "images" / "logo-dark.png")
    print("    public/images/logo(.dark).png, og-default.png, favicon.png,")
    print("    favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png")

    print("\nFertig →", OUT)


if __name__ == "__main__":
    main()
