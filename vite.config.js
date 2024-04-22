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
    description: "My first Progressive Web App",
    icons: [
      {
        src: "/warehouse_192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/warehouse_512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
};