import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from '../styles/box';
import { getApi } from '../utils/Api';

const CardWrap = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
`;
const StyledCard = styled(Card)`
margin: .5rem;
box-sizing: border-box;
min-width: 19rem;
&:hover {
  transform: translateY(-.2rem);
  box-shadow: 0 .7rem 2rem rgba(0, 0, 0, .3);
}`;
const Title = styled.h3`
margin: 1rem 0;
`;

const BoardList = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    getApi('/api/board/list')
      .then(setBoards)
      .catch(console.error);
  }, []);

  return <>
    <header>
      <h2>게시글</h2>
    </header>
    <CardWrap>
      {boards.map((board, i) => <StyledCard key={i}>
        <Title>{board.title}</Title>
        <div>{board.content}</div>
        <div>{board.userName}</div>
        <div>{board.createDateTime}</div>
      </StyledCard>)}
    </CardWrap>
  </>;
};

export default BoardList;