/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf5ee',
          100: '#f9e5d2',
          200: '#f3c9a3',
          300: '#eda072',
          400: '#e67a47',
          500: '#d75a26',
          600: '#b8451d',
          700: '#933318',
          800: '#6d2615',
          900: '#4f1d11'
        }
      }
    }
  },
  plugins: []
};
