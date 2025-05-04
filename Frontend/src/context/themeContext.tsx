import { createContext, useMemo, useState } from "react";

//themeContext for implementing dark mode and light mode
// context provider stores and manipulates the context data
type Theme = "light" | "dark";

interface ThemeContextValues {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValues>({
  theme: "light",
  toggleTheme: () => {},
});

const ThemeProvider = ({ children }: { children: React.ReactElement }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
