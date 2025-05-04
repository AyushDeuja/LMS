import { createContext, useState } from "react";

//themeContext for implementing dark mode and light mode
// context provider stores and manipulates the context data

interface ThemeContextValues {
  theme?: string;
}

const ThemeContext = createContext({
  theme: "light",
});

const ThemeProvider = ({ children }: { children: React.ReactElement }) => {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
