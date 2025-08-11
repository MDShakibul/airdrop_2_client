/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      sm: '340px',
      md: '540px',
      lg: '768px',
      xl: '1180px'
    },
    extend: {},
    fontFamily:{
      Sans:["Open Sans", "sans-serif"],
      varela:["Varela Round", "sans-serif"],
    },
    container:{
      center: true,
      padding:{
        DEFAULT:"12px",
        md:"32px"
      }
    }
  },
  plugins: [],
}

