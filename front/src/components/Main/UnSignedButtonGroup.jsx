import React from 'react';
import styled from '@emotion/styled';
import { DefaultLink } from '../../styles/button';

const Wrap = styled.div`
display: flex;
gap: .5rem;
`;

const UnsignedButtonGroup = ({ signInTo, signUpTo }) => {
  return <>
    <Wrap>
      <DefaultLink to={signInTo}>로그인</DefaultLink>
      <DefaultLink to={signUpTo}>회원가입</DefaultLink>
    </Wrap>
  </>;
};

export default UnsignedButtonGroup;