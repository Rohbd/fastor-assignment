/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'dark-gray': '#1E232C',
        'light-gray': '#8391A1',
        'dim-gray': '#F7F8F9',
        'light-red': '#FF6D6A'
      },
      spacing: {
        15: '60px'
      }
    },
  },
  plugins: [],
};
