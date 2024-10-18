import { useSidebar } from "@/hooks/useSidebar";

type OverlayProps = {
   isOpen: boolean;
};

const Overlay = ({ isOpen }: OverlayProps) => {
   const { toggleSidebar } = useSidebar();
   return (
      <div
         className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-30 ${
            isOpen ? "block sm:hidden" : "hidden"
         }`}
         onClick={toggleSidebar}
      />
   );
};

export default Overlay;
