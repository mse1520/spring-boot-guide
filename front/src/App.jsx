import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { css, Global } from '@emotion/react'
import Loading from './components/common/Loading';
import { SWRConfig } from 'swr';
import { getKey as boardListKey } from './pages/BoardList';

const Main = lazy(() => import(/* webpackChunkName: 'Main' */ './layouts/Main'));
const Home = lazy(() => import(/* webpackChunkName: 'Home' */ './pages/Home'));
const BoardList = lazy(() => import(/* webpackChunkName: 'BoardList' */ './pages/BoardList'));
const SignIn = lazy(() => import(/* webpackChunkName: 'SignIn' */ './pages/SignIn'));
const SignUp = lazy(() => import(/* webpackChunkName: 'SignUp' */ './pages/SignUp'));

const styles = css`
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
}
a {
  color: inherit;
  text-decoration-line: none;
}`;

const getServerData = () => JSON.parse(document.querySelector('#preload-data').value);

const App = ({ data }) => <>
  <Global styles={styles} />
  <SWRConfig value={{
    fallback: {
      '/api/user/info': data?.session ?? getServerData().session,
      [boardListKey]: null
    }
  }}>
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<Main />}>
          <Route path='/' element={<Home />} />
          <Route path='/board/list' element={<BoardList />} />
        </Route>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </Suspense>
  </SWRConfig>
</>;

export default App;

// import React, { lazy, Suspense } from 'react';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { createGlobalStyle } from 'styled-components';
// import Loading from './components/common/Loading';
// import { action as signUpAction } from './pages/SignUp';
// import { action as signInAction, loader as signInLoader } from './pages/SignIn';

// import Main, { action as mainAction, loader as mainLoader } from './layouts/Main';
// import { loader as boardInfoLoader } from './pages/BoardInfo';
// import { action as boardWriteAction, loader as boardWriteLoader } from './pages/BoardWrite';
// import { action as boardUpdateAction, loader as boardUpdateLoader } from './pages/BoardUpdate';
// const Error = lazy(() => import(/* webpackChunkName: 'Error' */ './pages/Error'));
// const Home = lazy(() => import(/* webpackChunkName: 'Home' */ './pages/Home'));
// const SignIn = lazy(() => import(/* webpackChunkName: 'SignIn' */ './pages/SignIn'));
// const SignUp = lazy(() => import(/* webpackChunkName: 'SignUp' */ './pages/SignUp'));
// const BoardWrite = lazy(() => import(/* webpackChunkName: 'BoardWrite' */ './pages/BoardWrite'));
// const BoardList = lazy(() => import(/* webpackChunkName: 'BoardList' */ './pages/BoardList'));
// const BoardInfo = lazy(() => import(/* webpackChunkName: 'BoardInfo' */ './pages/BoardInfo'));
// const BoardUpdate = lazy(() => import(/* webpackChunkName: 'BoardUpdate' */ './pages/BoardUpdate'));

// const GlobalStyle = createGlobalStyle`
// html, body, #root {
//   margin: 0;
//   width: 100vw;
//   height: 100vh;
//   background-color: rgb(30, 30, 30);
//   color: whitesmoke;
//   color-scheme: dark;
// }
// input {
//   color: rgb(30, 30, 30);
// }
// button {
//   cursor: pointer;
// }
// a {
//   color: inherit;
//   text-decoration-line: none;
// }`;

// const router = createBrowserRouter([{
//   path: '/',
//   element: <Main />,
//   loader: mainLoader,
//   action: mainAction,
//   children: [{
//     index: true,
//     element: <Home />
//   }, {
//     path: '/board/write',
//     element: <BoardWrite />,
//     loader: boardWriteLoader,
//     action: boardWriteAction
//   }, {
//     path: '/board/list',
//     element: <BoardList />
//   }, {
//     path: '/board/info/:boardId',
//     element: <BoardInfo />,
//     errorElement: <Error />,
//     loader: boardInfoLoader
//   }, {
//     path: '/board/info/:boardId/update',
//     element: <BoardUpdate />,
//     loader: boardUpdateLoader,
//     action: boardUpdateAction
//   }]
// }, {
//   path: '/sign-up',
//   element: <SignUp />,
//   action: signUpAction
// }, {
//   path: '/sign-in',
//   element: <SignIn />,
//   loader: signInLoader,
//   action: signInAction
// }]);

// const App = () => <>
//   <GlobalStyle />
//   <Suspense fallback={<Loading />}>
//     <RouterProvider router={router} />
//   </Suspense>
// </>;

// export default App;