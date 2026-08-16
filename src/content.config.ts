import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";
import type { ImageFunction } from "astro:content";

/**
 * A chapter is one directory under src/content/trails/:
 *
 *   src/content/trails/01-enchantments/
 *     index.md          <- frontmatter below + prose body
 *     photos/*.jpg      <- referenced by relative path from index.md
 *
 * Adding a trail means adding a directory. No code changes.
 */

const spread = (image: ImageFunction) =>
  z.discriminatedUnion("type", [
    // One photograph, edge to edge. The workhorse.
    z.object({
      type: z.literal("bleed"),
      photo: image(),
      caption: z.string().optional(),
    }),
    // Two photographs side by side, matched heights.
    z.object({
      type: z.literal("duo"),
      photos: z.tuple([image(), image()]),
      caption: z.string().optional(),
    }),
    // Three photographs: one tall left, two stacked right.
    z.object({
      type: z.literal("triptych"),
      photos: z.tuple([image(), image(), image()]),
      caption: z.string().optional(),
    }),
    // Prose column beside a single portrait photograph.
    z.object({
      type: z.literal("text-image"),
      photo: image(),
      heading: z.string().optional(),
      text: z.string(),
      caption: z.string().optional(),
      side: z.enum(["left", "right"]).default("right"),
    }),
    // Oversized serif pull quote on bare paper.
    z.object({
      type: z.literal("quote"),
      text: z.string(),
      attribution: z.string().optional(),
    }),
  ]);

const trails = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./src/content/trails" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      region: z.string(),
      country: z.string(),
      order: z.number(),
      // Chapter opener image, shown on the contents page and as the opener.
      cover: image(),
      // The signature data block. Any field may be omitted.
      stats: z.object({
        length: z.string().optional(),
        duration: z.string().optional(),
        elevation: z.string().optional(),
        difficulty: z.string().optional(),
        season: z.string().optional(),
      }),
      // Standfirst set under the chapter title.
      intro: z.string(),
      spreads: z.array(spread(image)).default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { trails };
