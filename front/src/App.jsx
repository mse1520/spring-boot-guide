import React, { Suspense } from 'react';
import { Outlet, Route, Routes, useParams } from 'react-router-dom';
import { css, Global } from '@emotion/react'
import Loading from './components/common/Loading';
import { SWRConfig } from 'swr';
import { getServerData } from './utils/preload';
import { createRouter, routes } from './route';

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
          {createRouter(routes)}
        </Route>
      </Routes>
    </Suspense>
  </>;
};

export default App;