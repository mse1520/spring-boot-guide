import React, { useCallback, useRef } from 'react';
import { redirect, useFetcher, useLoaderData, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import Textarea from '../components/common/Textarea';
import { DefaultButton } from '../styles/button';
import { DefaultInput } from '../styles/input';
import { getApi, putApi } from '../utils/api';

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

export const loader = ({ params }) => Promise
  .all([
    getApi('/api/user/info'),
    getApi(`/api/board/info/${params.boardId}`)])
  .then(([{ user }, { body }]) => AUTH_LIST.includes(user?.role) ? { board: body } : redirect(`/board/info/${params.boardId}`));

export const action = ({ request, params }) => request.formData()
  .then(form => Object.fromEntries(form))
  .then(data => putApi(`/api/board/info/${params.boardId}/update`, data))
  .then(data => alert(data.message))
  .then(() => redirect(`/board/info/${params.boardId}`))
  .catch(err => {
    console.error(err);
    if (err?.message) alert(err.message);
    return { ok: true };
  });

const BoardUpdate = () => {
  const { boardId } = useParams();
  const { board } = useLoaderData();
  const fetcher = useFetcher();
  const titleRef = useRef();
  const contentRef = useRef();

  const onClick = useCallback(e => {
    const data = {
      title: titleRef.current.value,
      content: contentRef.current.innerText
    };
    fetcher.submit(data, { method: 'post', action: `/board/info/${boardId}/update` });
  }, []);

  return <>
    <Header>
      <h2>게시글 수정</h2>
      <DefaultButton onClick={onClick} disabled={fetcher.state !== 'idle'}>등록</DefaultButton>
    </Header>
    <DefaultInput ref={titleRef} placeholder='제목을 입력하세요.' defaultValue={board.title} />
    <StyledTextarea ref={contentRef} placeholder='내용을 입력하세요.'>{board.content}</StyledTextarea>
  </>;
};

export default BoardUpdate;