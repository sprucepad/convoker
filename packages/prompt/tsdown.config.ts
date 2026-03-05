import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/prompts/index.ts", "./src/core/index.ts"],
  format: ["esm", "cjs"],
  dts: {
    sourcemap: true,
  },
  sourcemap: true,
});
