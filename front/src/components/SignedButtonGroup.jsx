import React from 'react';
import styled from 'styled-components';
import { DefaultButton } from '../styles/button';

const Message = styled.div`
margin: 0 .2rem;
`;
const Button = styled(DefaultButton)`
margin: 0 .2rem;
`;

const SignedButtonGroup = ({ name, onClick }) => {
  return <>
    <Message>{name}님 환영합니다.</Message>
    <Button onClick={onClick}>로그아웃</Button>
  </>;
};

export default SignedButtonGroup;