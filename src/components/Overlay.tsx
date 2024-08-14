type OverlayProps = {
   isOpen: boolean;
};

const Overlay = ({ isOpen }: OverlayProps) => {
   return (
      <div
         className={`fixed inset-0 bg-black bg-opacity-50 z-30 ${
            isOpen ? "block sm:hidden" : "hidden"
         }`}
      />
   );
};

export default Overlay;
