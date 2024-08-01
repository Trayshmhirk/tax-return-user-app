import { IconType } from "react-icons";

type NavItemsProps = {
   title: string;
   navIcon: IconType;
   onClick?: () => void;
   id: string;
   isActive?: boolean;
   tourContent?: string;
   isCollapsed?: boolean;
};

export const NavItems = ({
   title,
   id,
   navIcon: NavIcon,
   onClick,
   isActive,
   isCollapsed,
}: NavItemsProps) => (
   <div
      className={`
         flex items-center p-[10px] gap-4 rounded-lg cursor-pointer
         ${isActive ? "bg-richElectricBlue text-white shadow-custom-active" : ""}
         ${isCollapsed ? "" : "justify-center"}
      `}
      id={id}
      onClick={onClick}
      data-testid={`joyride-step-${id}`} // Add this data-testid for Joyride
   >
      <NavIcon
         className={`w-6 h-6 ${isActive ? "text-white" : "text-darkElectricBlue dark:text-white"}`}
      />
      {isCollapsed && <p className="text-base">{title}</p>}
   </div>
);
