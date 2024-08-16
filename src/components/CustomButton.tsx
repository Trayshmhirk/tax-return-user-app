type CustomButton = {
   children: React.ReactNode;
   handleClick?: () => void;
   type?: "submit" | "reset" | "button";
   isDisabled?: boolean;
};

const CustomButton = ({
   children,
   handleClick,
   type,
   isDisabled,
}: CustomButton) => {
   return (
      <button
         className={`w-full px-4 py-3 bg-richElectricBlue text-white border-0 rounded shadow-md dark:shadow-md-dark hover-shadow-body`}
         onClick={handleClick}
         type={type && type}
         disabled={isDisabled}
      >
         {children}
      </button>
   );
};

export default CustomButton;
