import React from 'react';
import { Form, redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Card } from '../styles/box';
import { DefaultButton } from '../styles/button';
import { DefaultInput } from '../styles/input';
import { getApi, postApi } from '../utils/Api';

const Aticle = styled.article`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
`;
const StyledCard = styled(Card)`
display: flex;
justify-content: space-between;
flex-direction: column;
width: 30rem;
margin: 0 .5rem;
min-height: 20rem;
border: .1rem solid dimgray;
box-shadow: 0 1rem 2rem rgba(0, 0, 0, .5);
`;
const H2 = styled.h2`
text-align: center;
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
const ButtonWrap = styled.div`
display: flex;
justify-content: end;
`;

export const loader = () => getApi('/api/user/info').then(user => user ? redirect('/') : null);

export const action = ({ request }) => request.formData()
  .then(form => postApi('/api/user/sign-in', form))
  .then(data => alert(data.message))
  .catch(err => alert(err.message))
  .then(() => null);

const SignIn = () => <>
  <Aticle>
    <Form method='post' action='/sign-in'>
      <StyledCard>
        <div>
          <H2>로그인</H2>
          <InputWrap>
            <Label htmlFor='name'>아이디</Label>
            <DefaultInput id='name' name='name' />
          </InputWrap>
          <InputWrap>
            <Label htmlFor='password'>비밀번호</Label>
            <DefaultInput id='password' name='password' type='password' />
          </InputWrap>
        </div>
        <ButtonWrap>
          <DefaultButton>로그인</DefaultButton>
        </ButtonWrap>
      </StyledCard>
    </Form>
  </Aticle>
</>;

export default SignIn;