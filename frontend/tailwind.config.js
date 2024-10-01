/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{svelte,ts}',
    './src/routes/**/*.{svelte,ts}',
    './src/lib/**/*.{svelte,ts}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui'],
        serif: ['ui-serif', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      spacing: {
        128: '32rem',
        144: '36rem'
      },
      borderRadius: {
        '4xl': '2rem'
      },
      screens: {
        xs: '480px'
      }
    }
  },
  plugins: [],
  safelist: [
    // Useful for dynamic classes
    'bg-red-500',
    'text-center',
    'hover:bg-green-500'
  ],
};
