import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";
import pluginRewriteAll from "vite-plugin-rewrite-all";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [
    checker({
      // e.g. use TypeScript check
      typescript: true
    }),
    react({ jsxImportSource: "@emotion/react" }),
    svgr(),
    pluginRewriteAll()
    // VitePWA({
    //   strategies: "generateSW",
    //   registerType: "autoUpdate",
    //   injectRegister: "auto",
    //   manifest: {
    //     theme_color: "#212B36",
    //     background_color: "#212B36",
    //     display: "standalone",
    //     orientation: "portrait",
    //     start_url: ".",
    //     name: "Dhedge",
    //     short_name: "Dhedge",
    //     icons: [
    //       {
    //         src: "/icon-192x192.png",
    //         sizes: "192x192",
    //         type: "image/png"
    //       },
    //       {
    //         src: "/icon-256x256.png",
    //         sizes: "256x256",
    //         type: "image/png"
    //       },
    //       {
    //         src: "/icon-384x384.png",
    //         sizes: "384x384",
    //         type: "image/png"
    //       },
    //       {
    //         src: "/icon-512x512.png",
    //         sizes: "512x512",
    //         type: "image/png"
    //       }
    //     ]
    //   },
    //   workbox: {
    //     clientsClaim: true,
    //     skipWaiting: true
    //   },
    //   devOptions: {
    //     enabled: true
    //   }
    // })
  ],
  server: {
    port: 80,
    proxy: {
      // string shorthand: http://localhost:5173/foo -> http://localhost:4567/foo
      "/api": "http://localhost:8080",
      "/socket.io": {
        target: "http://localhost:8079",
        changeOrigin: false,
        secure: false,
        ws: true
      }
    }
  },
  resolve: {
    alias: [
      {
        find: "@UI",
        replacement: path.resolve(__dirname, "src/components/UI")
      },
      {
        find: "@RTK",
        replacement: path.resolve(__dirname, "src/redux/service/RTK")
      },
      {
        find: "@theme",
        replacement: path.resolve(__dirname, "src/theme.ts")
      }
    ]
  },
  optimizeDeps: {
    // Add this line to disable Fast Refresh
    force: false,
    exclude: ["react-refresh/runtime"]
  }
});
