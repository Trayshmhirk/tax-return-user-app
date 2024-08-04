import { IconType } from "react-icons";

export const DropdownItem = ({
   dropdownIcon: DropdownIcon,
   action,
   isDeleteDropdownitem,
   handleClick,
}: DropdownItemsProps) => {
   return (
      <div
         className={`flex gap-2 cursor-pointer ${isDeleteDropdownitem ? "text-bostonRed" : "text-gray dark:text-lightGray"}`}
         onClick={handleClick}
      >
         <DropdownIcon className="" />
         <span className="text-[13px]">{action}</span>
      </div>
   );
};

type DropdownItemsProps = {
   dropdownIcon: IconType;
   action: string;
   isDeleteDropdownitem?: boolean;
   handleClick: () => void;
};
