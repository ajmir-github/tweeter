import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

import { VitePWA } from "vite-plugin-pwa";

const manifestIcons = [
  {
    src: "icons/logo-48x48.png",
    sizes: "48x48",
    type: "image/png",
  },
  {
    src: "icons/logo-72x72.png",
    sizes: "72x72",
    type: "image/png",
  },
  {
    src: "icons/logo-96x96.png",
    sizes: "96x96",
    type: "image/png",
  },
  {
    src: "icons/logo-128x128.png",
    sizes: "128x128",
    type: "image/png",
  },
  {
    src: "icons/logo-144x144.png",
    sizes: "144x144",
    type: "image/png",
  },
  {
    src: "icons/logo-152x152.png",
    sizes: "152x152",
    type: "image/png",
  },
  {
    src: "icons/logo-192x192.png",
    sizes: "192x192",
    type: "image/png",
  },
  {
    src: "icons/logo-256x256.png",
    sizes: "256x256",
    type: "image/png",
  },
  {
    src: "icons/logo-384x384.png",
    sizes: "384x384",
    type: "image/png",
  },
  {
    src: "icons/logo-512x512.png",
    sizes: "512x512",
    type: "image/png",
  },
];

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Tamas",
        short_name: "Tamas",
        icons: manifestIcons,
        display: "fullscreen",
        background_color: "",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
