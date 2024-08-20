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
         case "/knowledge-base":
            return "Knowledge base";
         case "/transactions":
            return "Transactions";
         case "/help-and-support":
         case "/upload-document":
            return "Upload document";
         case "/settings/profile" ||
            "/settings/faq" ||
            "/settings/help-and-suppor" ||
            "/settings/privacy-policy" ||
            "/settings/my-requests" ||
            "/settings/terms-and-conditions":
            return "Account settings";
         default:
            return "";
      }
   };

   const title = getTitle(location.pathname);

   // Check if current route starts with /settings/
   const isSettings = location.pathname.startsWith("/settings/");

   return (
      <main
         className={`content-layout h-fit ${!isOpen && "w-full"} w-full flex flex-col overflow-hidden dark:text-white`}
      >
         <Header title={title} isHome={location.pathname === "/"} />

         <div
            className={`content relative px-6 ${isSettings ? "py-7 overflow-hidden sm:px-8 md:px-12" : "py-10 overflow-scroll sm:px-8 md:px-16"}`}
         >
            {children}
         </div>
      </main>
   );
};

export default ContentLayout;
