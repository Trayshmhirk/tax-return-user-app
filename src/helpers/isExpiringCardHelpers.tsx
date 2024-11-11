import { differenceInMonths, isPast } from "date-fns";

// Function to check if a card is expired
export const isExpired = (exp: string): boolean => {
   const [month, year] = exp.split("/");
   const expDate = new Date(parseInt(`20${year}`), parseInt(month) - 1);
   return isPast(expDate);
};

// Function to check if a card is about to expire
export const isExpiringSoon = (exp: string): boolean => {
   const [month, year] = exp.split("/");
   const expDate = new Date(parseInt(`20${year}`), parseInt(month) - 1);
   const currentDate = new Date();
   return differenceInMonths(expDate, currentDate) <= 3 && !isPast(expDate);
};
