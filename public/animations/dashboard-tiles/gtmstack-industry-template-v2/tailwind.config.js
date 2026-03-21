/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}", // Catch-all for root files like App.tsx
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0A0F2D',
          800: '#11183f',
          700: '#1a2255',
        },
        teal: {
          DEFAULT: '#00A8A8',
          400: '#2ccdc9',
          900: '#004d4d',
        },
        gold: {
          DEFAULT: '#FFD700',
          400: '#ffe033',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}