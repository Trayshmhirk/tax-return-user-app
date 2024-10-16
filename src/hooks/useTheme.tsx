import { useContext } from "react";
import { ThemeProviderContext } from "@/contexts/ThemeContext";

export const useTheme = () => {
   return useContext(ThemeProviderContext);
};
