import React from 'react';

import { AuthProvider } from './Auth';
import { AppLocaleProvider } from './Locale';
import { AppThemeProvider } from './Theme';

export const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <AppLocaleProvider>
      <AppThemeProvider>{children}</AppThemeProvider>
    </AppLocaleProvider>
  </AuthProvider>
);
