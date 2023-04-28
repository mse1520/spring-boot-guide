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
import { cookieToString } from './utils';

const IS_DEV = process.env.NODE_ENV === 'development';
const PORT = 4005;
const API_SERVER = 'http://localhost:4001';
const apiAxios = axios.create({ baseURL: API_SERVER });
const app = express();

const SERVER_ERROR = 'SERVER_ERROR';
const NOT_FOUND = 'NOT_FOUND';
const StatusCode = {
  [SERVER_ERROR]: 500,
  [NOT_FOUND]: 404
};

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

const routes = getPaths().reduce((acc, cur) => {
  acc[cur] = (req, res) => apiAxios
    .get('/api/user/info', { headers: { Cookie: cookieToString(req.cookies) } })
    .then(res => res.data)
    .then(session => generateHtml(req, res, { session }));

  return acc;
}, {});

routes['/board/write'] = async (req, res) => {
  const session = await apiAxios
    .get('/api/user/info', { headers: { Cookie: cookieToString(req.cookies) } })
    .then(res => res.data);

  if (!BOARD_WRITABLE.includes(session.user?.role))
    return res.redirect('/');

  generateHtml(req, res, { session });
};

routes['/board/info/:boardId'] = async (req, res, next) => {
  try {
    const sessionApi = apiAxios
      .get('/api/user/info', { headers: { Cookie: cookieToString(req.cookies) } })
      .then(res => res.data);

    const boardDetailApi = await apiAxios
      .get(`/api/board/info/${req.params.boardId}`, { headers: { Cookie: cookieToString(req.cookies) } })
      .then(res => res.data.body);

    const [session, boardDetail] = await Promise.all([sessionApi, boardDetailApi]);

    generateHtml(req, res, { session, boardDetail });
  } catch (error) {
    next(error);
  }
};

routes['/board/info/:boardId/update'] = async (req, res) => {
  const session = await apiAxios
    .get('/api/user/info', { headers: { Cookie: cookieToString(req.cookies) } })
    .then(res => res.data);

  if (!BOARD_WRITABLE.includes(session.user?.role))
    return res.redirect('/');

  generateHtml(req, res, { session });
};

routes['/error'] = (req, res) => {
  res.status(StatusCode[req.query?.status ?? NOT_FOUND]);
  generateHtml(req, res, {});
};

Object.entries(routes).forEach(([path, handler]) => app.get(path, handler));

// Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>
// Response<any, Record<string, any>, number>
app.use((req, res) => res.redirect(`/error?status=${NOT_FOUND}`));

app.use((err, req, res, next) => {
  console.error(err);
  res.redirect(`/error?status=${SERVER_ERROR}`);
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));