import Header from "../components/Header";

type ContentLayoutProps = {
   children: React.ReactNode;
};

const ContentLayout = ({ children }: ContentLayoutProps) => {
   return (
      <div className="main-content flex flex-col text-darkGunMetal dark:text-white">
         <Header />

         <div className="content-body overflow-scroll py-12 px-16">
            {children}
         </div>
      </div>
   );
};

export default ContentLayout;
