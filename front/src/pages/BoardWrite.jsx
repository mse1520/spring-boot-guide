import React, { useCallback, useRef, useState } from 'react';
import styled from '@emotion/styled';
import Textarea from '../components/common/Textarea';
import { DefaultButton } from '../styles/button';
import { DefaultInput } from '../styles/input';
import { userFetcher } from '../utils/fetcher';
import useSWR from 'swr';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

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

const BoardWrite = () => {
  const { data: session } = useSWR('/api/user/info', userFetcher);
  const [disabled, setDisabled] = useState(false);
  const titleRef = useRef();
  const contentRef = useRef();

  const onClick = useCallback(e => {
    setDisabled(true);

    const data = {
      title: titleRef.current.value,
      content: contentRef.current.innerText
    };

    axios.post('/api/board/write', data)
      .then(res => res.data)
      .then(data => alert(data.message))
      .catch(err => err.response.data?.message ? alert(err.response.data.message) : console.error(err))
      .finally(() => setDisabled(false));
  }, []);

  if (!AUTH_LIST.includes(session.user?.role))
    return <Navigate to='/' replace={true} />;

  return <>
    <Header>
      <h2>게시글 작성</h2>
      <DefaultButton onClick={onClick} disabled={disabled}>등록</DefaultButton>
    </Header>
    <DefaultInput ref={titleRef} placeholder='제목을 입력하세요.' />
    <StyledTextarea ref={contentRef} placeholder='내용을 입력하세요.' />
  </>;
};

export default BoardWrite;