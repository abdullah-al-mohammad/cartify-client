import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'system');

  // Apply Theme
  const applyTheme = themeValue => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    root.classList.remove('light', 'dark');

    if (themeValue === 'system') {
      root.classList.add(prefersDark ? 'dark' : 'light');
    } else {
      root.classList.add(themeValue);
    }
  };

  // Run on mount + when theme changes
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 🔥 Listen to system theme change (Fix!)
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const systemThemeListener = () => {
      if (theme === 'system') {
        applyTheme('system'); // refresh applied theme
      }
    };

    media.addEventListener('change', systemThemeListener);

    return () => media.removeEventListener('change', systemThemeListener);
  }, [theme]);

  const switchTheme = newTheme => setTheme(newTheme);

  return <ThemeContext.Provider value={{ theme, switchTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
export { ThemeProvider };
