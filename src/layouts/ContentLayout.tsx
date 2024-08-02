import Header from "../components/Header";

type ContentLayoutProps = {
   children: React.ReactNode;
};

const ContentLayout = ({ children }: ContentLayoutProps) => {
   return (
      <div className="w-full h-fit flex flex-col text-darkGunMetal overflow-hidden dark:text-white md:w-[calc(100% - 300px)]">
         <Header />

         <div className="content-layout py-12 px-16 overflow-scroll">
            {children}
         </div>
      </div>
   );
};

export default ContentLayout;
