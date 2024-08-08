//* LIB
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import viteCompression from "vite-plugin-compression";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    define: {
      "process.env": env,
    },
    plugins: [
      react(),
      svgr(),
      viteCompression({
        verbose: true, // Set to true if you want to see the compression logs
        algorithm: "brotliCompress", // Default algorithm
        ext: ".br", // Default extension
        // You can specify additional options here
      }),
      VitePWA({
        workbox: {
          globPatterns: ["**/*.{js,jsx,css,html}"],
        },
      }),
    ],
    base: "/",
    resolve: {
      extensions: [".js", ".jsx", ".json"], // Add other extensions you need.
      alias: [
        {
          find: "@",
          replacement: fileURLToPath(new URL("./src", import.meta.url)),
        },
        {
          find: "@images",
          replacement: fileURLToPath(new URL("./src/assets", import.meta.url)),
        },
        {
          find: "@components",
          replacement: fileURLToPath(
            new URL("./src/components", import.meta.url)
          ),
        },
      ],
    },
    optimizeDeps: {
      include: ["./src/*.jsx"],
    },
  };
});
