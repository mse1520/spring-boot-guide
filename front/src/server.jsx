import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';

const app = express();
const port = 3000;

app.get('*', (req, res) => {
  let html = renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );
  res.send('<!DOCTYPE html>' + html);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});