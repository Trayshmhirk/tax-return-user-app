import { DocumentsPropTypes, InvoicesPropTypes } from "@/types/AllTypes";
import { uploadedDocuments, invoices } from "@/mocks/AllMockData";

export async function fetchDocuments(): Promise<DocumentsPropTypes[]> {
   return uploadedDocuments;
}

export async function fetchInvoices(): Promise<InvoicesPropTypes[]> {
   return invoices;
}
