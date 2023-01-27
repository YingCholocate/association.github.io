import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
// import { mockXHR } from '../mock';
// production
if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { mockXHR } = require('../mock');
  mockXHR();
}
ReactDOM.render(
  <BrowserRouter>
    <App />,
  </BrowserRouter>,
  document.getElementById('root'),
);
