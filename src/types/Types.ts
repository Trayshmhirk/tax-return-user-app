// services
export type SelectServicePropType = {
   selectedCategory: string;
};

export type ServicesListTypes = {
   title: string;
   service_id: string;
};

export type SelectCategoryPropTypes = {
   isRequestService?: boolean;
   onNext: () => void;
   onPrev?: () => void;
   setSelectedCategory?: React.Dispatch<React.SetStateAction<string>>;
   currentForm?: number;
   formSuccess?: { completed: boolean; index: number }[];
   setFormSuccess?: (success: boolean) => void;
};

export type CategoryListTypes = {
   name: string;
   category_id: string;
};

// documents
export type DocumentsPropTypes = {
   id: string;
   document_name: string;
   document_size: string;
   document_type: FileType;
   date_modified: string;
   base64: string;
};

export type FileType =
   | "application/pdf"
   | "image/png"
   | "application/msword"
   | "image/jpeg"
   | "application/vnd.ms-excel";

export type DocumentCardPropsTypes = {
   document: DocumentsPropTypes;
   onSelect?: (doc: DocumentsPropTypes) => void;
   isSelected?: boolean;
   handleSendToChat?: () => void;
   handleDeleteDocument?: (docId: string) => void;
};

// invoices
export type InvoiceStatus = "pending" | "paid" | "overdue" | "failed";

export type InvoicesPropTypes = {
   id: string;
   title: string;
   issued_by: string;
   due_date: string;
   amount: number;
   status: InvoiceStatus;
   base64: string;
};

export type InvoiceCardPropTypes = {
   invoice: InvoicesPropTypes;
   handleClick?: () => void;
   handleDeleteInvoice?: (invoiceId: string) => void;
};

// videos
export type VideoDataTypes = {
   title: string;
   duration: string;
   date_uploaded: string;
   id: string;
   category: string;
   description: string;
};

// faqs and help
export type QuestionsPropsType = {
   question: string;
   answer: string | string[];
   questionCategory?: string;
};

// requests
export type RequestStatus = "pending" | "paid" | "completed";

export type RequestsPropTypes = {
   service_id: string;
   status: RequestStatus;
   requestDate: string;
   service_title: string;
};

// forms
export type ILoginForm = {
   email: string;
   password: string;
};

export type ISignUpForm = {
   firstName: string;
   lastName: string;
   phone: string;
   email: string;
   password: string;
   confirmPassword: string;
};

export type IChangePasswordForm = {
   oldPassword: string;
   newPassword: string;
};

export type CardsProps = {
   id: string;
   name: string;
   last4: string;
   exp: string;
   brand: string;
   cardholderName: string;
   isDefault: boolean;
};

export type MetricCardProps = {
   amount: number;
   percentage: number;
   is_percentage_increase: boolean;
   invoice_status: InvoiceStatus;
};

export type TransactionStatus = "pending" | "processing" | "success" | "failed";

export type TransactionPropTypes = {
   id: string;
   date: string;
   description: string;
   amount: number;
   currency: string;
   status: TransactionStatus;
};

export type TransactionCardPropTypes = {
   transaction: TransactionPropTypes;
   handleClick?: () => void;
   handleDeleteTransaction?: (transactionId: string) => void;
};

// chat types
export enum MessageType {
   incoming = "incoming",
   outgoing = "outgoing",
}

export type MessagesPropType = {
   id: string;
   text: string;
   timestamp: string;
   type: MessageType;
   documents: DocumentsPropTypes[];
};

export enum ChatAccessStatus {
   ON = "on", // Chat is accessible
   OFF = "off", // Chat is restricted or disabled
}

export type ChatsPropType = {
   title: string;
   content: string; // Preview of the last message
   id: string; // Unique identifier for each chat
   messages: MessagesPropType[]; // Array of messages for each chat
   chat_access: ChatAccessStatus;
};
