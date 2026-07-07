import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        space: '#0a0a0f',
        'space-light': '#12121c',
        quantum: '#6c63ff',
        energy: '#00f5d4',
        gold: '#ffd166',
        warm: '#f0f0f0',
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        display: ['var(--font-syne)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'psi-breathe': 'psi-breathe 12s ease-in-out infinite',
        'spin-slow': 'spin 24s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'flow-dash': 'flow-dash 2.4s linear infinite',
      },
      keyframes: {
        'psi-breathe': {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: '0.05' },
          '50%': { transform: 'scale(1.06) rotate(4deg)', opacity: '0.09' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 18px 2px rgba(108, 99, 255, 0.25)' },
          '50%': { boxShadow: '0 0 34px 6px rgba(0, 245, 212, 0.35)' },
        },
        'flow-dash': {
          to: { strokeDashoffset: '-24' },
        },
      },
      backgroundImage: {
        'electron-density':
          'radial-gradient(ellipse at 30% 20%, rgba(108,99,255,0.18), transparent 55%), radial-gradient(ellipse at 75% 70%, rgba(0,245,212,0.12), transparent 50%), radial-gradient(ellipse at 55% 40%, rgba(255,209,102,0.06), transparent 45%)',
      },
    },
  },
  plugins: [],
};

export default config;
