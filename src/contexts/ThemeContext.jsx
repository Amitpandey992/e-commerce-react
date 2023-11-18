import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const ThemeContext = createContext();

// eslint-disable-next-line react/prop-types
export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => {
    const mode = localStorage.getItem("themeMode");
    return mode ? JSON.parse(mode) : "light";
  });

  const darkTheme = () => {
    setThemeMode("dark");
  };
  const lightTheme = () => {
    setThemeMode("light");
  };

  useEffect(() => {
    const mode = localStorage.getItem("themeMode");

    if (mode) {
      setThemeMode(JSON.parse(mode));
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{ themeMode, setThemeMode, darkTheme, lightTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  return useContext(ThemeContext);
};
