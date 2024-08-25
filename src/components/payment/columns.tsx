"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

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
import {
   startOfWeek,
   startOfMonth,
   isSameDay,
   isAfter,
   isBefore,
} from "date-fns";

// This type is used to define the shape of the transaction data.
export type Transaction = {
   id: string;
   date: string;
   description: string;
   amount: number;
   currency: string;
   status: "pending" | "processing" | "success" | "failed";
};

export const columns: ColumnDef<Transaction>[] = [
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
            {/* Dropdown for filtering by date */}
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button
                     variant="ghost"
                     className="focus-visible:ring-offset-0 focus-visible:ring-0 hover:bg-opacity-70 dark:hover:bg-opacity-70 gap-2"
                  >
                     Date
                     <ArrowUpDown className="h-4 w-4" />
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
      cell: ({ row }) => row.getValue("date"),
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
      cell: ({ row }) => row.getValue("status"),
   },
   {
      id: "actions",
      cell: ({ row }) => {
         const payment = row.original;

         return (
            <div className="flex justify-end">
               <DropdownMenu>
                  <DropdownMenuTrigger asChild className="w-full">
                     <Button variant="ghost" className="h-8 w-8 p-0 self-end">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="dark:bg-gray">
                     <DropdownMenuItem
                        onClick={() =>
                           navigator.clipboard.writeText(payment.id)
                        }
                     >
                        Copy payment ID
                     </DropdownMenuItem>
                     <DropdownMenuSeparator className="bg-chineseWhite dark:bg-chineseWhite dark:bg-opacity-50" />
                     <DropdownMenuItem>View customer</DropdownMenuItem>
                     <DropdownMenuItem>View payment details</DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         );
      },
      enableSorting: false,
      enableHiding: false,
   },
];
