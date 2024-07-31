/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      screens: {
         xs: "424px",
         sm: "576px",
         md: "768px",
         lg: "1024px",
         xl: "1200px",
      },
      // fontFamily: {
      //    sans: ["Roboto", "sans-serif"],
      // },
      extend: {
         colors: {
            alabaster: "#ECEBE4",
            richElectricBlue: "#00A2C9",
            antiFlashWhite: "#EEF0F2",
            ghostWhite: "#FAFAFF",
         },
      },
   },
   plugins: [],
};
