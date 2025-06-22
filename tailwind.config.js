/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tumb: ['Tumb', 'sans-serif'],
        mont: ['Mont', 'sans-serif'],
        'avenir-reg': ['"Avenir Next Reg"', 'sans-serif'],
        'avenir-demi': ['"Avenir Next Demi"', 'sans-serif'],
      },
    },
  },
  plugins: [],
  
}
