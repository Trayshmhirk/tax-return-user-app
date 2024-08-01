import { Outlet, useLocation } from "react-router-dom";
import { Ellipses } from "../components/Ellipses";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
   const location = useLocation();
   const isHomePage = location.pathname === "/";

   return (
      <div className="w-full flex overflow-hidden bg-americanSilver dark:bg-gunMetal">
         {isHomePage ? (
            <Ellipses>
               <Sidebar />

               <div className="main-content">
                  <Outlet />
               </div>
            </Ellipses>
         ) : (
            <>
               <Sidebar />

               <div className="main-content">
                  <Outlet />
               </div>
            </>
         )}
      </div>
   );
};

export default MainLayout;
