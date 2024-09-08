import { useContext } from "react";
import { SidebarProviderContext } from "../context/SidebarContext";

export const useSidebar = () => {
   const context = useContext(SidebarProviderContext);
   if (!context) {
      throw new Error("useSidebar must be used within a SidebarProvider");
   }
   return context;
};
