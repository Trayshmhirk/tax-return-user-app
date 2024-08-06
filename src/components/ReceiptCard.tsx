type ReceiptCardPropTypes = {
   receiptId: string;
   handleClick: (receipt: {
      receiptId: string;
      title: string;
      fullname: string;
      date: string;
   }) => void;
   title: string;
   owner_info: {
      fullname: string;
   };
   date: string;
};

const ReceiptCard = ({
   receiptId,
   handleClick,
   title,
   owner_info: { fullname },
   date,
}: ReceiptCardPropTypes) => {
   console.log(receiptId);

   const truncateString = (str: string, num: number) => {
      if (str.length <= num) {
         return str;
      }
      return str.slice(0, num) + " ...";
   };

   const formattedDate = new Date(date);
   const displayDate = `${formattedDate.getDate()}/${formattedDate.getMonth() + 1}/${formattedDate.getFullYear()}`;

   return (
      <div>
         <div
            className="receipt-card flex flex-col text-center gap-2 p-3 rounded-lg cursor-pointer bg-white dark:bg-americanSilver shadow-md dark:shadow-md-dark text-darkGray font-medium"
            onClick={() => handleClick({ receiptId, title, fullname, date })}
         >
            <div className="h-28">
               {/* <img src={ReceiptImg} alt="" className="w-100 h-100" /> */}
            </div>
            <div className="">
               <h4 className="text-sm md:text-lg">
                  {truncateString(title, 15)}
               </h4>
               <p className="text-xs md:text-base">{fullname}</p>
               <p className="text-xs md:text-base">{displayDate}</p>
            </div>
         </div>
      </div>
   );
};

export default ReceiptCard;
