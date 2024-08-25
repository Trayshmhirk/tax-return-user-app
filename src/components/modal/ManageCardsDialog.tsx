import { useState } from "react";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
   DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DebitCard from "../payment/DebitCard";

import { differenceInMonths, isPast } from "date-fns";

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

export type Card = {
   id: string;
   name: string;
   last4: string;
   exp: string;
   brand: string;
   cardholderName: string;
   isDefault: boolean;
};

type ManageCardsDialogProps = {
   cards: Card[];
};

export const ManageCardsDialog = ({ cards }: ManageCardsDialogProps) => {
   const [selectedCard, setSelectedCard] = useState<Card | null>(null);

   const handleCardClick = (card: Card) => {
      setSelectedCard(card);
   };

   const handleDeleteCard = (id: string) => {
      alert(`Card ${id} has been deleted.`);
      setSelectedCard(null);
   };

   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button
               variant="ghost"
               className="text-richElectricBlue font-medium px-3 py-1 shadow-md dark:shadow-md-dark rounded hover:text-richElectricBlue dark:hover:text-richElectricBlue hover-shadow-body"
            >
               Manage cards
            </Button>
         </DialogTrigger>
         <DialogContent className="max-w-xl gap-5 w-11/12 rounded-lg md:w-full dark:bg-gray focus-visible:ring-offset-0 focus-visible:ring-0">
            <DialogHeader>
               <DialogTitle>Manage Your Cards</DialogTitle>
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
               <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                     <h3 className="font-bold text-xl">Card Details</h3>
                     <p>
                        <strong>Cardholder:</strong>{" "}
                        {selectedCard.cardholderName}
                     </p>
                     <p>
                        <strong>Brand:</strong> {selectedCard.brand}
                     </p>
                     <p>
                        <strong>Expiry:</strong> {selectedCard.exp}{" "}
                        {isExpired(selectedCard.exp) ? (
                           <span className="text-bostonRed dark:text-red-500">
                              (Expired!)
                           </span>
                        ) : isExpiringSoon(selectedCard.exp) ? (
                           <span className="text-yellow-500">
                              (Expiring Soon!)
                           </span>
                        ) : null}
                     </p>
                     <p>
                        <strong>Last 4 Digits:</strong> {selectedCard.last4}
                     </p>
                  </div>

                  <DialogFooter>
                     <Button
                        variant="destructive"
                        className="dark:bg-red-500 text-white dark:text-white focus-visible:ring-offset-0 focus-visible:ring-0"
                        onClick={() => handleDeleteCard(selectedCard.id)}
                     >
                        Delete Card
                     </Button>
                  </DialogFooter>
               </div>
            ) : (
               <p className="">Click on a card to see details.</p>
            )}
         </DialogContent>
      </Dialog>
   );
};
