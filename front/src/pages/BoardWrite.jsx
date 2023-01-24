import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import Textarea from '../components/common/Textarea';
import { DefaultButton } from '../styles/button';
import { DefaultInput } from '../styles/input';
import { postApi } from '../utils/Api';

const Header = styled.header`
display: flex;
justify-content: space-between;
align-items: center;
border-bottom: .1rem solid dimgray;
margin-bottom: 1rem;
`;
const StyledTextarea = styled(Textarea)`
min-height: 20rem;
margin: 1rem 0;
`;

const BoardWrite = () => {
  const titleRef = useRef();
  const contentRef = useRef();

  const onClickCreate = useCallback(() => {
    postApi('/api/board/write', {
      title: titleRef.current.value,
      content: contentRef.current.innerText
    })
      .then(v => alert(v.message))
      .catch(err => err?.message ? alert(err.message) : console.error(err));
  }, []);

  return <>
    <Header>
      <h2>게시글 작성</h2>
      <DefaultButton onClick={onClickCreate}>등록</DefaultButton>
    </Header>
    <DefaultInput ref={titleRef} placeholder='제목을 입력하세요.' />
    <StyledTextarea ref={contentRef} placeholder='내용을 입력하세요.' />
  </>;
};

export default BoardWrite;