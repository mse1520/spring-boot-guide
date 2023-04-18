import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import Document from './Document';
import { createProxyMiddleware } from 'http-proxy-middleware';
import axios from 'axios';

const PORT = 4005;
const API_SERVER = 'http://localhost:4001';
const apiAxios = axios.create({ baseURL: API_SERVER });
const app = express();

app.use('/api', createProxyMiddleware({ target: API_SERVER, cookiePathRewrite: { '/api': '/' } }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', async (req, res) => {
  const session = await apiAxios
    .get('/api/user/info', {
      headers: { Cookie: Object.entries(req.cookies).map(cookie => cookie.join('=')).join('; ') }
    })
    .then(res => res.data);

  const { pipe } = renderToPipeableStream(
    <StaticRouter location={req.url}>
      <Document data={{ session }} />
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

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));