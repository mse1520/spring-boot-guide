import path from 'path';
import express from 'express';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ServerStyleSheet } from 'styled-components';
import Document from './Document';

const app = express();
const port = 3000;
const sheet = new ServerStyleSheet();

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  renderToPipeableStream(sheet.collectStyles(
    <StaticRouter location={req.url}>
      <Document />
    </StaticRouter>
  ));

  const styleElement = sheet.getStyleElement();
  const { pipe } = renderToPipeableStream(
    <StaticRouter location={req.url}>
      <Document styleElement={styleElement} />
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

app.listen(port, () => console.log(`App listening on port ${port}`));