import path from 'path';
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import Document from '../Document';
import { createProxyMiddleware } from 'http-proxy-middleware';
import axios from 'axios';
import { routes } from '../route';
import { BOARD_WRITABLE } from '../utils/auth';
import { cookieToString } from '../utils';
import { NOT_FOUND, SERVER_ERROR, StatusCode } from './statusCode';
import { createServerRouter } from '../utils/reactServerRouter';
import { createLogger } from './logger';

const IS_DEV = process.env.NODE_ENV === 'development';
const COMBINED = `:remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"`;

dotenv.config({ path: IS_DEV ? '.env' : '.env.prod' });
const PORT = process.env.PORT;
const API_SERVER = process.env.API_SERVER;

const app = express();
const { logger, stream } = createLogger(IS_DEV);
const apiAxios = axios.create({ baseURL: API_SERVER });

app.use(morgan(IS_DEV ? 'dev' : COMBINED, { stream }));
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

const router = createServerRouter(routes, async (req, res, next) => {
  try {
    const session = await apiAxios
      .get('/api/user/info', { headers: { Cookie: cookieToString(req.cookies) } })
      .then(res => res.data);

    generateHtml(req, res, { session })
  } catch (error) {
    next(error);
  }
});

router.add('/board/write', async (req, res, next) => {
  try {
    const session = await apiAxios
      .get('/api/user/info', { headers: { Cookie: cookieToString(req.cookies) } })
      .then(res => res.data);

    if (!BOARD_WRITABLE.includes(session.user?.role))
      return res.redirect('/');

    generateHtml(req, res, { session });
  } catch (error) {
    next(error);
  }
});

router.add('/board/info/:boardId', async (req, res, next) => {
  try {
    const sessionApi = apiAxios
      .get('/api/user/info', { headers: { Cookie: cookieToString(req.cookies) } })
      .then(res => res.data);

    const boardApi = apiAxios
      .get(`/api/board/info/${req.params.boardId}`, { headers: { Cookie: cookieToString(req.cookies) } })
      .then(res => res.data.body);

    const [session, board] = await Promise.all([sessionApi, boardApi]);

    generateHtml(req, res, { session, board });
  } catch (error) {
    next(error);
  }
});

router.add('/board/info/:boardId/update', async (req, res) => {
  try {
    const sessionApi = apiAxios
      .get('/api/user/info', { headers: { Cookie: cookieToString(req.cookies) } })
      .then(res => res.data);

    const boardApi = apiAxios
      .get(`/api/board/info/${req.params.boardId}`, { headers: { Cookie: cookieToString(req.cookies) } })
      .then(res => res.data.body);

    const [session, board] = await Promise.all([sessionApi, boardApi]);

    if (!BOARD_WRITABLE.includes(session.user?.role))
      return res.redirect('/');

    generateHtml(req, res, { session, board });
  } catch (error) {
    next(error);
  }
});

router.add('/error', (req, res) => {
  res.status(StatusCode[req.query?.status ?? NOT_FOUND]);
  generateHtml(req, res, {});
});

router.run(app);

app.use((req, res) => res.redirect(`/error?status=${NOT_FOUND}`));

app.use((err, req, res, next) => {
  logger.error(err);
  res.redirect(`/error?status=${SERVER_ERROR}`);
});

app.listen(PORT, () => logger.info(`App listening on port ${PORT}`));