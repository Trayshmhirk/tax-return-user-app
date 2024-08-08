export type CardType = {
   id: number;
   cardName: string;
   cardNumber: number;
   cardText: string;
   color: string;
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
