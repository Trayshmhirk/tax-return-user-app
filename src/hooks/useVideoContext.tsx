import { useContext } from "react";
import { VideoProviderContext } from "@/contexts/VideoContext";

// Export the custom context hook for easier access in other components
export const useVideoContext = () => {
   const context = useContext(VideoProviderContext);
   if (!context) {
      throw new Error(
         "useVideoContext must be used within a VideoContextProvider"
      );
   }
   return context;
};
