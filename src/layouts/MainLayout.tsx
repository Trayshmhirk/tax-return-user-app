import { Outlet, useLocation } from "react-router-dom";
import { Ellipses } from "../components/Ellipses";
import Sidebar from "../components/Sidebar";
import ContentLayout from "./ContentLayout";

const MainLayout = () => {
   const location = useLocation();
   const isHomePage = location.pathname === "/";

   return (
      <div className="w-full flex overflow-hidden bg-chineseWhite dark:bg-darkGunMetal">
         {isHomePage ? (
            <Ellipses>
               <Sidebar />

               <ContentLayout>
                  <Outlet />
               </ContentLayout>
            </Ellipses>
         ) : (
            <>
               <Sidebar />

               <ContentLayout>
                  <Outlet />
               </ContentLayout>
            </>
         )}
      </div>
   );
};

export default MainLayout;
