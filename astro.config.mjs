// @ts-check
import { defineConfig } from "astro/config";
import remarkToc from "remark-toc";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";

import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
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

  integrations: [mdx()],
});
