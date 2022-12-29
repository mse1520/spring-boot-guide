import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { postApi } from '../utils/Api';

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

const SignUp = () => {
  const nameRef = useRef();
  const passwordRef = useRef();

  const onClickButton = useCallback(() => {
    postApi('/api/user/sign-up', { name: nameRef.current.value, password: passwordRef.current.value })
      .then(console.log)
      .catch(console.error);
  }, []);

  return <>
    <section>
      <Label htmlFor='name'>아이디</Label>
      <Input id='name' ref={nameRef} />
      <Label htmlFor='password'>비밀번호</Label>
      <Input id='password' type='password' ref={passwordRef} />
      <Button onClick={onClickButton}>회원 가입</Button>
    </section>
  </>;
};

export default SignUp;