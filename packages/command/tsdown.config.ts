import base from "../../tsdown.base.config.ts";
import { defineConfig } from "tsdown";

export default defineConfig({
  ...base,
  entry: ["./src/index.ts"],
});
