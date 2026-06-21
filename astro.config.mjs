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
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (
            warning.code === 'UNUSED_EXTERNAL_IMPORT' &&
            (warning.exporter === 'svelte/transition' || warning.exporter === 'svelte/easing')
          ) {
            return;
          }
          warn(warning);
        },
      },
    },
  },
});
