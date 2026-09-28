import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import {resolve} from 'node:path';

export default defineConfig({
  plugins: [tailwindcss()],
  base: "~moreaurg/projet1/",
  input: {
    index: resolve(import.meta.dirname, "index.html"),
    merci: resolve(import.meta.dirname, "merci.html"),
  }
});
