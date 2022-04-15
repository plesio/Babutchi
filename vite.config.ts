import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "path";

const PRODUCTION = "production";
const DEVELOPMENT = "development";

// -- MEMO : vite の挙動では、production or undefined になってしまうようなので、明示的に変数を生成する。
const environment =
  process.env.NODE_ENV === PRODUCTION ? PRODUCTION : DEVELOPMENT;
const is_production = environment === PRODUCTION;
console.log(`is_production:${is_production} -- ${environment}\n`);

const root = `${process.cwd()}`;

// https://vitejs.dev/config/
export default defineConfig({
  root,
  plugins: [react()],
  resolve: {
    // -- tsconfig で指定しているエイリアスをviteにも反映させる。
    alias: {
      "@/": `${path.resolve(root, "src")}/`,
      AppConfig: `${path.resolve(root, `src/config/${environment}`)}`,
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          mui: [
            "@emotion/react",
            "@emotion/styled",
            "@mui/icons-material",
            "@mui/material",
          ],
        },
        entryFileNames: "assets_p/[name].[hash].js",
        chunkFileNames: is_production
          ? "assets_p/[hash].js"
          : "assets_p/[name]-[hash].js",
        assetFileNames: is_production
          ? "assets_p/[hash][extname]"
          : "assets_p/[name]-[hash][extname]",
      },
    },
  },
});
