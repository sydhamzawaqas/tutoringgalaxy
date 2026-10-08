"""Text -> outlined SVG path, with real shaping/kerning (HarfBuzz) and variable-font instancing."""
import io, functools, os
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

FONTS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts")


@functools.lru_cache(maxsize=None)
def instance(file, axes=()):
    f = TTFont(os.path.join(FONTS, file))
    if "fvar" in f and axes:
        f = instancer.instantiateVariableFont(f, dict(axes), inplace=False)
    elif "fvar" in f:
        f = instancer.instantiateVariableFont(f, {a.axisTag: a.defaultValue for a in f["fvar"].axes}, inplace=False)
    buf = io.BytesIO(); f.save(buf)
    data = buf.getvalue()
    return TTFont(io.BytesIO(data)), data


def shape(file, text, axes=(), features=None):
    font, data = instance(file, tuple(sorted(axes.items())) if isinstance(axes, dict) else axes)
    face = hb.Face(data); hbf = hb.Font(face)
    b = hb.Buffer(); b.add_str(text); b.guess_segment_properties()
    hb.shape(hbf, b, features or {"kern": True, "liga": True})
    order = font.getGlyphOrder()
    return font, [(order[i.codepoint], p.x_advance, p.x_offset, p.y_offset) for i, p in zip(b.glyph_infos, b.glyph_positions)]


def text_path(file, text, size, x=0, y=0, axes=None, tracking=0, kern_overrides=None):
    """Return (svg_path_d, advance_width, bounds) for text with baseline at y.
    tracking: in 1/1000 em. kern_overrides: {index: extra units(1/1000 em)} added after glyph index."""
    font, glyphs = shape(file, text, axes or {})
    upm = font["head"].unitsPerEm
    s = size / upm
    gs = font.getGlyphSet()
    pen = SVGPathPen(gs)
    bp = BoundsPen(gs)
    cx = 0
    for idx, (name, adv, xo, yo) in enumerate(glyphs):
        t = (s, 0, 0, -s, x + (cx + xo) * s, y - yo * s)
        gs[name].draw(TransformPen(pen, t))
        gs[name].draw(TransformPen(bp, t))
        cx += adv + tracking * upm / 1000 + (kern_overrides or {}).get(idx, 0) * upm / 1000
    width = (cx - tracking * upm / 1000) * s
    return pen.getCommands(), width, bp.bounds


def metrics(file, size, axes=None):
    font, _ = instance(file, tuple(sorted((axes or {}).items())))
    os2 = font["OS/2"]; upm = font["head"].unitsPerEm
    return {"cap": os2.sCapHeight * size / upm, "x": os2.sxHeight * size / upm,
            "asc": font["hhea"].ascent * size / upm, "desc": -font["hhea"].descent * size / upm}


def layout(file, text, size, x=0, y=0, axes=None, tracking=0, kern=None):
    """Per-glyph layout: list of dicts {name, char_index, x, d, bounds} plus total width.
    kern: {glyph_index: extra 1/1000 em added after that glyph}."""
    font, glyphs = shape(file, text, axes or {})
    upm = font["head"].unitsPerEm; s = size / upm
    gs = font.getGlyphSet(); out = []; cx = 0
    for idx, (name, adv, xo, yo) in enumerate(glyphs):
        t = (s, 0, 0, -s, x + (cx + xo) * s, y - yo * s)
        pen = SVGPathPen(gs); bp = BoundsPen(gs)
        gs[name].draw(TransformPen(pen, t)); gs[name].draw(TransformPen(bp, t))
        out.append({"name": name, "x": x + cx * s, "adv": adv * s, "d": pen.getCommands(), "bounds": bp.bounds})
        cx += adv + tracking * upm / 1000 + (kern or {}).get(idx, 0) * upm / 1000
    return out, (cx - tracking * upm / 1000) * s
