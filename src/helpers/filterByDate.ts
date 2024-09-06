import { ReceiptsPropTypes } from "@/types/AllTypes";
import { getTimelyValue } from "./getTimelyValue";

export const filterByDate = (
   receipt: ReceiptsPropTypes,
   selectedFilter: string
) => {
   if (selectedFilter === "" || selectedFilter === "All") {
      return true;
   }

   const timelyValue = getTimelyValue(receipt.date);
   // Check for "This week" and "Today" when filtering by "This week"
   if (selectedFilter.toLowerCase() === "this week") {
      return (
         timelyValue.toLowerCase() === "this week" ||
         timelyValue.toLowerCase() === "today"
      );
   }

   // Check for "This month", "This week", and "Today" when filtering by "This month"
   if (selectedFilter.toLowerCase() === "this month") {
      return (
         timelyValue.toLowerCase() === "this month" ||
         timelyValue.toLowerCase() === "this week" ||
         timelyValue.toLowerCase() === "today"
      );
   }

   return timelyValue.toLowerCase() === selectedFilter.toLowerCase();
};