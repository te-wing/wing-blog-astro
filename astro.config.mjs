// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://diaries.wing.osaka',
  output: 'static',
  adapter: cloudflare(),
  integrations: [sitemap()],
  trailingSlash: 'never'
});
