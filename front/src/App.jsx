
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

const Home = lazy(() => import(/* webpackChunkName: 'Home' */ './pages/Home'));
const SignIn = lazy(() => import(/* webpackChunkName: 'SignIn' */'./pages/SignIn'));
const SignUp = lazy(() => import(/* webpackChunkName: 'SignUp' */'./pages/SignUp'));

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
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </>;
};

export default App;