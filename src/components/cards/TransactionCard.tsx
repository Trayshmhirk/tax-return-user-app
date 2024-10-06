import { formatDate } from "date-fns";
import { TransactionCardPropTypes } from "../../types/AllTypes";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Download, Eye, MoreVertical, Share, Trash2 } from "lucide-react";
import { TransactionReceiptDialog } from "../modal/TransactionReceiptDialog";

const TransactionCard = ({ transaction }: TransactionCardPropTypes) => {
   const truncateString = (str: string, num: number) => {
      if (str.length <= num) {
         return str;
      }
      return str.slice(0, num) + " ...";
   };

   const handleSendToChat = () => {};

   return (
      <div className="relative w-full flex flex-col gap-3 bg-white dark:bg-gray px-4 py-3 rounded-lg cursor-pointer shadow-md dark:shadow-md-dark hover-shadow-body">
         <div className="flex items-center justify-between gap-3">
            <div
               className={`
                w-fit py-[2px] px-2 text-xs rounded
               ${transaction.status.toLowerCase() === "failed" ? "danger" : ""}
               ${transaction.status.toLowerCase() === "success" ? "success" : ""}
               ${transaction.status.toLowerCase() === "pending" ? "warning" : ""}
               ${transaction.status.toLowerCase() === "processing" ? "processing" : ""}
            `}
            >
               {transaction.status}
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

         <div className="flex flex-col gap-[3px]">
            <p className="text-xs">#{transaction.id}</p>
            <p className="text-lg text-richElectricBlue font-bold">
               {truncateString(transaction.description, 15)}
            </p>
            <div className="flex items-center justify-between gap-3">
               <p className="text-xs font-medium">
                  {formatDate(transaction.date, "dd.MM.yyyy")}
               </p>
               <p className="text-sm font-bold">${transaction.amount}</p>
            </div>
         </div>
      </div>
   );
};

export default TransactionCard;
