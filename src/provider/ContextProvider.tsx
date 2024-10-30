import { SidebarContext } from "@/contexts/SidebarContext";
import { ThemeContext } from "@/contexts/ThemeContext";
import { VideoContext } from "@/contexts/VideoContext";

type ContextProviderProps = {
   children: React.ReactNode;
};

const ContextProvider = ({ children }: ContextProviderProps) => {
   return (
      <ThemeContext defaultTheme="dark" storageKey="vite-ui-theme">
         <SidebarContext>
            <VideoContext>{children}</VideoContext>
         </SidebarContext>
      </ThemeContext>
   );
};

export default ContextProvider;
