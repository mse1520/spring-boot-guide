import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getApi } from '../utils/Api';

const Content = styled.div`
white-space: pre-wrap;
`;

const BoardDetail = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState();

  useEffect(() => {
    getApi(`/api/board/info/${boardId}`)
      .then(v => setBoard(v.body))
      .catch(console.error)
  }, []);

  return <>
    <header>
      <h2>{board?.title}</h2>
    </header>
    <div>{board?.userName}</div>
    <div>{board?.createDateTime}</div>
    <Content>{board?.content}</Content>
  </>;
};

export default BoardDetail;