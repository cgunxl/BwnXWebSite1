/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          deep: '#0B0D10',
          base: '#0F1115',
          raised: '#151922',
        },
        surface: {
          1: '#1B202A',
          2: '#222835',
        },
        stroke: {
          soft: '#2A313B',
          strong: '#3A4452',
        },
        text: {
          primary: '#E6F7F5',
          secondary: '#B3C6C2',
          muted: '#869590',
        },
        accent: {
          DEFAULT: '#00FFC6',
          a2: '#00E6A8',
          aqua: '#66FFF5',
          ice: '#DFFCF6',
        },
        glow: 'rgba(0,255,198,0.24)',
        'focus-ring': 'rgba(0,230,168,0.65)',
      },
      boxShadow: {
        glow: '0 8px 24px rgba(0,255,198,0.24)',
        'glow-lg': '0 12px 36px rgba(0,255,198,0.32)',
      },
      borderRadius: {
        xl: '14px',
      },
      keyframes: {
        waveShift: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-2%)' },
          '100%': { transform: 'translateX(0)' },
        },
        scanLines: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 200px' },
        },
        pulseGlow: {
          '0%': { boxShadow: '0 0 0 0 rgba(0,255,198,0.35)' },
          '70%': { boxShadow: '0 0 0 18px rgba(0,255,198,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(0,255,198,0)' },
        },
        floatUp: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
          '100%': { transform: 'translateY(0)' },
        },
        lineSweep: {
          '0%': { opacity: '0', transform: 'translateX(-20%) skewX(-10deg)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateX(120%) skewX(-10deg)' },
        },
        dashDraw: {
          to: { strokeDashoffset: '0' },
        },
      },
      animation: {
        waves: 'waveShift 14s ease-in-out infinite',
        scan: 'scanLines 12s linear infinite',
        glow: 'pulseGlow 2.2s infinite',
        float: 'floatUp 3s ease-in-out infinite',
        sweep: 'lineSweep 1.6s linear infinite',
        draw: 'dashDraw 2.8s ease forwards',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};