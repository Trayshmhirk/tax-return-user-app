import { MdOutlineNotifications } from "react-icons/md";

type HeaderProps = {
   title: string;
   isHome?: boolean;
};

const Header = ({ title, isHome }: HeaderProps) => {
   return (
      <header className="h-16 flex justify-between py-4 px-7 border-b border-alabaster sm:px-10 md:px-20">
         <div className="font-bold text-xl">
            {isHome ? `${title} {Username}!` : title}
         </div>

         <div className="flex items-center gap-4">
            <MdOutlineNotifications className="w-6 h-6 text-darkGunMetal dark:text-white cursor-pointer" />
         </div>
      </header>
   );
};

export default Header;
