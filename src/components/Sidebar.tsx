import { useEffect, useState } from "react";
import { navItemsData } from "../mocks/NavItemData";
import { NavItems } from "./NavItems";
import { BiLogOut } from "react-icons/bi";

import { useLocation, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { HamburgerIcon } from "./HamburgerIcon";
import { MdOutlineLightMode } from "react-icons/md";
import { BsMoonStars } from "react-icons/bs";

const Sidebar = () => {
   const location = useLocation();
   const navigate = useNavigate();

   const isNotApprovedHome = location.pathname !== "/";
   const [isOpen, setIsOpen] = useState(true);
   const [toggleTheme, setToggleTheme] = useState(
      localStorage.getItem("theme") === "dark"
   );

   useEffect(() => {
      if (toggleTheme) {
         document.documentElement.classList.add("dark");
         localStorage.setItem("theme", "dark");
      } else {
         document.documentElement.classList.remove("dark");
         localStorage.setItem("theme", "light");
      }
   }, [toggleTheme]);

   const handleNavigate = (route: string, id: string) => {
      // Navigate to the corresponding page
      if (isNotApprovedHome) {
         return null;
      } else {
         navigate(`/${route}`);
         // dispatch(toggleSidebar());

         // Scroll to the bottom if the clicked item is one of the last items
         const lastItemsIds = [
            "helpAndSupportNavItem",
            "termsAndConditionsNavItem",
            "privacyPolicyNavItem",
         ];
         if (lastItemsIds.includes(id)) {
            const lastItemElement = document.getElementById(
               "privacyPolicyNavItem"
            ); // Choose any last item to reference
            if (lastItemElement) {
               lastItemElement.scrollIntoView({
                  behavior: "smooth",
                  block: "end",
               });
            }
         }
      }
   };

   const handleToggleTheme = () => {
      setToggleTheme(!toggleTheme);
   };

   return (
      <aside
         className={`relative ${isOpen ? "w-[300px]" : "w-fit px-4"} flex flex-col bg-white dark:bg-charcoal text-darkElectricBlue dark:text-white p-6`}
      >
         <div className="h-full flex flex-col justify-between">
            <div className="flex flex-col gap-4">
               <div
                  className={`flex ${isOpen ? "items-center justify-between" : "w-fit flex-col-reverse items-center gap-3"} `}
               >
                  <div className="w-fit text-darkElectricBlue">
                     <img
                        width="48"
                        height="48"
                        src="https://img.icons8.com/external-flatarticons-blue-flatarticons/65/external-tax-taxes-flatarticons-blue-flatarticons.png"
                        alt="external-tax-taxes-flatarticons-blue-flatarticons"
                     />
                  </div>
                  <HamburgerIcon toggle={() => setIsOpen(!isOpen)} />
               </div>

               <div className="w-full h-[1px] bg-darkElectricBlue dark:bg-white opacity-40" />

               <div className="flex flex-col gap-3">
                  <nav className="flex flex-col gap-2">
                     {navItemsData.map((navItem) => (
                        <NavItems
                           key={navItem.id}
                           title={navItem.title}
                           navIcon={navItem.navIcon}
                           onClick={() =>
                              handleNavigate(navItem.route, navItem.id)
                           }
                           isActive={location.pathname === `/${navItem.route}`}
                           id={navItem.id}
                           isCollapsed={isOpen}
                        />
                     ))}
                  </nav>

                  <div className="w-full h-[1px] bg-darkElectricBlue dark:bg-white opacity-40" />

                  <NavItems
                     title="Logout"
                     navIcon={BiLogOut}
                     id="logout" // Ensure to provide an id for the logout item
                     onClick={() => console.log("Logout clicked")} // handleLogout function
                     isCollapsed={isOpen}
                  />

                  <div
                     onClick={handleToggleTheme}
                     className={`flex items-center ${isOpen ? "" : "justify-center"} p-[10px] gap-4 rounded-lg cursor-pointer`}
                  >
                     <>
                        {toggleTheme ? (
                           <MdOutlineLightMode className="w-6 h-6 text-white" />
                        ) : (
                           <BsMoonStars className="w-6 h-6 text-darkElectricBlue" />
                        )}
                     </>

                     {isOpen && (
                        <>
                           <p className="text-base text-darkElectricBlue dark:text-white">
                              {toggleTheme ? "Light Mode" : "Dark Mode"}
                           </p>
                        </>
                     )}
                  </div>
               </div>
            </div>

            <div
               className="flex items-center bg-chineseWhite p-2 gap-4 rounded-lg cursor-pointer"
               onClick={() => handleNavigate("profile", "profileNavItem")}
            >
               <div
                  className={`${isOpen ? "w-10 h-10" : "w-8 h-8"} flex items-center justify-center bg-lotion dark:bg-darkElectricBlue rounded-full`}
               >
                  <FaUserAlt className="text-darkElectricBlue dark:text-white" />
               </div>

               {isOpen && (
                  <span className="text-darkElectricBlue">Frank Micheal</span>
               )}
            </div>
         </div>
      </aside>
   );
};

export default Sidebar;
