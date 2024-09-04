import {
   isToday,
   startOfWeek,
   endOfWeek,
   startOfDay,
   startOfMonth,
   endOfMonth,
} from "date-fns";

export const getTimelyValue = (dateString: string) => {
   const receiptDate = startOfDay(new Date(dateString)); // Normalize the time
   const currentDate = startOfDay(new Date());

   if (isToday(receiptDate)) {
      return "Today";
   } else if (
      receiptDate >= startOfWeek(currentDate, { weekStartsOn: 1 }) &&
      receiptDate <= endOfWeek(currentDate, { weekStartsOn: 1 })
   ) {
      return "This week";
   } else if (
      receiptDate >= startOfMonth(currentDate) &&
      receiptDate <= endOfMonth(currentDate)
   ) {
      return "This month";
   } else {
      return "Earlier";
   }
};
