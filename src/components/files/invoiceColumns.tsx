"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
   MoreHorizontal,
   ChevronDown,
   Download,
   CreditCard,
   Share,
   Trash2,
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
import { InvoicesPropTypes } from "@/types/AllTypes";
import { formatDate } from "date-fns";
import { Badge } from "@/components/ui/badge";

const handleSendToChat = () => {};

export const invoiceColumns: ColumnDef<InvoicesPropTypes>[] = [
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
                     className="hover:bg-opacity-70 dark:hover:bg-opacity-70 gap-2 px-[6px] text-xs md:text-sm"
                  >
                     Title
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
      accessorKey: "issued_by",
      header: () => {
         return <div className="text-xs md:text-sm">Issued By</div>;
      },
   },
   {
      accessorKey: "due_date",
      header: ({ table }) => (
         <div className="flex items-center gap-2">
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button
                     variant="ghost"
                     className="hover:bg-opacity-70 dark:hover:bg-opacity-70 gap-2 px-[6px] text-xs md:text-sm"
                  >
                     Due Date
                     <ChevronDown className="h-4 w-4" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent
                  align="start"
                  className="dark:bg-gray dark:border dark:border-spanishGray dark:border-opacity-10"
               >
                  <DropdownMenuCheckboxItem
                     checked={
                        table.getState().sorting[0]?.id === "due_date" &&
                        !table.getState().sorting[0]?.desc
                     }
                     onCheckedChange={(checked) =>
                        table.setSorting([{ id: "due_date", desc: !checked }])
                     }
                  >
                     Ascending
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                     checked={
                        table.getState().sorting[0]?.id === "due_date" &&
                        table.getState().sorting[0]?.desc
                     }
                     onCheckedChange={(checked) =>
                        table.setSorting([{ id: "due_date", desc: checked }])
                     }
                  >
                     Descending
                  </DropdownMenuCheckboxItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      ),
      cell: ({ row }) => {
         const dueDate = row.original.due_date;

         return (
            <div className="lg:px-2 text-xs md:text-sm">
               {formatDate(dueDate, "dd.MM.yyyy")}
            </div>
         );
      },
   },
   {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
         const amount = parseFloat(row.getValue("amount"));
         const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
         }).format(amount);

         return <div className="font-medium">{formatted}</div>;
      },
   },
   {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
         const status = row.original.status;

         return (
            <Badge
               variant="outline"
               className={`
                  ${status === "failed" ? "bg-red-300 bg-opacity-20 text-red-500 dark:text-red-300 border-red-500 dark:border-red-400" : ""}
                  ${status === "pending" ? "bg-yellow-200 bg-opacity-20 text-yellow-500 dark:text-yellow-300 border-yellow-400 dark:border-yellow-300" : ""}
                  ${status === "overdue" ? "bg-red-300 bg-opacity-20 text-red-500 dark:text-red-300 border-red-500 dark:border-red-400" : ""}
                  ${status === "paid" ? "bg-green-300 bg-opacity-20 text-green-600 dark:text-green-300 border-green-600 dark:border-green-400" : ""}   
               `}
            >
               {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
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
                        // onSelect={(e) => e.preventDefault()}
                        onClick={handleSendToChat ?? (() => {})}
                        className="flex items-center gap-2 cursor-pointer"
                     >
                        <Share className="w-4 h-4" />
                        Share invoice
                     </DropdownMenuItem>
                     <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                        <Download className="w-4 h-4" />
                        Download
                     </DropdownMenuItem>
                     <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                        <CreditCard className="w-4 h-4" />
                        Pay
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
                                 permanently delete this invoice and remove its
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
         );
      },
      enableSorting: false,
      enableHiding: false,
   },
];
