import { SidebarContext } from "@/contexts/SidebarContext";
import { ThemeContext } from "@/contexts/ThemeContext";

const ContextProvider = ({ children }: ChildrenNode) => {
   return (
      <ThemeContext defaultTheme="dark" storageKey="vite-ui-theme">
         <SidebarContext>{children}</SidebarContext>
      </ThemeContext>
   );
};

export default ContextProvider;
