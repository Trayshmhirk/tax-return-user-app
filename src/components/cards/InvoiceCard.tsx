import { formatDate } from "date-fns";
import InvoiceImg from "../../assets/invoice-image.jpeg";
import { InvoiceCardPropTypes } from "../../types/AllTypes";

const InvoiceCard = ({ invoice }: InvoiceCardPropTypes) => {
   const truncateString = (str: string, num: number) => {
      if (str.length <= num) {
         return str;
      }
      return str.slice(0, num) + " ...";
   };

   return (
      <div className="w-full flex flex-col text-center gap-2 p-4 rounded-lg cursor-pointer bg-white dark:bg-gray font-medium shadow-md dark:shadow-md-dark hover-shadow-body">
         <div className="h-52 rounded-lg overflow-hidden">
            <img src={InvoiceImg} alt="" className="w-full h-full" />
         </div>
         <div className="">
            <h4 className="text-sm md:text-lg">
               {truncateString(invoice.title, 15)}
            </h4>
            <p className="text-xs md:text-base">
               {invoice.owner_info.fullname}
            </p>
            <p className="text-xs md:text-base">
               {formatDate(invoice.date, "dd.MM.yyyy")}
            </p>
         </div>
      </div>
   );
};

export default InvoiceCard;
