/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   darkMode: "class",
   theme: {
      screens: {
         xs: "404px",
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
            // primary
            alabaster: "#ECEBE4",
            richElectricBlue: "#00A2C9",
            bubbles: "#E5F6F9",
            darkRichElectricBlue: "#007A9B",
            antiFlashWhite: "#EEF0F2",
            ghostWhite: "#FBFAF9",
            bostonRed: "#C30000",

            // grey
            lightGray: "#F4F4F4",
            americanSilver: "#CCD0Cf",
            lotion: "#FCFCFC",
            cultured: "#F5F5F5",
            brightGray: "#EEEEEE",
            chineseWhite: "#E0E0E0",
            spanishGray: "#B8B8B8",

            // dark
            mutedGray: "#555555",
            darkGray: "#2A2A2A",
            gray: "#2E2E2E",
            eerieBlack: "#1E1E1E",
            richBlack: "#010409",
         },
         boxShadow: {
            md: "0 1px 4px 0px rgb(0 0 0 / 0.1), 0 1px 3px -1px rgb(0 0 0 / 0.1)",
            "md-dark":
               "0 2px 5px 0px rgb(0 0 0 / 0.5), 0 1px 3px -1px rgb(0 0 0 / 0.7)",
            lg: "0 3px 5px 1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            "lg-dark":
               "0 3px 6px 1px rgb(0 0 0 / 0.4), 0 2px 5px -2px rgb(0 0 0 / 0.5)",
            custom:
               "0 2px 5px rgba(0, 0, 0, 0.3), 0 1px 3px -1px rgba(0, 0, 0, 0.4)",
         },
      },
   },
   plugins: [],
};
