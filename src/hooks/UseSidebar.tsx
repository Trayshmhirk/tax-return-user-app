import { useContext } from "react";
import { SidebarProviderContext } from "../context/SidebarContext";

export const useSidebar = () => {
   return useContext(SidebarProviderContext);
};
