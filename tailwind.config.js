/* eslint-disable no-undef */
// const withMT = require("@material-tailwind/react/utils/withMT");
 import withMT from "@material-tailwind/react/utils/withMT";
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily :{
        Aeonik : ['Aeonik', 'sans-serif'],
      },
      colors : {
        primary : '#080411', // black
        onPrimary : "#079CE1", // purple 
        textPrimary : "#FBF0FF", // white text 
        textSecondary:  "#9E9E9E", // gray text  
        // primary : '#0D0D0D', // black
        // onPrimary : "#6F41D2", // purple 
        secondary : "#141414" // dark gray 

      },
      animation : {
        
          blob : 'blob 4s infinite'
        
      },
      keyframes :{
        blob : {
          '0%': { transform: 'translate(0px, 0px) scale(1)'},
          '33%': { transform: 'translate(30px, -50px) scale(1.2)'},
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)'},
          '100%': { transform: 'translate(0px, 0px) scale(1)'}
        }
      }
    },
  },
  plugins: [],
});