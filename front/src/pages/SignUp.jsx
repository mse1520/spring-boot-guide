import React, { useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import { Card } from '../styles/box';
import { DefaultButton } from '../styles/button';
import { DefaultInput } from '../styles/input';
import { postApi } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Article = styled.article`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
`;
const StyledCard = styled(Card)`
display: flex;
justify-content: space-between;
flex-direction: column;
width: 30rem;
margin: 0 .5rem;
min-height: 20rem;
border: .1rem solid dimgray;
box-shadow: 0 1rem 2rem rgba(0, 0, 0, .5);
`;
const H2 = styled.h2`
text-align: center;
`;
const InputWrap = styled.div`
margin: 1rem 0;
`;
const Label = styled.label`
display: block;
font-size: larger;
font-weight: bolder;
margin-bottom: .5rem;
`;
const ButtonWrap = styled.div`
display: flex;
justify-content: end;
`;

const SignUp = () => {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const onSubmit = useCallback(e => {
    e.preventDefault();

    const param = {
      username: usernameRef.current.value,
      password: passwordRef.current.value
    };

    postApi('/api/user/sign-up', param)
      .then(data => alert(data.message))
      .then(() => navigate('/sign-in'))
      .catch(err => err.message ? alert(err.message) : console.error(err));
  }, []);

  return <>
    <Article>
      <form onSubmit={onSubmit}>
        <StyledCard>
          <div>
            <H2>회원가입</H2>
            <InputWrap>
              <Label htmlFor='username'>아이디</Label>
              <DefaultInput ref={usernameRef} id='username' />
            </InputWrap>
            <InputWrap>
              <Label htmlFor='password'>비밀번호</Label>
              <DefaultInput ref={passwordRef} id='password' type='password' />
            </InputWrap>
          </div>
          <ButtonWrap>
            <DefaultButton>회원 가입</DefaultButton>
          </ButtonWrap>
        </StyledCard>
      </form>
    </Article>
  </>;
};

export default SignUp;