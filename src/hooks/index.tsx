import React from 'react';

import { AuthProvider } from './auth';
import { AppLocaleProvider } from './locale';
import { AppThemeProvider } from './theme';

export const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <AppLocaleProvider>
      <AppThemeProvider>{children}</AppThemeProvider>
    </AppLocaleProvider>
  </AuthProvider>
);
