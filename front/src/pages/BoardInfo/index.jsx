import React, { useCallback, useEffect, useState } from 'react';
import { deleteApi, getApi } from '../../utils/Api';
import deleteImg from '../../resources/img/x.png';
import { useNavigate } from 'react-router-dom';
import { Content, ContentWrap, FakeCard, Header, StyledDeleteButton, SearchGroup, Section, StyledButton, StyledCard, StyledInput, Title, UserName } from './style';

const BoardInfo = () => {
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getApi('/api/board/list').then(setBoards).catch(console.error);
  }, []);

  const onClickCard = useCallback(boardId => () => navigate(`/board/info/${boardId}`), []);

  const onClickDelete = useCallback(boardId => e => {
    e.stopPropagation();

    if (!confirm('게시글을 삭제하시겠습니까?')) return;

    deleteApi(`/api/board/info/${boardId}`)
      .then(v => alert(v.message))
      .then(() => boards.filter(board => board.boardId !== boardId))
      .then(setBoards)
      .catch(err => err.message ? alert(err.message) : console.error(err));
  }, [boards]);

  return <>
    <Header>
      <h2>전체글 보기</h2>
      <SearchGroup>
        <StyledInput />
        <StyledButton>검색</StyledButton>
      </SearchGroup>
    </Header>
    <Section>
      {boards.map((board, i) =>
        <StyledCard key={i} onClick={onClickCard(board.boardId)}>
          <StyledDeleteButton src={deleteImg} onClick={onClickDelete(board.boardId)} />
          <Title>{board.title}</Title>
          <ContentWrap>
            <Content>{board.content}</Content>
            <UserName>{board.userName}</UserName>
            <div>{board.createdDate}</div>
          </ContentWrap>
        </StyledCard>
      )}
      <FakeCard />
      <FakeCard />
      <FakeCard />
    </Section>
  </>;
};

export default BoardInfo;