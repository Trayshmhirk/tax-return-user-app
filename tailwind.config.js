/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   darkMode: "class",
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
            // primary
            alabaster: "#ECEBE4",
            richElectricBlue: "#00A2C9",
            darkRichElectricBlue: "#007A9B",
            antiFlashWhite: "#EEF0F2",
            ghostWhite: "#FAFAFF",

            //
            lightGray: "#F4F4F4",

            // grey
            americanSilver: "#CCD0Cf",
            lotion: "#FCFCFC",
            cultured: "#F5F5F5",
            brightGray: "#EEEEEE",
            chineseWhite: "#E0E0E0",

            // dark
            darkGray: "#2A2A2A",
            eerieBlack: "#1E1E1E",
            gray: "#2E2E2E",
            mutedGray: "#555555",

            //
            darkElectricBlue: "#546E7A",
            charcoal: "#37474F",
            gunMetal: "#2F3141",
            darkGunMetal: "#11212D",
            chineseBlack: "#0D1117",
            richBlack: "#010409",
         },
         boxShadow: {
            "custom-active":
               "0 3px 5px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1)",
            "custom-dark":
               "0 4px 10px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.8)",
         },
      },
   },
   plugins: [],
};
