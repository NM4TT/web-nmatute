// @ts-nocheck
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';

import icon from 'astro-icon';

const port = 8080;

// https://astro.build/config
export default defineConfig({
  integrations: [
    svelte({}), 
    tailwind({}), 
    icon({})
  ],
  vite: {
    plugins: [
    ], 
  },
  server: { 
    port: Number(port)
  }
});