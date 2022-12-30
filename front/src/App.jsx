
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Loading from './components/Loading';

const Home = lazy(() => import(/* webpackChunkName: 'Home' */ './pages/Home'));
const SignIn = lazy(() => import(/* webpackChunkName: 'SignIn' */'./pages/SignIn'));
const SignUp = lazy(() => import(/* webpackChunkName: 'SignUp' */'./pages/SignUp'));
const Board = lazy(() => import(/* webpackChunkName: 'Board' */ './pages/Board'));

const GlobalStyle = createGlobalStyle`
html, body, #root {
  margin: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(20, 20, 20);
  color: whitesmoke;
}
#root {
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  cursor: pointer;
}`;

const App = () => {
  return <>
    <GlobalStyle />
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path='/board' element={<Board />} />
          </Route>
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </>;
};

export default App;