import { createContext, useState } from "react";

type SidebarContextState = {
   isOpen: boolean;
   toggleSidebar: () => void;
};

export const SidebarProviderContext = createContext({} as SidebarContextState);

export const SidebarContext = ({ children }: ChildrenNode) => {
   const [isOpen, setIsOpen] = useState(false);

   const toggleSidebar = () => {
      setIsOpen((prev) => !prev);
   };

   return (
      <SidebarProviderContext.Provider value={{ isOpen, toggleSidebar }}>
         {children}
      </SidebarProviderContext.Provider>
   );
};
