import { IconType } from "react-icons";

type NavItemsProps = {
   title: string;
   navIcon: IconType;
   onClick?: () => void;
   isLogout?: boolean;
   id: string;
   isActive?: boolean;
   tourContent?: string;
};

export const NavItems = ({
   title,
   id,
   navIcon: NavIcon,
   onClick,
   isActive,
   isLogout,
}: NavItemsProps) => (
   <div
      className={`
         flex items-center p-3 gap-4 rounded-lg cursor-pointer
         ${isActive ? "bg-richElectricBlue text-white shadow-custom-active" : ""}
         ${isLogout ? "logout" : ""}
      `}
      id={id}
      onClick={onClick}
      data-testid={`joyride-step-${id}`} // Add this data-testid for Joyride
   >
      <NavIcon
         className={`w-6 h-6 ${isActive ? "text-white" : "text-darkElectricBlue"}`}
      />
      <p className="text-base">{title}</p>
   </div>
);
