// @ts-check
import { defineConfig } from "eslint/config";
import base from "./base";

export default defineConfig([
  base,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-control-regex": "off",
    },
  },
]);
