import DocumentTypeIcon from "@/components/icons/DocumentTypeIcon";
import { DocumentCardPropsTypes } from "@/types/AllTypes";
import { mapFileTypeToDocumentType } from "@/helpers/mapFileType";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "date-fns";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components//ui/dropdown-menu";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Eye, MoreVertical, Share, Trash2 } from "lucide-react";
import { truncateString } from "@/helpers/truncateString";

export const DocumentCard = ({
   document,
   onSelect,
   isSelected,
   handleSendToChat,
}: DocumentCardPropsTypes) => {
   const handleViewDocument = () => {};

   return (
      <div>
         <label
            htmlFor={`selectDoc${document.id}`}
            className="relative w-full flex flex-col gap-3 bg-white dark:bg-gray p-3 rounded-lg cursor-pointer shadow-md dark:shadow-md-dark hover-shadow-body"
         >
            <div className="flex justify-between items-center">
               <div className="w-5 h-5 flex justify-center">
                  <Checkbox
                     aria-label="Select document"
                     id={`selectDoc${document.id}`}
                     checked={isSelected} // Bind to isSelected prop
                     onCheckedChange={() => {
                        // Call the onSelect function with the document on checkbox change
                        if (onSelect) {
                           onSelect(document); // Pass the checked state as well
                        }
                     }}
                     className="data-[state=checked]:bg-richElectricBlue dark:data-[state=checked]:bg-richElectricBlue dark:data-[state=checked]:text-white data-[state=checked]:border-0 border-spanishGray"
                  />
               </div>

               <DropdownMenu>
                  <DropdownMenuTrigger asChild className="w-full">
                     <Button
                        variant="ghost"
                        className="absolute right-2 top-2 h-8 w-8 p-0 self-end"
                     >
                        <MoreVertical className="h-5 w-5" />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                     align="end"
                     className="bg-white dark:bg-gray"
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
                        // onSelect={(e) => e.preventDefault()}
                        onClick={handleSendToChat ?? (() => {})}
                        className="flex items-center gap-2 cursor-pointer"
                     >
                        <Share className="w-4 h-4" />
                        Share document
                     </DropdownMenuItem>

                     <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                              className="flex items-center gap-2 cursor-pointer text-bostonRed dark:text-red-500 focus:text-bostonRed dark:focus:text-red-500"
                           >
                              <Trash2 className="w-4 h-4" />
                              Delete
                           </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                           <AlertDialogHeader>
                              <AlertDialogTitle>
                                 Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                 This action cannot be undone. This will
                                 permanently delete this document and remove its
                                 data from our servers.
                              </AlertDialogDescription>
                           </AlertDialogHeader>
                           <AlertDialogFooter>
                              <AlertDialogCancel className="w-full dark:bg-neutral-600 dark:hover:bg-neutral-700 rounded">
                                 Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction className="w-full bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white dark:text-white rounded">
                                 Delete
                              </AlertDialogAction>
                           </AlertDialogFooter>
                        </AlertDialogContent>
                     </AlertDialog>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
               <DocumentTypeIcon
                  docType={mapFileTypeToDocumentType(document.document_type)}
                  isGridView
               />
               <h6 className="font-medium text-sm">
                  {truncateString(document.document_name, 20)}
               </h6>
            </div>

            <div className="flex justify-between items-end text-xs">
               <span className="">{`${document.document_size}MB`}</span>

               <span>{formatDate(document.date_modified, "dd.MM.yyyy")}</span>
            </div>
         </label>
      </div>
   );
};
