import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.itsmicki.com',
  output: 'static',
  build: { format: 'directory' },
  // The recording page (/studio/…) is a tool, not part of the site: kept out of the sitemap (and noindex).
  integrations: [sitemap({ filter: (page) => !page.includes('/studio/') })],
  vite: {
    server: {
      // Local dev reads the live list of Missing souls (GET only), so the place isn't empty; anything added, changed or
      // taken out locally stays in the browser and never reaches the live store.
      proxy: {
        '/api/souls': {
          target: 'https://www.itsmicki.com',
          changeOrigin: true,
          bypass: (request) => (request.method === 'GET' ? undefined : request.url),
        },
      },
    },
  },
});
