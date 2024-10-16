import { useContext } from "react";
import { SidebarProviderContext } from "@/contexts/SidebarContext";

export const useSidebar = () => {
   return useContext(SidebarProviderContext);
};
