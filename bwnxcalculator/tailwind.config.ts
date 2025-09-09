import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: { deep: '#0B0D10', base: '#0F1115', raised: '#151922' },
        surface: { 1: '#1B202A', 2: '#222835' },
        stroke: { soft: '#2A313B', strong: '#3A4452' },
        text: { primary: '#E6F7F5', secondary: '#B3C6C2', muted: '#869590' },
        accent: { DEFAULT: '#00FFC6', a2: '#00E6A8', aqua: '#66FFF5' }
      },
      boxShadow: { glow: '0 8px 24px rgba(0,255,198,0.24)' },
      borderRadius: { xl: '14px' },
      keyframes: {
        waveShift: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-2%)' },
          '100%': { transform: 'translateX(0)' }
        },
        scanLines: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 200px' }
        },
        pulseGlow: {
          '0%': { boxShadow: '0 0 0 0 rgba(0,255,198,0.35)' },
          '70%': { boxShadow: '0 0 0 18px rgba(0,255,198,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(0,255,198,0)' }
        }
      },
      animation: {
        waves: 'waveShift 14s ease-in-out infinite',
        scan: 'scanLines 12s linear infinite',
        glow: 'pulseGlow 2.2s infinite'
      }
    }
  },
  darkMode: 'class'
};

export default config;

