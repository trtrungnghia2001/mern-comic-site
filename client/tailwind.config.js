/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        13: '0.8125rem',
        15: '0.9375rem',
      },
      aspectRatio: {
        thumbnail: '19/25',
      },
    },
  },
  important: true,
  plugins: [],
}
