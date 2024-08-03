import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({ manifest })],
})

const manifest = {
  registerType: 'prompt',
  includeAssets: ['favicon.ico'],
  manifest: {
    name: "Distribuidora",
    short_name: "STORE",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    description: "Distribuidora",
    icons: [
      {
        src: "/warehouse_192x192.webp",
        sizes: "192x192",
        type: "image/webp",
      },
      {
        src: "/warehouse_512x512.webp",
        sizes: "512x512",
        type: "image/webp",
      },
    ],
  },
};