/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}" // Catch-all for flat structures
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
      },
      colors: {
        "background-dark": "#020617",
        "panel-bg": "#0f172a",
        "primary-blue": "#2563eb",
        "cyan-accent": "#06b6d4",
        "success-green": "#10b981",
      }
    },
  },
  plugins: [],
}