/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors:{
        'primary-color': '#4ABEFF',
        'secondary-color' : '#001AFF',
        'background' : '#0E0B19'
      }
    },
  },
  plugins: [],
};
