import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

type NavItemsProps = {
   title: string;
   navIcon: IconType;
   onClick?: () => void;
   id: string;
   isActive?: boolean;
   tourContent?: string;
   isCollapsed?: boolean;
   navBarAccess?: boolean;
   linkTo?: string;
   isChat?: boolean;
};

export const NavItems = ({
   title,
   id,
   navIcon: NavIcon,
   onClick,
   isActive,
   isCollapsed,
   navBarAccess,
   linkTo,
   isChat,
}: NavItemsProps) => (
   <NavLink
      className={`
         relative flex items-center p-[10px] gap-4 rounded-lg text-eerieBlack dark:text-white no-underline
         ${isActive ? "bg-richElectricBlue text-white shadow-custom dark:shadow-md-dark" : "hover-bg-shadow"}
         ${isCollapsed ? "" : "justify-center"}
         ${navBarAccess ? "text-opacity-35 dark:text-opacity-35 cursor-not-allowed" : "cursor-pointer "}
      `}
      id={id}
      to={linkTo ? linkTo : ""}
      onClick={onClick}
   >
      <NavIcon className={`w-5 h-5 ${isActive ? "text-white" : ""}`} />
      {isChat && id === "chatNavItem" && (
         <div
            className={`absolute ${isCollapsed && isChat ? "right-3" : "-top-[6px] -right-2"} px-2 py-[2px] rounded-full bg-red-500 dark:bg-red-600 text-[10px] text-white font-medium`}
         >
            10
         </div>
      )}
      {isCollapsed && <p className="text-sm font-medium">{title}</p>}
   </NavLink>
);
