
import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Loading from './components/common/Loading';
import { action as signUpAction } from './pages/SignUp';
import { action as signInAction, loader as signInLoader } from './pages/SignIn';

import Main, { action as mainAction, loader as mainLoader } from './layouts/Main';
const Home = lazy(() => import(/* webpackChunkName: 'Home' */ './pages/Home'));
const SignIn = lazy(() => import(/* webpackChunkName: 'SignIn' */ './pages/SignIn'));
const SignUp = lazy(() => import(/* webpackChunkName: 'SignUp' */ './pages/SignUp'));
const BoardWrite = lazy(() => import(/* webpackChunkName: 'BoardWrite' */ './pages/BoardWrite'));
const BoardInfo = lazy(() => import(/* webpackChunkName: 'BoardInfo' */ './pages/BoardInfo'));
const BoardDetail = lazy(() => import(/* webpackChunkName: 'BoardDetail' */ './pages/BoardDetail'));

const GlobalStyle = createGlobalStyle`
html, body, #root {
  margin: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(30, 30, 30);
  color: whitesmoke;
  color-scheme: dark;
}
input {
  color: rgb(30, 30, 30);
}
button {
  cursor: pointer;
}`;

const router = createBrowserRouter([{
  path: '/',
  element: <Main />,
  loader: mainLoader,
  action: mainAction,
  children: [{
    path: '/home',
    element: <Home />
  }, {
    path: '/board/write',
    element: <BoardWrite />
  }, {
    path: '/board/info',
    element: <BoardInfo />
  }, {
    path: '/board/:boardId/info',
    element: <BoardDetail />
  }]
}, {
  path: '/sign-up',
  element: <SignUp />,
  action: signUpAction
}, {
  path: '/sign-in',
  element: <SignIn />,
  loader: signInLoader,
  action: signInAction
}]);

const App = () => <>
  <GlobalStyle />
  <Suspense fallback={<Loading />}>
    <RouterProvider router={router} />
  </Suspense>
</>;

export default App;