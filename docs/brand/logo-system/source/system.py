"""Tutoring Galaxy logo system: 4 directions built from outlined Google Fonts + one custom detail each.

Every asset is returned as (svg_body, width, height). Colours are CSS variables with brand
fallbacks so one markup re-themes to dark / one-colour when inlined.
"""
import math
from typeset import layout

INK = "var(--ink, #041C32)"
GOLD = "var(--gold, #C8922E)"
BG = "var(--bg, #FFFFFF)"
ON = "var(--on-ink, #F7F4EC)"
MUTED = "var(--muted, #4A5868)"
STAR = "var(--star, var(--gold, #C8922E))"  # star sitting on an ink fill (knocks out in one-colour)

NEWS = ("Newsreader[opsz,wght].ttf", {"wght": 600, "opsz": 72})
NEWS_MED = ("Newsreader[opsz,wght].ttf", {"wght": 500, "opsz": 36})
MAN = ("Manrope[wght].ttf", {"wght": 700})
FIG = ("Figtree[wght].ttf", {"wght": 600})
FIG_CAPS = ("Figtree[wght].ttf", {"wght": 600})
CORM = ("CormorantGaramond[wght].ttf", {"wght": 600})


def f(v):
    return f"{v:.2f}".rstrip("0").rstrip(".")


def sparkle(cx, cy, R, k=0.2):
    c = R * k
    return (f"M{f(cx)},{f(cy-R)} Q{f(cx+c)},{f(cy-c)} {f(cx+R)},{f(cy)} Q{f(cx+c)},{f(cy+c)} {f(cx)},{f(cy+R)} "
            f"Q{f(cx-c)},{f(cy+c)} {f(cx-R)},{f(cy)} Q{f(cx-c)},{f(cy-c)} {f(cx)},{f(cy-R)} Z")


def word(font, text, size, x, y, tracking=0, fill=INK, skip=(), kern=None):
    glyphs, w = layout(font[0], text, size, x, y, font[1], tracking, kern)
    d = "".join(g["d"] for i, g in enumerate(glyphs) if i not in skip)
    return f'<path d="{d}" style="fill:{fill}"/>', glyphs, w


def bbox_union(glyphs):
    bs = [g["bounds"] for g in glyphs if g["bounds"]]
    return min(b[0] for b in bs), min(b[1] for b in bs), max(b[2] for b in bs), max(b[3] for b in bs)


# ---------------------------------------------------------------- A. Scholar
def a_wordmark(x=0, y=64, size=64):
    p, gl, w = word(NEWS, "Tutorıng Galaxy", size, x, y, tracking=-6)
    i = next(g for g in gl if g["name"] == "dotlessi")
    ref, _ = layout(NEWS[0], "i", size, 0, y, NEWS[1])
    top = ref[0]["bounds"][1]
    cx = (i["bounds"][0] + i["bounds"][2]) / 2
    R = size * 0.135
    star = f'<path d="{sparkle(cx, top + R * 0.62, R, k=0.24)}" style="fill:{GOLD}"/>'
    x0, y0, x1, y1 = bbox_union(gl)
    return p + star, (x0, min(y0, top), x1, y1)


def a_symbol():
    # Serif TG monogram on a navy roundel; the gold star sits where the i-dot does in the wordmark.
    body = f'<circle cx="32" cy="32" r="31" style="fill:{INK}"/>'
    p, gl, w = word(NEWS, "TG", 28, 0, 0, tracking=-60)
    x0, y0, x1, y1 = bbox_union(gl)
    dx = 32 - (x0 + x1) / 2 - 1.5
    dy = 32 - (y0 + y1) / 2 + 3.5
    body += f'<g transform="translate({f(dx)} {f(dy)})">{p.replace(INK, ON)}</g>'
    body += f'<path d="{sparkle(47.5, 16, 5.6, k=0.24)}" style="fill:{STAR}"/>'
    return body


# ---------------------------------------------------------------- B. Orbit
def b_ring(cx, cy, r, stroke, planet_angle=-45, moon=0.5, dist=1.05):
    a = math.radians(planet_angle)
    rr = r + stroke / 2 + stroke * dist * 0.62
    px, py = cx + rr * math.cos(a), cy + rr * math.sin(a)
    return (f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r)}" fill="none" style="stroke:{INK}" stroke-width="{f(stroke)}"/>'
            f'<circle cx="{f(px)}" cy="{f(py)}" r="{f(stroke * moon)}" style="fill:{GOLD}"/>')


def b_wordmark(x=0, y=64, size=64):
    p, gl, w = word(MAN, "tutoring galaxy", size, x, y, tracking=-28, skip=(3,))
    o = gl[3]["bounds"]
    stroke = size * 0.148
    cx, cy = (o[0] + o[2]) / 2, (o[1] + o[3]) / 2
    r = (o[3] - o[1]) / 2 - stroke / 2
    return p + b_ring(cx, cy, r, stroke, -45, moon=0.6, dist=1.25), bbox_union(gl)


def b_symbol():
    return b_ring(29, 35, 17, 9, -45, moon=0.62, dist=1.0)


# ---------------------------------------------------------------- C. Seal
def c_symbol():
    mask = ('<mask id="cseal" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">'
            '<rect width="64" height="64" fill="#fff"/>'
            '<path d="M2,28.5 Q32,13.5 62,28.5" fill="none" stroke="#000" stroke-width="5.5"/>'
            '<rect x="29.25" y="21.5" width="5.5" height="44" fill="#000"/></mask>')
    return (f'<defs>{mask}</defs><circle cx="32" cy="32" r="31" mask="url(#cseal)" style="fill:{INK}"/>'
            f'<path d="{sparkle(43.5, 12.5, 5.6)}" style="fill:{STAR}"/>')


def c_wordmark(x=0, y=64, size=64):
    p, gl, w = word(FIG, "Tutoring Galaxy", size, x, y, tracking=-22)
    return p, bbox_union(gl)


# ---------------------------------------------------------------- D. Crest
def d_symbol():
    shield = "M32,3 L57,10 V33 C57,49 46,59 32,65 C18,59 7,49 7,33 V10 Z"
    book = ("M32,51 C27.5,47 21,46 15,47.5 V31 C21,29.5 27.5,30.5 32,34.5 C36.5,30.5 43,29.5 49,31 V47.5 C43,46 36.5,47 32,51 Z"
            " M32,34.5 V51")
    return (f'<path d="{shield}" fill="none" style="stroke:{INK}" stroke-width="3" stroke-linejoin="round"/>'
            f'<path d="{book}" fill="none" style="stroke:{INK}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>'
            f'<path d="{sparkle(32, 19.5, 8.5)}" style="fill:{GOLD}"/>')


def d_wordmark(x=0, y=64, size=64):
    p1, g1, w1 = word(CORM, "TUTORING", size * 0.78, x, y - size * 0.62, tracking=120)
    p2, g2, w2 = word(CORM, "GALAXY", size * 0.78, x, y + size * 0.18, tracking=120)
    # centre the shorter line under the longer one
    dx = (w1 - w2) / 2
    p2 = f'<g transform="translate({f(dx)} 0)">{p2}</g>'
    b1 = bbox_union(g1); b2 = bbox_union(g2)
    return p1 + p2, (b1[0], b1[1], max(b1[2], b2[2] + dx), b2[3])


def tagline(text, size, x, y, fill=MUTED, tracking=180):
    p, gl, w = word(FIG_CAPS, text, size, x, y, tracking=tracking, fill=fill)
    return p, bbox_union(gl)


DIRECTIONS = {
    "a-scholar": dict(
        name="Scholar", wordmark=a_wordmark, symbol=a_symbol,
        idea="A confident editorial serif (Newsreader), like an established school or publisher. The one custom detail: the dot on the 'i' becomes a gold north star, so the galaxy lives inside the name without shouting. The symbol is a serif TG monogram on a navy roundel, with the same star."),
    "b-orbit": dict(
        name="Orbit", wordmark=b_wordmark, symbol=b_symbol,
        idea="A modern geometric sans in lowercase (Manrope), friendly but precise, in the spirit of tech-led education brands. The first 'o' in 'tutoring' becomes an orbit with a gold planet: a student circling a tutor. That orbit-o is the symbol and app icon on its own."),
    "c-seal": dict(
        name="Seal", wordmark=c_wordmark, symbol=c_symbol,
        idea="A solid navy seal with a 'T' cut out of it in negative space. The T's crossbar is an orbit curving over the horizon, with a gold star rising above it. It's paired with a clean humanist sans (Figtree). It's the most 'corporate', and holds up on uniforms, certificates and signage."),
    "d-crest": dict(
        name="Crest", wordmark=d_wordmark, symbol=d_symbol,
        idea="An academic crest: a shield, an open book and a north star, drawn in one consistent line weight, with a classical capital serif (Cormorant Garamond). It signals heritage and prestige to parents, the 'premium British school' register, and 'Est. 2016' gives it credibility."),
}


def horizontal(key, tag=True):
    d = DIRECTIONS[key]
    size = 64
    sym_h = {"d-crest": 108, "b-orbit": 74}.get(key, 92)
    gap = 26
    wm, (x0, y0, x1, y1) = d["wordmark"](x=sym_h + gap, y=0, size=size)
    # vertically centre the symbol on the wordmark's cap/x band
    mid = (y0 + y1) / 2 if key != "b-orbit" else -size * 0.30
    vb_h = 64 if key != "d-crest" else 72
    s = sym_h / 64
    sym = f'<g transform="translate(0 {f(mid - vb_h * s / 2)}) scale({f(s)})">{d["symbol"]()}</g>'
    body = sym + wm
    top, bottom, right = min(y0, mid - vb_h * s / 2), max(y1, mid + vb_h * s / 2), x1
    if tag and key in ("c-seal", "d-crest"):
        t = "HOME & ONLINE TUTORING" if key == "c-seal" else "EST. 2016"
        tp, (tx0, ty0, tx1, ty1) = tagline(t, 14 if key == "c-seal" else 13, sym_h + gap + (2 if key == "c-seal" else 0), y1 + 26)
        body += tp
        bottom = max(bottom, ty1); right = max(right, tx1)
    pad = 2
    return f'<g transform="translate({f(pad - 0)} {f(pad - top)})">{body}</g>', right + pad * 2, bottom - top + pad * 2


def stacked(key):
    d = DIRECTIONS[key]
    size = 64
    wm, (x0, y0, x1, y1) = d["wordmark"](x=0, y=0, size=size)
    ww = x1 - x0
    sym_h = 120
    vb_h = 64 if key != "d-crest" else 72
    s = sym_h / vb_h
    sym_w = 64 * s
    sx = x0 + ww / 2 - sym_w / 2
    sy = y0 - 30 - sym_h
    body = f'<g transform="translate({f(sx)} {f(sy)}) scale({f(s)})">{d["symbol"]()}</g>' + wm
    pad = 2
    return f'<g transform="translate({f(pad - x0)} {f(pad - sy)})">{body}</g>', ww + pad * 2, y1 - sy + pad * 2


def wordmark_only(key):
    wm, (x0, y0, x1, y1) = DIRECTIONS[key]["wordmark"](x=0, y=0, size=64)
    pad = 2
    return f'<g transform="translate({f(pad - x0)} {f(pad - y0)})">{wm}</g>', x1 - x0 + pad * 2, y1 - y0 + pad * 2


def symbol(key):
    h = 64 if key != "d-crest" else 68
    return DIRECTIONS[key]["symbol"](), 64, h


def app_icon(key):
    """Symbol on a rounded-square tile, as used for app icons, social avatars and favicons."""
    tile = f'<rect width="64" height="64" rx="14" style="fill:{INK}"/>'
    inner = DIRECTIONS[key]["symbol"]()
    if key == "a-scholar":
        # Roundel becomes the tile itself: drop the circle, keep the monogram + star.
        inner = inner.split("/>", 1)[1]
        return tile + inner, 64, 64
    swap = inner.replace(INK, ON).replace(BG, INK).replace(STAR, "var(--star-app, var(--gold, #C8922E))")
    if key == "c-seal":
        swap = swap.replace('mask id="cseal"', 'mask id="cseal-app"').replace("url(#cseal)", "url(#cseal-app)")
        return tile + f'<g transform="translate(9 9) scale(0.72)">{swap}</g>', 64, 64
    if key == "d-crest":
        return tile + f'<g transform="translate(13.5 8) scale(0.58)">{swap}</g>', 64, 64
    return tile + f'<g transform="translate(8 8) scale(0.75)">{swap}</g>', 64, 64


def svg(body, w, h, title):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {f(w)} {f(h)}" width="{f(w)}" height="{f(h)}" '
            f'role="img"><title>{title}</title>{body}</svg>\n')
