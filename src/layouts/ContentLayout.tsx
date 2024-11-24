import { useLocation } from "react-router-dom";
import Header from "@/components/common/Header";
import { useSidebar } from "@/hooks/useSidebar";
import { headerTitleMap } from "@/mocks/MockData";
import { Suspense } from "react";
import PageLoader from "@/components/loaders/PageLoader";

const ContentLayout = ({ children }: ChildrenNode) => {
   const location = useLocation();
   const { isOpen } = useSidebar();

   // Check if the path matches any in titleMap or is a dynamic path for "Watch video"
   const getTitle = (pathname: string) => {
      if (pathname.startsWith("/knowledge-base/video/")) {
         return "Watch video";
      }
      return headerTitleMap[pathname] || ""; // Fallback to empty title if not matched
   };

   const title = getTitle(location.pathname); // Default to an empty string if no match

   // Check if current route starts with /settings/
   const isSettings = location.pathname.startsWith("/settings");
   const isLiveChat = location.pathname.startsWith("/chat");

   return (
      <main
         className={`content-layout h-fit ${!isOpen && "w-full"} w-full flex flex-col overflow-hidden dark:text-white`}
      >
         <Header title={title} isHome={location.pathname === "/"} />

         <Suspense fallback={<PageLoader />}>
            <div
               className={`content px-5 ${isSettings || isLiveChat ? "py-5 sm:px-7 md:px-9 lg:px-12 md:py-8" : "py-5 overflow-hidden sm:px-8 md:px-12 lg:px-14 md:py-10 md:pb-7"}`}
            >
               {!isSettings ? (
                  <div
                     className={`h-full ${isLiveChat ? "" : "overflow-auto px-1 py-1 pb-2"}`}
                  >
                     {children}
                  </div>
               ) : (
                  <>{children}</>
               )}
            </div>
         </Suspense>
      </main>
   );
};

export default ContentLayout;
