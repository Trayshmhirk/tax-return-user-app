"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
   MoreHorizontal,
   ChevronDown,
   Download,
   Copy,
   Eye,
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
import {
   startOfWeek,
   startOfMonth,
   isSameDay,
   isAfter,
   isBefore,
   formatDate,
} from "date-fns";
import { Badge } from "@/components/ui/badge";
import { TransactionReceiptDialog } from "@/components/modal/TransactionReceiptDialog";
import { exportToPDF } from "@/helpers/exportToPDF";
import { TransactionPropTypes } from "@/types/Types";

const handleSendToChat = () => {};

export const transactionColumns = (
   handleDeleteTransaction: (invoiceId: string) => void
): ColumnDef<TransactionPropTypes>[] => [
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
            className="data-[state=checked]:bg-richElectricBlue dark:data-[state=checked]:bg-richElectricBlue dark:data-[state=checked]:text-white data-[state=checked]:border-0 "
         />
      ),
      enableSorting: false,
      enableHiding: false,
   },
   {
      accessorKey: "date",
      header: ({ table }) => (
         <div className="flex items-center gap-2">
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button
                     variant="ghost"
                     className="hover:bg-opacity-70 dark:hover:bg-opacity-70 gap-1"
                  >
                     Date
                     <ChevronDown className="h-4 w-4" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent
                  align="start"
                  className="dark:bg-gray dark:border dark:border-spanishGray dark:border-opacity-10"
               >
                  <DropdownMenuCheckboxItem
                     checked={
                        table.getColumn("date")?.getFilterValue() === "today"
                     }
                     onCheckedChange={(checked) => {
                        if (checked) {
                           table.getColumn("date")?.setFilterValue("today");
                           table.setSorting([{ id: "date", desc: true }]);
                        }
                     }}
                  >
                     Today
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                     checked={
                        table.getColumn("date")?.getFilterValue() ===
                        "this_week"
                     }
                     onCheckedChange={(checked) => {
                        if (checked) {
                           table.getColumn("date")?.setFilterValue("this_week");
                           table.setSorting([{ id: "date", desc: true }]);
                        }
                     }}
                  >
                     This Week
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                     checked={
                        table.getColumn("date")?.getFilterValue() ===
                        "this_month"
                     }
                     onCheckedChange={(checked) => {
                        if (checked) {
                           table
                              .getColumn("date")
                              ?.setFilterValue("this_month");
                           table.setSorting([{ id: "date", desc: true }]);
                        }
                     }}
                  >
                     This Month
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                     checked={
                        table.getColumn("date")?.getFilterValue() === "older"
                     }
                     onCheckedChange={(checked) => {
                        if (checked) {
                           table.getColumn("date")?.setFilterValue("older");
                           table.setSorting([{ id: "date", desc: true }]);
                        }
                     }}
                  >
                     Older
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator className="bg-chineseWhite dark:bg-chineseWhite dark:bg-opacity-50" />
                  <DropdownMenuItem
                     onClick={() => {
                        table.getColumn("date")?.setFilterValue("reset");
                        table.setSorting([{ id: "date", desc: true }]);
                     }}
                     className="pl-8 pr-2"
                  >
                     Reset
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      ),
      cell: ({ row }) => {
         const date = row.original.date;
         return <div className="px-4">{formatDate(date, "dd.MM.yyyy")}</div>;
      },
      filterFn: (row, columnId, filterValue) => {
         const rowDate = new Date(row.getValue(columnId));
         const today = new Date();

         switch (filterValue) {
            case "today":
               return isSameDay(rowDate, today);
            case "this_week":
               return isAfter(rowDate, startOfWeek(today));
            case "this_month":
               return isAfter(rowDate, startOfMonth(today));
            case "older":
               return isBefore(rowDate, startOfMonth(today));
            default:
               return true;
         }
      },
   },
   {
      accessorKey: "description",
      header: "Description",
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
                  capitalize
                  ${status === "failed" ? "bg-red-300 bg-opacity-20 text-red-500 dark:text-red-300 border-red-500 dark:border-red-400" : ""}
                  ${status === "pending" ? "bg-yellow-200 bg-opacity-20 text-yellow-500 dark:text-yellow-300 border-yellow-400 dark:border-yellow-300" : ""}
                  ${status === "processing" ? "bg-blue-300 bg-opacity-20 text-richElectricBlue dark:text-blue-300 border-richElectricBlue dark:border-blue-400" : ""}
                  ${status === "success" ? "bg-green-300 bg-opacity-20 text-green-600 dark:text-green-300 border-green-600 dark:border-green-400" : ""}   
               `}
            >
               {status}
            </Badge>
         );
      },
   },
   {
      id: "actions",
      cell: ({ row }) => {
         const transaction = row.original;

         return (
            <div className="flex justify-end">
               <DropdownMenu>
                  <DropdownMenuTrigger asChild className="w-full">
                     <Button variant="ghost" className="h-8 w-8 p-0 self-end">
                        <MoreHorizontal className="h-4 w-4" />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="dark:bg-gray">
                     <DropdownMenuItem
                        onClick={() =>
                           navigator.clipboard.writeText(transaction.id)
                        }
                        className="flex items-center gap-2 cursor-pointer"
                     >
                        <Copy className="w-4 h-4" />
                        Copy ID
                     </DropdownMenuItem>
                     <DropdownMenuSeparator className="bg-chineseWhite dark:bg-chineseWhite dark:bg-opacity-50" />

                     <TransactionReceiptDialog transaction={transaction}>
                        <DropdownMenuItem
                           onSelect={(e) => e.preventDefault()}
                           className="flex items-center gap-2 cursor-pointer"
                        >
                           <Eye className="w-4 h-4" />
                           View Transaction
                        </DropdownMenuItem>
                     </TransactionReceiptDialog>
                     <DropdownMenuItem
                        // onSelect={(e) => e.preventDefault()}
                        onClick={handleSendToChat ?? (() => {})}
                        className="flex items-center gap-2 cursor-pointer"
                     >
                        <Share className="w-4 h-4" />
                        Share transaction
                     </DropdownMenuItem>
                     <DropdownMenuItem
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => exportToPDF(transaction)}
                     >
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
                                 permanently delete this transaction receipt and
                                 remove its data from our servers.
                              </AlertDialogDescription>
                           </AlertDialogHeader>
                           <AlertDialogFooter>
                              <AlertDialogCancel className="w-full dark:bg-neutral-600 dark:hover:bg-neutral-700 rounded">
                                 Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                 onClick={() =>
                                    handleDeleteTransaction(transaction.id)
                                 }
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
