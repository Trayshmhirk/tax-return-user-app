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
