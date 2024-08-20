import { useContext } from "react";
import { ScaleLoader } from "react-spinners";
import { ThemeContext } from "../../context/ThemeContext";
import { useLocation } from "react-router-dom";

const PageLoader = () => {
   const themeContext = useContext(ThemeContext);
   const location = useLocation();

   if (!themeContext) return null; // Add a fallback for when context is not available
   const { isDarkMode } = themeContext;

   // Check if current route starts with /settings/
   const isSettings = location.pathname.startsWith("/settings");

   return (
      <div
         className={`flex justify-center items-center ${isSettings ? "w-full h-full rounded-3xl" : "w-screen h-screen"} bg-ghostWhite dark:bg-gray`}
      >
         {isDarkMode ? (
            <ScaleLoader color="#ffffff" height={37} />
         ) : (
            <ScaleLoader color="#00A2C9" height={37} />
         )}
      </div>
   );
};

export default PageLoader;
