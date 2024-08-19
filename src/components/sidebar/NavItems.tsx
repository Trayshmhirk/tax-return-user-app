import { IconType } from "react-icons";

type NavItemsProps = {
   title: string;
   navIcon: IconType;
   onClick?: () => void;
   id: string;
   isActive?: boolean;
   tourContent?: string;
   isCollapsed?: boolean;
   navBarAccess?: boolean;
};

export const NavItems = ({
   title,
   id,
   navIcon: NavIcon,
   onClick,
   isActive,
   isCollapsed,
   navBarAccess,
}: NavItemsProps) => (
   <div
      className={`
         flex items-center p-[10px] gap-4 rounded-lg text-eerieBlack dark:text-white
         ${isActive ? "bg-richElectricBlue text-white shadow-custom dark:shadow-md-dark" : "hover-bg-shadow"}
         ${isCollapsed ? "" : "justify-center"}
         ${navBarAccess ? "text-opacity-35 dark:text-opacity-35 cursor-not-allowed" : "cursor-pointer "}
      `}
      id={id}
      onClick={onClick}
      data-testid={`joyride-step-${id}`} // Add this data-testid for Joyride
   >
      <NavIcon className={`w-5 h-5 ${isActive ? "text-white" : ""}`} />
      {isCollapsed && <p className="text-sm font-medium">{title}</p>}
   </div>
);
