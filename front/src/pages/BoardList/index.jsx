import React, { useCallback, useMemo, useRef } from 'react';
import useSWRInfinite from 'swr/infinite'
import {
  Content, ContentWrap, FakeCard, Header, StyledDeleteImg, SearchGroup, Section,
  StyledButton, StyledCard, StyledInput, Title, Username, StyledLink
} from './style';
import useIntersection from '../../hooks/useIntersection';
import axios from 'axios';

export const getKey = (page, prevData) => prevData?.isLast ? null : ['/api/board/list', page];
const boardFetcher = ([url, page]) => axios.get(url, { params: { page } }).then(res => res.data);

const BoardList = () => {
  const { data: boards, isLoading, setSize, mutate } = useSWRInfinite(getKey, boardFetcher);
  const loaderRef = useRef();

  const isLast = useMemo(() => boards?.[boards.length - 1].isLast, [boards]);

  useIntersection(loaderRef, ([entry]) => {
    if (!entry.isIntersecting) return;
    if (isLast) return;
    if (isLoading) return;
    setSize(size => size + 1);
  }, [isLoading, isLast]);

  const onClickDelete = useCallback(boardId => e => {
    e.preventDefault();

    if (!confirm('게시글을 삭제하시겠습니까?')) return;

    const newData = boards.map(item => {
      const body = item.body.filter(board => board.id !== boardId);
      return { ...item, body };
    });

    mutate(newData, { revalidate: false });
    axios.delete(`/api/board/info/${boardId}`)
      .then(res => res.data)
      .then(data => alert(data.message))
      .catch(err => err.response.data?.message ? alert(err.response.data.message) : console.error(err))
      .then(() => mutate());
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
      {boards?.map(({ body }) => body.map((board, i) =>
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
      ))}
      <FakeCard />
      <FakeCard />
      <FakeCard ref={loaderRef} />
    </Section>
  </>;
};

export default BoardList;