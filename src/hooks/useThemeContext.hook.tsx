'use client';

import { createContext, useState, useContext, useEffect } from 'react';

interface ThemeContextType {
  appTheme: string;
  setAppTheme: (theme: string) => void;
}

export const themeContext = createContext<ThemeContextType>({
  appTheme: 'light',
  setAppTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [appTheme, setAppTheme] = useState<string>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('appTheme');
    if (storedTheme) {
      setAppTheme(storedTheme);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('appTheme', appTheme);
  }, [appTheme]);

  return (
    <themeContext.Provider value={{ appTheme, setAppTheme }}>
      {children}
    </themeContext.Provider>
  );
};

export const useTheme = () => useContext(themeContext);
