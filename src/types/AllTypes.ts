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
