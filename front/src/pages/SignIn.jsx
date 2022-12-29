import React, { useCallback, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { postMessageApi } from '../utils/Api';

const Label = styled.label`
display: block;
`;
const Input = styled.input`
display: block;
`;
const Button = styled.button`
display: block;
color: rgb(20, 20, 20);
padding: .5rem 1rem;
background-color: powderblue;
border-radius: .5rem;
margin: .5rem 0;
font-weight: bolder;
text-align: center;
`;

const SignIn = () => {
  const [user, setUser] = useState();
  const nameRef = useRef();
  const passwordRef = useRef();

  const onClickButton = useCallback(() => {
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
    <section>
      <Label htmlFor='name'>아이디</Label>
      <Input id='name' ref={nameRef} />
      <Label htmlFor='password'>비밀번호</Label>
      <Input id='password' type='password' ref={passwordRef} />
      <Button onClick={onClickButton}>로그인</Button>
    </section>
  </>;
};

export default SignIn;