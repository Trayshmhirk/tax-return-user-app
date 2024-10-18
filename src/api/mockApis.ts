import {
   ChatsPropType,
   DocumentsPropTypes,
   InvoicesPropTypes,
   TransactionPropTypes,
} from "@/types/Types";
import { uploadedDocuments, invoices, chats } from "@/mocks/MockData";

export async function fetchDocuments(): Promise<DocumentsPropTypes[]> {
   return uploadedDocuments;
}

export async function fetchInvoices(): Promise<InvoicesPropTypes[]> {
   return invoices;
}

export async function fetchTransactions(
   cardId: string | null
): Promise<TransactionPropTypes[]> {
   if (cardId === "er634e7") {
      return [
         {
            id: "txn_01",
            date: "2024-08-01",
            description: "Grocery Store",
            amount: 50.25,
            currency: "USD",
            status: "success",
         },
         {
            id: "txn_02",
            date: "2024-08-05",
            description: "Flight Ticket",
            amount: 250.0,
            currency: "USD",
            status: "failed",
         },
         {
            id: "txn_03",
            date: "2024-08-10",
            description: "Restaurant",
            amount: 80.15,
            currency: "USD",
            status: "pending",
         },
         {
            id: "txn_04",
            date: "2024-08-15",
            description: "Refund - Online Purchase",
            amount: 100.0,
            currency: "USD",
            status: "processing",
         },
         {
            id: "txn_05",
            date: "2024-07-15",
            description: "Refund - Online Purchase",
            amount: 100.0,
            currency: "USD",
            status: "processing",
         },
         {
            id: "txn_06",
            date: "2024-08-25",
            description: "Refund - Online Purchase",
            amount: 100.0,
            currency: "USD",
            status: "success",
         },
         {
            id: "txn_07",
            date: "2024-08-26",
            description: "Refund - Online Purchase",
            amount: 100.0,
            currency: "USD",
            status: "processing",
         },
      ];
   } else if (cardId === "hd2376y") {
      return [
         {
            id: "txn_01",
            date: "2024-08-01",
            description: "Grocery Store",
            amount: 50.25,
            currency: "USD",
            status: "success",
         },
         {
            id: "txn_02",
            date: "2024-08-05",
            description: "Flight Ticket",
            amount: 250.0,
            currency: "USD",
            status: "failed",
         },
         {
            id: "txn_03",
            date: "2024-08-10",
            description: "Restaurant",
            amount: 80.15,
            currency: "USD",
            status: "pending",
         },
         {
            id: "txn_04",
            date: "2024-08-15",
            description: "Refund - Online Purchase",
            amount: 100.0,
            currency: "USD",
            status: "processing",
         },
      ];
   } else if (cardId === "ab987hg") {
      return [
         {
            id: "txn_05",
            date: "2024-08-25",
            description: "Online Purchase",
            amount: 100.0,
            currency: "USD",
            status: "success",
         },
      ];
   }
   return [];
}

export async function fetchChats(): Promise<ChatsPropType[]> {
   return chats;
}
