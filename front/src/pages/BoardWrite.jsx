import React from 'react';
import styled from 'styled-components';
import { DefaultButton } from '../styles/defaultButtons';

const Article = styled.article`
@media (min-width: 80rem) {
  & {
    max-width: 80rem;
    margin: auto;
  }
}`;
const Header = styled.header`
display: flex;
justify-content: space-between;
align-items: center;
border-bottom: .1rem solid dimgray;
`;
const Input = styled.input`
display: block;
width: 100%;
box-sizing: border-box;
border: none;
padding: .5rem;
border-radius: .5rem;
font-size: medium;
margin: 1rem 0;
background-color: whitesmoke;
`;
const Textarea = styled.div`
background-color: whitesmoke;
color: rgb(30, 30, 30);
width: 100%;
box-sizing: border-box;
padding: .5rem;
border-radius: .5rem;
font-size: medium;
margin: 1rem 0;
min-height: 20rem;
&[placeholder]:empty:before {
  content: attr(placeholder);
  color: dimgray;
}`;

const BoardWrite = () => {
  return <>
    <Article>
      <Header>
        <h2>게시글 작성</h2>
        <DefaultButton>등록</DefaultButton>
      </Header>
      <Input placeholder='제목을 입력하세요.' />
      <Textarea placeholder='내용을 입력하세요.' contentEditable />
    </Article>
  </>;
};

export default BoardWrite;