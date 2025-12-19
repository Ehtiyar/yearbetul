/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        romantic: {
          pink: '#F8D7DA',
          softPink: '#FFF0F5',
          warmWhite: '#FFFEFE',
          gold: '#FFD700',
          deepRed: '#8B0000',
          rose: '#FF69B4',
        }
      },
      fontFamily: {
        romantic: ['Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}

