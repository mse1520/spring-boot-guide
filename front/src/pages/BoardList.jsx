import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from '../styles/box';
import { getApi } from '../utils/Api';

const CardWrap = styled.div`
display: flex;
flex-wrap: wrap;
gap: 1rem;
`;
const StyledCard = styled(Card)`
box-sizing: border-box;
min-width: 19rem;
flex: 1;
&:hover {
  transform: translateY(-.2rem);
  box-shadow: 0 .7rem 2rem rgba(0, 0, 0, .3);
}`;
const FakeCard = styled(StyledCard)`
opacity: 0;
`;
const Title = styled.h3`
margin: 1rem 0;
`;
const ContentWrap = styled.div`
font-size: .9rem;
color: gray;
`;
const Content = styled.div`
height: 9.7rem;
white-space: pre-line;
overflow: hidden;
text-overflow: ellipsis;
margin: 1rem 0;
`;
const UserName = styled.div`
color: whitesmoke;
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
      {boards.map((board, i) =>
        <StyledCard key={i}>
          <Title>{board.title}</Title>
          <ContentWrap>
            <Content>{board.content}</Content>
            <UserName>{board.userName}</UserName>
            <div>{board.createDateTime}</div>
          </ContentWrap>
        </StyledCard>
      )}
      <FakeCard />
      <FakeCard />
      <FakeCard />
      <FakeCard />
    </CardWrap>
  </>;
};

export default BoardList;