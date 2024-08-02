import Header from "../components/Header";

type ContentLayoutProps = {
   children: React.ReactNode;
};

const ContentLayout = ({ children }: ContentLayoutProps) => {
   return (
      <div className="w-full h-fit flex flex-col text-darkGunMetal overflow-hidden dark:text-white md:w-[calc(100% - 300px)]">
         <Header />

         <div className="h-[calc(100vh - 80px)] py-12 px-16 overflow-scroll">
            <div className="h-full flex flex-col gap-4">{children}</div>
         </div>
      </div>
   );
};

export default ContentLayout;
