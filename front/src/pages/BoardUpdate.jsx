import React, { useCallback, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import Textarea from '../components/common/Textarea';
import { DefaultButton } from '../styles/button';
import { DefaultInput } from '../styles/input';
import useSWR from 'swr';
import axios from 'axios';
import { boardFetcher, userFetcher } from '../utils/fetcher';
import { BOARD_WRITABLE } from '../utils/auth';

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

const BoardUpdate = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const { data: session } = useSWR('/api/user/info', userFetcher);
  const { data: board } = useSWR(`/api/board/info/${boardId}`, boardFetcher);
  const [disabled, setDisabled] = useState(false);
  const titleRef = useRef();
  const contentRef = useRef();

  const onClick = useCallback(() => {
    setDisabled(true);

    const data = {
      title: titleRef.current.value,
      content: contentRef.current.value
    };

    axios.put(`/api/board/info/${boardId}/update`, data)
      .then(res => res.data)
      .then(data => alert(data.message))
      .then(() => navigate(`/board/info/${boardId}`))
      .catch(err => err.response.data?.message ? alert(err.response.data.message) : console.error(err))
      .finally(() => setDisabled(false));
  }, []);

  if (!BOARD_WRITABLE.includes(session.user?.role))
    return <Navigate to='/' replace={true} />;

  return <>
    <Header>
      <h2>게시글 수정</h2>
      <DefaultButton onClick={onClick} disabled={disabled}>등록</DefaultButton>
    </Header>
    <DefaultInput ref={titleRef} placeholder='제목을 입력하세요.' defaultValue={board?.title} />
    <StyledTextarea ref={contentRef} placeholder='내용을 입력하세요.' value={board?.content} />
  </>;
};

export default BoardUpdate;