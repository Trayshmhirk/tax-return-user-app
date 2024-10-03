import { formatDate } from "date-fns";
import { InvoiceCardPropTypes } from "../../types/AllTypes";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Download, MoreVertical, Share, Trash2 } from "lucide-react";

const InvoiceCard = ({ invoice }: InvoiceCardPropTypes) => {
   const truncateString = (str: string, num: number) => {
      if (str.length <= num) {
         return str;
      }
      return str.slice(0, num) + " ...";
   };

   const handleSendToChat = () => {};

   return (
      <div className="relative w-full flex flex-col gap-4 bg-white dark:bg-gray px-4 py-3 rounded-lg cursor-pointer shadow-md dark:shadow-md-dark hover-shadow-body">
         <div className="flex items-center justify-between gap-3">
            <div
               className={`
                w-fit py-[2px] px-2 text-xs rounded
               ${invoice.status.toLowerCase() === "overdue" ? "danger" : ""}
               ${invoice.status.toLowerCase() === "paid" ? "success" : ""}
               ${invoice.status.toLowerCase() === "pending" ? "warning" : ""}
               ${invoice.status.toLowerCase() === "failed" ? "warning" : ""}
            `}
            >
               {invoice.status}
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
                     <Trash2 className="w-4 h-4" />
                     Delete
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>

         <div className="flex flex-col gap-[6px]">
            <p className="text-xs">#{invoice.id}</p>
            <p className="text-lg text-richElectricBlue font-bold">
               {truncateString(invoice.title, 15)}
            </p>
            <p className="w-full text-xs">Issued by: {invoice.issued_by}</p>
            <div className="flex items-center justify-between gap-3">
               <p className="text-xs font-medium">
                  {formatDate(invoice.due_date, "dd.MM.yyyy")}
               </p>
               <p className="text-sm font-bold">${invoice.amount}</p>
            </div>
         </div>
      </div>
   );
};

export default InvoiceCard;
