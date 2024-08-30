import { Outlet } from "react-router-dom";
import SettingsAside from "../components/sidebar/SettingsAside";

const SettingsLayout = () => {
   return (
      <div className="w-full h-full flex flex-col lg:flex-row gap-6 overflow-hidden bg-white dark:bg-gray px-4 py-3 rounded-3xl">
         <SettingsAside />
         <div className="max-h-screen hidden lg:block my-4">
            <div className="w-[1px] h-full bg-eerieBlack dark:bg-white opacity-10" />
         </div>

         <main className="settings-content-layout flex-1 overflow-hidden md:px-2 lg:my-4">
            <div className="h-full flex-1 flex flex-col gap-7 px-1 pb-3 overflow-auto md:px-2">
               <Outlet />
            </div>
         </main>
      </div>
   );
};

export default SettingsLayout;
