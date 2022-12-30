import React from 'react';
import styled from 'styled-components';
import { DefaultLink } from '../styles/defaultButtons';

const StyledLink = styled(DefaultLink)`
margin: 0 .2rem;
`;

const UnsignedButtonGroup = () => {
  return <>
    <StyledLink to='sign-in'>로그인</StyledLink>
    <StyledLink to='sign-up'>회원가입</StyledLink>
  </>;
};

export default UnsignedButtonGroup;