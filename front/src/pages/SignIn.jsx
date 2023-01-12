import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../components/Loading';
import { DefaultButton } from '../styles/defaultButtons';
import { DefaultInput } from '../styles/defaultInputs';
import { getApi, postMessageApi } from '../utils/Api';

const Aticle = styled.article`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
`;
const Form = styled.form`
display: flex;
justify-content: space-between;
flex-direction: column;
background-color: rgb(39, 39, 39);
padding: 1rem;
border-radius: 1rem;
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

const SignIn = () => {
  const [user, setUser] = useState();
  const nameRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    getApi('/api/user/info').then(setUser).catch(console.error);
  }, []);

  const onSubmitForm = useCallback(e => {
    e.preventDefault();

    postMessageApi('/api/user/sign-in', {
      name: nameRef.current.value,
      password: passwordRef.current.value
    })
      .then(data => (alert(data.message), data.body))
      .then(setUser)
      .catch(data => alert(data.message));
  }, []);

  if (user === undefined) return <Loading />
  if (user) return <Navigate to='/' replace={true} />

  return <>
    <Aticle>
      <Form onSubmit={onSubmitForm}>
        <div>
          <H2>로그인</H2>
          <InputWrap>
            <Label htmlFor='name'>아이디</Label>
            <DefaultInput id='name' ref={nameRef} />
          </InputWrap>
          <InputWrap>
            <Label htmlFor='password'>비밀번호</Label>
            <DefaultInput id='password' type='password' ref={passwordRef} />
          </InputWrap>
        </div>
        <ButtonWrap>
          <DefaultButton>로그인</DefaultButton>
        </ButtonWrap>
      </Form>
    </Aticle>
  </>;
};

export default SignIn;