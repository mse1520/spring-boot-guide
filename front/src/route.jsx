import React, { lazy } from 'react';

const Main = lazy(() => import(/* webpackChunkName: 'Main' */ './layouts/Main'));
const Home = lazy(() => import(/* webpackChunkName: 'Home' */ './pages/Home'));
const BoardWrite = lazy(() => import(/* webpackChunkName: 'BoardWrite' */ './pages/BoardWrite'));
const BoardInfo = lazy(() => import(/* webpackChunkName: 'BoardInfo' */ './pages/BoardInfo'));
const BoardDetail = lazy(() => import(/* webpackChunkName: 'BoardDetail' */ './pages/BoardDetail'));
const BoardUpdate = lazy(() => import(/* webpackChunkName: 'BoardUpdate' */ './pages/BoardUpdate'));
const SignIn = lazy(() => import(/* webpackChunkName: 'SignIn' */ './pages/SignIn'));
const SignUp = lazy(() => import(/* webpackChunkName: 'SignUp' */ './pages/SignUp'));
const Error = lazy(() => import(/* webpackChunkName: 'Error' */ './pages/Error'));

export const routes = [
  {
    path: '/',
    element: <Main />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/board/write', element: <BoardWrite /> },
      { path: '/board/info', element: <BoardInfo /> },
      { path: '/board/info/:boardId', element: <BoardDetail /> },
      { path: '/board/info/:boardId/update', element: <BoardUpdate /> },
    ]
  },
  { path: '/sign-in', element: <SignIn /> },
  { path: '/sign-up', element: <SignUp /> },
  { path: '/error', element: <Error /> },
];