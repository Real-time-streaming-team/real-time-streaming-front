/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bt-gradient': 'linear-gradient(153.5deg, #4ABEFF -63.68%, #001AFF 75.59%)',
      }
    },
  },
  plugins: [],
}

