import { IconType } from "react-icons";

type DropdownItemsProps = {
   dropdownIcon: IconType;
   action: string;
   isDeleteDropdownitem?: boolean;
   handleClick: () => void;
};

export const DropdownItem = ({
   dropdownIcon: DropdownIcon,
   action,
   isDeleteDropdownitem,
   handleClick,
}: DropdownItemsProps) => {
   return (
      <div
         className={`flex gap-2 ${isDeleteDropdownitem ? "text-bostonRed" : "text-gray dark:text-lightGray"}`}
         onClick={handleClick}
      >
         <DropdownIcon className="" />
         <span className="text-[13px]">{action}</span>
      </div>
   );
};
