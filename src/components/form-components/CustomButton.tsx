type CustomButton = {
   children: React.ReactNode;
   handleClick?: () => void;
   type: "submit" | "reset" | "button";
   className?: string;
   isDisabled?: boolean;
   isBorder?: boolean;
};

const CustomButton = ({
   children,
   handleClick,
   type,
   className,
   isDisabled,
   isBorder,
}: CustomButton) => {
   return (
      <button
         className={`
            w-full px-4 py-3 bg-richElectricBlue font-medium rounded shadow-md dark:shadow-md-dark disabled:hover-shadow-body disabled:bg-spanishGray dark:disabled:bg-mutedGray 
            ${isBorder ? "border" : "text-white border-0"}
            ${className}
         `}
         onClick={handleClick}
         type={type && type}
         disabled={isDisabled}
      >
         {children}
      </button>
   );
};

export default CustomButton;
