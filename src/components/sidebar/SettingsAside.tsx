import { NavLink } from "react-router-dom";

const SettingsAside = () => {
   return (
      <aside className="w-[185px] h-full flex flex-col gap-4">
         <div className="h-[550px] flex flex-col gap-4 mt-4  px-2 overflow-scroll">
            <div className="flex flex-col gap-1">
               <h2 className="font-medium">Settings</h2>

               <nav className="flex flex-col gap-2">
                  <NavLink
                     to="profile"
                     className="flex items-center justify-between bg-white dark:bg-gray text-eerieBlack dark:text-white py-2 px-4 rounded-lg no-underline hover-shadow"
                  >
                     <span className="text-sm">Profile</span>
                  </NavLink>

                  <div
                     // onClick={handleShowFormModal}
                     className="flex items-center justify-between bg-white dark:bg-gray text-eerieBlack dark:text-white py-2 px-4 rounded-lg no-underline cursor-pointer hover-shadow"
                  >
                     <span className="text-sm">Change password</span>
                  </div>

                  <NavLink
                     to="privacy-policy"
                     className="flex items-center justify-between bg-white dark:bg-gray text-eerieBlack dark:text-white py-2 px-4 rounded-lg no-underline hover-shadow"
                  >
                     <span className="text-sm">Privacy policy</span>
                  </NavLink>
               </nav>
            </div>

            <div className="flex flex-col gap-1">
               <h2 className="font-medium">Account overview</h2>

               <nav className="flex flex-col gap-2">
                  <NavLink
                     to="my-requests"
                     className="flex items-center justify-between bg-white dark:bg-gray text-eerieBlack dark:text-white py-2 px-4 rounded-lg no-underline hover-shadow"
                  >
                     <span className="text-sm">My requests</span>
                  </NavLink>

                  <NavLink
                     to="integrated-banks"
                     className="flex items-center justify-between bg-white dark:bg-gray text-eerieBlack dark:text-white py-2 px-4 rounded-lg no-underline hover-shadow"
                  >
                     <span className="text-sm">Integrated banks</span>
                  </NavLink>

                  <NavLink
                     to="my-documents"
                     className="flex items-center justify-between bg-white dark:bg-gray text-eerieBlack dark:text-white py-2 px-4 rounded-lg no-underline hover-shadow"
                  >
                     <span className="text-sm">My documents</span>
                  </NavLink>
               </nav>
            </div>

            <div className="flex flex-col gap-1">
               <h2 className="font-medium">Support</h2>

               <nav className="flex flex-col gap-2">
                  <NavLink
                     to="faq"
                     className="flex items-center justify-between bg-white dark:bg-gray text-eerieBlack dark:text-white py-2 px-4 rounded-lg no-underline hover-shadow"
                  >
                     <span className="text-sm">FAQ</span>
                  </NavLink>
                  <NavLink
                     to="help-and-support"
                     className="flex items-center justify-between bg-white dark:bg-gray text-eerieBlack dark:text-white py-2 px-4 rounded-lg no-underline hover-shadow"
                  >
                     <span className="text-sm">Help and support</span>
                  </NavLink>
               </nav>
            </div>

            <div className="flex flex-col gap-1">
               <h2 className="font-medium">Legal</h2>

               <nav className="flex flex-col gap-2">
                  <NavLink
                     to="terms-and-conditions"
                     className="flex items-center justify-between bg-white dark:bg-gray text-eerieBlack dark:text-white py-2 px-4 rounded-lg no-underline hover-shadow"
                  >
                     <span className="text-sm">Terms and conditions</span>
                  </NavLink>
               </nav>
            </div>

            <div className="flex flex-col gap-1">
               <h2 className="font-medium">Danger zone</h2>

               <nav className="flex flex-col gap-2">
                  <NavLink
                     to="terms-and-conditions"
                     className="flex items-center justify-between bg-white dark:bg-gray text-eerieBlack dark:text-white py-2 px-4 rounded-lg no-underline hover-shadow"
                  >
                     <span className="text-sm">Delete account</span>
                  </NavLink>
               </nav>
            </div>
         </div>
      </aside>
   );
};

export default SettingsAside;
