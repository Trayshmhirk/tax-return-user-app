import { IoCloudUploadOutline } from "react-icons/io5";
import { FilingCardProps } from "../types/FilingTypes";

const FilingCard = ({
   color,
   isAddNew,
   handleClick,
   handleNavigateBankDetails,
   card,
   cardName,
   cardNumber,
   cardText,
   integrateBank,
   isBankCard,
}: FilingCardProps) => {
   const handleCardClick = () => {
      if (isBankCard && handleNavigateBankDetails) {
         handleNavigateBankDetails(card);
      } else {
         handleClick(card);
      }
   };

   return (
      <>
         {isAddNew ? (
            <div
               className={`
                     calc-width-two h-36 flex flex-col gap-2 justify-center items-center md:calc-width-three
                     bg-bubbles dark:bg-gray text-richElectricBlue dark:text-white p-4 rounded-lg cursor-pointer shadow-md dark:shadow-md-dark hover-shadow-body
                     ${integrateBank ? "" : ""} 
                  `}
               onClick={() => handleClick}
            >
               {integrateBank ? (
                  <>
                     <IoCloudUploadOutline />
                     <p>Integrate bank account</p>
                  </>
               ) : (
                  <>
                     <p className="text-5xl">+</p>
                     <p className="font-medium">Create filing</p>
                  </>
               )}
            </div>
         ) : (
            <div
               className={`calc-width-twos h-36 flex flex-col justify-center gap-2 p-4 bg-bubbles dark:bg-gray text-white rounded-lg cursor-pointer shadow-md dark:shadow-md-dark hover-shadow-body md:calc-width-three`}
               style={{ background: `${color}` }}
               onClick={handleCardClick}
            >
               <p>{cardName}</p>
               <p className="font-bold text-2xl">
                  {isBankCard ? `**** **** **** ${cardNumber}` : cardNumber}
               </p>
               <p className="text-sm">{cardText}</p>
            </div>
         )}
      </>
   );
};

export default FilingCard;
