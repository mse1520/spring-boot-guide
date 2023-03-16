import React from 'react';
import { Form, redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Card } from '../styles/box';
import { DefaultButton } from '../styles/button';
import { DefaultInput } from '../styles/input';
import { postApi } from '../utils/Api';

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

export const action = ({ request }) => request.formData()
  .then(form => Object.fromEntries(form))
  .then(data => postApi('/api/user/sign-up', data))
  .then(data => alert(data.message))
  .then(() => redirect('/sign-in'))
  .catch(err => (alert(err.message), { ok: true }));

const SignUp = () => <>
  <Aticle>
    <Form method='post' action='/sign-up'>
      <StyledCard>
        <div>
          <H2>회원가입</H2>
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
          <DefaultButton>회원 가입</DefaultButton>
        </ButtonWrap>
      </StyledCard>
    </Form>
  </Aticle>
</>;

export default SignUp;