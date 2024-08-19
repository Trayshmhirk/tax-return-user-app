import { useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import { useSidebar } from "../hooks/UseSidebar";

type ContentLayoutProps = {
   children: React.ReactNode;
};

const ContentLayout = ({ children }: ContentLayoutProps) => {
   const location = useLocation();

   const { isOpen } = useSidebar();

   const getTitle = (pathname: string) => {
      switch (pathname) {
         case "/":
            return "Welcome";
         case "/not-approved":
            return "Please wait...";
         case "/documents":
            return "Documents";
         case "/receipts":
            return "Receipts";
         case "/previous-filing":
            return "Previous filing";
         case "/knowledge-base":
            return "Knowledge base";
         case "/transactions":
            return "Transactions";
         case "/profile":
            return "Profile";
         case "/terms-and-conditions":
            return "Terms and conditions";
         case "/faq":
            return "FAQ";
         case "/help-and-support":
            return "Help and support";
         case "/privacy-policy":
            return "Privacy policy";
         case "/upload-document":
            return "Upload document";
         default:
            return "";
      }
   };

   const title = getTitle(location.pathname);
   const isSettings = location.pathname === "/settings/profile";

   return (
      <div
         className={`content-layout h-fit ${!isOpen && "w-full"} w-full flex flex-col overflow-hidden dark:text-white`}
      >
         <Header title={title} isHome={location.pathname === "/"} />

         <div
            className={`content relative  px-6 ${isSettings ? "py-7 overflow-hidden sm:px-8 md:px-14" : "py-10 overflow-scroll sm:px-8 md:px-16"}`}
         >
            {children}
         </div>
      </div>
   );
};

export default ContentLayout;
