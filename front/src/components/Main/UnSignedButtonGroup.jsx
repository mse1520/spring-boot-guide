import React from 'react';
import styled from 'styled-components';
import { DefaultLink } from '../../styles/button';

const StyledLink = styled(DefaultLink)`
margin: 0 .2rem;
`;

const UnsignedButtonGroup = ({ signInTo, signUpTo }) => {
  return <>
    <StyledLink to={signInTo}>로그인</StyledLink>
    <StyledLink to={signUpTo}>회원가입</StyledLink>
  </>;
};

export default UnsignedButtonGroup;