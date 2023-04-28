import React, { Suspense, useMemo } from 'react';
import { Outlet, Route, Routes, useMatch, useParams } from 'react-router-dom';
import { css, Global } from '@emotion/react'
import Loading from './components/common/Loading';
import { SWRConfig } from 'swr';
import { ServerProvider, useServerData } from './utils/preload';
import { createRouter } from './route';

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

const AppLayout = () => {
  const data = useServerData();
  const { boardId } = useParams();
  const boardDetailMatch = useMatch('/board/info/:boardId');

  // `/api/board/info/${boardId}`
  // console.log(boardId)
  console.log(boardDetailMatch)
  // console.log(data)

  const fallback = useMemo(() => {
    const result = {};
    result['/api/user/info'] = data?.session;
    return result;
  }, []);

  return <>
    <SWRConfig value={{ fallback }}>
      <Outlet />
    </SWRConfig>
  </>;
};

const App = ({ data }) => <>
  <Global styles={styles} />
  <ServerProvider value={data}>
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          {createRouter()}
        </Route>
      </Routes>
    </Suspense>
  </ServerProvider>
</>;

export default App;