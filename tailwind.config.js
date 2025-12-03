/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['poppins', 'sans-serif'],
        rubik_storm: ['Rubik Storm', 'system-ui'],
        oswald: ['Oswald', 'sans-serif'],
        tagesschrift: ['Tagesschrift', 'system-ui'],
      },
      colors: {
        blue2: ['#629dff'],
      },
    },
  },
  plugins: [require('daisyui')],
};
