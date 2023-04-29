import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { css, Global } from '@emotion/react'
import Loading from './components/common/Loading';
import { ServerProvider } from './utils/preload';
import { createClientRouter } from './utils/reactServerRouter';
import { routes } from './route';
import AppLayout from './layouts/AppLayout';

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

const App = ({ data }) => <>
  <Global styles={styles} />
  <ServerProvider value={data}>
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          {createClientRouter(routes)}
        </Route>
      </Routes>
    </Suspense>
  </ServerProvider>
</>;

export default App;