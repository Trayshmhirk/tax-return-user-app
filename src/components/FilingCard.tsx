import { IoCloudUploadOutline } from "react-icons/io5";

// Define the type for the card object if it has a specific structure
type CardType = {
   id: number;
   cardName: string;
   cardNumber: number;
   cardText: string;
   color: string;
};

type FilingCardProps = {
   color: string;
   isAddNew?: boolean;
   handleClick: (card: CardType | undefined) => void;
   handleNavigateBankDetails?: (card: CardType | undefined) => void;
   card?: CardType;
   cardName: string;
   cardNumber: number;
   cardText: string;
   integrateBank?: boolean;
   isBankCard?: boolean;
};

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
                     calc-width-two flex flex-col gap-2 justify-center items-center md:calc-width-three
                     bg-bubbles dark:bg-gray text-richElectricBlue dark:text-white p-4 rounded-lg cursor-pointer hover-shadow-body
                     ${integrateBank ? "h-28 md:h-auto" : ""} 
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
                     <p>Create filing</p>
                  </>
               )}
            </div>
         ) : (
            <div
               className={`w-full flex flex-col justify-center gap-2 p-4 bg-bubbles dark:bg-gray text-white rounded-lg cursor-pointer shadow-md dark:shadow-md-dark hover-shadow-body md:calc-width-three`}
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
