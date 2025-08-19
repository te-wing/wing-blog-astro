// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  site: 'https://diaries.wing.osaka',
  output: 'static',
  integrations: [
    sitemap(),
    react(),
    svelte()],
});