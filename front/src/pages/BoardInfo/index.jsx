import React, { useCallback, useRef, useState } from 'react';
import { deleteApi, getApi } from '../../utils/Api';
import {
  Content, ContentWrap, FakeCard, Header, StyledDeleteImg, SearchGroup, Section,
  StyledButton, StyledCard, StyledInput, Title, Username, StyledLink
} from './style';
import useIntersection from '../../hooks/useIntersection';

const BoardInfo = () => {
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

  const onClickDelete = useCallback(boardId => e => {
    e.stopPropagation();

    if (!confirm('게시글을 삭제하시겠습니까?')) return;

    deleteApi(`/api/board/info/${boardId}`)
      .then(v => alert(v.message))
      .then(() => boards.filter(board => board.id !== boardId))
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
        <StyledLink key={i} to={`/board/info/${board.id}`}>
          <StyledCard>
            <StyledDeleteImg onClick={onClickDelete(board.id)} />
            <Title>{board.title}</Title>
            <ContentWrap>
              <Content>{board.content}</Content>
              <Username>{board.username}</Username>
              <div>{board.createdDate}</div>
            </ContentWrap>
          </StyledCard>
        </StyledLink>
      )}
      <FakeCard />
      <FakeCard />
      <FakeCard ref={lastCardRef} />
    </Section>
  </>;
};

export default BoardInfo;