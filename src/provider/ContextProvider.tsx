import { SidebarContext } from "@/contexts/SidebarContext";
import { ThemeContext } from "@/contexts/ThemeContext";

type ContextProviderProps = {
   children: React.ReactNode;
};

const ContextProvider = ({ children }: ContextProviderProps) => {
   return (
      <ThemeContext defaultTheme="dark" storageKey="vite-ui-theme">
         <SidebarContext>{children}</SidebarContext>
      </ThemeContext>
   );
};

export default ContextProvider;
