import { NavLink, useLocation } from "react-router-dom";

const SettingsAside = () => {
   const location = useLocation();

   return (
      <aside className="w-[185px] h-full">
         <div className="h-[550px] flex flex-col gap-4 mt-4 px-2 pb-3 overflow-scroll">
            <div className="flex flex-col gap-2">
               <h2 className="font-medium">Settings</h2>

               <nav className="flex flex-col gap-2">
                  <NavLink
                     to="profile"
                     className={`
                        flex items-center justify-between py-1 px-3 rounded-md no-underline
                        ${location.pathname === "/settings/profile" ? "bg-richElectricBlue text-white" : "bg-white dark:bg-gray text-mutedGray dark:text-white hover-bg-shadow"}
                     `}
                  >
                     <span className="text-sm">Profile</span>
                  </NavLink>

                  <div
                     // onClick={handleShowFormModal}
                     className="flex items-center justify-between bg-white dark:bg-gray text-mutedGray dark:text-white py-1 px-3 rounded-md no-underline cursor-pointer hover-bg-shadow"
                  >
                     <span className="text-sm">Change password</span>
                  </div>

                  <NavLink
                     to="privacy-policy"
                     className={`
                        flex items-center justify-between py-1 px-3 rounded-md no-underline
                        ${location.pathname === "/settings/privacy-policy" ? "bg-richElectricBlue text-white" : "bg-white dark:bg-gray text-mutedGray dark:text-white hover-bg-shadow"}
                     `}
                  >
                     <span className="text-sm">Privacy policy</span>
                  </NavLink>
               </nav>
            </div>

            <div className="flex flex-col gap-2">
               <h2 className="font-medium">Account overview</h2>

               <nav className="flex flex-col gap-2">
                  <NavLink
                     to="my-requests"
                     className={`
                        flex items-center justify-between py-1 px-3 rounded-md no-underline
                        ${location.pathname === "/settings/my-requests" ? "bg-richElectricBlue text-white" : "bg-white dark:bg-gray text-mutedGray dark:text-white hover-bg-shadow"}
                     `}
                  >
                     <span className="text-sm">My requests</span>
                  </NavLink>

                  <NavLink
                     to="integrated-banks"
                     className={`
                        flex items-center justify-between py-1 px-3 rounded-md no-underline
                        ${location.pathname === "/settings/integrated-banks" ? "bg-richElectricBlue text-white" : "bg-white dark:bg-gray text-mutedGray dark:text-white hover-bg-shadow"}
                     `}
                  >
                     <span className="text-sm">Integrated banks</span>
                  </NavLink>

                  <NavLink
                     to="my-documents"
                     className={`
                        flex items-center justify-between py-1 px-3 rounded-md no-underline
                        ${location.pathname === "/settings/my-documents" ? "bg-richElectricBlue text-white" : "bg-white dark:bg-gray text-mutedGray dark:text-white hover-bg-shadow"}
                     `}
                  >
                     <span className="text-sm">My documents</span>
                  </NavLink>
               </nav>
            </div>

            <div className="flex flex-col gap-2">
               <h2 className="font-medium">Support</h2>

               <nav className="flex flex-col gap-2">
                  <NavLink
                     to="faq"
                     className={`
                        flex items-center justify-between py-1 px-3 rounded-md no-underline
                        ${location.pathname === "/settings/faq" ? "bg-richElectricBlue text-white" : "bg-white dark:bg-gray text-mutedGray dark:text-white hover-bg-shadow"}
                     `}
                  >
                     <span className="text-sm">FAQ</span>
                  </NavLink>
                  <NavLink
                     to="help-and-support"
                     className={`
                        flex items-center justify-between py-1 px-3 rounded-md no-underline
                        ${location.pathname === "/settings/help-and-support" ? "bg-richElectricBlue text-white" : "bg-white dark:bg-gray text-mutedGray dark:text-white hover-bg-shadow"}
                     `}
                  >
                     <span className="text-sm">Help and support</span>
                  </NavLink>
               </nav>
            </div>

            <div className="flex flex-col gap-2">
               <h2 className="font-medium">Legal</h2>

               <nav className="">
                  <NavLink
                     to="terms-and-conditions"
                     className={`
                        flex items-center justify-between py-1 px-3 rounded-md no-underline
                        ${location.pathname === "/settings/terms-and-conditions" ? "bg-richElectricBlue text-white" : "bg-white dark:bg-gray text-mutedGray dark:text-white hover-bg-shadow"}
                     `}
                  >
                     <span className="text-sm">Terms and conditions</span>
                  </NavLink>
               </nav>
            </div>

            <div className="flex flex-col gap-2">
               <h2 className="font-medium">Danger zone</h2>

               <div
                  // onClick={handleShowFormModal}
                  className="flex items-center justify-between bg-white dark:bg-gray text-mutedGray dark:text-white py-1 px-3 rounded-md no-underline cursor-pointer hover-bg-shadow"
               >
                  <span className="text-sm text-bostonRed dark:text-red-500">
                     Delete account
                  </span>
               </div>
            </div>
         </div>
      </aside>
   );
};

export default SettingsAside;
