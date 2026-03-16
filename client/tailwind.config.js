/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B6B", // Playful Red
        secondary: "#4ECDC4", // Teal
        accent: "#FFE66D", // Yellow
        dark: "#2D3436",
        light: "#F7F9FC"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Fredoka', 'sans-serif'], // playful font if we add it
      }
    },
  },
  plugins: [],
}
