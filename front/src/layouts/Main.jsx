import React, { Suspense, useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import Loading from '../components/common/Loading';
import MenuImg from '../components/common/MenuImg';
import SideMenu from '../components/Main/SideMenu';
import SignedButtonGroup from '../components/Main/SignedButtonGroup';
import UnsignedButtonGroup from '../components/Main/UnSignedButtonGroup';
import { postApi } from '../utils/api';
import useSWR from 'swr';
import { userFetcher } from '../fetcher';

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

const Main = () => {
  const { data, isLoading, mutate } = useSWR('/api/user/info', userFetcher);
  const [menuActive, setMenuActive] = useState(true);

  const onClickSignOut = useCallback(() => postApi('/api/user/sign-out').then(() => mutate()), []);

  const onClickMenu = useCallback(() => setMenuActive(!menuActive), [menuActive]);

  return <>
    <Aticle>
      <Header>
        <MenuImg onClick={onClickMenu} />
        <ButtonGroup>
          {data?.user
            ? <SignedButtonGroup name={data.user.name} onClick={onClickSignOut} />
            : <UnsignedButtonGroup signInTo='sign-in' signUpTo='sign-up' />}
        </ButtonGroup>
      </Header>
      <Section>
        <SideMenu links={data?.menuList ?? []} active={menuActive} />
        <ContentWrap>
          <Content>
            {/* <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense> */}
          </Content>
        </ContentWrap>
      </Section>
    </Aticle>
  </>;
};

export default Main;