import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.itsmicki.com',
  output: 'static',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
