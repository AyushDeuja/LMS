import { createContext, useState } from "react";

//themeContext for implementing dark mode and light mode
// context provider stores and manipulates the context data

interface ThemeContextValues {
  theme?: string;
  setTheme: (value: string) => void;
}

const ThemeContext = createContext<ThemeContextValues>({
  theme: "light",
  setTheme: () => {},
});

const ThemeProvider = ({ children }: { children: React.ReactElement }) => {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
