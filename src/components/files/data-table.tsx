"use client";
import React, { useEffect } from "react";

import {
   ColumnDef,
   ColumnFiltersState,
   SortingState,
   VisibilityState,
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronLeft, ChevronRight, Settings2, Search } from "lucide-react";
import useWindowWidth from "@/hooks/UseWindowWidth";

interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[];
   data: TData[];
   isReceipt?: boolean;
}

export function DataTable<TData, TValue>({
   columns,
   data,
   isReceipt,
}: DataTableProps<TData, TValue>) {
   const [sorting, setSorting] = React.useState<SortingState>([
      { id: `${isReceipt ? "date" : "date_modified"}`, desc: true }, // Default sorting by date_modified in descending order
   ]);
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
   );
   const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({});
   const [rowSelection, setRowSelection] = React.useState({});

   // Get the window width from the hook
   const windowWidth = useWindowWidth();
   const isAboveSm = windowWidth >= 576;

   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: {
         sorting,
         columnFilters,
         columnVisibility,
         rowSelection,
      },
   });

   useEffect(() => {
      const documentTypeColumn = table
         .getAllColumns()
         .find((column) => column.id === "document_type");

      // Toggle the visibility of the document_type column based on screen width
      if (documentTypeColumn) {
         documentTypeColumn.toggleVisibility(isAboveSm);
      }
   }, [isAboveSm, table]);

   return (
      <div className="flex flex-col gap-5">
         <div className="flex items-center justify-between gap-2">
            <label
               htmlFor="searchFiles"
               className="max-w-72 w-full h-10 flex items-center bg-white dark:bg-gray p-3 px-4 rounded sm:w-[300px] shadow-md dark:shadow-md-dark"
            >
               <button className="cursor-pointer">
                  <Search className="w-4 h-4 dark:text-white" />
               </button>
               <Input
                  id="searchFiles"
                  placeholder="Search files..."
                  className="bg-transparent dark:bg-transparent border-none outline-none"
                  value={
                     (table
                        .getColumn(`${isReceipt ? "title" : "document_name"}`)
                        ?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                     table
                        .getColumn(`${isReceipt ? "title" : "document_name"}`)
                        ?.setFilterValue(event.target.value)
                  }
               />
            </label>
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button
                     variant="ghost"
                     className="shadow-md dark:shadow-md-dark gap-2"
                  >
                     <Settings2 className="w-4 h-4" />
                     View
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end" className="dark:bg-gray">
                  <DropdownMenuLabel className="text-sm dark:text-white">
                     Toggle column
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-chineseWhite dark:bg-chineseWhite dark:bg-opacity-50" />
                  {table
                     .getAllColumns()
                     .filter((column) => column.getCanHide())
                     .map((column) => {
                        // Conditionally render the document_type toggle option
                        if (column.id === "document_type" && !isAboveSm) {
                           return null; // Don't render the toggle option on small screens
                        }
                        return (
                           <DropdownMenuCheckboxItem
                              key={column.id}
                              className="capitalize"
                              checked={column.getIsVisible()}
                              onCheckedChange={(value) =>
                                 column.toggleVisibility(!!value)
                              }
                           >
                              {column.id}
                           </DropdownMenuCheckboxItem>
                        );
                     })}
               </DropdownMenuContent>
            </DropdownMenu>
         </div>

         <div className="flex flex-col gap-3">
            {/* Wrapper for the list with gaps between items */}
            <div className="flex flex-col">
               {table.getHeaderGroups().map((headerGroup) => (
                  <div
                     key={headerGroup.id}
                     className={`
                        grid 
                        ${
                           isReceipt
                              ? "grid-cols-[0.3fr_1fr_1fr_1fr_0.4fr] md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr]"
                              : "grid-cols-[0.5fr_2.5fr_1fr_1fr_0.4fr] sm:grid-cols-[0.5fr_2fr_1fr_1fr_1fr_0.4fr] lg:grid-cols-[0.5fr_3fr_1fr_1fr_1fr_1fr]"
                        } 
                        items-center gap-2 bg-richElectricBlue hover:bg-richElectricBlue hover:bg-opacity-90 text-white px-4 py-1 md:px-5 shadow-md dark:shadow-md-dark rounded-lg
                     `}
                  >
                     {headerGroup.headers.map((header) => (
                        <div key={header.id} className="dark:text-white">
                           {header.isPlaceholder
                              ? null
                              : flexRender(
                                   header.column.columnDef.header,
                                   header.getContext()
                                )}
                        </div>
                     ))}
                  </div>
               ))}
            </div>

            <div className="flex flex-col gap-3">
               {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                     <div
                        key={row.id}
                        className={`
                           grid 
                           ${
                              isReceipt
                                 ? "grid-cols-[0.3fr_1fr_1fr_1fr_0.4fr] md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr]"
                                 : "grid-cols-[0.5fr_2.5fr_1fr_1fr_0.4fr] sm:grid-cols-[0.5fr_2fr_1fr_1fr_1fr_0.4fr] lg:grid-cols-[0.5fr_3fr_1fr_1fr_1fr_1fr]"
                           } 
                           items-center gap-2 bg-ghostWhite dark:bg-darkGray px-4 py-2 md:px-5 shadow-md dark:shadow-md-dark rounded-lg
                        `}
                     >
                        {row.getVisibleCells().map((cell) => (
                           <div key={cell.id} className="text-sm">
                              {flexRender(
                                 cell.column.columnDef.cell,
                                 cell.getContext()
                              )}
                           </div>
                        ))}
                     </div>
                  ))
               ) : (
                  <div className="h-24 flex items-center justify-center">
                     No results.
                  </div>
               )}
            </div>
         </div>

         <div className="flex flex-col xs:flex-row items-center justify-end gap-4 mb-2">
            <div className="flex-1 text-sm text-muted-foreground">
               {table.getFilteredSelectedRowModel().rows.length} of{" "}
               {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>

            <div className="flex items-center gap-4 sm:gap-10">
               {/* Display current page number and total pages */}
               <div className="text-sm text-muted-foreground">
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
               </div>

               <div className="flex gap-2">
                  <Button
                     variant="outline"
                     size="sm"
                     className="h-fit bg-transparent dark:bg-transparent text-eerieBlack dark:text-white border border-chineseWhite dark:border-chineseWhite dark:border-opacity-50 p-1 rounded"
                     onClick={() => table.previousPage()}
                     disabled={!table.getCanPreviousPage()}
                  >
                     <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                     variant="outline"
                     size="sm"
                     className="h-fit bg-transparent dark:bg-transparent text-eerieBlack dark:text-white border border-chineseWhite dark:border-chineseWhite dark:border-opacity-50 p-1 rounded"
                     onClick={() => table.nextPage()}
                     disabled={!table.getCanNextPage()}
                  >
                     <ChevronRight className="w-5 h-5" />
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
}
