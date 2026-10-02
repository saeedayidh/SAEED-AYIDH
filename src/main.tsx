import {initializePageScroll} from './lib/pageScroll';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// A direct visit starts at the top; hash navigation is handled by the router.
initializePageScroll();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
