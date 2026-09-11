/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#101F3C',
          deep: '#0A142A',
          soft: '#1B2E52',
          line: '#2C4067',
        },
        ivory: '#F4EDE0',
        cream: '#E7DAC4',
        taupe: '#B3A28C',
        beige: '#D8C9AE',
        gold: '#B79A63',
        ink: '#0B1120',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['Parisienne', 'cursive'],
        sans: ['Jost', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.34em',
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-10px,0)' },
        },
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        drift: 'drift 7s ease-in-out infinite',
        'spin-slow': 'spinSlow 9s linear infinite',
      },
    },
  },
  plugins: [],
};
