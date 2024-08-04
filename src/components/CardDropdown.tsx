import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { DropdownItem } from "./DropdownItem";
import { FaRegEye } from "react-icons/fa6";
import { MdOutlineIosShare } from "react-icons/md";
// import { RiDeleteBin6Line } from "react-icons/ri";
import { CardDropdownPropsTypes } from "../types/DocumentTypes";

export const CardDropdown = ({
   handleShare,
   handleViewDoc,
   isSelectBank,
   // handleDeleteDoc,
}: CardDropdownPropsTypes) => {
   const [isDropdownOpen, setDropdownOpen] = useState(false);

   const toggleDropdown = () => {
      setDropdownOpen(!isDropdownOpen);
   };

   return (
      <div className="card-dropdown relative">
         <button
            className="flex items-center gap-1"
            type="button"
            onClick={toggleDropdown}
         >
            {isSelectBank ? (
               <FaAngleDown className="w-6 h-6" />
            ) : (
               <IoEllipsisVertical className="w-6 h-6" />
            )}
         </button>

         <div
            className={`absolute right-0 w-48 mt-4 p-4 bg-white dark:bg-gray rounded-md shadow-md dark:shadow-md-dark z-50 ${
               isDropdownOpen ? "block" : "hidden"
            }`}
         >
            {isSelectBank ? (
               <>
                  <p className="text-[13px] mb-2">
                     Select a bank card to debit
                  </p>

                  <div className="flex flex-col gap-4">
                     {/* <Line />
                     <DropdownItem
                        action="Bank name ****1236"
                        // handleClick={handleViewDocument}
                     />

                     <DropdownItem
                        action="Bank name ****8743"
                        // handleClick={handleShare}
                     />

                     <DropdownItem action="Bank name ****3256" />

                     <DropdownItem
                        action="Bank name ****4563"
                        // handleClick={handleShowModal}
                     /> */}
                  </div>
               </>
            ) : (
               <>
                  <p className="text-[13px] mb-3">What do you want to do?</p>

                  <div className="flex flex-col gap-3">
                     <div className="w-full h-[1px] bg-eerieBlack dark:bg-white opacity-40" />
                     <DropdownItem
                        dropdownIcon={FaRegEye}
                        action="View"
                        handleClick={handleViewDoc}
                     />
                     <div className="w-full h-[1px] bg-eerieBlack dark:bg-white opacity-40" />
                     <DropdownItem
                        dropdownIcon={MdOutlineIosShare}
                        action="Share"
                        handleClick={handleShare}
                     />
                     {/* <div className="w-full h-[1px] bg-eerieBlack dark:bg-white opacity-40" /> */}
                     {/* <DropdownItem
                        dropdownIcon={RiDeleteBin6Line}
                        action="Delete"
                        handleClick={handleDeleteDoc}
                        isDeleteDropdownitem
                     /> */}
                  </div>
               </>
            )}
         </div>
      </div>
   );
};
