// @ts-check
import { defineConfig } from "astro/config";

// Project site published at https://rigidlab.github.io/wanderlust/
// If this ever moves to a custom domain, set `site` to it and drop `base`.
export default defineConfig({
  site: "https://rigidlab.github.io",
  base: "/wanderlust",
  trailingSlash: "always",
  // Default is node_modules/.astro, which `npm ci` deletes before every CI
  // build - so the generated image derivatives could never be cached. Moving
  // it out of node_modules lets CI restore it between runs.
  cacheDir: "./.astro-cache",
  build: {
    inlineStylesheets: "auto",
  },
});
