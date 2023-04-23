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

const IS_DEV = process.env.NODE_ENV === 'development';
const PORT = 4005;
const API_SERVER = 'http://localhost:4001';
const apiAxios = axios.create({ baseURL: API_SERVER });
const app = express();

if (IS_DEV)
  app.use('/api', createProxyMiddleware({ target: API_SERVER, cookiePathRewrite: { '/api': '/' } }));
app.use(morgan(IS_DEV ? 'dev' : 'combined'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const generateHtml = (req, res, data) => {
  const { pipe } = renderToPipeableStream(
    <StaticRouter location={req.url}>
      <Document data={data} />
    </StaticRouter>,
    {
      bootstrapScripts: ['/client.js'],
      onShellReady() {
        res.setHeader('content-type', 'text/html');
        pipe(res);
      }
    }
  );
};

app.get('/', async (req, res) => {
  const session = await apiAxios
    .get('/api/user/info', {
      headers: { Cookie: Object.entries(req.cookies).map(cookie => cookie.join('=')).join('; ') }
    })
    .then(res => res.data);

  generateHtml(req, res, { session });
});

app.get('/sign-in', async (req, res) => {
  const session = await apiAxios
    .get('/api/user/info', {
      headers: { Cookie: Object.entries(req.cookies).map(cookie => cookie.join('=')).join('; ') }
    })
    .then(res => res.data);

  if (session.user) res.redirect('/');

  generateHtml(req, res, { session });
});

app.get('/sign-up', async (req, res) => {
  const session = await apiAxios
    .get('/api/user/info', {
      headers: { Cookie: Object.entries(req.cookies).map(cookie => cookie.join('=')).join('; ') }
    })
    .then(res => res.data);

  generateHtml(req, res, { session });
});

app.get('/board/list', async (req, res) => {
  const session = await apiAxios
    .get('/api/user/info', {
      headers: { Cookie: Object.entries(req.cookies).map(cookie => cookie.join('=')).join('; ') }
    })
    .then(res => res.data);

  generateHtml(req, res, { session });
});

app.get('/board/write', async (req, res) => {
  const session = await apiAxios
    .get('/api/user/info', {
      headers: { Cookie: Object.entries(req.cookies).map(cookie => cookie.join('=')).join('; ') }
    })
    .then(res => res.data);

  generateHtml(req, res, { session });
});

app.get('/board/info/:boardId', async (req, res) => {
  const session = await apiAxios
    .get('/api/user/info', {
      headers: { Cookie: Object.entries(req.cookies).map(cookie => cookie.join('=')).join('; ') }
    })
    .then(res => res.data);

  generateHtml(req, res, { session });
});

app.get('/board/info/:boardId/update', async (req, res) => {
  const session = await apiAxios
    .get('/api/user/info', {
      headers: { Cookie: Object.entries(req.cookies).map(cookie => cookie.join('=')).join('; ') }
    })
    .then(res => res.data);

  generateHtml(req, res, { session });
});

app.get('/404', (req, res) => {
  res.status(404);
  generateHtml(req, res, {});
});

app.use((req, res) => res.redirect('/404'));

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));