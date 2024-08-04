import React, { createContext, useState, ReactNode } from "react";

interface SidebarContextProps {
   isOpen: boolean;
   toggleSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextProps | undefined>(
   undefined
);

interface SidebarProviderProps {
   children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
   children,
}) => {
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
