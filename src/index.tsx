import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
// import mockXHR from '../mock';

// if (process.env.NODE_ENV === 'development') {
//   mockXHR.mockXHR();
// }
ReactDOM.render(
  <BrowserRouter>
    <App />,
  </BrowserRouter>,
  document.getElementById('root'),
);
