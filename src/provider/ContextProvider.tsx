import { SidebarContext } from "@/context/SidebarContext";
import { ThemeContext } from "@/context/ThemeContext";

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
