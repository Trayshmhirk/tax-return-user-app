import { formatDate } from "date-fns";
import ReceiptImg from "../../assets/invoice-image.jpeg";
import { ReceiptCardPropTypes } from "../../types/AllTypes";

const ReceiptCard = ({
   receiptId,
   handleClick,
   title,
   owner_info: { fullname },
   date,
}: ReceiptCardPropTypes) => {
   const truncateString = (str: string, num: number) => {
      if (str.length <= num) {
         return str;
      }
      return str.slice(0, num) + " ...";
   };

   return (
      <div
         className="w-full flex flex-col text-center gap-2 p-4 rounded-lg cursor-pointer bg-white dark:bg-gray font-medium shadow-md dark:shadow-md-dark hover-shadow-body"
         onClick={() => handleClick({ receiptId, title, fullname, date })}
      >
         <div className="h-52 rounded-lg overflow-hidden">
            <img src={ReceiptImg} alt="" className="w-full h-full" />
         </div>
         <div className="">
            <h4 className="text-sm md:text-lg">{truncateString(title, 15)}</h4>
            <p className="text-xs md:text-base">{fullname}</p>
            <p className="text-xs md:text-base">
               {formatDate(date, "dd.MM.yyyy")}
            </p>
         </div>
      </div>
   );
};

export default ReceiptCard;
