import { navItemsData } from "../mocks/NavItemData";
import { NavItems } from "./NavItems";
import LogoutIcon from "../assets/sidebar-icons/logout.png";

import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
   const location = useLocation();
   const navigate = useNavigate();

   const isNotApprovedHome = location.pathname !== "/";

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
      <aside className="w-[300px] flex flex-col bg-richElectricBlue text-white p-6 pt-10">
         <div className="h-[600px] mt-6 overflow-scroll">
            <nav className="flex flex-col gap-2">
               {navItemsData.map((navItem) => (
                  <NavItems
                     key={navItem.id}
                     title={navItem.title}
                     navIcon={navItem.navIcon}
                     activeNavIcon={navItem.activeNavIcon}
                     onClick={() => handleNavigate(navItem.route, navItem.id)}
                     isActive={location.pathname === `/${navItem.route}`}
                     isLogout={false}
                     id={navItem.id}
                  />
               ))}
            </nav>
         </div>

         <NavItems
            isLogout={true}
            title="Logout"
            navIcon={LogoutIcon}
            id="logout" // Ensure to provide an id for the logout item
            onClick={() => console.log("Logout clicked")} // handleLogout function
         />
      </aside>
   );
};

export default Sidebar;
