/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kindr: {
          primary: '#0ea5e9',
          secondary: '#06b6d4',
          accent: '#f59e0b',
          muted: '#64748b',
        },
      },
    },
  },
  plugins: [],
}
