import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/portfolio/" : "/",
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (id.includes("react-router-dom/") || id.includes("@remix-run/")) {
            return "router";
          }

          if (id.includes("gsap/") || id.includes("lenis/")) {
            return "motion";
          }

          if (
            id.includes("recharts/") ||
            id.includes("d3-") ||
            id.includes("victory-vendor/")
          ) {
            return "charts";
          }

          if (id.includes("lucide-react/")) {
            return "icons";
          }

          if (id.includes("@radix-ui/")) {
            return "radix-ui";
          }

          if (
            id.includes("@react-three/") ||
            id.includes("three/") ||
            id.includes("maath/")
          ) {
            return "three";
          }

          if (
            id.includes("react-hook-form/") ||
            id.includes("@hookform/") ||
            id.includes("zod/")
          ) {
            return "forms";
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
