import { defineConfig } from "tsdown";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/log.ts",
    "src/prompt/index.ts",
    "src/prompt/core.ts",
    "src/theme/index.ts",
    "src/theme/global.ts",
    "src/theme/utils.ts",
  ],
  format: ["esm", "cjs"],
  dts: {
    sourcemap: true,
  },
  outputOptions: {
    sourcemapExcludeSources: true,
  },
  sourcemap: true,
});
