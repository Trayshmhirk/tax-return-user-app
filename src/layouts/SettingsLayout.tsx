import { Outlet } from "react-router-dom";
import SettingsAside from "../components/sidebar/SettingsAside";

const SettingsLayout = () => {
   return (
      <div className="flex flex-col gap-6">
         <h1 className="text-2xl font-semibold">Account settings</h1>

         <div className="w-full h-full flex gap-5 overflow-hidden bg-white dark:bg-gray px-4 py-3 rounded-3xl">
            <SettingsAside />
            <div className="max-h-screen my-4">
               <div className="w-[1px] h-full bg-eerieBlack dark:bg-white opacity-10" />
            </div>

            <div className="settings-content-layout px-2">
               <Outlet />
            </div>
         </div>
      </div>
   );
};

export default SettingsLayout;
