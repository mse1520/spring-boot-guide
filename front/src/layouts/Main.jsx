import React, { Suspense, useCallback, useState } from 'react';
import { Outlet, useFetcher, useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../components/common/Loading';
import MenuImg from '../components/common/MenuImg';
import SideMenu from '../components/Main/SideMenu';
import SignedButtonGroup from '../components/Main/SignedButtonGroup';
import UnsignedButtonGroup from '../components/Main/UnSignedButtonGroup';
import { getApi, postApi } from '../utils/api';

const Aticle = styled.article`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
`;
const Header = styled.header`
display: flex;
justify-content: space-between;
padding: .5rem 1rem;
background-color: rgb(50, 50, 50);
align-items: center;
`;
const ButtonGroup = styled.div`
display: flex;
align-items: baseline;
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

export const loader = () => getApi('/api/user/info');
export const action = () => postApi('/api/user/sign-out');

const Main = () => {
  const { user, menuList } = useLoaderData();
  const fetcher = useFetcher();
  const [menuActive, setMenuActive] = useState(true);

  const onClickSignOut = useCallback(() => fetcher.submit(null, { method: 'post', action: '/' }), []);

  const onClickMenu = useCallback(() => setMenuActive(!menuActive), [menuActive]);

  return <>
    <Aticle>
      <Header>
        <MenuImg onClick={onClickMenu} />
        <ButtonGroup>
          {user
            ? <SignedButtonGroup name={user.name} onClick={onClickSignOut} />
            : <UnsignedButtonGroup signInTo='sign-in' signUpTo='sign-up' />}
        </ButtonGroup>
      </Header>
      <Section>
        <SideMenu links={menuList} active={menuActive} />
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