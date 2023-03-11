import React from 'react';
import styled from 'styled-components';
import { DefaultButton } from '../../styles/button';

const Message = styled.div`
margin-right: .5rem;
`;

const SignedButtonGroup = ({ name, onClick }) => {
  return <>
    <Message>{name}님 환영합니다.</Message>
    <DefaultButton onClick={onClick}>로그아웃</DefaultButton>
  </>;
};

export default SignedButtonGroup;