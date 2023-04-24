import React, { lazy, Suspense } from 'react';
import { Outlet, Route, Routes, useParams } from 'react-router-dom';
import { css, Global } from '@emotion/react'
import Loading from './components/common/Loading';
import { SWRConfig } from 'swr';
import { getServerData } from './utils/preload';

const Main = lazy(() => import(/* webpackChunkName: 'Main' */ './layouts/Main'));
const Home = lazy(() => import(/* webpackChunkName: 'Home' */ './pages/Home'));
const BoardList = lazy(() => import(/* webpackChunkName: 'BoardList' */ './pages/BoardList'));
const BoardWrite = lazy(() => import(/* webpackChunkName: 'BoardWrite' */ './pages/BoardWrite'));
const BoardInfo = lazy(() => import(/* webpackChunkName: 'BoardInfo' */ './pages/BoardInfo'));
const BoardUpdate = lazy(() => import(/* webpackChunkName: 'BoardUpdate' */ './pages/BoardUpdate'));
const SignIn = lazy(() => import(/* webpackChunkName: 'SignIn' */ './pages/SignIn'));
const SignUp = lazy(() => import(/* webpackChunkName: 'SignUp' */ './pages/SignUp'));
const NotFound = lazy(() => import(/* webpackChunkName: 'NotFound' */ './pages/NotFound'));

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

const AppLayout = ({ data }) => {
  const { boardId } = useParams();

  // console.log(boardId)

  return <>
    <SWRConfig value={{
      fallback: {
        '/api/user/info': data?.session ?? getServerData().session,
      }
    }}>
      <Outlet />
    </SWRConfig>
  </>;
};

const App = ({ data }) => {
  return <>
    <Global styles={styles} />
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<AppLayout data={data} />}>
          <Route path='/' element={<Main />}>
            <Route path='/' element={<Home />} />
            <Route path='/board/list' element={<BoardList />} />
            <Route path='/board/write' element={<BoardWrite />} />
            <Route path='/board/info/:boardId' element={<BoardInfo />} />
            <Route path='/board/info/:boardId/update' element={<BoardUpdate />} />
          </Route>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/404' element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  </>;
};

export default App;