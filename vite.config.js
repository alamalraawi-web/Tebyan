import { defineConfig, transformWithOxc } from "vite";
import react from "@vitejs/plugin-react";

function transformJsxInJs() {
  return {
    name: "transform-jsx-in-js",
    enforce: "pre",

    async transform(code, id) {
      if (!id.includes("/src/") || !id.endsWith(".js")) {
        return null;
      }

      return transformWithOxc(code, id, {
        lang: "jsx",
      });
    },
  };
}

export default defineConfig({
  plugins: [
    transformJsxInJs(),
    react(),
  ],

  server: {
    open: true,

    proxy: {
      "/github-models": {
        target: "https://models.github.ai",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/github-models/, ""),
      },
    },
  },
});