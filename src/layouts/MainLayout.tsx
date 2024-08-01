import { Outlet, useLocation } from "react-router-dom";
import { Ellipses } from "../components/Ellipses";
import Sidebar from "../components/Sidebar";
import ContentLayout from "./ContentLayout";

const MainLayout = () => {
   const location = useLocation();
   const isHomePage = location.pathname === "/";
   const isNotApproved = location.pathname === "/not-approved";

   return (
      <div className="w-full flex overflow-hidden bg-lightGray dark:bg-eerieBlack">
         {isHomePage ? (
            <Ellipses>
               <Sidebar />

               <ContentLayout>
                  <Outlet />
               </ContentLayout>
            </Ellipses>
         ) : (
            <>
               <Sidebar isNotApproved={isNotApproved} />

               <ContentLayout>
                  <Outlet />
               </ContentLayout>
            </>
         )}
      </div>
   );
};

export default MainLayout;
