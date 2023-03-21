import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.documentElement
);

// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App';

// const container = document.querySelector('#root');
// if (container) createRoot(container).render(<App />);