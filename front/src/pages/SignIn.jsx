import React, { useCallback, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { DefaultButton } from '../styles/defaultButtons';
import { postMessageApi } from '../utils/Api';

const Form = styled.form`
display: flex;
justify-content: space-between;
flex-direction: column;
background-color: dimgray;
padding: 1rem;
border-radius: 1rem;
width: 30rem;
margin: 0 .5rem;
min-height: 20rem;
box-shadow: 0 1rem 5rem .1rem rgba(250, 250, 250, .1), 0 1rem 3rem .05rem rgba(250, 250, 250, .1);
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
const Input = styled.input`
display: block;
width: 100%;
box-sizing: border-box;
padding: .5rem;
border-radius: .5rem;
border: none;
font-size: medium;
`;
const ButtonWrap = styled.div`
display: flex;
justify-content: end;
`;
const Button = styled(DefaultButton)`
font-size: medium;
`;

const SignIn = () => {
  const [user, setUser] = useState();
  const nameRef = useRef();
  const passwordRef = useRef();

  const onClickButton = useCallback(e => {
    e.preventDefault();

    postMessageApi('/api/user/sign-in', {
      name: nameRef.current.value,
      password: passwordRef.current.value
    })
      .then(data => (alert(data.message), data.body))
      .then(setUser)
      .catch(data => alert(data.message));
  }, []);

  if (user) return <Navigate to='/' replace={true} />

  return <>
    <Form onSubmit={onClickButton}>
      <div>
        <InputWrap>
          <Label htmlFor='name'>아이디</Label>
          <Input id='name' ref={nameRef} />
        </InputWrap>
        <InputWrap>
          <Label htmlFor='password'>비밀번호</Label>
          <Input id='password' type='password' ref={passwordRef} />
        </InputWrap>
      </div>
      <ButtonWrap>
        <Button>로그인</Button>
      </ButtonWrap>
    </Form>
  </>;
};

export default SignIn;