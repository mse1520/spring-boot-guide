import React, { Suspense, useCallback, useMemo } from 'react';
import { Outlet, redirect, useLoaderData, useSubmit } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../components/common/Loading';
import SideMenu from '../components/Main/SideMenu';
import SignedButtonGroup from '../components/Main/SignedButtonGroup';
import UnsignedButtonGroup from '../components/Main/UnSignedButtonGroup';
import { getApi, postApi } from '../utils/Api';

const Aticle = styled.article`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
`;
const Section = styled.section`
display: flex;
flex: 1;
overflow: hidden;
`;
const ContentWrap = styled.section`
flex: 1;
padding: 1rem;
overflow: auto;
`;
const Content = styled.article`
@media (min-width: 80rem) {
  & {
    max-width: 80rem;
    margin: auto;
  }
}`;
const Header = styled.header`
display: flex;
justify-content: end;
padding: .5rem;
background-color: rgb(50, 50, 50);
align-items: baseline;
`;

export const loader = ({ request }) => {
  const url = new URL(request.url);
  return url.pathname === '/' ? redirect('/home') : Promise.all([getApi('/api/menu'), getApi('/api/user/info')]);
};

export const action = () => postApi('/api/user/sign-out');

const Main = () => {
  const [menu, user] = useLoaderData();
  const submit = useSubmit();

  const onClickSignOut = useCallback(() => submit(null, { method: 'post', action: '/' }), []);

  const signedInfo = useMemo(() => user
    ? <SignedButtonGroup name={user.name} onClick={onClickSignOut} />
    : <UnsignedButtonGroup signInTo='sign-in' signUpTo='sign-up' />, [user]);

  return <>
    <Aticle>
      <Header>{signedInfo}</Header>
      <Section>
        <SideMenu links={menu} />
        <ContentWrap>
          <Content>
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </Content>
        </ContentWrap>
      </Section>
    </Aticle>
  </>;
};

export default Main;