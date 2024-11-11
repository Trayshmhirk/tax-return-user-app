import { useSidebar } from "@/hooks/useSidebar";
import { MdOutlineNotifications } from "react-icons/md";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

type HeaderProps = {
   title: string;
   isHome?: boolean;
};

const Header = ({ title, isHome }: HeaderProps) => {
   const { toggleSidebar } = useSidebar();

   return (
      <header className="h-14 flex justify-between items-center py-4 px-6 border-b border-alabaster dark:border-spanishGray dark:border-opacity-50 sm:px-8 md:px-20">
         <div className="font-bold sm:text-lg">
            {isHome ? `${title} {Username}!` : title}
         </div>

         <div className="flex items-center gap-4">
            <MdOutlineNotifications className="w-5 h-5 text-darkGunMetal dark:text-white cursor-pointer" />
            <HiOutlineMenuAlt3
               className="block w-5 h-5 sm:hidden"
               onClick={toggleSidebar}
            />
         </div>
      </header>
   );
};

export default Header;
