import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "./", // เปลี่ยนจาก "/" เป็น "./"
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  server: {
    proxy: {
      "/api": {
        target: "https://blogpost-server-delta.vercel.app/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});