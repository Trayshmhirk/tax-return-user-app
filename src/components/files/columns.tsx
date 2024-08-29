"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ChevronDown, Download, Copy, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuCheckboxItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { DocumentsPropTypes } from "@/types/AllTypes";
import { mapFileTypeToDocumentType } from "@/helpers/mapFileType";
import DocumentTypeIcon from "../icons/DocumentTypeIcon";
import { formatDate } from "date-fns";

export const columns: ColumnDef<DocumentsPropTypes>[] = [
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
                     className="hover:bg-opacity-70 dark:hover:bg-opacity-70 gap-2"
                  >
                     NAME
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
            <div className="flex items-center gap-3">
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
      header: ({ table }) => (
         <div className="flex items-center gap-2">
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button
                     variant="ghost"
                     className="hover:bg-opacity-70 dark:hover:bg-opacity-70 gap-2"
                  >
                     SIZE
                     <ChevronDown className="h-4 w-4" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent
                  align="start"
                  className="dark:bg-gray dark:border dark:border-spanishGray dark:border-opacity-10"
               >
                  <DropdownMenuCheckboxItem
                     checked={
                        table.getState().sorting[0]?.id === "document_size" &&
                        !table.getState().sorting[0]?.desc
                     }
                     onCheckedChange={(checked) =>
                        table.setSorting([
                           { id: "document_size", desc: !checked },
                        ])
                     }
                  >
                     Ascending
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                     checked={
                        table.getState().sorting[0]?.id === "document_size" &&
                        table.getState().sorting[0]?.desc
                     }
                     onCheckedChange={(checked) =>
                        table.setSorting([
                           { id: "document_size", desc: checked },
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
         const size = row.original.document_size;
         return <div className="px-4">{size} MB</div>;
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
            <div className="flex items-center gap-2">
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button
                        variant="ghost"
                        className="hover:bg-opacity-70 dark:hover:bg-opacity-70 gap-2"
                     >
                        TYPE
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

         return <div className="px-4">{MappedFile}</div>;
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
                     className="hover:bg-opacity-70 dark:hover:bg-opacity-70 gap-2"
                  >
                     MODIFIED
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
            <div className="px-4">{formatDate(dateModified, "dd.MM.yyyy")}</div>
         );
      },
   },
   {
      id: "actions",
      cell: ({ row }) => {
         const document = row.original;

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
                     <DropdownMenuItem
                        onClick={() =>
                           navigator.clipboard.writeText(document.id)
                        }
                        className="flex items-center gap-2 cursor-pointer"
                     >
                        <Copy className="w-4 h-4" />
                        Copy ID
                     </DropdownMenuItem>
                     <DropdownMenuSeparator className="bg-chineseWhite dark:bg-chineseWhite dark:bg-opacity-50" />

                     <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        className="flex items-center gap-2 cursor-pointer"
                     >
                        <Eye className="w-4 h-4" />
                        View Document
                     </DropdownMenuItem>

                     <DropdownMenuItem
                        className="flex items-center gap-2 cursor-pointer"
                        // onClick={() => exportToPDF(document)} // onclick would take the base64 code of the document and render it in a react pdf viewer
                     >
                        <Download className="w-4 h-4" />
                        Download
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         );
      },
      enableSorting: false,
      enableHiding: false,
   },
];
