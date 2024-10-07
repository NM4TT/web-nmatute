/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
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
        xs: '480px', // Extra small screens
        sm: '640px', // Small screens
        md: '768px', // Medium screens
        lg: '1024px', // Large screens
        xl: '1280px', // Extra large screens
        '2xl': '1536px', // 2XL screens
      },
      colors: {
        primary: {
          DEFAULT: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#a19f88',
        },
      },
    }
  },
  plugins: [],
  safelist: [
    // Useful for dynamic classes
    'bg-red-500',
    'text-center',
    'hover:bg-green-500'
  ],
}

