import { createContext, useMemo, useState } from "react";

//themeContext for implementing dark mode and light mode
// context provider stores and manipulates the context data
type Theme = "light" | "dark";

interface ThemeContextValues {
  theme: Theme;
  setTheme: (value: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValues>({
  theme: "light",
  setTheme: () => {},
});

const ThemeProvider = ({ children }: { children: React.ReactElement }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
