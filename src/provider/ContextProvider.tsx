import { SidebarContextProvider } from "../context/SidebarContext";
import { ThemeContextProvider } from "../context/ThemeContext";

type ContextProviderProps = {
   children: React.ReactNode;
};

const ContextProvider = ({ children }: ContextProviderProps) => {
   return (
      <ThemeContextProvider>
         <SidebarContextProvider>{children}</SidebarContextProvider>
      </ThemeContextProvider>
   );
};

export default ContextProvider;
