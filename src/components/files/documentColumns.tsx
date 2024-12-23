"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
   MoreHorizontal,
   ChevronDown,
   Download,
   Eye,
   Trash2,
   Share,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuCheckboxItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
   DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
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
import { Checkbox } from "@/components/ui/checkbox";
import { mapFileTypeToDocumentType } from "@/helpers/mapFileType";
import DocumentTypeIcon from "@/components/icons/DocumentTypeIcon";
import { formatDate } from "date-fns";

const handleSendToChat = () => {};

// const docTypeFilterList = ["PDF", "PNG", "JPEG", "DOC", "XLS"];

export const documentColumns = (
   handleDeleteDoc: (documentId: string) => void
): ColumnDef<DocumentsPropTypes>[] => [
   {
      id: "select",
      header: ({ table }) => (
         <Checkbox
            checked={
               table.getIsAllPageRowsSelected() ||
               (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
               table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="data-[state=checked]:bg-richElectricBlue dark:data-[state=checked]:bg-richElectricBlue dark:data-[state=checked]:text-white border-white"
         />
      ),
      cell: ({ row }) => (
         <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="data-[state=checked]:bg-richElectricBlue dark:data-[state=checked]:bg-richElectricBlue dark:data-[state=checked]:text-white data-[state=checked]:border-0"
         />
      ),
      enableSorting: false,
      enableHiding: false,
   },
   {
      accessorKey: "document_name",
      header: ({ table }) => (
         <div className="flex items-center gap-2">
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button
                     variant="ghost"
                     className="hover:bg-opacity-70 dark:hover:bg-opacity-70 gap-1 px-[6px] text-xs md:text-sm"
                  >
                     Name
                     <ChevronDown className="h-4 w-4" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent
                  align="start"
                  className="dark:bg-gray dark:border dark:border-spanishGray dark:border-opacity-10"
               >
                  <DropdownMenuCheckboxItem
                     checked={
                        table.getState().sorting[0]?.id === "document_name" &&
                        !table.getState().sorting[0]?.desc
                     }
                     onCheckedChange={(checked) =>
                        table.setSorting([
                           { id: "document_name", desc: !checked },
                        ])
                     }
                  >
                     Ascending
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                     checked={
                        table.getState().sorting[0]?.id === "document_name" &&
                        table.getState().sorting[0]?.desc
                     }
                     onCheckedChange={(checked) =>
                        table.setSorting([
                           { id: "document_name", desc: checked },
                        ])
                     }
                  >
                     Descending
                  </DropdownMenuCheckboxItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      ),
      cell: ({ row }) => {
         const documentType = row.original.document_type;
         const name = row.original.document_name;

         return (
            <div className="flex items-center gap-2 text-xs md:text-sm">
               <DocumentTypeIcon
                  docType={mapFileTypeToDocumentType(documentType)}
               />
               {name}
            </div>
         );
      },
   },
   {
      accessorKey: "document_size",
      header: "Size",
      cell: ({ row }) => {
         const size = row.original.document_size;
         return <div className="text-xs md:text-sm">{size} MB</div>;
      },
   },
   {
      accessorKey: "document_type",
      header: ({ table }) => {
         // Extract unique document types from the data
         const uniqueDocumentTypes = Array.from(
            new Set(
               table
                  .getCoreRowModel()
                  .rows.map((row) =>
                     mapFileTypeToDocumentType(row.original.document_type)
                  )
            )
         );

         return (
            <div className="hidden sm:block">
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button
                        variant="ghost"
                        className="hover:bg-opacity-70 dark:hover:bg-opacity-70 gap-1 px-[6px] text-xs md:text-sm"
                     >
                        Type
                        <ChevronDown className="h-4 w-4" />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                     align="start"
                     className="dark:bg-gray dark:border dark:border-spanishGray dark:border-opacity-10"
                  >
                     {/* Generate filter options dynamically */}
                     {uniqueDocumentTypes.map((type, index) => (
                        <DropdownMenuCheckboxItem
                           key={index}
                           checked={
                              table
                                 .getColumn("document_type")
                                 ?.getFilterValue() === type
                           }
                           onCheckedChange={(checked) => {
                              if (checked) {
                                 table
                                    .getColumn("document_type")
                                    ?.setFilterValue(type);
                              }
                           }}
                        >
                           {type}
                        </DropdownMenuCheckboxItem>
                     ))}
                     <DropdownMenuSeparator className="bg-chineseWhite dark:bg-chineseWhite dark:bg-opacity-50" />
                     <DropdownMenuItem
                        onClick={() =>
                           table.getColumn("document_type")?.setFilterValue("")
                        }
                     >
                        Reset
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         );
      },
      cell: ({ row }) => {
         const fileType = row.original.document_type;
         const MappedFile = mapFileTypeToDocumentType(fileType);

         return (
            <div className="lg:px-2 text-xs md:text-sm hidden sm:block">
               {MappedFile}
            </div>
         );
      },
   },
   {
      accessorKey: "date_modified",
      header: ({ table }) => (
         <div className="flex items-center gap-2">
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button
                     variant="ghost"
                     className="hover:bg-opacity-70 dark:hover:bg-opacity-70 gap-2 px-[6px] text-xs md:text-sm"
                  >
                     Modified
                     <ChevronDown className="h-4 w-4" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent
                  align="start"
                  className="dark:bg-gray dark:border dark:border-spanishGray dark:border-opacity-10"
               >
                  <DropdownMenuCheckboxItem
                     checked={
                        table.getState().sorting[0]?.id === "date_modified" &&
                        !table.getState().sorting[0]?.desc
                     }
                     onCheckedChange={(checked) =>
                        table.setSorting([
                           { id: "date_modified", desc: !checked },
                        ])
                     }
                  >
                     Ascending
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                     checked={
                        table.getState().sorting[0]?.id === "date_modified" &&
                        table.getState().sorting[0]?.desc
                     }
                     onCheckedChange={(checked) =>
                        table.setSorting([
                           { id: "date_modified", desc: checked },
                        ])
                     }
                  >
                     Descending
                  </DropdownMenuCheckboxItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      ),
      cell: ({ row }) => {
         const dateModified = row.original.date_modified;

         return (
            <div className="lg:px-2 text-xs md:text-sm">
               {formatDate(dateModified, "dd.MM.yyyy")}
            </div>
         );
      },
   },
   {
      id: "actions",
      cell: ({ row }) => {
         const document = row.original;
         document;

         return (
            <div className="flex justify-end">
               <DropdownMenu>
                  <DropdownMenuTrigger asChild className="w-full">
                     <Button variant="ghost" className="h-8 w-8 p-0 self-end">
                        <MoreHorizontal className="h-4 w-4" />
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
                        onSelect={(e) => e.preventDefault()}
                        className="flex items-center gap-2 cursor-pointer"
                        // onClick={() => pdfViewer(document)} // onclick would take the base64 code of the document and render it in a react pdf viewer
                     >
                        <Eye className="w-4 h-4" />
                        View Document
                     </DropdownMenuItem>
                     <DropdownMenuItem
                        onClick={handleSendToChat ?? (() => {})}
                        className="flex items-center gap-2 cursor-pointer"
                     >
                        <Share className="w-4 h-4" />
                        Share document
                     </DropdownMenuItem>

                     <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                        <Download className="w-4 h-4" />
                        Download
                     </DropdownMenuItem>
                     {/* delete alert */}
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
                              <AlertDialogAction
                                 onClick={() => handleDeleteDoc(document.id)}
                                 className="w-full bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white dark:text-white rounded"
                              >
                                 Delete
                              </AlertDialogAction>
                           </AlertDialogFooter>
                        </AlertDialogContent>
                     </AlertDialog>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         );
      },
      enableSorting: false,
      enableHiding: false,
   },
];
