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
import { Transaction } from "../payment/columns";
import { useState } from "react";

type TransactionReceiptDialogProps = {
   transaction: Transaction;
   children: React.ReactNode;
};

export const TransactionReceiptDialog: React.FC<
   TransactionReceiptDialogProps
> = ({ transaction, children }) => {
   const [open, setOpen] = useState(false);

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>{children}</DialogTrigger>
         <DialogContent className="max-w-lg gap-5 w-11/12 rounded-lg md:w-full dark:bg-gray focus-visible:ring-offset-0 focus-visible:ring-0 border-0">
            <DialogHeader className="space-y-0 gap-2">
               <DialogTitle className="text-xl">
                  Transaction Receipt
               </DialogTitle>
               <DialogDescription className="">
                  Below are the details of the transaction:
               </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
               <p className="flex items-center justify-between gap-3">
                  <strong>Transaction ID:</strong>
                  <span>{transaction.id}</span>
               </p>
               <p className="flex items-center justify-between gap-3">
                  <strong>Date:</strong>
                  <span>{transaction.date}</span>
               </p>
               <p className="flex items-center justify-between gap-3">
                  <strong>Description:</strong>
                  <span>{transaction.description}</span>
               </p>
               <p className="flex items-center justify-between gap-3">
                  <strong>Amount:</strong>
                  <span>
                     {transaction.amount} {transaction.currency}
                  </span>
               </p>
               <p className="flex items-center justify-between gap-3">
                  <strong>Status:</strong>
                  <span>{transaction.status.toUpperCase()}</span>
               </p>
            </div>
            <DialogFooter>
               <Button
                  type="submit"
                  className="bg-richElectricBlue dark:bg-richElectricBlue text-white dark:text-white"
               >
                  Download
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};
