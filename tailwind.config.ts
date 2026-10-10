import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#050807',
          900: '#080d0c',
          800: '#0e1614',
          700: '#141f1c',
        },
        charcoal: {
          900: '#111816',
          800: '#17221f',
          700: '#202e2a',
          600: '#2c3e39',
        },
        ivory: {
          50: '#fafbf9',
          100: '#f4f6f2',
          200: '#e8ece4',
          300: '#d7dfd1',
          400: '#b8c5b0',
        },
        bronze: {
          300: '#d4b788',
          400: '#bfa06d',
          500: '#9e8050',
          600: '#7f6439',
          700: '#604a27',
        },
        copper: {
          400: '#f09660',
          500: '#db7840',
          600: '#b85a26',
        },
        royal: {
          green: '#22c55e',
          emerald: '#10b981',
          leaf: '#83d94b',
          crimson: '#ef4444',
          vermilion: '#f87171',
          amber: '#f59e0b',
        },
      },
      fontFamily: {
        serif: ['var(--font-cinzel)', 'Georgia', 'Cambria', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        'radial-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'subtle-grid': 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
      },
      boxShadow: {
        seal: '0 0 45px rgba(131, 217, 75, 0.18)',
        'seal-reject': '0 0 45px rgba(239, 68, 68, 0.22)',
        'archival-card': '0 20px 40px -15px rgba(0, 0, 0, 0.45)',
      },
    },
  },
  plugins: [],
};

export default config;
