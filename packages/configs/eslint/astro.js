// @ts-check
import { defineConfig, globalIgnores } from "eslint/config";
import base from "./base";

import pluginAstro from "eslint-plugin-astro";

export default defineConfig([
  base,
  globalIgnores([".astro/**/*"]),
  pluginAstro.configs["flat/jsx-a11y-recommended"],
]);
