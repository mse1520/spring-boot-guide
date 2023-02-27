import React, { Suspense, useCallback, useMemo } from 'react';
import { Outlet, useFetcher, useLoaderData } from 'react-router-dom';
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

export const loader = () => getApi('/api/member/info');
export const action = () => postApi('/api/member/sign-out');

const Main = () => {
  const { member, menuList } = useLoaderData();
  const fetcher = useFetcher();

  const onClickSignOut = useCallback(() => fetcher.submit(null, { method: 'post', action: '/' }), []);

  const signedInfo = useMemo(() => member
    ? <SignedButtonGroup name={member.username} onClick={onClickSignOut} />
    : <UnsignedButtonGroup signInTo='sign-in' signUpTo='sign-up' />, [member]);

  return <>
    <Aticle>
      <Header>{signedInfo}</Header>
      <Section>
        <SideMenu links={menuList} />
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