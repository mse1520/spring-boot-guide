import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../components/Loading';
import SideMene from '../components/SideMenu';
import SignedButtonGroup from '../components/SignedButtonGroup';
import UnsignedButtonGroup from '../components/UnSignedButtonGroup';
import { DefaultLink } from '../styles/defaultButtons';
import { deleteApi, getApi } from '../utils/Api';

const Aticle = styled.article`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
`;
const Section = styled.section`
display: flex;
flex: 1;
`;
const Content = styled.section`
flex: 1;
padding: 1rem;
`;
const Header = styled.header`
display: flex;
justify-content: end;
padding: .5rem;
background-color: dimgray;
align-items: baseline;
`;

const Home = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    getApi('/api/user/info').then(setUser).catch(console.error);
  }, []);

  const onClickSignOut = useCallback(() => {
    deleteApi('/api/user/sign-out').then(() => setUser(null)).catch(console.error);
  }, []);

  const signedInfo = useMemo(() => user
    ? <SignedButtonGroup name={user.name} onClick={onClickSignOut} />
    : <UnsignedButtonGroup />, [user]);

  return <>
    <Aticle>
      <Header>{signedInfo}</Header>
      <Section>
        <SideMene />
        <Content>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </Content>
      </Section>
    </Aticle>
  </>;
};

export default Home;