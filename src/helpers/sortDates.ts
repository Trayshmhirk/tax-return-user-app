import { compareAsc, isYesterday, isToday } from "date-fns";

// Updated sorting function to place "Today" last, "Yesterday" second last, and sort the rest in ascending order
export const sortDates = (dateA: string, dateB: string) => {
   const parsedDateA = new Date(dateA);
   const parsedDateB = new Date(dateB);

   // If both are "today", return 0
   if (isToday(parsedDateA) && isToday(parsedDateB)) return 0;

   // If dateA is "today", place it last
   if (isToday(parsedDateA)) return 1;

   // If dateB is "today", place it last
   if (isToday(parsedDateB)) return -1;

   // If dateA is "yesterday", place it after the others but before today
   if (isYesterday(parsedDateA)) return 1;

   // If dateB is "yesterday", place it after the others but before today
   if (isYesterday(parsedDateB)) return -1;

   // Sort the rest in ascending order
   return compareAsc(parsedDateA, parsedDateB);
};
