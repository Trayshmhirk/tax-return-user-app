import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { navItemsData } from "../../mocks/NavItemData";
import { NavItems } from "./NavItems";
import { HamburgerIcon } from "../icons/HamburgerIcon";
import { BiLogOut } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineLightMode } from "react-icons/md";
import { BsMoonStars } from "react-icons/bs";
import { useSidebar } from "../../hooks/UseSidebar";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Overlay from "../common/Overlay";

type SidebarProps = {
   isNotApproved?: boolean;
};

const Sidebar = ({ isNotApproved }: SidebarProps) => {
   const location = useLocation();
   const navigate = useNavigate();

   const themeContext = useContext(ThemeContext);

   const { isOpen, toggleSidebar } = useSidebar();

   if (!themeContext) return null; // Add a fallback for when context is not available
   const { isDarkMode, toggleTheme } = themeContext;

   const handleNavigate = (route: string) => {
      // Navigate to the corresponding page

      if (isNotApproved) {
         // display you dont have access modal
         return null;
      } else {
         navigate(`/${route}`);
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
               isOpen ? "w-[275px] md:w-[250px] lg:w-[300px]" : "w-fit px-4"
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
                              onClick={() => handleNavigate(navItem.route)}
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

                     <div
                        onClick={toggleTheme}
                        className={`flex items-center ${isOpen ? "" : "justify-center"} p-[10px] gap-4 rounded-lg cursor-pointer hover-bg-shadow`}
                     >
                        <>
                           {isDarkMode ? (
                              <MdOutlineLightMode className="w-5 h-5 text-white" />
                           ) : (
                              <BsMoonStars className="w-5 h-5 text-eerieBlack" />
                           )}
                        </>

                        {isOpen && (
                           <>
                              <p className="text-sm font-medium text-eerieBlack dark:text-white">
                                 {isDarkMode ? "Light Mode" : "Dark Mode"}
                              </p>
                           </>
                        )}
                     </div>
                  </div>
               </div>

               <NavLink
                  className={`flex items-center bg-chineseWhite dark:bg-spanishGray p-2 px-[10px] gap-2 md:gap-3 rounded-lg hover-shadow ${isNotApproved ? "cursor-not-allowed" : "cursor-pointer"}`}
                  to={"/settings/profile"}
               >
                  <div
                     className={`${isOpen ? "w-8 h-8" : "w-6 h-6"} flex items-center justify-center bg-lotion dark:bg-eerieBlack rounded-full`}
                  >
                     <FaUserAlt className="text-eerieBlack dark:text-white text-xs" />
                  </div>

                  {isOpen && (
                     <div className="flex flex-col">
                        <span className="text-eerieBlack text-sm font-medium">
                           Frank M.
                        </span>
                        <span className="text-xs text-eerieBlack">
                           harlex.mikkey@gm...
                        </span>
                     </div>
                  )}
               </NavLink>
            </div>
         </aside>
      </>
   );
};

export default Sidebar;
