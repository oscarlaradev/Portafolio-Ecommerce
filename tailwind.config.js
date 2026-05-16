/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        brand: {
          background: '#F5F3FF',
          primary: '#7C3AED',
          accent: '#C4B5FD',
          text: '#1E1B4B',
          surface: '#FFFFFF',
          soft: '#DDD6FE',
        },
        dark: {
          900: '#030303',
          800: '#0a0a0a',
          700: '#141414'
        }
      }
    },
  },
  plugins: [],
}