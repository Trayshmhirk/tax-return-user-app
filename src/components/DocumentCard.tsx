// import { useState } from "react";

import DocumentTypeIcon from "./DocumentTypeIcon";

type DocumentCardProps = {
   docId: string;
   documentName: string;
   documentSize: string;
   documentType: FileType;
};

type FileType = "application/pdf" | "image/png";

export const DocumentCard = ({
   docId,
   documentType,
   documentName,
   documentSize,
}: DocumentCardProps) => {
   // const [isSelected, setIsSelected] = useState(false);

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

   return (
      <div
         id={docId}
         className={`
            document-card flex items-center justify-between bg-white dark:bg-gray p-3 rounded-lg shadow-md dark:shadow-md-dark
         `}
      >
         <div
            className="flex items-center gap-2"
            // onClick={handleSelect}
         >
            {/* {isSelectClicked && (
               <>
                  <input
                     type="checkbox"
                     checked={isSelected}
                     onChange={() => {}}
                  />
                  <span
                     className={`custom-checkbox ${isSelected ? "d-flex align-items-center justify-content-center" : "d-none"}`}
                  >
                     <FontAwesomeIcon icon={faSquareCheck} />
                  </span>
               </>
            )} */}

            <DocumentTypeIcon
               docType={mapFileTypeToDocumentType(documentType)}
            />

            <div className="flex flex-col gap-1">
               <h6 className="font-normal">
                  {truncateString(documentName, 15)}
               </h6>
               <span className="text-xs">{`${documentSize}MB`}</span>
            </div>
         </div>

         {/* <NavDropdown
            handleShare={handleSendToChat}
            handleViewDoc={handleViewDocument}
            handleDeleteDoc={handleShowModal}
         /> */}
      </div>
   );
};

// ${isSelected ? "checked" : ""}
// ${isSelectClicked ? "select-enabled" : "select-disabled"}
// ${isMobileView ? "w-100 gap-1" : "gap-2"}
