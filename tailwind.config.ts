import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          50: '#eff4fe',
          100: '#e2eafd',
          200: '#cad7fb',
          300: '#abbdf6',
          400: '#8998f0',
          500: '#6c77e8',
          600: '#5050db',
          700: '#4341c1',
          800: '#363698',
          900: '#33347c',
          950: '#1e1e48',
        },
        secondary: {
          50: '#fef5ee',
          100: '#fde8d7',
          200: '#faccae',
          300: '#f7a97a',
          400: '#f37b44',
          500: '#f0581f',
          600: '#de3e15',
          700: '#ba2d14',
          800: '#ba2d14',
          900: '#942618',
          950: '#782116',
        },
      },
    },
  },
  plugins: [require('tailwindcss/nesting')],
} satisfies Config;
