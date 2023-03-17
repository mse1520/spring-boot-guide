import React, { useCallback, useRef } from 'react';
import { redirect, useFetcher } from 'react-router-dom';
import styled from 'styled-components';
import Textarea from '../components/common/Textarea';
import { DefaultButton } from '../styles/button';
import { DefaultInput } from '../styles/input';
import { getApi, postApi } from '../utils/api';

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

const AUTH_LIST = ['SUPER', 'ADMIN'];

export const loader = () => getApi('/api/user/info').then(({ user }) => AUTH_LIST.includes(user?.role) ? { ok: true } : redirect('/'));

export const action = ({ request }) => request.formData()
  .then(form => Object.fromEntries(form))
  .then(data => postApi('/api/board/write', data))
  .then(data => alert(data.message))
  .catch(err => err?.message ? alert(err.message) : console.error(err))
  .then(() => ({ ok: true }));


const BoardWrite = () => {
  const fetcher = useFetcher();
  const titleRef = useRef();
  const contentRef = useRef();

  const onClick = useCallback(e => {
    const data = {
      title: titleRef.current.value,
      content: contentRef.current.innerText
    };
    fetcher.submit(data, { method: 'post', action: '/board/write' });
  }, []);

  return <>
    <Header>
      <h2>게시글 작성</h2>
      <DefaultButton onClick={onClick} disabled={fetcher.state !== 'idle'}>등록</DefaultButton>
    </Header>
    <DefaultInput ref={titleRef} placeholder='제목을 입력하세요.' />
    <StyledTextarea ref={contentRef} placeholder='내용을 입력하세요.' />
  </>;
};

export default BoardWrite;