// tailwind.config.js
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Adjust according to your file extensions
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
