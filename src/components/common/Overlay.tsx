import { useSidebar } from "../../hooks/UseSidebar";

type OverlayProps = {
   isOpen: boolean;
};

const Overlay = ({ isOpen }: OverlayProps) => {
   const { toggleSidebar } = useSidebar();
   return (
      <div
         className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30 ${
            isOpen ? "block sm:hidden" : "hidden"
         }`}
         onClick={toggleSidebar}
      />
   );
};

export default Overlay;
