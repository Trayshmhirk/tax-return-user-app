import CreditCardChip from "@/assets/credit-card_chip.png";
import VisaIcon from "@/assets/visa.png";
import MastercardIcon from "@/assets/mastercard.png";

type DebitCardPropTypes = {
   card: {
      id: string;
      name: string;
      last4: string;
      exp: string;
      brand: string;
      cardholderName: string;
   };
   onClick?: () => void;
   isDialog?: boolean;
};

const DebitCard = ({ card, onClick, isDialog }: DebitCardPropTypes) => {
   return (
      <div
         className={`relative w-full xl:max-w-[350px] ${isDialog ? "min-w-[300px]" : ""} rounded-xl shadow-lg cursor-pointer overflow-hidden`}
         style={{
            backgroundImage: `url("https://www.transparenttextures.com/patterns/cubes.png"), linear-gradient(to right, #007DA8, #00A2C9, #00D1E1)`, // Adding a texture with a gradient
            backgroundBlendMode: "overlay", // Ensuring the image blends with the gradient
            color: "white",
         }}
         onClick={onClick}
      >
         {/* Card Brand Icon */}
         <div className="absolute top-2 right-4 text-3xl">
            {card.brand === "Visa" ? (
               <img src={VisaIcon} className="w-[70px]" />
            ) : (
               <img src={MastercardIcon} className="w-[60px]" />
            )}
         </div>

         {/* Card Information */}
         <div className="h-full flex flex-col">
            <div className="h-full flex flex-col justify-between px-4 py-2">
               <div className="flex items-center gap-2">
                  <img
                     width="40"
                     height="40"
                     src="https://img.icons8.com/external-flatarticons-blue-flatarticons/65/external-tax-taxes-flatarticons-blue-flatarticons.png"
                     alt="Card Icon"
                  />
                  <div className="text-sm font-light">{card.name}</div>
               </div>

               <div className="flex flex-col gap-1">
                  <div className="">
                     <img
                        className="w-12"
                        src={CreditCardChip}
                        alt="Credit Card Chip"
                     />
                  </div>
                  <div className="text-lg font-semibold tracking-widest">
                     **** **** **** {card.last4}
                  </div>
               </div>
            </div>

            {/* Cardholder Name and Expiry */}
            <div className="bg-opacity-50 bg-black flex items-center justify-between px-4 py-2">
               <div className="text-lg font-semibold">
                  {card.cardholderName}
               </div>
               <div className="text-lg font-light">Exp: {card.exp}</div>
            </div>
         </div>
      </div>
   );
};

export default DebitCard;
