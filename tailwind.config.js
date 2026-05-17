/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#2A6F62',
        'brand-accent': '#6EE7B7',
        'urgent-high': '#DC2626',
        'urgent-medium': '#F59E0B',
        'urgent-low': '#1D4ED8',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}