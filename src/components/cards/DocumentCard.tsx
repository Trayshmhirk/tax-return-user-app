import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DocumentTypeIcon from "../icons/DocumentTypeIcon";
import { FaSquareCheck } from "react-icons/fa6";
import { FileType, DocumentCardPropsTypes } from "../../types/AllTypes";
import { Checkbox } from "../ui/checkbox";
import { formatDate } from "date-fns";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Download, Eye, MoreVertical, Share, Trash2 } from "lucide-react";

export const DocumentCard = ({
   document,
   onSelect,
   isSelectClicked,
   handleSendToChat,
}: DocumentCardPropsTypes) => {
   const navigate = useNavigate();
   const [isSelected, setIsSelected] = useState(false);

   const handleSelect = () => {
      if (isSelectClicked) {
         setIsSelected(!isSelected);
         if (onSelect) {
            onSelect(document);
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
         state: { data: { document } },
      });
   };

   return (
      <label
         htmlFor={`selectDoc${document.id}`}
         onClick={handleSelect}
         className={`
            w-full flex flex-col gap-4 bg-white dark:bg-gray p-3 rounded-lg cursor-pointer shadow-md dark:shadow-md-dark hover-shadow-body
            ${isSelected ? "checked" : ""}
            ${isSelectClicked ? "select-enabled" : "select-disabled"}
         `}
      >
         <div className="flex justify-between items-center">
            <div className="w-8 h-8 flex items-center justify-center">
               <Checkbox
                  // checked={
                  //    table.getIsAllPageRowsSelected() ||
                  //    (table.getIsSomePageRowsSelected() && "indeterminate")
                  // }
                  // onCheckedChange={(value) =>
                  //    table.toggleAllPageRowsSelected(!!value)
                  // }
                  aria-label="Select document"
                  id={`selectDoc${document.id}`}
                  className="data-[state=checked]:bg-richElectricBlue dark:data-[state=checked]:bg-richElectricBlue dark:data-[state=checked]:text-white data-[state=checked]:border-0 border-spanishGray"
               />
            </div>

            <DropdownMenu>
               <DropdownMenuTrigger asChild className="w-full">
                  <Button variant="ghost" className="h-8 w-8 p-0 self-end">
                     <MoreVertical className="h-5 w-5" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent
                  align="end"
                  className="bg-ghostWhite dark:bg-gray"
               >
                  <DropdownMenuLabel className="text-sm dark:text-white">
                     Actions
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-chineseWhite dark:bg-chineseWhite dark:bg-opacity-50" />
                  <DropdownMenuItem
                     onClick={handleViewDocument}
                     className="flex items-center gap-2 cursor-pointer"
                  >
                     <Eye className="w-4 h-4" />
                     View document
                  </DropdownMenuItem>
                  <DropdownMenuItem
                     onSelect={(e) => e.preventDefault()}
                     onClick={handleSendToChat ?? (() => {})}
                     className="flex items-center gap-2 cursor-pointer"
                  >
                     <Share className="w-4 h-4" />
                     Share document
                  </DropdownMenuItem>
                  <DropdownMenuItem
                     className="flex items-center gap-2 cursor-pointer"
                     // onClick={() => exportToPDF(document)} // onclick would take the base64 code of the document and render it in a react pdf viewer
                  >
                     <Download className="w-4 h-4" />
                     Download
                  </DropdownMenuItem>
                  <DropdownMenuItem
                     className="flex items-center gap-2 cursor-pointer"
                     // onClick={() => exportToPDF(document)} // onclick would take the base64 code of the document and render it in a react pdf viewer
                  >
                     <Trash2 className="w-4 h-4" />
                     Delete
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
         <div className="flex flex-col items-center text-center gap-3">
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
               docType={mapFileTypeToDocumentType(document.document_type)}
               isGridView
            />
            <h6 className="font-medium text-sm">
               {truncateString(document.document_name, 15)}
            </h6>
         </div>

         <div className="flex justify-between items-end text-xs">
            <span className="">{`${document.document_size}MB`}</span>

            <span>{formatDate(document.date_modified, "dd.MM.yyyy")}</span>
         </div>
      </label>
   );
};
