import { NavLink, useLocation } from "react-router-dom";
import { navItemsData } from "../../mocks/NavItemData";
import { NavItems } from "./NavItems";
import { HamburgerIcon } from "../icons/HamburgerIcon";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineLightMode } from "react-icons/md";
import { BsMoonStars } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { useSidebar } from "../../hooks/UseSidebar";
import Overlay from "../common/Overlay";
import { useTheme } from "@/hooks/useTheme";

type SidebarProps = {
   isNotApproved?: boolean;
};

const Sidebar = ({ isNotApproved }: SidebarProps) => {
   const location = useLocation();
   const { isOpen, toggleSidebar } = useSidebar();
   const { theme, setTheme } = useTheme();

   const isDark = theme === "dark";
   const toggleTheme = () => {
      setTheme(isDark ? "light" : "dark");
   };

   // Check if current route starts with /settings/
   const isSettingsActive = location.pathname.startsWith("/settings/");

   const handleToggleSidebar = () => {
      // Navigate to the corresponding page

      if (isNotApproved) {
         // display you dont have access modal
         return null;
      } else {
         isOpen && toggleSidebar();
      }
   };

   return (
      <>
         <Overlay isOpen={isOpen} />
         <aside
            className={`fixed inset-y-0 z-50 transform ${
               isOpen ? "translate-x-0" : "-translate-x-full"
            } sm:static sm:translate-x-0 transition-transform duration-300 ease-in-out ${
               isOpen ? "w-[265px] sm:w-[290px] lg:w-[300px]" : "w-fit px-4"
            } flex flex-col bg-white dark:bg-darkGray text-eerieBlack dark:text-white p-6 rounded-r-2xl shadow-md dark:shadow-md-dark`}
         >
            <div className="h-full flex flex-col justify-between">
               <div className="flex flex-col gap-4">
                  <div
                     className={`flex ${isOpen ? "items-center justify-between" : "w-fit flex-col-reverse items-center self-center gap-4"} `}
                  >
                     <div className="w-fit text-darkElectricBlue">
                        <img
                           width="44"
                           height="44"
                           src="https://img.icons8.com/external-flatarticons-blue-flatarticons/65/external-tax-taxes-flatarticons-blue-flatarticons.png"
                           alt="external-tax-taxes-flatarticons-blue-flatarticons"
                        />
                     </div>
                     <HamburgerIcon toggle={toggleSidebar} isOpen={isOpen} />
                  </div>

                  <div className="w-full h-[1px] bg-eerieBlack dark:bg-white opacity-40" />

                  <div className="flex flex-col gap-3">
                     <nav className="flex flex-col gap-2">
                        {navItemsData.map((navItem) => (
                           <NavItems
                              key={navItem.id}
                              title={navItem.title}
                              navIcon={navItem.navIcon}
                              linkTo={navItem.route}
                              onClick={() => handleToggleSidebar()}
                              isActive={
                                 location.pathname === `/${navItem.route}`
                              }
                              id={navItem.id}
                              isCollapsed={isOpen}
                              navBarAccess={isNotApproved}
                           />
                        ))}
                     </nav>

                     <div className="w-full h-[1px] bg-eerieBlack dark:bg-white opacity-40" />

                     <NavItems
                        title="Logout"
                        navIcon={BiLogOut}
                        id="logout" // Ensure to provide an id for the logout item
                        onClick={() => console.log("Logout clicked")} // handleLogout function
                        isCollapsed={isOpen}
                     />
                  </div>
               </div>

               <div className="flex flex-col gap-2">
                  <div
                     onClick={toggleTheme}
                     className={`flex items-center ${isOpen ? "" : "justify-center"} p-[10px] gap-4 rounded-lg cursor-pointer hover-bg-shadow`}
                  >
                     <>
                        {isDark ? (
                           <MdOutlineLightMode className="w-5 h-5 text-white" />
                        ) : (
                           <BsMoonStars className="w-5 h-5 text-eerieBlack" />
                        )}
                     </>

                     {isOpen && (
                        <>
                           <p className="text-sm font-medium text-eerieBlack dark:text-white">
                              {isDark ? "Light Mode" : "Dark Mode"}
                           </p>
                        </>
                     )}
                  </div>

                  <NavLink
                     to={"/settings/profile"}
                     onClick={() => handleToggleSidebar()}
                     className={`
                        flex items-center p-[10px] gap-4 rounded-lg no-underline
                        ${isOpen ? "" : "justify-center"}
                        ${isNotApproved ? "cursor-not-allowed" : "cursor-pointer"}
                        ${isSettingsActive ? "bg-richElectricBlue text-white shadow-custom dark:shadow-md-dark" : " hover-bg-shadow"}
                     `}
                  >
                     <IoSettingsOutline
                        className={`w-5 h-5 ${isSettingsActive ? "text-white" : "text-eerieBlack dark:text-white"} `}
                     />

                     {isOpen && (
                        <p
                           className={`text-sm font-medium ${isSettingsActive ? "text-white" : "text-eerieBlack dark:text-white"}`}
                        >
                           Settings
                        </p>
                     )}
                  </NavLink>
               </div>
            </div>
         </aside>
      </>
   );
};

export default Sidebar;
