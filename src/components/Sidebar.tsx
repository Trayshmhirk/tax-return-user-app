import { useState } from "react";
import { navItemsData } from "../mocks/NavItemData";
import { NavItems } from "./NavItems";
import { BiLogOut } from "react-icons/bi";

import { useLocation, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

const Sidebar = () => {
   const location = useLocation();
   const navigate = useNavigate();

   const isNotApprovedHome = location.pathname !== "/";
   const [toggleSidebar] = useState(true);

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

   return (
      <aside
         className={`w-[300px] flex ${toggleSidebar ? "flex-col" : ""} bg-white text-darkElectricBlue p-6 pt-11 pb-8`}
      >
         {/* <div className="h-full ">

         </div> */}

         <div className="h-full flex flex-col justify-between">
            <div className="flex flex-col gap-8">
               <div className="logo text-darkElectricBlue">Tax Return app</div>
               <div className="flex flex-col gap-6">
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
                           isLogout={false}
                           id={navItem.id}
                        />
                     ))}
                  </nav>

                  <div className="w-full h-[1px] bg-darkElectricBlue opacity-50"></div>

                  <NavItems
                     isLogout={true}
                     title="Logout"
                     navIcon={BiLogOut}
                     id="logout" // Ensure to provide an id for the logout item
                     onClick={() => console.log("Logout clicked")} // handleLogout function
                  />
               </div>
            </div>

            <div
               className="flex items-center bg-brightGray p-3 gap-4 rounded-lg"
               onClick={() => handleNavigate("profile", "profileNavItem")}
            >
               <div className="profile-image w-10 h-10 flex items-center justify-center bg-lotion rounded-full">
                  <FaUserAlt className="" />
               </div>

               <span>Username</span>
            </div>
         </div>
      </aside>
   );
};

export default Sidebar;
