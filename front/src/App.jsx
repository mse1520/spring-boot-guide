
import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Loading from './components/Loading';

import Main from './layouts/Main';
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
    path: '/board/info/:boardId',
    element: <BoardDetail />
  }]
}, {
  path: '/sign-up',
  element: <SignUp />
}, {
  path: '/sign-in',
  element: <SignIn />
}]);

const App = () => {
  return <>
    <GlobalStyle />
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  </>;
};

export default App;