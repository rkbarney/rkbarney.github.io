import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { rssPlugin } from "./plugins/rss";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), rssPlugin()],
  base: "/",
});
