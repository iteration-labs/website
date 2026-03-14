/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f8f7f3',
        chalk: '#f2f0eb',
        ink: '#1a1816',
        ash: '#67625d',
        line: '#cfc7bc',
        olive: '#76806c',
        rust: '#9a6b52',
        blue: '#7f8c95',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 20px 60px rgba(26, 24, 22, 0.045)',
      },
      animation: {
        drift: 'drift 8s ease-in-out infinite',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(0, -6px, 0) rotate(0.4deg)' },
        },
      },
      letterSpacing: {
        manifesto: '-0.04em',
      },
    },
  },
  plugins: [],
};
