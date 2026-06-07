/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: ['animate-fade-slide-up'],
  theme: {
    extend: {
      fontFamily: {
        // Body: Roboto (CI Manual: "Roboto is the general typeface for all content")
        sans: ['Roboto', 'Arial Narrow', 'Arial', 'sans-serif'],
        // Headings: CI Manual specifies Univers Condensed in CAPS ONLY.
        // Univers Condensed is a commercial Linotype font — add 'Univers Condensed'
        // as the first entry once a licensed web font file (WOFF2) is available.
        display: ['Roboto', 'Arial Narrow', 'Arial', 'sans-serif'],
      },
      keyframes: {
        'fade-slide-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-slide-up': 'fade-slide-up 0.35s ease-out forwards',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}