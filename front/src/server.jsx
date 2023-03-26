import path from 'path';
import express from 'express';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import Document from './Document';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const port = 3000;

app.use('/api', createProxyMiddleware({ target: 'http://localhost:4001' }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  const { pipe } = renderToPipeableStream(
    <StaticRouter location={req.url}>
      <Document />
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