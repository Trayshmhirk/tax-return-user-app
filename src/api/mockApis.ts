import { InvoicesPropTypes, TransactionPropTypes } from "@/types/Types";
import { invoices, cards } from "@/mocks/MockData";

export async function fetchInvoices(): Promise<InvoicesPropTypes[]> {
   return invoices;
}

export async function fetchTransactions(
   cardId: string | null
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
