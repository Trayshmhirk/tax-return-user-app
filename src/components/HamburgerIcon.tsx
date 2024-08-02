type HamburgerIconProps = {
   toggle: () => void;
};

export const HamburgerIcon = ({ toggle }: HamburgerIconProps) => {
   return (
      <button
         onClick={toggle}
         className="w-9 h-9 flex flex-col items-center justify-center bg-brightGray p-2 space-y-1 border-2 border-chineseWhite rounded-md hover-shadow"
      >
         <span className="block h-0.5 w-full bg-mutedGray" />
         <span className="block h-0.5 w-full bg-mutedGray" />
         <span className="block h-0.5 w-full bg-mutedGray" />

         {/* <span
            className={`block h-0.5 w-full bg-current transform transition duration-500 ease-in-out ${
               isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
         />
         <span
            className={`block h-0.5 w-full bg-current transition duration-500 ease-in-out ${
               isOpen ? "opacity-0" : ""
            }`}
         />
         <span
            className={`block h-0.5 w-full bg-current transform transition duration-500 ease-in-out ${
               isOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
         /> */}
      </button>
   );
};
