// @ts-check
import { defineConfig } from 'astro/config';
import Icons from 'unplugin-icons/vite'
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  vite: {
    plugins: [
      Icons({ 
          compiler: "astro", 
          autoInstall: true, 
      }), 
    ], 
  },
});