# wanderlust

A photobook of my adventures on the web, in the visual language of Gestalten's
*Wanderlust: Hiking on Legendary Trails*. Static site, built with Astro,
published to GitHub Pages.

## Adding a trail

One directory per chapter. No code changes.

```
src/content/trails/01-enchantments/
├── index.md            frontmatter + prose
└── photos/
    ├── 01-colchuck-dawn.jpg
    └── ...
```

Copy `docs/trail-template.md` to `index.md`, point the frontmatter at your
photographs, and compose the chapter from the spread vocabulary:

| Type | Layout |
|------|--------|
| `bleed` | One photograph, edge to edge |
| `duo` | Two photographs side by side, matched heights |
| `triptych` | One tall photograph, two stacked against it |
| `text-image` | Prose column beside a portrait photograph |
| `quote` | Oversized serif pull quote on bare paper |

The schema in `src/content.config.ts` validates every chapter at build time, so
a typo or a missing photograph fails the build rather than the page.

## Photographs

Commit **web masters only**: sRGB JPEG, 2560px on the long edge, quality ~85.
Keep RAW and full-resolution exports outside the repo (`originals/` is
ignored). The build generates AVIF, WebP and JPEG at six widths from each
master, so a single file per photograph is all the repo needs.

Resize with ImageMagick:

```bash
magick original.jpg -colorspace sRGB -resize 2560x2560\> -quality 85 -strip out.jpg
```

## Design

Everything visual is tokenised in `src/styles/tokens.css` - paper and ink
colours, the type scale, the spacing rhythm, the page gutter. Change the book's
look there, not in the components.

## Develop

Requires Node 22+.

```bash
npm install
npm run dev       # http://localhost:4321/wanderlust/
npm run build     # → dist/
npm run check     # type-check the content schema and components
```

## Deploy

Push to `main`. `.github/workflows/deploy.yml` builds and publishes to GitHub
Pages; pull requests get a build check without publishing.

One-time setup: **Settings → Pages → Source → GitHub Actions**.

The site is served from `https://rigidlab.github.io/wanderlust/`, which is why
`astro.config.mjs` sets `base: "/wanderlust"`. On a custom domain, set `site`
to the domain and remove `base`.
