import { useState } from "react";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
   DialogFooter,
   DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DebitCard from "../payment/DebitCard";

import { differenceInMonths, isPast } from "date-fns";
import { CardsProps } from "@/types/Types";

// Function to check if a card is expired
const isExpired = (exp: string): boolean => {
   const [month, year] = exp.split("/");
   const expDate = new Date(parseInt(`20${year}`), parseInt(month) - 1);
   return isPast(expDate);
};

// Function to check if a card is about to expire
const isExpiringSoon = (exp: string): boolean => {
   const [month, year] = exp.split("/");
   const expDate = new Date(parseInt(`20${year}`), parseInt(month) - 1);
   const currentDate = new Date();
   return differenceInMonths(expDate, currentDate) <= 3 && !isPast(expDate);
};

type ManageCardsDialogProps = {
   cards: CardsProps[];
   onUpdate: (updatedCards: CardsProps[]) => void;
};

export const ManageCardsDialog = ({
   cards,
   onUpdate,
}: ManageCardsDialogProps) => {
   const [selectedCard, setSelectedCard] = useState<CardsProps | null>(null);

   const handleCardClick = (card: CardsProps) => {
      setSelectedCard(card);
   };

   const handleDeleteCard = (id: string) => {
      alert(`Card ${id} has been deleted.`);
      setSelectedCard(null);
   };

   const handleSetDefault = () => {
      if (selectedCard) {
         // Set new default card
         const updatedCards = cards.map((card) => ({
            ...card,
            isDefault: card.id === selectedCard.id,
         }));
         onUpdate(updatedCards); // Notify parent to update state
         setSelectedCard(null);
      }
   };

   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button
               variant="ghost"
               className="text-richElectricBlue font-medium shadow-md dark:shadow-md-dark rounded hover:text-richElectricBlue dark:hover:text-richElectricBlue hover-shadow-body"
            >
               Manage cards
            </Button>
         </DialogTrigger>
         <DialogContent
            className="max-w-xl gap-5"
            aria-description="manage cards dialog"
         >
            <DialogHeader>
               <DialogTitle>Manage Your Cards</DialogTitle>
               <DialogDescription />
            </DialogHeader>

            {/* Cards list */}
            <div className="overflow-x-scroll flex gap-4 p-1">
               {cards.map((card) => (
                  <DebitCard
                     key={card.id}
                     card={card}
                     onClick={() => handleCardClick(card)}
                     isDialog
                  />
               ))}
            </div>

            {/* Card Details */}
            {selectedCard ? (
               <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                     <h3 className="font-semibold text-xl">Card Details</h3>
                     <p>
                        Cardholder:{" "}
                        <span className="font-medium">
                           {selectedCard.cardholderName}
                        </span>
                     </p>
                     <p>
                        Brand:{" "}
                        <span className="font-medium">
                           {selectedCard.brand}
                        </span>
                     </p>
                     <p>
                        Expiry:{" "}
                        <span className="font-medium">{selectedCard.exp}</span>{" "}
                        {isExpired(selectedCard.exp) ? (
                           <span className="text-bostonRed dark:text-red-400">
                              (Expired!)
                           </span>
                        ) : isExpiringSoon(selectedCard.exp) ? (
                           <span className="text-yellow-500">
                              (Expiring Soon!)
                           </span>
                        ) : null}
                     </p>
                     <p>
                        Last 4 Digits:{" "}
                        <span className="font-medium">
                           **** **** **** {selectedCard.last4}
                        </span>
                     </p>
                  </div>

                  <DialogFooter className="gap-2">
                     <Button
                        variant="default"
                        className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white dark:text-white"
                        onClick={() => handleDeleteCard(selectedCard.id)}
                     >
                        Delete Card
                     </Button>

                     <Button
                        variant="default"
                        className="bg-gray dark:bg-neutral-600 dark:hover:bg-neutral-700"
                        onClick={handleSetDefault}
                     >
                        Set Default
                     </Button>
                  </DialogFooter>
               </div>
            ) : (
               <p className="font-medium">Click on a card to see details.</p>
            )}
         </DialogContent>
      </Dialog>
   );
};
