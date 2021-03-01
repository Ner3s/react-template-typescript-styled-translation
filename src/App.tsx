import { Suspense } from 'react';

import '~/locales';
import { AppProvider } from './hooks';
import Routes from './routes';

import GlobalStyles from './styles/global';

const App = () => {
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
