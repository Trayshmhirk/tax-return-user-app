import { useContext } from "react";
import { ThemeProviderContext } from "@/context/ThemeContext";

export const useTheme = () => {
   return useContext(ThemeProviderContext);
};
