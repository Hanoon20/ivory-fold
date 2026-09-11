# Digital wedding invitation

A single-page, mobile-first invitation that opens like a gatefold card.
No frameworks, no build step. Three files plus assets.

```
index.html      markup + the floral SVG sprite
style.css       all styling, tokens at the top
script.js       EASY EDIT ZONE (all wedding data) + behaviour
assets/
  images/       couple.jpg, share-preview.jpg
  floral/       corner-spray.svg, medallion-sprig.svg, divider.svg
  fonts/        (empty — only needed if you self-host the fonts)
  audio/        (empty — drop theme.mp3 here if you want music)
```

## 1. Images to replace

| File | Size | Used for |
|---|---|---|
| `assets/images/couple.jpg` | 900 × 1200 (3:4 portrait) | the photo section |
| `assets/images/share-preview.jpg` | 1200 × 630 | the WhatsApp / Facebook link preview |

Keep the same filenames and you don't have to touch any code.
Export both as JPG at quality 75–82 and keep each under ~250 KB — most guests
open this on mobile data.

## 2. Floral assets

The flowers are drawn as SVG inside `index.html` (the `<svg class="sprite">`
block), so there are no image downloads for them. The same art is saved in
`assets/floral/` for reference and for editing in Illustrator / Figma.

To use your own art: open `assets/floral/corner-spray.svg` in your editor,
replace the drawing, then copy the new paths back into `#spray` inside
`index.html`. Keep the `260 × 360` viewBox so the placement still works.
Do the same for `#sprig` (medallion) and `#rule` (divider).

Draw as **line art with light fills, no colour** — the embossed look comes from
the three copies in `#spray-emb`: a shadow copy pushed down, a highlight copy
pushed up, and the face on top.

## 3. Fonts

Cormorant Garamond (headings and body) and Parisienne (script accents), loaded
from Google Fonts in `<head>`.

To self-host: download both from fonts.google.com, put the `.woff2` files in
`assets/fonts/`, remove the three `<link>` tags and add `@font-face` rules at
the top of `style.css`.

## 4. Where assets go

Photos → `assets/images/` · flowers → `assets/floral/` · music →
`assets/audio/` · self-hosted fonts → `assets/fonts/`.
All filenames lowercase, no spaces — Netlify is case-sensitive.

## 5. What to edit for a new wedding

Everything is in one place: the **EASY EDIT ZONE** at the top of `script.js`.

- names, `heroKicker`, `openLabel`
- `dayName`, `dateLine`, `timeLine`, and `dateISO` (drives the countdown)
- `venueName`, `venueAddress`, `cityLine`, `mapsUrl`
- `message`, `brideParents`, `groomParents`, `photoCaption`, `signoff`
- section headings (`eventsTitle`, `countTitle`, `venueTitle`, `rsvpTitle`, `rsvpNote`)
- `events` — add or remove entries freely
- `photo`, `photoAlt`
- `whatsappNumber` (country code, digits only), `rsvpMessage`, `contactMessage`
- `musicFile` — leave `""` to hide the player
- `pageTitle`, `shareBlurb` for the browser tab and link preview

Colours live in `:root` at the top of `style.css` — `--paper`, `--paper-lo`,
`--ink`, `--emb-shade`, `--emb-light`, `--emb-face`. Changing those four paper
and emboss values re-themes the whole card.

## 6. Deploy to Netlify

Drag and drop:

1. Zip the folder (or just drag the folder itself).
2. Go to app.netlify.com → **Add new site → Deploy manually**.
3. Drop the folder. Done — it's live.

From GitHub:

1. Push the folder to a repo.
2. Netlify → **Add new site → Import an existing project** → pick the repo.
3. Build command: leave empty. Publish directory: `/` (or the folder name).
4. **Site settings → Domain management** to set a subdomain,
   e.g. `ayesha-imran.yoursite.com`.

Then share the link on WhatsApp. The `share-preview.jpg` is what shows in the
chat bubble, so replace it before sending.

## Notes

- The card opens on tap; keyboard users get the same via the focused button.
- `prefers-reduced-motion` is respected: no fold animation, no reveals.
- Audio never autoplays — the control only appears after the card is opened,
  and only when `musicFile` is set.
