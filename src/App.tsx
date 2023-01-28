import { Spin } from 'antd';
import React from 'react';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import ErrorBoundary from './components/Error-boundary';

import { persistor, store } from './redux/store';
import IndexRouter from './router/IndexRouter';

const ErrorInfo = ({ error }: { error: Error | null }) => <div>{error?.message}</div>;
function App() {
  return (
    <ErrorBoundary fallbackRender={ErrorInfo}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <React.Suspense fallback={<Spin />}>
            <IndexRouter />
          </React.Suspense>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
