type CustomButton = {
   children: React.ReactNode;
   handleClick?: () => void;
   type: "submit" | "reset" | "button";
   className?: string;
   isDisabled?: boolean;
   isLoading?: boolean;
   isPrevBtn?: boolean;
};

const CustomButton = ({
   children,
   handleClick,
   type,
   className,
   isDisabled,
   isPrevBtn,
   isLoading,
}: CustomButton) => {
   return (
      <button
         className={`
            w-full px-4 py-3 bg-richElectricBlue font-medium rounded shadow-md dark:shadow-md-dark
            ${isPrevBtn ? "bg-transparent text-richElectricBlue border border-richElectricBlue" : "text-white border-0"}
            ${isDisabled ? (isLoading ? "" : "bg-spanishGray") : "hover-shadow-body"}
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
