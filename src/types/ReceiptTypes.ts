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
