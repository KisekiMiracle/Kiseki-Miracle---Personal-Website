import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
// @ts-check
import { defineConfig } from "astro/config";
import remarkToc from "remark-toc";

// https://astro.build/config
export default defineConfig({
  site: "https://kiseki-miracle.dev",
  integrations: [mdx(), react(), sitemap(), icon()],

  vite: {
    plugins: [
      tailwindcss(),
      {
        name: "reload", // via: https://stackoverflow.com/questions/77461040/can-i-get-vite-to-reload-the-browser-on-every-html-change
        configureServer(server) {
          const { ws, watcher } = server;
          watcher.on("change", (file) => {
            if (file.endsWith(".astro") || file.endsWith(".md") || file.endsWith(".mdx") || file.endsWith(".tsx")) {
              ws.send({
                type: "full-reload",
              });
            }
          });
        },
      },
    ],
  },

  markdown: {
    remarkPlugins: [remarkToc],
    rehypePlugins: [rehypeHeadingIds],
  },
});
