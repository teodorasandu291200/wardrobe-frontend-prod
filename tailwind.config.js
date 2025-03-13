// filepath: /c:/Users/sandu/Virtuwear-PROD/frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        italiana: ["Italiana", "Helvetica", "sans-serif"],
        nunito: ['Nunito Sans', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
};