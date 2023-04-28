import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const Main = lazy(() => import(/* webpackChunkName: 'Main' */ './layouts/Main'));
const Home = lazy(() => import(/* webpackChunkName: 'Home' */ './pages/Home'));
const BoardList = lazy(() => import(/* webpackChunkName: 'BoardList' */ './pages/BoardList'));
const BoardWrite = lazy(() => import(/* webpackChunkName: 'BoardWrite' */ './pages/BoardWrite'));
const BoardInfo = lazy(() => import(/* webpackChunkName: 'BoardInfo' */ './pages/BoardInfo'));
const BoardUpdate = lazy(() => import(/* webpackChunkName: 'BoardUpdate' */ './pages/BoardUpdate'));
const SignIn = lazy(() => import(/* webpackChunkName: 'SignIn' */ './pages/SignIn'));
const SignUp = lazy(() => import(/* webpackChunkName: 'SignUp' */ './pages/SignUp'));
const NotFound = lazy(() => import(/* webpackChunkName: 'NotFound' */ './pages/NotFound'));

const routes = [
  {
    path: '/',
    element: <Main />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/board/list', element: <BoardList /> },
      { path: '/board/write', element: <BoardWrite /> },
      { path: '/board/info/:boardId', element: <BoardInfo /> },
      { path: '/board/info/:boardId/update', element: <BoardUpdate /> },
    ]
  },
  { path: '/sign-in', element: <SignIn /> },
  { path: '/sign-up', element: <SignUp /> },
  { path: '/not-found', element: <NotFound /> },
];

export const createRouter = () => {
  const recur = routes => routes.map(route =>
    <Route key={route.path} path={route.path} element={route.element}>
      {route?.children ? recur(route.children) : undefined}
    </Route>);

  return recur(routes);
};

/**
 * 등록된 라우트의 모든 경로를 반환합니다
 * @returns {string[]} 모든경로 배열
 */
export const getPaths = () => {
  const recur = routes => routes
    .map(route => route?.children
      ? recur(route.children).map(path => `${route.path}/${path}`)
      : route.path)
    .flat(Infinity)
    .map(path => path.replace(/\/{2,}/g, '/'));

  return recur(routes);
};