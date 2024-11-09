import { apiSlice } from "@/redux/api/apiSlice";
import { createSelector } from "@reduxjs/toolkit";

export const selectDefaultCard = createSelector(
   // Selects the cached data from the getCreditCards endpoint provided by the apiSlice.
   apiSlice.endpoints.getCreditCards.select(),
   // Extracts the default card if data is available and loading is complete.
   (creditCardsData) => {
      // Checks if the request has been successfully fulfilled and data is present.
      if (creditCardsData?.status === "fulfilled" && creditCardsData?.data) {
         return creditCardsData.data.find((card) => card.isDefault) || null;
      }
      return null; // Return null if data isn't ready yet
   }
);
