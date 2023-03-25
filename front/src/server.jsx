import express from 'express';
import React from 'react';
import { renderToPipeableStream, renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';

const app = express();
const port = 3000;

app.use(express.static('dist'));

app.get('*', (req, res) => {
  // let html = renderToString(
  //   <StaticRouter location={req.url}>
  //     <App />
  //   </StaticRouter>
  // );
  // res.send('<!DOCTYPE html>' + html);
  const { pipe } = renderToPipeableStream(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>,
    {
      bootstrapScripts: ['/client.js'],
      onShellReady() {
        res.setHeader('content-type', 'text/html');
        pipe(res);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});