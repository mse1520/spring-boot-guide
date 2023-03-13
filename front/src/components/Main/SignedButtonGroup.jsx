import React from 'react';
import styled from 'styled-components';
import { DefaultButton } from '../../styles/button';

const Wrap = styled.div`
display: flex;
align-items: center;
gap: .5rem;
`;

const SignedButtonGroup = ({ name, onClick }) => {
  return <>
    <Wrap>
      <div>{name}님 환영합니다.</div>
      <DefaultButton onClick={onClick}>로그아웃</DefaultButton>
    </Wrap>
  </>;
};

export default SignedButtonGroup;