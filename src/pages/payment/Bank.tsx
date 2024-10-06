import DebitChart from "../../charts/DebitChart";
import DebitCard from "../../components/payment/DebitCard";
import RecentTransactions from "../../components/payment/RecentTransactions";
import { ManageCardsDialog } from "@/components/modal/ManageCardsDialog";
import { useState } from "react";
import AddCardDialog from "@/components/modal/AddCardDialog";
import { CardsProps } from "@/types/AllTypes";
import { initialCards } from "@/mocks/AllMockData";
import { Button } from "@/components/ui/button";

const Bank = () => {
   const [bankCards, setbankCards] = useState<CardsProps[]>(initialCards);
   const defaultCard = bankCards.find((card) => card.isDefault) || bankCards[0];
   const [selectedCardId, setSelectedCardId] = useState<string>(defaultCard.id);

   const displayedCards = [
      defaultCard,
      ...bankCards.filter((card) => card.id !== defaultCard.id),
   ].slice(0, 2);

   const handleCardUpdate = (updatedCards: CardsProps[]) => {
      setbankCards(updatedCards);
      const newDefaultCard =
         updatedCards.find((card) => card.isDefault) || updatedCards[0];
      setSelectedCardId(newDefaultCard.id);
   };

   return (
      <div className="w-full">
         <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
            <div className="w-full">
               <div className="flex flex-col gap-5 bg-white dark:bg-gray rounded-xl px-5 py-4 shadow-md dark:shadow-md-dark">
                  <div className="flex justify-between items-center gap-3">
                     <div className="text-xl font-semibold">Your cards</div>

                     <AddCardDialog>
                        <Button className="px-3 py-2">
                           Add card <span className="font-bold">+</span>
                        </Button>
                     </AddCardDialog>
                  </div>

                  <div className="flex flex-col gap-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {displayedCards.map((card) => (
                           <DebitCard
                              key={card.id}
                              card={card}
                              onClick={() => setSelectedCardId(card.id)}
                           />
                        ))}
                     </div>
                     <ManageCardsDialog
                        cards={bankCards}
                        onUpdate={handleCardUpdate}
                     />
                  </div>
               </div>
            </div>

            <DebitChart />

            <div className="lg:col-span-2">
               <RecentTransactions selectedCardId={selectedCardId} />
            </div>
         </div>
      </div>
   );
};

export default Bank;
