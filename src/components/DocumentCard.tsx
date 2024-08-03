import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardDropdown } from "./CardDropdown";
import DocumentTypeIcon from "./DocumentTypeIcon";
import { FaSquareCheck } from "react-icons/fa6";

type FileType = "application/pdf" | "image/png";

type DocumentCardProps = {
   docId: string;
   documentName: string;
   documentSize: string;
   documentType: FileType;
   onSelect?: (doc: {
      docId: string;
      documentName: string;
      documentSize: string;
      documentType: FileType;
   }) => void;
   isSelectClicked?: boolean;
   handleSendToChat?: () => void;
};

export const DocumentCard = ({
   docId,
   documentType,
   documentName,
   documentSize,
   onSelect,
   isSelectClicked,
   handleSendToChat,
}: DocumentCardProps) => {
   const [isSelected, setIsSelected] = useState(false);
   const navigate = useNavigate();

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

   return (
      <div
         id={docId}
         className={`
            document-card flex items-center justify-between bg-white dark:bg-gray p-3 rounded-lg shadow-md dark:shadow-md-dark
            ${isSelected ? "checked" : ""}
            ${isSelectClicked ? "select-enabled" : "select-disabled"}
         `}
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
            // handleDeleteDoc={handleShowModal}
         />
      </div>
   );
};
