import { useLocation } from "react-router-dom";
import Header from "../components/Header";

type ContentLayoutProps = {
   children: React.ReactNode;
};

const ContentLayout = ({ children }: ContentLayoutProps) => {
   const location = useLocation();

   const getTitle = (pathname: string) => {
      switch (pathname) {
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
         default:
            return "Welcome";
      }
   };

   const title = getTitle(location.pathname);

   return (
      <div className="content-layout h-fit flex flex-col text-darkGunMetal overflow-hidden dark:text-white">
         <Header title={title} isHome={location.pathname === "/"} />

         <div className="content relative py-10 px-7 overflow-scroll sm:px-10 md:px-16">
            {children}
         </div>
      </div>
   );
};

export default ContentLayout;
