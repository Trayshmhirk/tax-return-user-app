// ThemeContext.tsx
import { createContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextType {
   isDarkMode: boolean;
   toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
   undefined
);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
   const [isDarkMode, setIsDarkMode] = useState(
      localStorage.getItem("theme") === "dark"
   );

   useEffect(() => {
      if (isDarkMode) {
         document.documentElement.classList.add("dark");
         localStorage.setItem("theme", "dark");
      } else {
         document.documentElement.classList.remove("dark");
         localStorage.setItem("theme", "light");
      }
   }, [isDarkMode]);

   const toggleTheme = () => setIsDarkMode(!isDarkMode);

   return (
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
         {children}
      </ThemeContext.Provider>
   );
};
