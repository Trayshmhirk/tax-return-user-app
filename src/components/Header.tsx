import { IoIosNotificationsOutline } from "react-icons/io";

const Header: React.FC = () => {
   return (
      <header className="h-20 flex justify-end py-4 px-24 border-b border-alabaster">
         <div className=""></div>

         <div className="flex items-center gap-4">
            <IoIosNotificationsOutline className="w-6 h-6 text-darkGunMetal dark:text-white cursor-pointer" />
         </div>
      </header>
   );
};

export default Header;
