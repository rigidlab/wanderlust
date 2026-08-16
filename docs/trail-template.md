---
# Copy this file to src/content/trails/<NN>-<slug>/index.md and put the
# photographs alongside it in a photos/ subdirectory.
title: The Enchantments
region: Alpine Lakes Wilderness, Washington
country: United States
order: 1

# Chapter opener image. Also used as the thumbnail on the contents page.
cover: ./photos/01-colchuck-dawn.jpg

# The data block. Any field can be omitted; empty ones are not rendered.
stats:
  length: 29 km
  duration: 1-2 days
  elevation: 1,400 m
  difficulty: Strenuous
  season: Late July to October

# Standfirst, set large under the chapter title.
intro: >-
  A single day through granite basins, past eight lakes the colour of glacier
  melt, over a pass that gains six hundred metres in less than two kilometres.

# The spreads, in the order they appear. Five types are available:
#   bleed       - one photograph, edge to edge
#   duo         - two photographs side by side, matched heights
#   triptych    - one tall photograph, two stacked against it
#   text-image  - prose column beside a portrait photograph (side: left|right)
#   quote       - oversized serif pull quote on bare paper
spreads:
  - type: bleed
    photo: ./photos/02-aasgard-pass.jpg
    caption: The last switchbacks below Aasgard Pass, just before first light.

  - type: duo
    photos:
      - ./photos/03-mountain-goat.jpg
      - ./photos/04-larches.jpg
    caption: Left, a goat unbothered by the hour. Right, larches turning.

  - type: text-image
    side: right
    photo: ./photos/05-core.jpg
    heading: The core
    text: |-
      Above the pass the trail stops pretending to be a trail. Cairns lead
      across bare granite between lakes that have no outlet anyone can see.

      Nothing grows here that is taller than a boot.
    caption: Inspiration Lake, mid-morning.

  - type: quote
    text: The mountains are calling and I must go.
    attribution: John Muir

  - type: triptych
    photos:
      - ./photos/06-tarn.jpg
      - ./photos/07-boulder.jpg
      - ./photos/08-descent.jpg
---

The body of this file is Markdown and is set as the chapter's prose, in a
narrow column under the data block. Keep it short - two or three paragraphs.
The photographs carry the chapter.

## Getting there

Sub-headings are available if a chapter needs practical notes.
