import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    fontSize: {
      sm: [
        '0.8125rem',
        {
          lineHeight: '1.4375rem',
        },
      ],
      m: [
        '0.75rem',
        {
          lineHeight: '0.9375rem',
        },
      ],
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    screens: {
      sm: '48rem',
      md: '70rem',
    },
    extend: {
      colors: {
        purple: {
          500: 'hsl(242, 48%, 58%)',
          200: 'hsl(243, 100%, 82%)',
        },
        black: {
          800: 'hsl(237, 100%, 4%)',
          700: 'hsl(235, 16%, 15%)',
          600: 'hsl(235, 12%, 19%)',
          900: 'hsl(0, 0%, 0%)',
        },
        gray: {
          500: 'hsl(236, 11%, 27%)',
          300: 'hsl(216, 15%, 57%)',
          200: 'hsl(221, 69%, 94%)',
        },
        white: {
          300: 'hsl(220, 69%, 97%)',
          200: 'hsl(0, 0, 95)',
          100: 'hsl(0, 0%, 100%)',
        },
        red: {
          300: 'hsl(0, 78%, 63%)',
          100: 'hsl(0, 100%, 80%)',
        },
        'clr-black': 'hsl(237, 100%, 4%)',
        'clr-white': 'hsl(0, 0%, 100%)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
