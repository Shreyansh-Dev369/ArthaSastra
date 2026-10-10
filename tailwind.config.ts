import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        theme: {
          canvas: 'var(--bg-canvas)',
          subtle: 'var(--bg-canvas-subtle)',
          surface: 'var(--bg-surface)',
          elevated: 'var(--bg-surface-elevated)',
          inset: 'var(--bg-surface-inset)',
          border: 'var(--border-subtle)',
          'border-strong': 'var(--border-strong)',
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          bronze: 'var(--accent-bronze)',
          gold: 'var(--accent-gold)',
          seal: 'var(--seal-green)',
          'seal-bg': 'var(--seal-green-bg)',
          'seal-border': 'var(--seal-green-border)',
          vermilion: 'var(--seal-red)',
          'vermilion-bg': 'var(--seal-red-bg)',
          'vermilion-border': 'var(--seal-red-border)',
          amber: 'var(--seal-amber)',
        },
        obsidian: {
          950: '#070a09',
          900: '#0b110e',
          800: '#111815',
          700: '#17221d',
        },
        ivory: {
          50: '#fafbf9',
          100: '#f3f5ee',
          200: '#e5e9de',
          300: '#d0d7c5',
          400: '#9cb0a4',
        },
        bronze: {
          300: '#d4b788',
          400: '#bfa06d',
          500: '#9e8050',
          600: '#7f6439',
          700: '#604a27',
        },
        royal: {
          green: '#22c55e',
          leaf: '#83d94b',
          crimson: '#ef4444',
          vermilion: '#f87171',
          amber: '#fbbf24',
        },
      },
      fontFamily: {
        serif: ['var(--font-cinzel)', 'Cinzel', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        seal: 'var(--shadow-seal)',
      },
    },
  },
  plugins: [],
};

export default config;
