import React, { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextProps {
   isOpen: boolean;
   toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
   undefined
);

export const useSidebar = () => {
   const context = useContext(SidebarContext);
   if (!context) {
      throw new Error("useSidebar must be used within a SidebarProvider");
   }
   return context;
};

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
