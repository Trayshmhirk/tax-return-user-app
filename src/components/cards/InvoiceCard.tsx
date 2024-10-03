import { formatDate } from "date-fns";
import { InvoiceCardPropTypes } from "../../types/AllTypes";

const InvoiceCard = ({ invoice }: InvoiceCardPropTypes) => {
   const truncateString = (str: string, num: number) => {
      if (str.length <= num) {
         return str;
      }
      return str.slice(0, num) + " ...";
   };

   return (
      <div className="relative w-full flex flex-col gap-2 bg-white dark:bg-gray px-4 py-3 rounded-lg cursor-pointer shadow-md dark:shadow-md-dark hover-shadow-body">
         <div
            className={`
               absolute right-2 top-2 py-[2px] px-2 text-xs rounded
               ${invoice.status.toLowerCase() === "overdue" ? "danger" : ""}
               ${invoice.status.toLowerCase() === "paid" ? "success" : ""}
               ${invoice.status.toLowerCase() === "pending" ? "warning" : ""}
               ${invoice.status.toLowerCase() === "failed" ? "warning" : ""}
            `}
         >
            {invoice.status}
         </div>

         <p className="text-xs font-medium">#{invoice.id}</p>
         <p className="text-sm text-richElectricBlue font-bold">
            {truncateString(invoice.title, 15)}
         </p>
         <p className="w-full text-xs">{invoice.issued_by}</p>
         <div className="flex items-center justify-between gap-3">
            <p className="text-xs">
               {formatDate(invoice.due_date, "dd.MM.yyyy")}
            </p>
            <p className="text-sm font-bold">${invoice.amount}</p>
         </div>
      </div>
   );
};

export default InvoiceCard;
