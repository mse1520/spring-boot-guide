import React, { useCallback, useMemo, useRef } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import useSWRInfinite from 'swr/infinite'
import Comment from '../../components/BoardInfo/Comment';
import useIntersection from '../../hooks/useIntersection';
import { DefaultButton } from '../../styles/button';
import { boardFetcher, commentFetcher, createComment, getCommentKey } from './fetcher';
import { Content, CreatedDate, Header, Hr, StyledTextarea, Username, Footer, TitleWrap, TitleButtonGroup, Info } from './style';
import { userFetcher } from '../../utils/fetcher';
import useSWR from 'swr';
import axios from 'axios';

const BoardInfo = () => {
  const { boardId } = useParams();
  const { data: session } = useSWR('/api/user/info', userFetcher);
  const { data: board, isLoading: isBoardLoading, mutate: boardMutate } = useSWR(`/api/board/info/${boardId}`, boardFetcher);
  const { data: comments, isLoading: IsCommentsLoading, setSize, mutate: commentsMutate } = useSWRInfinite(getCommentKey(boardId), commentFetcher);
  const textareaRef = useRef();
  const loaderRef = useRef();

  const isLast = useMemo(() => comments?.[comments.length - 1].isLast, [comments]);

  useIntersection(loaderRef, ([entry]) => {
    if (!entry.isIntersecting) return;
    if (isLast) return;
    if (IsCommentsLoading) return;
    setSize(size => size + 1);
  }, [comments]);

  const onClickCreateComment = useCallback(() => {
    createComment(commentsMutate, { data: comments, boardId, content: textareaRef.current.innerText, username: session.user.name });
    textareaRef.current.innerText = '';
  }, [comments]);

  const onClickDeleteBoard = useCallback(() => {
    axios.delete(`/api/board/info/${boardId}`)
      .then(res => res.data)
      .then(data => alert(data.message))
      .then(() => boardMutate(undefined, { revalidate: false }))
      .catch(err => err.response.data?.message ? alert(err.response.data.message) : console.error(err));
  }, []);

  if (!board && !isBoardLoading)
    return <Navigate to='/board/list' replace={true} />;

  return <>
    <Header>
      <TitleWrap>
        <h2>{board?.title}</h2>
        <TitleButtonGroup>
          <Link to={`/board/info/${boardId}/update`}><DefaultButton>수정</DefaultButton></Link>
          <DefaultButton onClick={onClickDeleteBoard}>삭제</DefaultButton>
        </TitleButtonGroup>
      </TitleWrap>
      <Info>
        <div>
          <Username>{board?.username}</Username>
          <CreatedDate>{board?.createdDate}</CreatedDate>
        </div>
        <div>댓글수: {comments?.[comments.length - 1].total}</div>
      </Info>
    </Header>
    <section>
      <Content>{board?.content}</Content>
      <Hr />
      {comments?.map(({ body }) => body.map((comment, i) =>
        <Comment key={i} username={session.user ? session.user.name : board?.username} comment={comment} />))}
      <div ref={loaderRef} />
    </section>
    <Footer>
      <StyledTextarea ref={textareaRef} placeholder='댓글을 남겨보세요.' />
      <DefaultButton onClick={onClickCreateComment}>등록</DefaultButton>
    </Footer>
  </>;
};

export default BoardInfo;