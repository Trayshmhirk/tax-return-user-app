"use client";
import React from "react";

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

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
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
import { ChevronLeft, ChevronRight, Settings2 } from "lucide-react";

interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[];
   data: TData[];
}

export function DataTable<TData, TValue>({
   columns,
   data,
}: DataTableProps<TData, TValue>) {
   const [sorting, setSorting] = React.useState<SortingState>([
      { id: "date", desc: true }, // This sets the default sorting by date in descending order
   ]);
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
   );
   const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({});
   const [rowSelection, setRowSelection] = React.useState({});

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

   return (
      <div className="flex flex-col gap-4">
         <div className="flex items-center justify-between gap-2">
            <Input
               placeholder="Filter description..."
               value={
                  (table
                     .getColumn("description")
                     ?.getFilterValue() as string) ?? ""
               }
               onChange={(event) =>
                  table
                     .getColumn("description")
                     ?.setFilterValue(event.target.value)
               }
               className="max-w-xs px-4 dark:bg-gray focus-visible:ring-offset-0 focus-visible:ring-0 dark:border-chineseWhite dark:border-opacity-50"
            />
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button
                     variant="outline"
                     className="dark:bg-gray focus-visible:ring-offset-0 focus-visible:ring-0 dark:border-chineseWhite dark:border-opacity-50 gap-2"
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
         <div className="rounded-md border border-chineseWhite dark:border-opacity-50 overflow-hidden">
            <Table>
               <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <TableRow
                        key={headerGroup.id}
                        className="bg-richElectricBlue dark:bg-richElectricBlue border-chineseWhite dark:border-opacity-50 hover:bg-richElectricBlue hover:bg-opacity-90 dark:hover:bg-richElectricBlue  dark:hover:bg-opacity-90"
                     >
                        {headerGroup.headers.map((header) => {
                           return (
                              <TableHead
                                 key={header.id}
                                 className="text-white dark:text-white"
                              >
                                 {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                         header.column.columnDef.header,
                                         header.getContext()
                                      )}
                              </TableHead>
                           );
                        })}
                     </TableRow>
                  ))}
               </TableHeader>
               <TableBody>
                  {table.getRowModel().rows?.length ? (
                     table.getRowModel().rows.map((row) => (
                        <TableRow
                           key={row.id}
                           data-state={row.getIsSelected() && "selected"}
                           className="border-chineseWhite dark:border-opacity-50"
                        >
                           {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id} className="px-4 py-3">
                                 {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                 )}
                              </TableCell>
                           ))}
                        </TableRow>
                     ))
                  ) : (
                     <TableRow>
                        <TableCell
                           colSpan={columns.length}
                           className="h-24 text-center"
                        >
                           No results.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
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
