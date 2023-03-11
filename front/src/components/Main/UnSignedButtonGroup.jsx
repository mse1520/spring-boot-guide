import React from 'react';
import styled from 'styled-components';
import { DefaultLink } from '../../styles/button';

const StyledLink = styled(DefaultLink)`
margin-right: .5rem;
`;

const UnsignedButtonGroup = ({ signInTo, signUpTo }) => {
  return <>
    <StyledLink to={signInTo}>로그인</StyledLink>
    <DefaultLink to={signUpTo}>회원가입</DefaultLink>
  </>;
};

export default UnsignedButtonGroup;