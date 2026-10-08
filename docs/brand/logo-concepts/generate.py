"""Generate 10 Tutoring Galaxy logo concepts as flat SVGs on a 64x64 grid.

Colors use CSS variables with brand fallbacks so the same markup can be
re-themed (dark / mono) when inlined, and still renders standalone.
"""
import math, os, sys

OUT = sys.argv[1]
INK = "var(--ink, #0B2545)"      # deep academic navy
GOLD = "var(--gold, #F4B400)"    # achievement gold
BG = "var(--bg, #FFFFFF)"        # background (used for knock-out gaps)
ON = "var(--on-ink, #FFFFFF)"    # mark on navy tiles


def f(v):
    return f"{v:.2f}".rstrip("0").rstrip(".")


def star5(cx, cy, R, r=None, rot=-90):
    r = r if r is not None else R * 0.42
    pts = []
    for i in range(10):
        a = math.radians(rot + i * 36)
        rad = R if i % 2 == 0 else r
        pts.append(f"{f(cx + rad * math.cos(a))},{f(cy + rad * math.sin(a))}")
    return "M" + " L".join(pts) + " Z"


def sparkle(cx, cy, R, k=0.16):
    """Four-point 'north star' with concave sides."""
    c = R * k
    return (f"M{f(cx)},{f(cy-R)} Q{f(cx+c)},{f(cy-c)} {f(cx+R)},{f(cy)} "
            f"Q{f(cx+c)},{f(cy+c)} {f(cx)},{f(cy+R)} "
            f"Q{f(cx-c)},{f(cy+c)} {f(cx-R)},{f(cy)} "
            f"Q{f(cx-c)},{f(cy-c)} {f(cx)},{f(cy-R)} Z")


def pt(cx, cy, r, deg):
    a = math.radians(deg)
    return cx + r * math.cos(a), cy + r * math.sin(a)


def ellipse_pts(cx, cy, rx, ry, rot):
    a = math.radians(rot)
    l = (cx - rx * math.cos(a), cy - rx * math.sin(a))
    r = (cx + rx * math.cos(a), cy + rx * math.sin(a))
    return l, r


CONCEPTS = []


def concept(slug, name, idea):
    def deco(fn):
        CONCEPTS.append((slug, name, idea, fn()))
        return fn
    return deco


@concept("01-north-star-orbit", "North Star Orbit",
         "A guiding north star with one orbit passing in front of it: the tutor as the fixed point a student's learning circles around. The front half of the ring overlaps the star, which gives depth without gradients.")
def _():
    (lx, ly), (rx, ry) = ellipse_pts(32, 32, 28, 10, -25)
    back = f'<path d="M{f(lx)},{f(ly)} A28,10 -25 0 1 {f(rx)},{f(ry)}" fill="none" style="stroke:{INK}" stroke-width="3.5" stroke-linecap="round"/>'
    front = f'<path d="M{f(lx)},{f(ly)} A28,10 -25 0 0 {f(rx)},{f(ry)}" fill="none" style="stroke:{BG}" stroke-width="8"/>' \
            f'<path d="M{f(lx)},{f(ly)} A28,10 -25 0 0 {f(rx)},{f(ry)}" fill="none" style="stroke:{INK}" stroke-width="3.5" stroke-linecap="round"/>'
    px, py = 21.2, 44.6
    planet = f'<circle cx="{px}" cy="{py}" r="6" style="fill:{BG}"/><circle cx="{px}" cy="{py}" r="4" style="fill:{INK}"/>'
    return back + f'<path d="{sparkle(32, 31, 17, k=0.2)}" style="fill:{GOLD}"/>' + front + planet


@concept("02-orbit-g", "Orbit G",
         "The letter G drawn as one orbit, with a gold planet as the stroke's starting point. It's a strong standalone 'G' for app icons and favicons.")
def _():
    sx, sy = pt(32, 32, 21, -45)
    g = (f'<path d="M{f(sx)},{f(sy)} A21,21 0 1 0 53,32 H35" fill="none" style="stroke:{INK}" '
         f'stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/>')
    return g + f'<circle cx="{f(sx)}" cy="{f(sy)}" r="7" style="fill:{GOLD}"/>'


@concept("03-mentor-and-student", "Mentor & Student",
         "A large gold star (the mentor) and a small navy planet (the student) on a shared orbit: the one-to-one relationship the business sells.")
def _():
    a1x, a1y = pt(32, 32, 24, -25)
    a2x, a2y = pt(32, 32, 24, -65)
    orbit = f'<path d="M{f(a1x)},{f(a1y)} A24,24 0 1 1 {f(a2x)},{f(a2y)}" fill="none" style="stroke:{INK}" stroke-width="3.5" stroke-linecap="round"/>'
    px, py = pt(32, 32, 24, -45)
    return orbit + f'<path d="{star5(32, 33.5, 14.5)}" style="fill:{GOLD}" stroke-linejoin="round"/>' \
                   f'<circle cx="{f(px)}" cy="{f(py)}" r="5.5" style="fill:{INK}"/>'


@concept("04-open-book-star", "Open Book, Rising Star",
         "An open book with a north star rising from its spine. It says 'education' first and 'galaxy' second, which makes it the most literal and easiest concept for parents to read.")
def _():
    left = "M31,52 C24,46.5 15,45.5 6,47.5 V24 C15,22 24,23 31,29 Z"
    right = "M33,52 C40,46.5 49,45.5 58,47.5 V24 C49,22 40,23 33,29 Z"
    return (f'<path d="{left}" style="fill:{INK}"/><path d="{right}" style="fill:{INK}"/>'
            f'<path d="{sparkle(32, 14, 11)}" style="fill:{GOLD}"/>')


@concept("05-orbit-t", "Orbit T",
         "A bold 'T' whose crossbar bends into an orbit, with a gold planet at its end, on a navy tile. It's a T monogram that works as an app icon and reads clearly at 16px.")
def _():
    tile = f'<rect x="2" y="2" width="60" height="60" rx="15" style="fill:{INK}"/>'
    bar = f'<path d="M13,27 Q32,13 47,22" fill="none" style="stroke:{ON}" stroke-width="7" stroke-linecap="round"/>'
    stem = f'<path d="M30,21 V50" fill="none" style="stroke:{ON}" stroke-width="7.5" stroke-linecap="round"/>'
    return tile + bar + stem + f'<circle cx="49.5" cy="24" r="6" style="fill:{GOLD}"/>'


@concept("06-star-graduate", "Star Graduate",
         "A mortarboard whose tassel ends in a gold star: 'graduate to the stars'. It's clear about academic outcomes, with a hint of reward.")
def _():
    board = f'<path d="M32,12 L59,24.5 L32,37 L5,24.5 Z" style="fill:{INK};stroke:{BG}" stroke-width="2.5" stroke-linejoin="round"/>'
    base = f'<path d="M16,31 V42 C22,48.5 42,48.5 48,42 V31 L32,38.5 Z" style="fill:{INK}"/>'
    tassel = f'<path d="M32,24.5 L53,27.5 V41" fill="none" style="stroke:{GOLD}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>'
    return board + base + tassel + f'<path d="{star5(53, 47.5, 7.5)}" style="fill:{GOLD}"/>'


@concept("07-spiral-galaxy", "Spiral Galaxy",
         "One continuous spiral growing out of a gold core, ending in a small gold planet: learning that compounds over time. It's abstract and ownable, and still reads as a galaxy.")
def _():
    pts = []
    n = 90
    for i in range(n + 1):
        t = i / n * 2.15 * math.pi
        r = 5 + 3.55 * t
        a = t - math.pi / 2
        pts.append((32 + r * math.cos(a), 32.5 + r * math.sin(a)))
    d = "M" + " L".join(f"{f(x)},{f(y)}" for x, y in pts)
    ex, ey = pts[-1]
    return (f'<path d="{d}" fill="none" style="stroke:{INK}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>'
            f'<circle cx="32" cy="32.5" r="5" style="fill:{GOLD}"/>'
            f'<circle cx="{f(ex)}" cy="{f(ey)}" r="5.5" style="fill:{GOLD}"/>')


@concept("08-constellation-progress", "Constellation of Progress",
         "Stars joined into a rising line, like a progress chart, that ends at a bright north star. It tells the 'measurable results' story on a navy tile.")
def _():
    tile = f'<rect x="2" y="2" width="60" height="60" rx="15" style="fill:{INK}"/>'
    pts = [(12, 49), (23, 40), (32, 43), (42, 28)]
    line = f'<polyline points="{" ".join(f"{x},{y}" for x, y in pts)} 47,22" fill="none" style="stroke:{ON}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>'
    dots = "".join(f'<circle cx="{x}" cy="{y}" r="3.6" style="fill:{ON}"/>' for x, y in pts)
    return tile + line + dots + f'<path d="{sparkle(48, 18.5, 11)}" style="fill:{GOLD}"/>'


@concept("09-shooting-star", "Rising Shooting Star",
         "A gold star climbing on three trails: ambition and upward grades. It's energetic and friendly, which suits younger students.")
def _():
    trails = [("M7,49 Q20,32 37,27", 4.5), ("M12,58 Q27,42 41,34", 4.5), ("M20,62 Q33,50 44,41", 3.5)]
    t = "".join(f'<path d="{d}" fill="none" style="stroke:{INK}" stroke-width="{w}" stroke-linecap="round"/>' for d, w in trails)
    return t + f'<path d="{star5(46, 22, 15, rot=-78)}" style="fill:{GOLD};stroke:{BG}" stroke-width="2.5" stroke-linejoin="round"/>'


@concept("10-star-conversation", "Star Conversation",
         "A speech bubble holding a north star, because tutoring is a conversation. It also matches the WhatsApp-first way the business sells, and works as a chat or app icon.")
def _():
    bubble = f'<path d="M14,6 H50 A10,10 0 0 1 60,16 V40 A10,10 0 0 1 50,50 H28 L15,59 V50 H14 A10,10 0 0 1 4,40 V16 A10,10 0 0 1 14,6 Z" style="fill:{INK}" stroke-linejoin="round"/>'
    return bubble + f'<path d="{sparkle(32, 28, 15)}" style="fill:{GOLD}"/>'


def svg(body, title, vb="0 0 64 64", w=64, h=64):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" width="{w}" height="{h}" role="img" aria-labelledby="t">'
            f'<title id="t">{title}</title>{body}</svg>\n')


def lockup(body, title):
    # Icon + wordmark. Text uses a web font with safe fallbacks; outline the text for the final master.
    word = (f'<text x="80" y="30" font-family="\'Plus Jakarta Sans\', \'Inter\', \'Segoe UI\', Arial, sans-serif" font-size="25" font-weight="800" letter-spacing="-0.5" style="fill:{INK}">Tutoring</text>'
            f'<text x="80" y="55" font-family="\'Plus Jakarta Sans\', \'Inter\', \'Segoe UI\', Arial, sans-serif" font-size="25" font-weight="500" letter-spacing="-0.5" style="fill:{INK}">Galaxy</text>')
    return svg(f'<g>{body}</g>{word}', title, vb="0 0 230 64", w=230, h=64)


os.makedirs(OUT, exist_ok=True)
manifest = []
for slug, name, idea, body in CONCEPTS:
    open(os.path.join(OUT, f"{slug}.svg"), "w").write(svg(body, f"Tutoring Galaxy logo concept: {name}"))
    open(os.path.join(OUT, f"{slug}-lockup.svg"), "w").write(lockup(body, f"Tutoring Galaxy: {name} lockup"))
    manifest.append((slug, name, idea))

import json
json.dump(manifest, open(os.path.join(OUT, "concepts.json"), "w"), indent=1)
print(len(manifest), "concepts written")
