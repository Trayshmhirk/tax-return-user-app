// types
export type CardType = {
   id: number;
   cardName: string;
   cardNumber: number;
   cardText: string;
};

export type FilingCardProps = {
   color: string;
   isAddNew?: boolean;
   handleClick: (card: CardType | undefined) => void;
   handleNavigateBankDetails?: (card: CardType | undefined) => void;
   card?: CardType;
   cardName: string;
   cardNumber: number;
   cardText: string;
   integrateBank?: boolean;
   isBankCard?: boolean;
};

// services
export type SelectServicePropType = {
   selectedCategory: string;
};

export type ServicesListTypes = {
   title: string;
   service_id: string;
};

export type SelectCategoryPropTypes = {
   isSelectCategory: boolean;
   onNext: () => void;
   setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

export type CategoryListTypes = {
   name: string;
   category_id: string;
};

// documents
export type DocumentsPropTypes = {
   id: string;
   title: string;
   document_size: string;
   document_type: FileType;
};

export type FileType =
   | "application/pdf"
   | "image/png"
   | "application/msword"
   | "image/jpeg"
   | "application/vnd.ms-excel";

export type DocumentCardPropsTypes = {
   docId: string;
   documentName: string;
   documentSize: string;
   documentType: FileType;
   onSelect?: (doc: {
      docId: string;
      documentName: string;
      documentSize: string;
      documentType: FileType;
   }) => void;
   isSelectClicked?: boolean;
   handleSendToChat?: () => void;
};

export type CardDropdownPropsTypes = {
   handleShare: () => void;
   handleViewDoc: () => void;
   isSelectBank?: boolean;
   handleDeleteDoc: () => void;
   isDropdownOpen: boolean;
   handleDropdownToggle: () => void;
};

// receipts
export type ReceiptsPropTypes = {
   id: string;
   title: string;
   owner_info: {
      fullname: string;
   };
   date: string;
};

export type ReceiptCardPropTypes = {
   receiptId: string;
   handleClick: (receipt: {
      receiptId: string;
      title: string;
      fullname: string;
      date: string;
   }) => void;
   title: string;
   owner_info: {
      fullname: string;
   };
   date: string;
};

// transaction invoices
export type InvoicePropTypes = {
   id: string;
   transaction_id: string;
   title: string;
   date: string;
   total: string;
};

// videos
export type VideoDataTypes = {
   title: string;
   time: string;
   uploaded: string;
   id: string;
   category: string;
};

// faqs and help
export type QuestionsPropsType = {
   question: string;
   answer: string | string[];
   questionCategory?: string;
};

// requests
export type RequestsPropTypes = {
   service_id: string;
   status: string;
   requestDate: string;
   service_title: string;
};
