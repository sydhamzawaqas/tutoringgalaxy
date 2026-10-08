"""Tutoring Galaxy final logo (Orbit direction): outlined Manrope wordmark with an orbit 'o'.

Outputs flat-colour SVG masters to ../ (no CSS variables, so they work anywhere).
Requires: pip install fonttools uharfbuzz; fonts/Manrope[wght].ttf (Google Fonts, OFL).
Usage: python3 build_logo.py <out_dir>
"""
import math, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from typeset import layout

FONT = "Manrope[wght].ttf"
AXES = {"wght": 700}
UPM = 2000

INK = "#14284B"
GOLD = "#E0A21B"
WHITE = "#FFFFFF"
GOLD_ON_DARK = "#F2C14E"
BLACK = "#000000"

# Geometry in font units (measured from Manrope Bold 'o': outer 1076x1140, strokes 226-255).
O_CX, O_CY = 618, 540        # centre of the 'o' (x from glyph origin, y above baseline)
RING_R_OUT = 555             # outer radius
STROKE = 245                 # ring stroke, matched to Manrope Bold's bowls
MOON_R = 150
MOON_GAP = 90                # clear space between ring and moon
MOON_ANGLE = -55             # degrees; clears the 'r' to the right
TRACKING = -24               # 1/1000 em


def f(v):
    return f"{v:.2f}".rstrip("0").rstrip(".")


def ring_and_moon(cx, cy, s, ring, moon):
    """Ring + moon at scale s (px per font unit), centred on (cx, cy) in px."""
    r_mid = (RING_R_OUT - STROKE / 2) * s
    dist = (RING_R_OUT + MOON_GAP + MOON_R) * s
    a = math.radians(MOON_ANGLE)
    mx, my = cx + dist * math.cos(a), cy + dist * math.sin(a)
    return (f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r_mid)}" fill="none" stroke="{ring}" stroke-width="{f(STROKE * s)}"/>'
            f'<circle cx="{f(mx)}" cy="{f(my)}" r="{f(MOON_R * s)}" fill="{moon}"/>')


def wordmark(size=96, ink=INK, moon=GOLD):
    """Returns (svg_body, width, height) with a small pad; baseline placed so the moon fits."""
    s = size / UPM
    top_pad = 6
    asc = 1500 * s  # room for ascenders and the moon
    baseline = asc + top_pad
    glyphs, w = layout(FONT, "tutoring galaxy", size, 0, baseline, AXES, tracking=TRACKING)
    o = glyphs[3]
    assert o["name"] == "o"
    d = "".join(g["d"] for i, g in enumerate(glyphs) if i != 3)
    cx = o["x"] + O_CX * s
    cy = baseline - O_CY * s
    body = f'<path d="{d}" fill="{ink}"/>' + ring_and_moon(cx, cy, s, ink, moon)
    xs = [g["bounds"] for g in glyphs if g["bounds"]]
    x0 = min(b[0] for b in xs); x1 = max(b[2] for b in xs)
    y1 = max(b[3] for b in xs)
    a = math.radians(MOON_ANGLE)
    moon_top = cy + (RING_R_OUT + MOON_GAP + MOON_R) * s * math.sin(a) - MOON_R * s
    y0 = min(min(b[1] for b in xs), moon_top)
    pad = 4
    return (f'<g transform="translate({f(pad - x0)} {f(pad - y0)})">{body}</g>',
            x1 - x0 + 2 * pad, y1 - y0 + 2 * pad)


def descriptor_lockup(ink=INK, moon=GOLD, muted="#55637A"):
    body, w, h = wordmark(96, ink, moon)
    tag, tw = layout(FONT, "Home & online tutoring", 26, 0, 0, {"wght": 600}, tracking=10)
    d = "".join(g["d"] for g in tag)
    ty = h + 30
    return body + f'<path d="{d}" fill="{muted}" transform="translate(5 {f(ty)})"/>', max(w, tw + 10), ty + 10


def symbol(ink=INK, moon=GOLD, small=False):
    """Standalone orbit on a 64 grid. small=True is the heavier favicon cut for 16-32px."""
    if small:
        cx, cy, r_out, stroke, moon_r, gap = 28.5, 36, 22, 10, 8, 3
    else:
        s = 40 / (2 * RING_R_OUT)            # ring 40 units across
        cx, cy = 29.5, 35
        r_out, stroke, moon_r, gap = RING_R_OUT * s, STROKE * s, MOON_R * s, MOON_GAP * s
    a = math.radians(MOON_ANGLE)
    dist = r_out + gap + moon_r
    mx, my = cx + dist * math.cos(a), cy + dist * math.sin(a)
    return (f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r_out - stroke / 2)}" fill="none" stroke="{ink}" stroke-width="{f(stroke)}"/>'
            f'<circle cx="{f(mx)}" cy="{f(my)}" r="{f(moon_r)}" fill="{moon}"/>')


def app_icon(tile=INK, ring=WHITE, moon=GOLD_ON_DARK, radius=14, small=False):
    inner = symbol(ring, moon, small=small)
    return f'<rect width="64" height="64" rx="{radius}" fill="{tile}"/><g transform="translate(5 3) scale(0.86)">{inner}</g>'


def svg(body, w, h, title):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {f(w)} {f(h)}" width="{f(w)}" height="{f(h)}" role="img" aria-label="{title}">'
            f'<title>{title}</title>{body}</svg>\n')


if __name__ == "__main__":
    out = sys.argv[1]
    os.makedirs(out, exist_ok=True)
    files = {
        "wordmark.svg": (*wordmark(), "Tutoring Galaxy"),
        "wordmark-reversed.svg": (*wordmark(ink=WHITE, moon=GOLD_ON_DARK), "Tutoring Galaxy"),
        "wordmark-black.svg": (*wordmark(ink=BLACK, moon=BLACK), "Tutoring Galaxy"),
        "wordmark-white.svg": (*wordmark(ink=WHITE, moon=WHITE), "Tutoring Galaxy"),
        "wordmark-descriptor.svg": (*descriptor_lockup(), "Tutoring Galaxy, home and online tutoring"),
        "symbol.svg": (symbol(), 64, 64, "Tutoring Galaxy"),
        "symbol-reversed.svg": (symbol(WHITE, GOLD_ON_DARK), 64, 64, "Tutoring Galaxy"),
        "symbol-small.svg": (symbol(small=True), 64, 64, "Tutoring Galaxy"),
        "app-icon.svg": (app_icon(), 64, 64, "Tutoring Galaxy"),
        "app-icon-small.svg": (app_icon(small=True), 64, 64, "Tutoring Galaxy"),
    }
    for name, (body, w, h, title) in files.items():
        open(os.path.join(out, name), "w").write(svg(body, w, h, title))
    print("\n".join(files))
