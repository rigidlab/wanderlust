// @ts-check
import { defineConfig } from "astro/config";

// Project site published at https://rigidlab.github.io/wanderlust/
// If this ever moves to a custom domain, set `site` to it and drop `base`.
export default defineConfig({
  site: "https://rigidlab.github.io",
  base: "/wanderlust",
  trailingSlash: "always",
  build: {
    inlineStylesheets: "auto",
  },
});
