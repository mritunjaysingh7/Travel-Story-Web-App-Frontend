/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {

        fontFamily: {
            display: ['Poppins', 'sans-serif']
          },
      extend: {
       colors:{
        primary:'#05B6D3',
        secondary:'#EF863E'
       },
       backgroungImage:{
        'login-bg-img':"url('./src/assets/images/bg-image.jpg')"
       }
      },
    },
    plugins: [],
  };