# wanderlust

A photobook of my adventures on the web, in the visual language of Gestalten's
*Wanderlust: Hiking on Legendary Trails*. Static site, built with Astro,
published to GitHub Pages at
**<https://rigidlab.github.io/wanderlust/>**.

One book, many trails. Each trip is a chapter.

Every chapter reads two ways, from the same content:

| View | URL | Behaviour |
|------|-----|-----------|
| **Book** (default) | `/trails/<slug>/` | Full-viewport pages, arrow keys / swipe / buttons. Two-page spreads in landscape, one photograph per page in portrait |
| Scrolling | `/scroll/<slug>/` | Long-form vertical page, better for skimming |

---

## TL;DR — add a trip

```bash
mkdir -p src/content/trails/02-wonderland/photos   # 1. directory
cp docs/trail-template.md src/content/trails/02-wonderland/index.md
# 2. copy your JPEGs (sRGB, 2560px long edge) into photos/
npm run dev                                         # 3. http://localhost:4321/wanderlust/
```

Then edit `index.md`. Top half = the facts, bottom half = the layout:

```yaml
---
title: The Wonderland Trail
region: Mount Rainier, Washington
country: United States
order: 2                              # position in the book
cover: ./photos/01-rainier.jpg
stats:
  length: 150 km                      # any of these can be left out
  duration: 10 days
intro: One or two sentences, set large under the title.

spreads:                              # the layout, top to bottom
  - type: bleed                       # 1 photo, full width
    photo: ./photos/02-glacier.jpg
    caption: Optional.

  - type: duo                         # 2 photos side by side
    photos: [./photos/03.jpg, ./photos/04.jpg]

  - type: triptych                    # 3 photos: 1 tall + 2 stacked
    photos: [./photos/05.jpg, ./photos/06.jpg, ./photos/07.jpg]

  - type: text-image                  # prose next to 1 photo
    photo: ./photos/08.jpg
    side: left                        # or right (default)
    heading: Optional
    text: Your words here.

  - type: quote                       # big serif pull quote
    text: The mountains are calling and I must go.
    attribution: John Muir
---

Prose for the chapter goes here.
```

Save, and the browser reloads. Repeat `- type:` blocks in any order, as many
times as you like. `git push` publishes it.

**Want a different look?** Edit `src/styles/tokens.css` — colours, fonts and
spacing for the whole book live there.

Everything below is detail.

---

## Develop

Requires Node 22+.

```bash
npm install
npm run dev       # http://localhost:4321/wanderlust/
npm run build     # → dist/
npm run check     # type-check content schema and components
```

The dev server runs detached, so the terminal returns immediately:

```bash
npx astro dev status
npx astro dev logs
npx astro dev stop
```

Note the URL includes `/wanderlust/` — the site is served from a project
subpath, so the bare root will 404.

---

## Adding a trail

Three steps, no code changes.

**1. Make the directory**

```bash
mkdir -p src/content/trails/02-wonderland/photos
cp docs/trail-template.md src/content/trails/02-wonderland/index.md
```

Directory name becomes the URL: `/wanderlust/trails/02-wonderland/` for the
book, `/wanderlust/scroll/02-wonderland/` for the scrolling version.

**2. Add photographs**

Web masters only: sRGB JPEG, **2560px on the long edge**, quality ~82. See
[Preparing photographs](#preparing-photographs). Drop them in `photos/`.

**3. Fill in the frontmatter**

```yaml
title: The Wonderland Trail
region: Mount Rainier, Washington
country: United States
order: 2                          # sequence in the book
cover: ./photos/01-rainier.jpg    # chapter opener + contents thumbnail
stats:
  length: 150 km
  duration: 10 days
  elevation: 6,700 m
  difficulty: Strenuous
  season: Late July to September
intro: >-
  A standfirst - one or two sentences, set large under the chapter title.
spreads:
  - type: bleed
    photo: ./photos/02-summerland.jpg
    caption: Optional.
```

Then write the chapter's prose in the Markdown body below the frontmatter.

The dev server hot-reloads as you save.

### Frontmatter reference

| Field | Required | Notes |
|-------|----------|-------|
| `title` | yes | Chapter title, set large over the opener |
| `region`, `country` | yes | The letterspaced location line |
| `order` | yes | Sequence in the book; **lowest also becomes the site cover** |
| `cover` | yes | Opener image and contents thumbnail |
| `intro` | yes | Standfirst under the chapter title |
| `stats` | yes | All five sub-fields optional; empty ones are not rendered |
| `spreads` | no | Defaults to empty |
| `draft` | no | `true` hides the chapter from the built site |

`stats` accepts `length`, `duration`, `elevation`, `difficulty`, `season`.
Write them as display strings (`29 km`, not `29`) — they are printed verbatim.

### The spread vocabulary

Compose each chapter from these five. The variation between them is the
design; alternating wide and quiet spreads is what makes it read as a book
rather than a gallery.

| Type | Fields | Layout |
|------|--------|--------|
| `bleed` | `photo`, `caption?` | One photograph, edge to edge |
| `duo` | `photos` (exactly 2), `caption?` | Side by side, matched heights |
| `triptych` | `photos` (exactly 3), `caption?` | One tall left, two stacked right |
| `text-image` | `photo`, `text`, `heading?`, `caption?`, `side?` | Prose column beside a photograph. `side: left \| right`, default `right` |
| `quote` | `text`, `attribution?` | Oversized serif pull quote on bare paper |

```yaml
  - type: duo
    photos:
      - ./photos/03-glacier.jpg
      - ./photos/04-meadow.jpg

  - type: text-image
    side: left
    photo: ./photos/05-tarn.jpg
    heading: The high traverse
    text: |-
      Blank line between paragraphs. Keep it short - the photographs
      carry the chapter.

  - type: quote
    text: The mountains are calling and I must go.
    attribution: John Muir
```

### If the build fails

The schema in `src/content.config.ts` validates every chapter at build time,
so mistakes surface as build errors naming the exact file and field rather
than as broken pages:

```
[ImageNotFound] Could not find requested image `./photos/cover.jpg`. Does it exist?
```

Common causes: a filename typo, a `duo` given one or three photographs, a
missing `intro`.

---

## Preparing photographs

Commit **web masters only** — sRGB JPEG, 2560px long edge, quality ~82,
roughly 0.5-1.5MB each. Keep RAW and full-resolution exports outside the repo
(`originals/` is gitignored). The build generates AVIF, WebP and JPEG at six
widths from each master, so one file per photograph is all the repo needs.

With ImageMagick:

```bash
magick mogrify -path out/ -colorspace sRGB -resize 2560x2560\> \
  -quality 82 -strip *.jpg
```

Rotate first if your camera writes EXIF orientation — `-auto-orient` before
`-strip`, or the stripped file may display sideways.

Videos are not supported; the book is stills only.

---

## Customizing the look

Three layers, in increasing order of effort.

### 1. Tokens — `src/styles/tokens.css`

The whole book's identity is about thirty values: paper and ink colours, one
accent, the type pairing, a fluid type scale, the page gutter, and the space
between spreads. Components read these and never hardcode colour or spacing,
so this is the only file to touch for a different look.

```css
--paper: #f7f5f0;      /* never pure white */
--ink: #1a1a18;        /* never pure black */
--accent: #7a6a52;     /* pull one colour from your photographs */
--font-display: "Playfair Display", Georgia, serif;
--font-body: "Inter", -apple-system, sans-serif;
--space-2xl: clamp(6rem, 12vw, 12rem);   /* paper between spreads */
--measure: 34rem;                         /* text column width */
```

Fonts load from Google Fonts in `src/layouts/Book.astro`. Change the family
names in both places, or self-host to drop the third-party request.

### 2. Spread rhythm — per chapter, in frontmatter

No code. Reorder, swap types, add breathing room. This is where most of the
design work actually happens.

### 3. New spread types — three edits

1. Add a variant to the `z.discriminatedUnion` in `src/content.config.ts`
2. Write `src/components/spreads/YourType.astro`
3. Add a case to `src/components/Spread.astro`

Roughly thirty lines for something like a full-bleed spread with the title
overlaid, or a map spread. Copy the closest existing component as a starting
point.

---

## Layout

```
src/
├── content.config.ts              schema: frontmatter + spread vocabulary
├── content/trails/<NN>-<slug>/    one directory per chapter
│   ├── index.md                   frontmatter + prose
│   └── photos/                    web masters
├── styles/tokens.css              the entire look
├── components/
│   ├── Photo.astro                single place images are emitted
│   ├── ChapterOpener.astro        full-bleed + title + rule + place
│   ├── DataBlock.astro            LENGTH / DURATION / ELEVATION grid
│   ├── Spread.astro               frontmatter type → component
│   └── spreads/                   Bleed, Duo, Triptych, TextImage, Quote
├── layouts/Book.astro             page shell, fonts, colophon
└── pages/
    ├── index.astro                cover + contents
    └── trails/[...slug].astro     chapter route
```

---

## Deploy

Push to `main`. `.github/workflows/deploy.yml` builds and publishes to GitHub
Pages; pull requests get a build check without publishing.

Builds take ~13 minutes because every image derivative is regenerated from
scratch on each run.

The site is served from `https://rigidlab.github.io/wanderlust/`, which is why
`astro.config.mjs` sets `base: "/wanderlust"`. On a custom domain, set `site`
to the domain and remove `base`.
