/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        imperial: {
          black: '#0A0A0B',
          coal: '#131316',
          smoke: '#1C1C21',
          gold: '#C9A227',
          goldlight: '#E8C86A',
          bronze: '#8C6A2B',
          cream: '#F5EFE0',
          ember: '#2A1E12',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
