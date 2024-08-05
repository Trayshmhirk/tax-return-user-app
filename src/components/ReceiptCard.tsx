type ReceiptCardPropTypes = {
   handleClick: (receipt: object) => void;
   receipt: object;
   title: string;
   owner_info: {
      fullname: string;
   };
   date: Date;
};

const ReceiptCard = ({
   handleClick,
   receipt,
   title,
   owner_info,
   date,
}: ReceiptCardPropTypes) => {
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
            className="receipt-card flex flex-col text-center gap-2 p-3 rounded-lg cursor-pointer bg-americanSilver dark:bg-spanishGray shadow-md dark:shadow-md-dark"
            onClick={() => handleClick(receipt)}
         >
            <div className="h-28">
               {/* <img src={ReceiptImg} alt="" className="w-100 h-100" /> */}
            </div>
            <div className="">
               <h4 className="text-sm md:text-lg">
                  {truncateString(title, 15)}
               </h4>
               <p className="text-xs md:text-base">{owner_info.fullname}</p>
               <p className="text-xs md:text-base">{displayDate}</p>
            </div>
         </div>
      </div>
   );
};

export default ReceiptCard;
