import { createContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeContextProps = {
   defaultTheme?: Theme;
   storageKey?: string;
} & ChildrenNode;

type ThemeContextState = {
   theme: Theme;
   setTheme: (theme: Theme) => void;
};

const initialState: ThemeContextState = {
   theme: "system",
   setTheme: () => null,
};

export const ThemeProviderContext =
   createContext<ThemeContextState>(initialState);

export function ThemeContext({
   children,
   defaultTheme = "system",
   storageKey = "vite-ui-theme",
   ...props
}: ThemeContextProps) {
   const [theme, setTheme] = useState<Theme>(
      () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
   );

   useEffect(() => {
      const root = window.document.documentElement;

      root.classList.remove("light", "dark");

      if (theme === "system") {
         const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "dark"
            : "light";

         root.classList.add(systemTheme);
         return;
      }

      root.classList.add(theme);
   }, [theme]);

   const value = {
      theme,
      setTheme: (theme: Theme) => {
         localStorage.setItem(storageKey, theme);
         setTheme(theme);
      },
   };

   return (
      <ThemeProviderContext.Provider {...props} value={value}>
         {children}
      </ThemeProviderContext.Provider>
   );
}
