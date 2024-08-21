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
}: NavItemsProps) => (
   <NavLink
      className={`
         flex items-center p-[10px] gap-4 rounded-lg text-eerieBlack dark:text-white no-underline
         ${isActive ? "bg-richElectricBlue text-white shadow-custom dark:shadow-md-dark" : "hover-bg-shadow"}
         ${isCollapsed ? "" : "justify-center"}
         ${navBarAccess ? "text-opacity-35 dark:text-opacity-35 cursor-not-allowed" : "cursor-pointer "}
      `}
      id={id}
      to={linkTo ? linkTo : ""}
      onClick={onClick}
      data-testid={`joyride-step-${id}`} // Add this data-testid for Joyride
   >
      <NavIcon className={`w-5 h-5 ${isActive ? "text-white" : ""}`} />
      {isCollapsed && <p className="text-sm font-medium">{title}</p>}
   </NavLink>
);
