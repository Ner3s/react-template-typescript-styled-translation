import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';

import { ThemeProvider } from 'styled-components';

import * as themes from '~/styles/themes';

type ThemeState = 'light' | 'dark';

interface AppThemeContext {
  currentTheme: ThemeState;
  toggleTheme(): void;
}

const AppThemeContext = createContext({} as AppThemeContext);

export const AppThemeProvider: React.FC = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeState>(() => {
    const storedTheme = localStorage.getItem('@AppName:theme') as ThemeState;

    return storedTheme ? JSON.parse(storedTheme) : 'light';
  });

  const toggleTheme = useCallback(() => {
    setCurrentTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('@AppName:theme', JSON.stringify(newTheme));

      return newTheme;
    });
  }, []);

  const value = useMemo(
    () => ({
      currentTheme,
      toggleTheme,
    }),
    [currentTheme, toggleTheme],
  );

  return (
    <AppThemeContext.Provider value={value}>
      <ThemeProvider theme={themes[currentTheme]}>{children}</ThemeProvider>
    </AppThemeContext.Provider>
  );
};

export const useTheme = (): AppThemeContext => {
  const themeContext = useContext(AppThemeContext);

  if (!themeContext) {
    throw new Error('useTheme must be used within an AppThemeProvider');
  }

  return themeContext;
};
