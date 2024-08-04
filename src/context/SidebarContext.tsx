import { createContext, useState, ReactNode } from "react";

type SidebarContextProps = {
   isOpen: boolean;
   toggleSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContextProps | undefined>(
   undefined
);

type SidebarProviderProps = {
   children: ReactNode;
};

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
   const [isOpen, setIsOpen] = useState(true);

   const toggleSidebar = () => {
      setIsOpen((prev) => !prev);
   };

   return (
      <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
         {children}
      </SidebarContext.Provider>
   );
};

// explicitly exporting type
export type { SidebarContextProps };
