/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        navy: '#020410', // Deep Space Black/Blue
        midnight: '#0B1121', // Dark Slate
        teal: {
          DEFAULT: '#0088FF', // Electric Blue (Primary Action)
          hover: '#0066CC',
        },
        gold: '#FFD700',
        purple: {
          muted: '#6366F1', // Indigo 500
          deep: '#1E1B4B', // Indigo 950
        },
        peach: '#FDBA74',
        green: {
          demand: '#00E699', // Neon Mint
        },
        cyan: {
          systems: '#22D3EE', // Bright Cyan
        }
      }
    }
  },
  plugins: [],
}