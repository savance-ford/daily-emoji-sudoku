/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'shake': 'shake 0.4s ease-in-out',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'fade-in': 'fadeIn 0.25s ease-out both',
        'cell-pop': 'cellPop 0.2s ease-out',
        'pulse-ring': 'pulseSoft 1.5s ease-in-out infinite',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%':       { transform: 'translateX(-4px) rotate(-1deg)' },
          '40%':       { transform: 'translateX(4px) rotate(1deg)' },
          '60%':       { transform: 'translateX(-3px) rotate(-0.5deg)' },
          '80%':       { transform: 'translateX(3px) rotate(0.5deg)' },
        },
        slideUp: {
          from: { transform: 'translateY(40px)', opacity: '0' },
          to:   { transform: 'translateY(0)',    opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateX(-50%) translateY(8px)' },
          to:   { opacity: '1', transform: 'translateX(-50%) translateY(0)' },
        },
        cellPop: {
          '0%':   { transform: 'scale(0.8)' },
          '60%':  { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.3)' },
          '50%':       { boxShadow: '0 0 0 6px rgba(16, 185, 129, 0)' },
        },
      },
    },
  },
  plugins: [],
};
