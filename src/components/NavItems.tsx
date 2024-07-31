type NavItemsProps = {
   title: string;
   navIcon: string;
   activeNavIcon?: string;
   onClick?: () => void;
   isLogout?: boolean;
   id: string;
   isActive?: boolean;
   tourContent?: string;
};

// type LogoutNavItemsProps = {
//    onClick: () => void;
//    title: string;
//    navIcon: string;
//    islogout: boolean;
// };

export const NavItems = ({
   title,
   id,
   navIcon,
   onClick,
   activeNavIcon,
   isActive,
   isLogout,
}: NavItemsProps) => (
   <div
      className={`
               flex items-center p-4 gap-4 rounded-xl cursor-pointer
               ${isActive ? "bg-white text-richElectricBlue" : ""}
               ${isLogout ? "logout" : ""}
            `}
      id={id}
      onClick={onClick}
      data-testid={`joyride-step-${id}`} // Add this data-testid for Joyride
   >
      <img className="w-6 h-6" src={isActive ? activeNavIcon : navIcon} />
      <p className="text-base">{title}</p>
   </div>
);
