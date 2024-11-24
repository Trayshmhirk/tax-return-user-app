import { cards } from "@/mocks/MockData";

export async function fetchTransactions(
   cardId: string | undefined
): Promise<TransactionPropTypes[]> {
   // Check if a valid cardId is provided
   if (!cardId) {
      return [];
   }

   // Find the card by id
   const card = cards.find((card) => card.id === cardId);

   // If card is found, return its transactions, otherwise return an empty array
   return card ? card.transactions : [];
}
