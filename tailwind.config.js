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
            cobaltBlue: "#0155AF",

            // grey
            americanSilver: "#CCD0Cf",
            lotion: "#FCFCFC",
            cultured: "#F5F5F5",
            brightGray: "#EEEEEE",
            chineseWhite: "#E0E0E0",

            // dark
            darkElectricBlue: "#546E7A",
            charcoal: "#37474F",
            gunMetal: "#263238",
         },
         boxShadow: {
            // "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
            "custom-active":
               "0 3px 5px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1)",
         },
      },
   },
   plugins: [],
};
