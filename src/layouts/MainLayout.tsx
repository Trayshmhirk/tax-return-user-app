import { Outlet, useLocation } from "react-router-dom";
import { Ellipses } from "../components/Ellipses";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
   const location = useLocation();
   const isHomePage = location.pathname === "/";

   return (
      <div className="w-full">
         {isHomePage ? (
            <Ellipses>
               <div className="flex overflow-hidden">
                  <Sidebar />

                  <div className="main-content">
                     <Outlet />
                  </div>
               </div>
            </Ellipses>
         ) : (
            <div className="flex overflow-hidden">
               <Sidebar />

               <div className="main-content">
                  <Outlet />
               </div>
            </div>
         )}
      </div>
   );
};

export default MainLayout;
