/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f8f7f3',
        chalk: '#f2f0eb',
        ink: {
          DEFAULT: '#1a1816',
          950: '#0b0f1a',
          900: '#131a2a',
          800: '#1f2a3b',
          600: '#4b5565',
          400: '#7a8799',
          200: '#d6dbe4',
        },
        ash: '#67625d',
        line: '#cfc7bc',
        olive: '#76806c',
        rust: '#9a6b52',
        blue: '#7f8c95',
        fog: {
          50: '#f7f8fa',
          100: '#eef1f5',
          200: '#e2e7ef',
        },
        reed: {
          500: '#2f6f68',
          200: '#bcd6d0',
        },
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Sora"', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card: '0 20px 60px rgba(26, 24, 22, 0.045)',
        'bcp-card': '0 16px 40px -32px rgba(15, 23, 42, 0.35)',
        'bcp-soft': '0 24px 80px -60px rgba(15, 23, 42, 0.5)',
      },
      animation: {
        drift: 'drift 8s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(0, -6px, 0) rotate(0.4deg)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(47, 111, 104, 0.25)' },
          '50%': { boxShadow: '0 0 0 8px rgba(47, 111, 104, 0.12)' },
        },
      },
      letterSpacing: {
        manifesto: '-0.04em',
      },
    },
  },
  plugins: [],
};
