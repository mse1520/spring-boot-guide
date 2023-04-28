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
import { getPaths } from './route';
import { BOARD_WRITABLE } from './utils/auth';

const IS_DEV = process.env.NODE_ENV === 'development';
const PORT = 4005;
const API_SERVER = 'http://localhost:4001';
const apiAxios = axios.create({ baseURL: API_SERVER });
const app = express();

app.use(morgan(IS_DEV ? 'dev' : 'combined'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
if (IS_DEV)
  app.use('/api', createProxyMiddleware({ target: API_SERVER, cookiePathRewrite: { '/api': '/' } }));

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

const cookieToString = cookies => Object.entries(cookies).map(cookie => cookie.join('=')).join('; ');

const objRoutes = getPaths().reduce((acc, cur) => {
  acc[cur] = (req, res) => apiAxios
    .get('/api/user/info', { headers: { Cookie: cookieToString(req.cookies) } })
    .then(res => res.data)
    .then(session => generateHtml(req, res, { session }));

  return acc;
}, {});

objRoutes['/board/write'] = async (req, res) => {
  const session = await apiAxios
    .get('/api/user/info', { headers: { Cookie: cookieToString(req.cookies) } })
    .then(res => res.data);

  if (!BOARD_WRITABLE.includes(session.user?.role))
    return res.redirect('/');

  generateHtml(req, res, { session });
};

objRoutes['/board/info/:boardId/update'] = async (req, res) => {
  const session = await apiAxios
    .get('/api/user/info', { headers: { Cookie: cookieToString(req.cookies) } })
    .then(res => res.data);

  if (!BOARD_WRITABLE.includes(session.user?.role))
    return res.redirect('/');

  generateHtml(req, res, { session });
};

objRoutes['/not-found'] = (req, res) => {
  res.status(404);
  generateHtml(req, res, {});
};

Object.entries(objRoutes).forEach(([path, handler]) => app.get(path, handler));

app.use((req, res) => res.redirect('/not-found'));

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));