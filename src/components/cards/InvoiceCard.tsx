import { InvoicePropTypes } from "../../types/AllTypes";

type InvoiceCardPropTypes = {
   handleClick: (invoice: InvoicePropTypes) => void;
   invoice: InvoicePropTypes;
   invoiceName: string;
   invoiceId: string;
   price: string;
   date: string;
};

const InvoiceCard = ({
   handleClick,
   invoice,
   invoiceName,
   invoiceId,
   price,
   date,
}: InvoiceCardPropTypes) => {
   return (
      <div
         onClick={() => handleClick(invoice)}
         className="w-full flex items-center justify-between p-4 rounded-lg bg-white dark:bg-gray shadow-md dark:shadow-md-dark cursor-pointer hover-shadow-body lg:calc-width-three"
      >
         <div className="flex flex-col gap-2">
            <h6 className="font-normal">{invoiceName}</h6>
            <p className="text-xs text-mutedGray dark:text-spanishGray">
               ID: {invoiceId}
            </p>
         </div>

         <div className="flex flex-col gap-2 text-end">
            <h6 className="font-bold">${price}</h6>
            <p className="text-xs text-mutedGray dark:text-spanishGray">
               {date}
            </p>
         </div>
      </div>
   );
};

export default InvoiceCard;
