import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { DefaultButton } from '../styles/defaultButtons';
import { DefaultInput, DefaultTextarea } from '../styles/defaultInputs';
import { postMessageApi } from '../utils/Api';

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

const BoardWrite = () => {
  const titleRef = useRef();
  const contentRef = useRef();

  const onClickCreate = useCallback(() => {
    postMessageApi('/api/board/write', {
      title: titleRef.current.value,
      content: contentRef.current.innerText
    })
      .then(console.log)
      .catch(console.error);
  }, []);

  return <>
    <Article>
      <Header>
        <h2>게시글 작성</h2>
        <DefaultButton onClick={onClickCreate}>등록</DefaultButton>
      </Header>
      <DefaultInput ref={titleRef} placeholder='제목을 입력하세요.' />
      <DefaultTextarea ref={contentRef} placeholder='내용을 입력하세요.' contentEditable />
    </Article>
  </>;
};

export default BoardWrite;