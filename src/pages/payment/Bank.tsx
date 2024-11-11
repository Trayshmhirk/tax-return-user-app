import DebitChart from "@/components/charts/DebitChart";
import DebitCard from "@/components/payment/DebitCard";
import RecentTransactions from "@/components/payment/RecentTransactions";
import { ManageCardsDialog } from "@/components/modal/ManageCardsDialog";
import { useEffect, useState } from "react";
import AddCardDialog from "@/components/modal/AddCardDialog";
import { CreditCardsProps } from "@/types/Types";
import { Button } from "@/components/ui/button";
import { useGetCreditCardsQuery } from "@/redux/api/apiSlice";
import { ClipLoader } from "react-spinners";
import PlaceholderText from "@/components/common/PlaceholderText";

const Bank = () => {
   const { data: cards = [], isLoading } = useGetCreditCardsQuery();

   const [bankCards, setBankCards] = useState<CreditCardsProps[]>([]);
   const [selectedCardId, setSelectedCardId] = useState<string | undefined>();

   // Update bankCards only after data has loaded
   useEffect(() => {
      if (!isLoading && cards.length > 0) {
         setBankCards(cards);

         const defaultCard = cards.find((card) => card.isDefault) || cards[0];
         setSelectedCardId(defaultCard?.id);
      }
   }, [isLoading, cards]);

   const displayedCards = bankCards.length
      ? [
           bankCards.find((card) => card.id === selectedCardId),
           ...bankCards.filter((card) => card.id !== selectedCardId),
        ].slice(0, 2)
      : [];

   const handleCardUpdate = (updatedCards: CreditCardsProps[]) => {
      setBankCards(updatedCards);
      const newDefaultCard =
         updatedCards.find((card) => card.isDefault) || updatedCards[0];
      setSelectedCardId(newDefaultCard.id);
   };

   return (
      <div className="w-full">
         <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
            <div className="w-full">
               <div className="h-full flex flex-col gap-5 bg-white dark:bg-gray rounded-xl px-5 py-4 shadow-md dark:shadow-md-dark">
                  <div className="flex justify-between items-center gap-3">
                     <div className="text-xl font-semibold">Your cards</div>

                     <AddCardDialog>
                        <Button className="px-3 py-2">
                           Add card <span className="font-bold">+</span>
                        </Button>
                     </AddCardDialog>
                  </div>

                  {isLoading ? (
                     <div className="w-full h-full flex justify-center items-center">
                        <ClipLoader color="#00A2C9" />
                     </div>
                  ) : (
                     <div className="w-full h-full flex flex-col gap-4 justify-between">
                        {displayedCards && displayedCards.length !== 0 ? (
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {displayedCards.map(
                                 (card) =>
                                    card && (
                                       <DebitCard
                                          key={card.id}
                                          card={card}
                                          onClick={() =>
                                             setSelectedCardId(card.id)
                                          }
                                       />
                                    )
                              )}
                           </div>
                        ) : (
                           <PlaceholderText
                              text="No credit cards found, please add a new credit
                                 card!"
                           />
                        )}

                        <ManageCardsDialog
                           cards={bankCards}
                           onUpdate={handleCardUpdate}
                        />
                     </div>
                  )}
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
