import { DocumentsPropTypes, ReceiptsPropTypes } from "@/types/AllTypes";
import { uploadedDocuments, receipts } from "@/mocks/AllMockData";

export async function fetchDocuments(): Promise<DocumentsPropTypes[]> {
   return uploadedDocuments;
}

export async function fetchReceipts(): Promise<ReceiptsPropTypes[]> {
   return receipts;
}
