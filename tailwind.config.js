/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      container: {
        screens: {
          xl: '1768px'
        }
      }
    }
  },
  plugins: []
};
