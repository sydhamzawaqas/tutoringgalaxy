# Logo system source

These scripts regenerate the SVGs and `../index.html`.

```bash
pip install fonttools uharfbuzz
# put the Google Fonts TTFs in ./fonts: Newsreader, Manrope, Figtree, Cormorant Garamond
# (from github.com/google/fonts, ofl/<family>/)
python3 build_system.py ..
```

- `typeset.py` shapes text with HarfBuzz, so each font's own kerning is applied, and outlines the glyphs with fontTools.
- `system.py` defines the 4 directions: wordmark, custom detail, symbol, lockups and app icon.
- `build_system.py` exports the SVG files and the presentation page.
