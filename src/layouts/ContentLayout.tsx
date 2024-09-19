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
         case "/request-service":
            return "Request a service";
         case "/upload-documents":
            return "Upload documents";
         case "/receipts":
            return "Receipts";
         case "/chat":
            return "Chat";
         case "/transactions":
            return "Transactions";
         case "/bank":
            return "Bank";
         case "/knowledge-base":
            return "Knowledge base";
         case "/settings/profile":
            return "Account settings";
         case "/settings/faq":
            return "Account settings";
         case "/settings/help-and-support":
            return "Account settings";
         case "/settings/privacy-policy":
            return "Account settings";
         case "/settings/my-requests":
            return "Account settings";
         case "/settings/files":
            return "Account settings";
         case "/settings/integrated-banks":
            return "Account settings";
         case "/settings/terms-and-conditions":
            return "Account settings";
         default:
            return "";
      }
   };

   const title = getTitle(location.pathname);

   // Check if current route starts with /settings/
   const isSettings = location.pathname.startsWith("/settings");
   const isLiveChat = location.pathname.startsWith("/chat");

   return (
      <main
         className={`content-layout h-fit ${!isOpen && "w-full"} w-full flex flex-col overflow-hidden dark:text-white`}
      >
         <Header title={title} isHome={location.pathname === "/"} />

         <div
            className={`content px-5 ${isSettings || isLiveChat ? "py-5 sm:px-7 md:px-12 md:py-8" : "py-5 overflow-hidden sm:px-8 md:px-10 md:py-10 md:pb-7"}`}
         >
            {!isSettings ? (
               <div
                  className={`h-full ${isLiveChat ? "" : "overflow-auto px-1 py-1 pb-2 md:px-2"}`}
               >
                  {children}
               </div>
            ) : (
               <>{children}</>
            )}
         </div>
      </main>
   );
};

export default ContentLayout;
