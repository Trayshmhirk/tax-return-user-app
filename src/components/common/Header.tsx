import { MdOutlineNotifications } from "react-icons/md";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useSidebar } from "@/hooks/useSidebar";

type HeaderProps = {
   title: string;
   isHome?: boolean;
};

const Header = ({ title, isHome }: HeaderProps) => {
   const { toggleSidebar } = useSidebar();

   return (
      <header className="h-16 flex justify-between items-center py-4 px-6 border-b border-alabaster sm:px-8 md:px-20">
         <div className="font-bold sm:text-xl">
            {isHome ? `${title} {Username}!` : title}
         </div>

         <div className="flex items-center gap-4">
            <MdOutlineNotifications className="w-6 h-6 text-darkGunMetal dark:text-white cursor-pointer" />
            <HiOutlineMenuAlt3
               className="block w-6 h-6 sm:hidden"
               onClick={toggleSidebar}
            />
         </div>
      </header>
   );
};

export default Header;
