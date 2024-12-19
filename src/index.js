// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GraphProvider } from './context/GraphContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <GraphProvider>
      <App />
    </GraphProvider>
  </React.StrictMode>
);
