import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: {
          deep: 'var(--bg-deep)',
          base: 'var(--bg-base)',
          raised: 'var(--bg-raised)'
        },
        surface: {
          1: 'var(--surface-1)',
          2: 'var(--surface-2)'
        },
        stroke: {
          soft: 'var(--stroke-soft)',
          strong: 'var(--stroke-strong)'
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)'
        },
        accent: {
          DEFAULT: 'var(--accent)',
          2: 'var(--accent-2)',
          aqua: 'var(--aqua)',
          ice: 'var(--ice)'
        }
      },
      boxShadow: {
        glow: '0 8px 24px var(--shadow-glow)',
        'glow-lg': '0 14px 40px var(--shadow-glow)',
        'inner-glow': 'inset 0 0 20px rgba(0, 255, 198, 0.05)'
      },
      borderRadius: {
        'xs': 'var(--radius-xs)',
        's': 'var(--radius-s)',
        'm': 'var(--radius-m)',
        'l': 'var(--radius-l)',
        'xl': 'var(--radius-xl)'
      },
      keyframes: {
        waveShift: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-2%)' },
          '100%': { transform: 'translateX(0)' }
        },
        floatUp: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
          '100%': { transform: 'translateY(0)' }
        },
        pulseGlow: {
          '0%': { boxShadow: '0 0 0 0 rgba(0, 255, 198, 0.35)' },
          '70%': { boxShadow: '0 0 0 18px rgba(0, 255, 198, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(0, 255, 198, 0)' }
        },
        scanLines: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 200px' }
        },
        lineSweep: {
          '0%': { 
            opacity: '0',
            transform: 'translateX(-20%) skewX(-10deg)'
          },
          '50%': { opacity: '1' },
          '100%': { 
            opacity: '0',
            transform: 'translateX(120%) skewX(-10deg)'
          }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        fadeIn: {
          'from': { 
            opacity: '0',
            transform: 'translateY(10px)'
          },
          'to': { 
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
      animation: {
        'waves': 'waveShift 14s ease-in-out infinite',
        'waves-slow': 'waveShift 22s ease-in-out infinite',
        'float': 'floatUp 3s ease-in-out infinite',
        'glow': 'pulseGlow 2.2s infinite',
        'scan': 'scanLines 12s linear infinite',
        'sweep': 'lineSweep 1.6s linear infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'fade-in': 'fadeIn 0.5s ease'
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Fira Mono', 'Droid Sans Mono', 'Courier New', 'monospace']
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '120': '30rem'
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.2, 0.8, 0.2, 1)'
      }
    },
  },
  plugins: [],
} satisfies Config;