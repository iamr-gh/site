import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import rehypePrettyCode from 'rehype-pretty-code';

// https://astro.build/config
export default defineConfig({
  site: "https://iamr.site",
  output: 'static',
  trailingSlash: 'always',
  integrations: [react(), tailwind({
    applyBaseStyles: false,
  })],
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: 'github-dark',
          grid: false,
          keepBackground: true,
        },
      ],
    ],
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
