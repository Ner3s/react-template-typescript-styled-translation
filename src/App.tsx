import React from 'react';
import { Suspense } from 'react';

import '~/locales';
import GlobalStyles from './styles/global';

import { AppProvider } from './hooks';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <Suspense fallback={<p>Loading...</p>}>
          <GlobalStyles />
          <Routes />
        </Suspense>
      </AppProvider>
    </>
  );
};

export default App;
