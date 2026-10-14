/** @type {import('tailwindcss').Config} */

// Every colour resolves to a CSS variable defined in src/index.css, so the
// whole site can be re-themed from one place. Values are "R G B" triplets so
// Tailwind opacity modifiers (e.g. bg-ink/60) keep working.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

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
        // Monochrome design tokens
        ink: token("ink"),            // primary text, primary buttons
        graphite: token("graphite"),  // hover state for dark fills
        muted: token("muted"),        // secondary text on light
        subtle: token("subtle"),      // meta text / icons on light
        line: token("line"),          // hairlines & borders on light
        paper: token("paper"),        // primary background (warm off-white)
        stone: token("stone"),        // secondary background
        night: token("night"),        // deep black sections
        coal: token("coal"),          // charcoal panels on dark
        mist: token("mist"),          // secondary text on dark

        // Legacy names kept as aliases so existing markup inherits the
        // monochrome theme without a rewrite of every class.
        brand: {
          maroon: token("ink"),
          maroonDeep: token("graphite"),
          glow: token("mist"),
          gold: token("muted"),
          goldSoft: token("mist"),
          ink: token("ink"),
          paper: token("paper"),
          paperDeep: token("stone"),
          charcoal: token("coal"),
          charcoalDeep: token("night"),
        },
      },
      letterSpacing: {
        eyebrow: "0.24em",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
}
