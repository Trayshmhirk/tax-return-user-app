declare type ILoginForm = {
   email: string;
   password: string;
};

declare type ISignUpForm = {
   firstName: string;
   lastName: string;
   phone: string;
   email: string;
   password: string;
   confirmPassword: string;
};

declare type IChangePasswordForm = {
   oldPassword: string;
   newPassword: string;
};

declare type FormLayoutPropType = {
   handleSubmit: () => void;
   title: string;
   description: string;
   isCurrentForm?: number;
   isDocUpload?: boolean;
   onCancel?: () => void;
   isFormSuccess?: { completed: boolean; index: number }[];
} & ChildrenNode;

declare type OtpPropTypes = {
   title: string;
   description: string;
   email: string;
   currentForm: number;
   onNext: () => void;
   onPrev: () => void;
   isRecoverPasswordOTP?: boolean;
   formSuccess: { completed: boolean; index: number }[];
   setFormSuccess: (success: boolean) => void;
};

declare type UploadFormPropTypes = {
   onPrev: () => void;
   currentForm: number;
   formSuccess: { completed: boolean; index: number }[];
   setFormSuccess: (success: boolean) => void;
};

declare type ChildrenNode = {
   children: React.ReactNode;
};

declare type RadioInputPropTypes = {
   value: string;
   isChecked: boolean;
   onRadioChange: (value: string, service: ServicesTypes | undefined) => void;
   service?: ServicesTypes;
};

declare type SelectServicePropType = {
   selectedCategory: string;
   onPrev: () => void;
};

declare type ServicesTypes = {
   title: string;
   service_id: string;
};

declare type SelectCategoryPropType = {
   isRequestService?: boolean;
   onNext: () => void;
   onPrev?: () => void;
   setSelectedCategory?: React.Dispatch<React.SetStateAction<string>>;
   currentForm?: number;
   formSuccess?: { completed: boolean; index: number }[];
   setFormSuccess?: (success: boolean) => void;
};

declare type CategoriesType = {
   name: string;
   category_id: string;
};

declare type DocumentsPropTypes = {
   id: string;
   document_name: string;
   document_size: string;
   document_type: FileType;
   date_modified: string;
   base64: string;
};

declare type FileType =
   | "application/pdf"
   | "image/png"
   | "application/msword"
   | "image/jpeg"
   | "application/vnd.ms-excel";

declare type DocumentCardPropsTypes = {
   document: DocumentsPropTypes;
   onSelect?: (doc: DocumentsPropTypes) => void;
   isSelected?: boolean;
   handleSendToChat?: () => void;
   handleDeleteDocument?: (docId: string) => void;
};

declare type InvoiceStatus = "pending" | "paid" | "overdue" | "failed";

declare type InvoicesPropTypes = {
   id: string;
   title: string;
   issued_by: string;
   due_date: string;
   amount: number;
   status: InvoiceStatus;
   invoice_url: string;
};

declare type InvoiceCardPropTypes = {
   invoice: InvoicesPropTypes;
   handleClick?: () => void;
   handleDeleteInvoice?: (invoiceId: string) => void;
};

declare type MetricCardProps = {
   amount: number;
   percentage: number;
   is_percentage_increase: boolean;
   invoice_status: InvoiceStatus;
};

declare type VideoPropTypes = {
   id: string;
   title: string;
   duration: string;
   date_uploaded: string;
   category: string;
   description: string;
   url: string;
};

declare type QuestionsPropsType = {
   question: string;
   answer: string | string[];
   questionCategory?: string;
};

declare type CreditCardsProps = {
   id: string;
   name: string;
   last4: string;
   exp: string;
   brand: string;
   cardholderName: string;
   isDefault: boolean;
   transactions: TransactionPropTypes[];
};

declare type MetricCardProps = {
   amount: number;
   percentage: number;
   is_percentage_increase: boolean;
   invoice_status: InvoiceStatus;
};

declare type TransactionStatus =
   | "pending"
   | "processing"
   | "success"
   | "failed";

declare type TransactionPropTypes = {
   id: string;
   date: string;
   description: string;
   amount: number;
   currency: string;
   status: TransactionStatus;
};

declare type TransactionCardPropTypes = {
   transaction: TransactionPropTypes;
   handleClick?: () => void;
   handleDeleteTransaction?: (transactionId: string) => void;
};

declare enum MessageType {
   incoming = "incoming",
   outgoing = "outgoing",
}

declare type MessagesPropType = {
   id: string;
   text: string;
   timestamp: string;
   type: MessageType;
   documents: DocumentsPropTypes[];
};

declare enum ChatAccessStatus {
   ON = "on", // Chat is accessible
   OFF = "off", // Chat is restricted or disabled
}

declare type ChatsPropType = {
   id: string; // Unique identifier for each chat
   title: string;
   service_id: string;
   category: string;
   chat_access: ChatAccessStatus;
   messages: MessagesPropType[]; // Array of messages for each chat
};

declare type IncomingMessageBubblePropTypes = {
   text: string;
   timeStamp: string;
   borderRadius: string;
   isLastMessage: boolean;
   document: DocumentsPropTypes;
};

declare type OutgoingMessageBubblePropTypes = {
   text: string;
   timeStamp: string;
   borderRadius: string;
   isLastMessage: boolean;
   document: DocumentsPropTypes;
};
