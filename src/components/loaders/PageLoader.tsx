import { ScaleLoader } from "react-spinners";
import { useLocation } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";

const PageLoader = () => {
   const location = useLocation();
   const { theme } = useTheme();

   const isDark = theme === "dark";

   // Check if current route starts with /settings/
   const isSettings = location.pathname.startsWith("/settings");

   return (
      <div
         className={`flex justify-center items-center ${isSettings ? "w-full h-full bg-white rounded-3xl" : "w-screen h-screen bg-ghostWhite"}  dark:bg-gray`}
      >
         {isDark ? (
            <ScaleLoader color="#ffffff" height={37} />
         ) : (
            <ScaleLoader color="#00A2C9" height={37} />
         )}
      </div>
   );
};

export default PageLoader;
