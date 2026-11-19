import { defineConfig } from "tsdown";

export default defineConfig({
  format: ["esm", "cjs"],
  minify: true,
  dts: {
    sourcemap: true,
  },
  sourcemap: true,
  outputOptions: {
    sourcemapExcludeSources: true,
  },

  inputOptions: {
    experimental: {
      resolveNewUrlToAsset: true,
    },
  },
});
