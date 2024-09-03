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
   }

   // Solution 1 for "This week": Adjust week start day
   // const weekStart = startOfDay(startOfWeek(currentDate, { weekStartsOn: 0 }));
   // const weekEnd = startOfDay(endOfWeek(currentDate, { weekStartsOn: 0 }));

   // Solution 2 for "This week": Check for current week inclusively
   const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
   const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
   if (receiptDate >= weekStart && receiptDate <= weekEnd) {
      return "This week";
   }

   // Solution 1 for "This month": Use a date range
   const monthStart = startOfMonth(currentDate);
   const monthEnd = endOfMonth(currentDate);
   if (receiptDate >= monthStart && receiptDate <= monthEnd) {
      return "This month";
   }

   return "Earlier";
};
