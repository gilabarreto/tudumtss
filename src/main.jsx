import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './routes/Router';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
);
