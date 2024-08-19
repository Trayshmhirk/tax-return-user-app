import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardDropdown } from "../common/CardDropdown";
import DocumentTypeIcon from "../icons/DocumentTypeIcon";
import { FaSquareCheck } from "react-icons/fa6";
import { FileType, DocumentCardPropsTypes } from "../../types/AllTypes";

export const DocumentCard = ({
   docId,
   documentType,
   documentName,
   documentSize,
   onSelect,
   isSelectClicked,
   handleSendToChat,
}: DocumentCardPropsTypes) => {
   const navigate = useNavigate();
   const [isSelected, setIsSelected] = useState(false);
   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
   const dropdownRef = useRef<HTMLDivElement>(null);

   const handleSelect = () => {
      if (isSelectClicked) {
         setIsSelected(!isSelected);
         if (onSelect) {
            onSelect({ docId, documentName, documentSize, documentType });
         }
      }
   };

   const truncateString = (str: string, num: number) => {
      if (str.length <= num) {
         return str;
      }
      return str.slice(0, num) + " ...";
   };

   // Map file types to document types
   const mapFileTypeToDocumentType = (fileType: FileType) => {
      const fileTypeMapping: Record<FileType, string> = {
         "application/pdf": "PDF",
         "image/png": "PNG",
         "application/msword": "DOC",
         "image/jpeg": "JPEG",
         "application/vnd.ms-excel": "XLS",
         // Add more mappings as needed
      };
      // Default to the original fileType if no mapping is founda
      return fileTypeMapping[fileType];
   };

   const handleViewDocument = () => {
      navigate("/view-document", {
         state: { data: { docId, documentName, documentSize, documentType } },
      });
   };

   const handleDropdownToggle = (id: string) => {
      setActiveDropdown(activeDropdown === id ? null : id);
   };

   const handleClickOutside = (event: MouseEvent) => {
      if (
         dropdownRef.current &&
         !dropdownRef.current.contains(event.target as Node)
      ) {
         setActiveDropdown(null);
      }
   };

   useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   const handleShowModal = () => {};

   return (
      <div
         id={docId}
         className={`
            w-full flex items-center justify-between bg-white dark:bg-gray p-3 rounded-lg cursor-pointer shadow-md dark:shadow-md-dark hover-shadow-body lg:calc-width-three
            ${isSelected ? "checked" : ""}
            ${isSelectClicked ? "select-enabled" : "select-disabled"}
         `}
         ref={dropdownRef}
      >
         <div className="flex items-center gap-3" onClick={handleSelect}>
            {isSelectClicked && (
               <>
                  <input
                     type="checkbox"
                     checked={isSelected}
                     // onChange={() => {}}
                     className="hidden"
                  />
                  <span
                     className={`inline-block font-[15px] text-richElectricBlue ${isSelected ? "flex items-center justify-center" : "hidden"}`}
                  >
                     <FaSquareCheck className="" />
                  </span>
               </>
            )}

            <DocumentTypeIcon
               docType={mapFileTypeToDocumentType(documentType)}
            />

            <div className="flex flex-col gap-1">
               <h6 className="font-medium">
                  {truncateString(documentName, 15)}
               </h6>
               <span className="text-xs">{`${documentSize}MB`}</span>
            </div>
         </div>

         <CardDropdown
            handleShare={handleSendToChat ?? (() => {})}
            handleViewDoc={handleViewDocument}
            handleDeleteDoc={handleShowModal}
            isDropdownOpen={activeDropdown === docId}
            handleDropdownToggle={() => handleDropdownToggle(docId)}
         />
      </div>
   );
};
