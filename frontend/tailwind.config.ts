/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
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
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      colors: {
        primary: {
          DEFAULT: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#a19f88',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h2: {
              fontWeight: theme('fontWeight.bold'),
              marginBottom: theme('spacing.10'),
              textAlign: 'center',
              fontSize: theme('fontSize.1xl'),
              '@screen md': {
                fontSize: theme('fontSize.2xl'),
              },
              '@screen lg': {
                fontSize: theme('fontSize.3xl'),
              },
              '@screen xl': {
                fontSize: theme('fontSize.4xl'),
              },
            },
            img: {
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              borderRadius: theme('borderRadius.md')
            },
            p: {
              fontSize: theme('fontSize.sm'),
              marginLeft: theme('spacing.4'),
              marginRight: theme('spacing.4'),
              '@screen md': {
                marginLeft: theme('spacing.16'),
                marginRight: theme('spacing.16'),
              },
              '@screen lg': {
                marginLeft: theme('spacing.24'),
                marginRight: theme('spacing.24'),
              },
              '@screen xl': {
                marginLeft: theme('spacing.32'),
                marginRight: theme('spacing.32'),
              },
            },
          },
        },
      }),
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  safelist: [
    'bg-red-500',
    'text-center',
    'hover:bg-green-500'
  ],
}