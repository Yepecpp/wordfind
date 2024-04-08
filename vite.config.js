import { defineConfig } from 'vite';
import { VitePWA } from "vite-plugin-pwa";
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: "autoUpdate",
    devOptions: { enabled: true },
    manifest: {
      name: "WordFind",
      short_name: "WordFind",
      description: "match words in a grid",
      theme_color: "#242222",
      display: "standalone",
      scope: "/",
      start_url: "/",
      orientation: "portrait",
    },
  }),],
  server: {
    port: 3031,
    watch: {
      usePolling: true
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
});
