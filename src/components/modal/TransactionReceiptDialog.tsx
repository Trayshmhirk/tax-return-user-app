import { useState } from "react";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
   DialogTrigger,
   DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { exportToPDF } from "@/helpers/exportToPDF";

type TransactionReceiptDialogProps = {
   transaction: TransactionPropTypes;
} & ChildrenNode;

export const TransactionReceiptDialog: React.FC<
   TransactionReceiptDialogProps
> = ({ transaction, children }) => {
   const [open, setOpen] = useState(false);

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>{children}</DialogTrigger>
         <DialogContent className="max-w-lg gap-5">
            <DialogHeader className="items-center gap-4">
               <DialogTitle className="flex flex-col items-center gap-1 text-xl">
                  <img
                     width="40"
                     height="40"
                     src="https://img.icons8.com/external-flatarticons-blue-flatarticons/65/external-tax-taxes-flatarticons-blue-flatarticons.png"
                     alt="external-tax-taxes-flatarticons-blue-flatarticons"
                  />
                  Transaction Receipt
               </DialogTitle>

               <DialogDescription className="flex flex-col gap-1 self-start text-start font-medium">
                  CHECK DEPOSIT
                  <p className="flex items-center gap-2 md:text-base">
                     <span>ID {transaction.id}</span>
                  </p>
                  <p className="flex items-center gap-3 md:text-base">
                     <span>{transaction.date}</span>
                  </p>
               </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-2">
               <p className="flex items-center justify-between gap-3 text-sm md:text-base font-medium">
                  <span>Status:</span>
                  <span>{transaction.status.toUpperCase()}</span>
               </p>
               <span className="-mx-1 my-1 h-px bg-spanishGray dark:bg-opacity-60" />
               <p className="flex items-center justify-between gap-3 text-sm md:text-base font-medium">
                  <span>Description:</span>
                  <span>{transaction.description}</span>
               </p>
               <span className="-mx-1 my-1 h-px bg-spanishGray dark:bg-opacity-60" />
               <p className="flex items-center justify-between gap-3 text-sm md:text-base font-medium">
                  <span>Amount:</span>
                  <span className="text-[#29CE9C]">
                     {transaction.currency} {transaction.amount}
                  </span>
               </p>
            </div>
            <DialogFooter>
               <Button type="button" onClick={() => exportToPDF(transaction)}>
                  Download
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};
