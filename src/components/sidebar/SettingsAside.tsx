import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { PiNavigationArrowDuotone } from "react-icons/pi";

const route = [
   { name: "Profile", route: "profile" },
   { name: "Privacy policy", route: "privacy-policy" },
   { name: "My requests", route: "my-requests" },
   { name: "Integrated banks", route: "integrated-banks" },
   { name: "My documents", route: "my-documents" },
   { name: "FAQ", route: "faq" },
   { name: "Help and support", route: "help-and-support" },
   { name: "Terms and conditions", route: "terms-and-conditions" },
];

const SettingsAside = () => {
   const location = useLocation();
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [selectedDropdownTitle, setSelectedDropdownTitle] =
      useState("Profile");

   useEffect(() => {
      // Find the matching route based on location.pathname and update the title
      const currentRoute = route.find((r) =>
         location.pathname.includes(r.route)
      );
      if (currentRoute) {
         setSelectedDropdownTitle(currentRoute.name);
      }
   }, [location.pathname]);

   const handleDropdownSelect = (route: string) => {
      setSelectedDropdownTitle(route);
      setIsDropdownOpen(false);
   };

   return (
      <>
         <div className="relative mt-3 ml-2 lg:hidden">
            <button
               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
               className="bg-white dark:bg-mutedGray w-56 h-11 py-3 px-6 text-center rounded-lg shadow-md dark:shadow-md-dark text-[15px] font-medium flex items-center gap-3"
            >
               <PiNavigationArrowDuotone className="text-lg text-gray dark:text-white" />
               {selectedDropdownTitle}
            </button>
            {isDropdownOpen && (
               <div className="absolute left-0 right-0 bg-white dark:bg-mutedGray mt-2 w-56 rounded-lg shadow-md dark:shadow-md-dark z-10 overflow-hidden">
                  {route.map((route, index) => (
                     <NavLink
                        key={index}
                        className="block py-2 px-5 text-sm font-medium hover:bg-brightGray dark:hover:bg-spanishGray text-eerieBlack dark:text-white no-underline"
                        onClick={() => handleDropdownSelect(route.name)}
                        to={route.route}
                     >
                        {route.name}
                     </NavLink>
                  ))}
               </div>
            )}
         </div>

         <aside className="w-[185px] h-full hidden lg:block">
            <div className="h-[650px] flex flex-col gap-4 mt-4 px-2 overflow-scroll">
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
      </>
   );
};

export default SettingsAside;
