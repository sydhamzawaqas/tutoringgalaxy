"""Export the 4 logo-system directions as SVG files and build the presentation page."""
import os, sys, html
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import system as S
from typeset import metrics

OUT = sys.argv[1]
ORDER = ["a-scholar", "c-seal", "b-orbit", "d-crest"]
REC = "a-scholar"
ASSETS = [("horizontal", S.horizontal), ("stacked", S.stacked), ("wordmark", S.wordmark_only),
          ("symbol", S.symbol), ("app-icon", S.app_icon)]

LIGHT = "--ink:#041C32;--gold:#C8922E;--bg:#FFFFFF;--on-ink:#F7F4EC;--muted:#4A5868"
PAPER = "--ink:#041C32;--gold:#C8922E;--bg:#F7F4EC;--on-ink:#F7F4EC;--muted:#4A5868"
DARK = "--ink:#F2EEE4;--gold:#ECB365;--bg:#041C32;--on-ink:#041C32;--muted:#B8C2CE"
MONO_K = "--star:#FFFFFF;--star-app:#111111;--ink:#111111;--gold:#111111;--bg:#FFFFFF;--on-ink:#FFFFFF;--muted:#111111"
MONO_W = "--star:#1F2A37;--star-app:#FFFFFF;--ink:#FFFFFF;--gold:#FFFFFF;--bg:#1F2A37;--on-ink:#1F2A37;--muted:#FFFFFF"

for key in ORDER:
    os.makedirs(f"{OUT}/{key}", exist_ok=True)
    name = S.DIRECTIONS[key]["name"]
    for fname, fn in ASSETS:
        body, w, h = fn(key)
        open(f"{OUT}/{key}/{fname}.svg", "w").write(S.svg(body, w, h, f"Tutoring Galaxy {name} logo: {fname}"))


def inline(fn, key, height=None, width=None, cls=""):
    body, w, h = fn(key)
    size = f'height="{height}"' if height else f'width="{width}"'
    return f'<svg class="{cls}" viewBox="0 0 {S.f(w)} {S.f(h)}" {size} aria-hidden="true">{body}</svg>'


def clearspace(key):
    body, w, h = S.horizontal(key)
    font, size = {"a-scholar": (S.NEWS, 64), "b-orbit": (S.MAN, 64), "c-seal": (S.FIG, 64), "d-crest": (S.CORM, 64 * 0.78)}[key]
    x = metrics(font[0], size, font[1])["cap"]  # clear-space unit = the wordmark's cap height
    W, H = w + 2 * x, h + 2 * x
    return (f'<svg viewBox="0 0 {S.f(W)} {S.f(H)}" class="cs" aria-label="Clear space diagram">'
            f'<rect x="0.5" y="0.5" width="{S.f(W-1)}" height="{S.f(H-1)}" fill="none" stroke="#C8922E" stroke-dasharray="6 5"/>'
            f'<rect x="{x}" y="{x}" width="{S.f(w)}" height="{S.f(h)}" fill="none" stroke="#9AA8BE" stroke-width="0.8"/>'
            f'<g transform="translate({x} {x})">{body}</g>'
            f'<g fill="#C8922E" font-family="Figtree,sans-serif" font-size="14" font-weight="700">'
            f'<text x="{x/2}" y="{H/2+5}" text-anchor="middle">x</text><text x="{W-x/2}" y="{H/2+5}" text-anchor="middle">x</text>'
            f'<text x="{W/2}" y="{x/2+5}" text-anchor="middle">x</text><text x="{W/2}" y="{H-x/2+5}" text-anchor="middle">x</text></g></svg>')


def construction(key):
    body, w, h = S.symbol(key)
    lines = "".join(f'<line x1="{i}" y1="0" x2="{i}" y2="{h}"/><line x1="0" y1="{i}" x2="{w}" y2="{i}"/>' for i in range(0, 69, 4))
    guides = (f'<g fill="none" stroke="#C8922E" stroke-width="0.35">'
              f'<line x1="32" y1="0" x2="32" y2="{h}"/><line x1="0" y1="32" x2="{w}" y2="32"/>'
              f'<circle cx="32" cy="32" r="31"/><circle cx="32" cy="32" r="21"/><circle cx="32" cy="32" r="11"/></g>')
    return (f'<svg viewBox="-2 -2 {w+4} {h+4}" class="grid" aria-label="Construction grid">'
            f'<g stroke="#9AA8BE" stroke-width="0.15" opacity=".7">{lines}</g>'
            f'<g opacity=".88">{body}</g>{guides}</svg>')


def mockups(key):
    header = (f'<div class="mock-site" style="{LIGHT}"><div class="bar">{inline(S.horizontal, key, height=30)}'
              f'<nav><span>Tutoring</span><span>Curricula</span><span>Tutors</span><span>Pricing</span></nav>'
              f'<span class="btn">Book a free trial</span></div></div>')
    avatar = (f'<div class="mock-avatar"><div class="circle" style="{LIGHT}">{inline(S.app_icon, key, width=120)}</div>'
              f'<div><b>Tutoring Galaxy</b><small>WhatsApp Business · online</small></div></div>')
    card = (f'<div class="mock-card front" style="{DARK}">{inline(S.horizontal, key, width=210)}</div>'
            f'<div class="mock-card back" style="{PAPER}">{inline(S.symbol, key, height=34)}'
            f'<div><b>Syed Waqas Ahmad</b><small>Founder &amp; CEO</small><small>+92 334 091 7037 · tutoringgalaxy.com</small></div></div>')
    return f'<div class="mocks">{header}<div class="mock-row">{avatar}{card}</div></div>'


def section(i, key):
    d = S.DIRECTIONS[key]
    rec = '<span class="rec">Recommended</span>' if key == REC else ""
    files = " · ".join(f'<a href="{key}/{n}.svg">{n}.svg</a>' for n, _ in ASSETS)
    return f'''
<section class="dir" id="{key}">
  <header><span class="num">0{i}</span><h2>{html.escape(d["name"])}</h2>{rec}</header>
  <div class="hero" style="{PAPER}">{inline(S.horizontal, key, cls="hero-logo")}</div>
  <p class="idea">{html.escape(d["idea"])}</p>

  <h3>The system</h3>
  <div class="sys">
    <figure style="{LIGHT}"><div class="fig">{inline(S.horizontal, key, width=260)}</div><figcaption>Primary: horizontal lockup<br><small>Website header, documents, email</small></figcaption></figure>
    <figure style="{LIGHT}"><div class="fig">{inline(S.stacked, key, height=120)}</div><figcaption>Stacked lockup<br><small>Square spaces, signage, social posts</small></figcaption></figure>
    <figure style="{LIGHT}"><div class="fig">{inline(S.wordmark_only, key, width=220)}</div><figcaption>Wordmark only<br><small>When the symbol is already on screen</small></figcaption></figure>
    <figure style="{LIGHT}"><div class="fig">{inline(S.symbol, key, height=96)}</div><figcaption>Symbol<br><small>Stamps, watermarks, loading states</small></figcaption></figure>
    <figure style="{LIGHT}"><div class="fig icons">{inline(S.app_icon, key, width=96)}{inline(S.app_icon, key, width=48)}{inline(S.app_icon, key, width=32)}{inline(S.app_icon, key, width=16)}</div><figcaption>App icon &amp; favicon<br><small>96 · 48 · 32 · 16 px</small></figcaption></figure>
  </div>

  <h3>Colour versions</h3>
  <div class="colors">
    <div style="{PAPER};background:#F7F4EC">{inline(S.horizontal, key, width=230)}<small>Full colour on paper</small></div>
    <div style="{DARK};background:#041C32">{inline(S.horizontal, key, width=230)}<small style="color:#B8C2CE">Reversed on navy</small></div>
    <div style="{MONO_K};background:#FFFFFF">{inline(S.horizontal, key, width=230)}<small>One colour: black</small></div>
    <div style="{MONO_W};background:#1F2A37">{inline(S.horizontal, key, width=230)}<small style="color:#D5DCE5">One colour: white</small></div>
  </div>

  <h3>Construction &amp; clear space</h3>
  <div class="rules" style="{LIGHT}">
    <div class="r1">{construction(key)}<small>Symbol on a 64-unit grid. Key curves sit on the 11/21/31 circles and the centre axes.</small></div>
    <div class="r2">{clearspace(key)}<small>Keep clear space of <b>x</b> (the wordmark's cap height) on every side. Minimum size: lockup 120px / 30mm wide, symbol 16px / 5mm.</small></div>
  </div>

  <h3>In use</h3>
  {mockups(key)}
  <p class="files">Files: {files}</p>
</section>'''


def compare_row(key):
    d = S.DIRECTIONS[key]
    return f'<div class="cmp" style="{PAPER}"><a href="#{key}">{inline(S.horizontal, key, width=250)}</a><b>{d["name"]}</b></div>'


page = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Tutoring Galaxy Logo System</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Newsreader:opsz,wght@6..72,500;6..72,600&display=swap" rel="stylesheet">
<style>
:root{{--page:#F3F1EA;--card:#FFFFFF;--text:#041C32;--muted:#4A5868;--line:#E2DCCD;--accent:#C8922E}}
@media (prefers-color-scheme:dark){{:root:not([data-theme="light"]){{--page:#06121F;--card:#0C1D30;--text:#F2EEE4;--muted:#A9B5C4;--line:#1E3249;--accent:#ECB365}}}}
:root[data-theme="dark"]{{--page:#06121F;--card:#0C1D30;--text:#F2EEE4;--muted:#A9B5C4;--line:#1E3249;--accent:#ECB365}}
*{{box-sizing:border-box}}
body{{margin:0;background:var(--page);color:var(--text);font:15px/1.6 Figtree,system-ui,sans-serif}}
.wrap{{max-width:1180px;margin:0 auto;padding:48px 16px 80px}}
h1{{font:600 clamp(32px,5vw,52px)/1.05 Newsreader,Georgia,serif;letter-spacing:-.02em;margin:0 0 12px}}
h2{{font:600 30px/1.1 Newsreader,Georgia,serif;margin:0}}
h3{{font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin:32px 0 12px}}
.lead{{color:var(--muted);max-width:780px;font-size:17px;margin:0}}
.anatomy{{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin:20px 0 0}}
.anatomy div{{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px 16px}}
.anatomy b{{display:block}} .anatomy span{{color:var(--muted);font-size:14px}}
.compare{{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px;margin-top:16px}}
.cmp{{background:#F7F4EC;border:1px solid var(--line);border-radius:14px;padding:22px 18px 12px;display:flex;flex-direction:column;gap:12px}}
.cmp svg{{max-width:100%;height:auto}} .cmp b{{color:#041C32;font-size:14px}}
.dir{{margin-top:72px;padding-top:24px;border-top:1px solid var(--line)}}
.dir>header{{display:flex;align-items:center;gap:12px;flex-wrap:wrap}}
.num{{font-weight:700;color:var(--accent);font-variant-numeric:tabular-nums}}
.rec{{background:var(--accent);color:#041C32;font-size:12px;font-weight:700;padding:3px 10px;border-radius:99px}}
.hero{{background:#F7F4EC;border-radius:18px;padding:clamp(28px,6vw,72px) 24px;margin-top:16px;display:grid;place-items:center}}
.hero-logo{{width:min(620px,100%);height:auto}}
.idea{{max-width:820px;margin:16px 0 0;font-size:16px}}
.sys{{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px}}
figure{{margin:0;background:#FFFFFF;border:1px solid var(--line);border-radius:14px;overflow:hidden}}
.fig{{height:170px;display:flex;align-items:center;justify-content:center;gap:14px;padding:16px}}
.fig svg{{max-width:100%;height:auto}}
figcaption{{border-top:1px solid #ECE7DA;padding:10px 14px;font-weight:600;font-size:14px;color:#041C32;background:#FBFAF6}}
figcaption small{{font-weight:400;color:#4A5868}}
.icons{{align-items:flex-end}}
.colors{{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px}}
.colors>div{{border-radius:14px;padding:30px 18px 12px;display:flex;flex-direction:column;gap:18px;align-items:center;border:1px solid var(--line)}}
.colors svg{{max-width:100%;height:auto}} .colors small{{color:#4A5868;align-self:flex-start;font-size:12px}}
.rules{{display:grid;grid-template-columns:1fr 2fr;gap:12px}}
.rules>div{{background:#FFFFFF;border:1px solid var(--line);border-radius:14px;padding:16px;display:flex;flex-direction:column;gap:10px}}
.rules small{{color:#4A5868}} .grid{{width:100%;max-width:260px;align-self:center}} .cs{{width:100%;height:auto}}
.mocks{{display:flex;flex-direction:column;gap:12px}}
.mock-site{{border:1px solid var(--line);border-radius:14px;overflow:hidden;background:#FFFFFF}}
.bar{{display:flex;align-items:center;gap:20px;padding:16px 20px;border-bottom:1px solid #ECE7DA}}
.bar nav{{display:flex;gap:18px;margin-left:auto;color:#4A5868;font-size:14px}}
.btn{{background:#0F4C81;color:#fff;font-weight:600;font-size:14px;padding:8px 14px;border-radius:8px;white-space:nowrap}}
.mock-row{{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}}
.mock-avatar{{background:#E9F5EE;border:1px solid var(--line);border-radius:14px;padding:18px;display:flex;align-items:center;gap:14px;color:#0B3B2A}}
.mock-avatar .circle{{width:76px;height:76px;border-radius:50%;overflow:hidden;flex:none}}
.mock-avatar .circle svg{{width:76px;height:76px;display:block}}
.mock-avatar small{{display:block;color:#3E6B57}}
.mock-card{{border-radius:12px;aspect-ratio:1.75;padding:20px;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 2px rgba(4,28,50,.08),0 8px 24px rgba(4,28,50,.10)}}
.mock-card.front{{background:#041C32}} .mock-card.front svg{{max-width:90%;height:auto}}
.mock-card.back{{background:#F7F4EC;justify-content:flex-start;align-items:flex-end;gap:14px;color:#041C32}}
.mock-card.back small{{display:block;color:#4A5868;font-size:11px}} .mock-card.back b{{font-size:14px}}
.files{{font-size:13px;color:var(--muted);margin-top:16px}} a{{color:inherit}}
ol{{color:var(--muted);padding-left:20px}} ol b{{color:var(--text)}}
@media (max-width:800px){{.rules,.mock-row{{grid-template-columns:1fr}}.bar nav{{display:none}}}}
</style></head>
<body><div class="wrap">
<h1>Tutoring Galaxy logo system</h1>
<p class="lead">Four professional directions, built the way identity studios work. Each wordmark is set in a real typeface and converted to outlines, with letter spacing tuned and one custom detail added. Each comes with a symbol, lockups, an app icon, colour versions, construction and clear-space rules, and real-world mockups.</p>

<h3>What a logo system is made of</h3>
<div class="anatomy">
  <div><b>Wordmark</b><span>The name, set in a chosen typeface, outlined and spaced by hand. Most of the brand's recognition lives here.</span></div>
  <div><b>Custom detail</b><span>One small, ownable change to the letterforms, so it isn't just "a font".</span></div>
  <div><b>Symbol</b><span>A compact mark for where the name doesn't fit: app icons, favicons, WhatsApp, stamps.</span></div>
  <div><b>Lockups</b><span>Fixed arrangements of symbol and wordmark (horizontal and stacked) with set spacing.</span></div>
  <div><b>Rules</b><span>Clear space, minimum sizes and approved colour versions, so it never gets distorted or crowded.</span></div>
  <div><b>Colour &amp; type</b><span>Ink navy #041C32, gold #C8922E (light) / #ECB365 (dark), paper #F7F4EC, from the inspiration palette.</span></div>
</div>

<h3>The four directions</h3>
<div class="compare">{"".join(compare_row(k) for k in ORDER)}</div>

{"".join(section(i, k) for i, k in enumerate(ORDER, 1))}

<section class="dir"><h2>Recommendation &amp; next steps</h2>
<p class="idea"><b>Scholar</b> fits the brief best. It matches the calm, academic direction from the inspiration round (Newsreader with navy and gold), it reads as premium to parents comparing tutors, and the star-dot is subtle enough to stay timeless. <b>Seal</b> is the strongest alternative if the client wants a bolder, more corporate symbol.</p>
<ol>
  <li><b>Choose a direction</b>, or combine them (for example the Scholar wordmark with the Seal symbol).</li>
  <li><b>Refine:</b> optical kerning pairs, star size per size range, and a simplified favicon drawing.</li>
  <li><b>Deliver the kit:</b> final SVG/PDF/PNG masters, favicon.ico and app icons, OG images, social and WhatsApp avatars, and a one-page brand guideline.</li>
</ol>
<p class="files">Typefaces (all free, Google Fonts, OFL): Newsreader, Manrope, Figtree, Cormorant Garamond. Wordmarks are outlined, so no font is needed to display the files.</p>
</section>
</div></body></html>'''
open(f"{OUT}/index.html", "w").write(page)
print("ok")
