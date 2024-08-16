import { useContext } from "react";
import { ScaleLoader } from "react-spinners";
import { ThemeContext } from "../../context/ThemeContext";

const PageLoader = () => {
   const themeContext = useContext(ThemeContext);

   if (!themeContext) return null; // Add a fallback for when context is not available
   const { isDarkMode } = themeContext;

   return (
      <div className="flex justify-center items-center w-screen h-screen bg-ghostWhite dark:bg-gray">
         {isDarkMode ? (
            <ScaleLoader color="#ffffff" height={37} />
         ) : (
            <ScaleLoader color="#00A2C9" height={37} />
         )}
      </div>
   );
};

export default PageLoader;
