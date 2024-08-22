export const getCurrentMonth = () => {
   const currentMonthIndex = new Date().getMonth(); // 0-based index
   const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
   ];
   return months[currentMonthIndex];
};
