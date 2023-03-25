import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

hydrateRoot(
  document,
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App';

// const container = document.querySelector('#root');
// if (container) createRoot(container).render(<App />);