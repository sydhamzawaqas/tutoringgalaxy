# Tutoring Galaxy logo (Orbit)

The primary logo is the **wordmark**: "tutoring galaxy" in Manrope Bold, outlined, with the first "o" redrawn
as an orbit and a gold moon. The orbit already lives inside the name, so the wordmark is never placed next
to the symbol. The **symbol** (orbit + moon) is used on its own only where the name doesn't fit: app icon,
favicon, social and WhatsApp avatars.

| File | Use |
|---|---|
| `wordmark.svg` | Default, on white or light backgrounds |
| `wordmark-reversed.svg` | On ink navy or dark photos |
| `wordmark-black.svg` / `wordmark-white.svg` | One-colour print, stamps, embroidery |
| `wordmark-descriptor.svg` | With "Home & online tutoring", for ads and signage |
| `symbol.svg` / `symbol-reversed.svg` | Avatars, watermarks, 32px and up |
| `symbol-small.svg`, `app-icon-small.svg` | Heavier cut for 16–32px |
| `app-icon.svg`, `png/app-icon-*.png` | App icons, PWA, social avatars |
| `png/favicon.ico` | Browser tab (16/32/48) |

**Colours:** Ink `#14284B` · Star gold `#E0A21B` (on dark: white with gold `#F2C14E`).

**Clear space:** the height of the "o" on every side. **Minimum size:** wordmark 96px / 25mm wide;
below that, use the symbol.

**Don't:** recolour the moon in other colours, add the symbol before the wordmark, stretch, outline, add shadows
or gradients, or retype the name in a font.

Regenerate with `source/build_logo.py` (needs `fonttools`, `uharfbuzz` and Manrope from github.com/google/fonts,
placed in `source/fonts/`).
