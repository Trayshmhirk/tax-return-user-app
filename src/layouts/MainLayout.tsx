import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ContentLayout from "./ContentLayout";

const MainLayout = () => {
   const location = useLocation();
   const isNotApproved = location.pathname === "/not-approved";

   return (
      <div className="w-full flex overflow-hidden bg-ghostWhite dark:bg-eerieBlack">
         <Sidebar isNotApproved={isNotApproved} />

         <ContentLayout>
            <Outlet />
         </ContentLayout>
      </div>
   );
};

export default MainLayout;
