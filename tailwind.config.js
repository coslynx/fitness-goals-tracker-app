/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // Custom primary color
        secondary: '#9333EA', // Custom secondary color
        accent: '#FBBF24', // Custom accent color
      },
      spacing: {
        '18': '4.5rem', // Custom spacing utility
        '28': '7rem',
      },
      borderRadius: {
        '4xl': '2rem', // Custom border radius
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Custom font
      },
    },
  },
  plugins: [],
}