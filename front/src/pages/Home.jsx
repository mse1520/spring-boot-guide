import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { DefaultButton, DefaultLink } from '../styles/defaultButtons';
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
const Nav = styled.nav`
background-color: darkgray;
width: 20rem;
`;
const Content = styled.section`
flex: 1;
`;
const Header = styled.header`
display: flex;
justify-content: end;
padding: .5rem;
background-color: dimgray;
align-items: baseline;
`;
const Message = styled.div`
margin: 0 .2rem;
`;
const Button = styled(DefaultButton)`
margin: 0 .2rem;
`;
const StyledLink = styled(DefaultLink)`
margin: 0 .2rem;
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
    ? <>
      <Message>{user.name}님 환영합니다.</Message>
      <Button onClick={onClickSignOut}>로그아웃</Button>
    </>
    : <>
      <StyledLink to='sign-in'>로그인</StyledLink>
      <StyledLink to='sign-up'>회원가입</StyledLink>
    </>, [user]);

  return <>
    <Aticle>
      <Header>{signedInfo}</Header>
      <Section>
        <Nav>
          네비게이션 바
        </Nav>
        <Content>
          콘텐츠
        </Content>
      </Section>
    </Aticle>
  </>;
};

export default Home;