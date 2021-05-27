import React from 'react';

import '~/locales';
import GlobalStyles from './styles/global';

import { AppProvider } from './hooks';
import Routes from './routes';

const App: React.FC = () => (
  <>
    <AppProvider>
      <GlobalStyles />
      <Routes />
    </AppProvider>
  </>
);

export default App;
