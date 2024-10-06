export const formatAmount = (amount: number) => {
   const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
   }).format(amount);

   return formatted;
};
