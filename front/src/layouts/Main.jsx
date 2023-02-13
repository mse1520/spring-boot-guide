import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
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

const LINKS = [
  { path: '/home', text: '홈' },
  { path: '/board/write', text: '게시글 작성' },
  { path: '/board/info', text: '게시글' },
];

const Main = () => {
  const [user, setUser] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getApi('/api/user/info')
      .then(setUser)
      .then(() => navigate(location.pathname === '/' ? '/home' : location.pathname))
      .catch(console.error);
  }, []);

  const onClickSignOut = useCallback(() => {
    postApi('/api/user/sign-out').then(() => setUser(null)).catch(console.error);
  }, []);

  const signedInfo = useMemo(() => user
    ? <SignedButtonGroup name={user.name} onClick={onClickSignOut} />
    : <UnsignedButtonGroup signInTo='sign-in' signUpTo='sign-up' />, [user]);

  return <>
    <Aticle>
      <Header>{signedInfo}</Header>
      <Section>
        <SideMenu links={LINKS} />
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