import { createContext, useContext, useEffect, useState } from 'react';
const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const switchTheme = theme => {
    setTheme(theme);
  };
  return <ThemeContext.Provider value={{ theme, switchTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;

export function useTheme() {
  return useContext(ThemeContext);
}
