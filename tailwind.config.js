/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          maroon: '#9A0000',
          maroonDeep: '#6b0000',
          glow: '#ff4d4d',
          gold: '#CA8B06',
          goldSoft: '#e0ad3f',
          ink: '#2A2513',
          paper: '#FBF7EF',
          paperDeep: '#EDE2C8',
          charcoal: '#17130D',
          charcoalDeep: '#0F0C08',
        },
      },
    },
  },
  plugins: [],
}
