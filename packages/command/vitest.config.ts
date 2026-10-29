import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  ssr: { resolve: { conditions: ["::convoker/source"] } },
});
