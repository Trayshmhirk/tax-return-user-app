import { SidebarContextProvider } from "../context/SidebarContext";

type ContextProviderProps = {
   children: React.ReactNode;
};

const ContextProvider = ({ children }: ContextProviderProps) => {
   return <SidebarContextProvider>{children}</SidebarContextProvider>;
};

export default ContextProvider;
