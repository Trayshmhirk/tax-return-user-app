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
import { Checkbox } from "@/components/ui/checkbox";
import { ReceiptsPropTypes } from "@/types/AllTypes";
import { formatDate } from "date-fns";

export const receiptColumns: ColumnDef<ReceiptsPropTypes>[] = [
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
      accessorKey: "title",
      header: ({ table }) => (
         <div className="flex items-center gap-2">
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button
                     variant="ghost"
                     className="hover:bg-opacity-70 dark:hover:bg-opacity-70 gap-2 px-[6px] text-sm"
                  >
                     TITLE
                     <ChevronDown className="h-4 w-4" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent
                  align="start"
                  className="dark:bg-gray dark:border dark:border-spanishGray dark:border-opacity-10"
               >
                  <DropdownMenuCheckboxItem
                     checked={
                        table.getState().sorting[0]?.id === "title" &&
                        !table.getState().sorting[0]?.desc
                     }
                     onCheckedChange={(checked) =>
                        table.setSorting([{ id: "title", desc: !checked }])
                     }
                  >
                     Ascending
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                     checked={
                        table.getState().sorting[0]?.id === "title" &&
                        table.getState().sorting[0]?.desc
                     }
                     onCheckedChange={(checked) =>
                        table.setSorting([{ id: "title", desc: checked }])
                     }
                  >
                     Descending
                  </DropdownMenuCheckboxItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      ),
   },
   {
      accessorKey: "fullname",
      header: "CREATED BY",
   },
   {
      accessorKey: "date",
      header: ({ table }) => (
         <div className="flex items-center gap-2">
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button
                     variant="ghost"
                     className="hover:bg-opacity-70 dark:hover:bg-opacity-70 gap-2 px-[6px] text-sm"
                  >
                     DATE
                     <ChevronDown className="h-4 w-4" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent
                  align="start"
                  className="dark:bg-gray dark:border dark:border-spanishGray dark:border-opacity-10"
               >
                  <DropdownMenuCheckboxItem
                     checked={
                        table.getState().sorting[0]?.id === "date" &&
                        !table.getState().sorting[0]?.desc
                     }
                     onCheckedChange={(checked) =>
                        table.setSorting([{ id: "date", desc: !checked }])
                     }
                  >
                     Ascending
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                     checked={
                        table.getState().sorting[0]?.id === "date" &&
                        table.getState().sorting[0]?.desc
                     }
                     onCheckedChange={(checked) =>
                        table.setSorting([{ id: "date", desc: checked }])
                     }
                  >
                     Descending
                  </DropdownMenuCheckboxItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      ),
      cell: ({ row }) => {
         const dateModified = row.original.date;

         return (
            <div className="lg:px-2">
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
                     >
                        <Eye className="w-4 h-4" />
                        View Document
                     </DropdownMenuItem>
                     <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                        <Share className="w-4 h-4" />
                        Share document
                     </DropdownMenuItem>

                     <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                        <Download className="w-4 h-4" />
                        Download
                     </DropdownMenuItem>
                     <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                        Delete
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
