import React from 'react';
import ReactDOM from 'react-dom/client';
import { initWS } from 'services/ws';

import 'styles/index.scss';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

Neutralino.init();
initWS();
