import { defineConfig } from "vite";
import { resolve } from "node:path";
import { readdirSync, existsSync } from "node:fs";

const rootDir = import.meta.dirname;
const conceptsDir = resolve(rootDir, "concepts");

const conceptInputs = existsSync(conceptsDir)
  ? readdirSync(conceptsDir).reduce<Record<string, string>>((inputs, folder) => {
      const htmlPath = resolve(conceptsDir, folder, "index.html");
      if (existsSync(htmlPath)) {
        inputs[folder] = htmlPath;
      }
      return inputs;
    }, {})
  : {};

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, "index.html"),
        ...conceptInputs,
      },
    },
  },
});
