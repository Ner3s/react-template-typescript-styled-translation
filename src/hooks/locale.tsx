import  React, { createContext, useContext, useCallback } from 'react';

import { useTranslation } from 'react-i18next';

interface AppLocaleContext {
  handleChangeLocale(language: string): void;
}

const AppLocaleContext = createContext<AppLocaleContext>(
  {} as AppLocaleContext,
);

export const AppLocaleProvider: React.FC = ({ children }) => {
  const { i18n } = useTranslation();

  const handleChangeLocale = useCallback(
    (language: string) => {
      i18n.changeLanguage(language);
    },
    [i18n],
  );

  return (
    <AppLocaleContext.Provider value={{ handleChangeLocale }}>
      {children}
    </AppLocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(AppLocaleContext);

  if (!context) {
    throw new Error('useLocale');
  }

  return context;
};
