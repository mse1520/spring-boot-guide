import React, { useCallback, useRef, useState } from 'react';
import { deleteApi, getApi } from '../../utils/Api';
import { useNavigate } from 'react-router-dom';
import { Content, ContentWrap, FakeCard, Header, StyledDeleteImg, SearchGroup, Section, StyledButton, StyledCard, StyledInput, Title, UserName } from './style';
import useIntersection from '../../hooks/useIntersection';

const BoardInfo = () => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const lastCardRef = useRef();

  useIntersection(lastCardRef, ([entry]) => {
    if (!entry.isIntersecting) return;
    if (isLast) return;

    getApi('/api/board/list', { page })
      .then(v => (setIsLast(v.isLast), v.body))
      .then(v => setBoards([...boards, ...v]))
      .then(() => setPage(page + 1))
      .catch(console.error);
  }, [boards, page, isLast]);

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
          <StyledDeleteImg onClick={onClickDelete(board.boardId)} />
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
      <FakeCard ref={lastCardRef} />
    </Section>
  </>;
};

export default BoardInfo;