import { createContext, useState, ReactNode } from "react";

type SidebarContextProps = {
   children: ReactNode;
};

type SidebarContextState = {
   isOpen: boolean;
   toggleSidebar: () => void;
};

export const SidebarProviderContext = createContext({} as SidebarContextState);

export const SidebarContext = ({ children }: SidebarContextProps) => {
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

// explicitly exporting type
export type { SidebarContextProps };
