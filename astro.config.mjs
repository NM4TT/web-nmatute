import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@tailwindcss/vite';
import Icons from 'unplugin-icons/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [
    svelte()
  ],
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [
      tailwind(),
      Icons({
        compiler: 'svelte',
        autoInstall: true,
      }),
    ],
  },
});
