import React, { useCallback, useRef } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import useSWRInfinite from 'swr/infinite'
import Comment from '../../components/BoardDetail/Comment';
import useIntersection from '../../hooks/useIntersection';
import { DefaultButton } from '../../styles/button';
import { getApi } from '../../utils/Api';
import { cancelModifying, commentFetcher, createComment, deleteComment, enableModifying, getKey, modifyComment } from './fetcher';
import { Content, CreatedDate, BoardInfo, Header, Hr, StyledTextarea, Username, Footer, TitleWrap, TitleButtonGroup } from './style';

export const loader = ({ params }) => Promise
  .all([
    getApi('/api/user/info'),
    getApi(`/api/board/info/${params.boardId}`)])
  .then(([{ user, menuList }, { body }]) => ({ user, menuList, board: body }));

const BoardDetail = () => {
  const { user, board } = useLoaderData();
  const { boardId } = useParams();
  const { data, isLoading, setSize, mutate } = useSWRInfinite(getKey(boardId), commentFetcher, { parallel: true });
  const textareaRef = useRef();
  const loaderRef = useRef();

  useIntersection(loaderRef, ([entry]) => {
    if (!entry.isIntersecting) return;
    if (isLoading) return;
    setSize(size => size + 1);
  }, [isLoading]);

  const onClickDeleteComment = useCallback(commentId => {
    deleteComment(data, commentId)
      .then(data => mutate(data))
      .catch(err => err.message ? alert(err.message) : console.error(err));
  }, [data]);

  const onClickModifyComment = useCallback(commentId => {
    mutate(enableModifying(data, commentId));
  }, [data]);

  const onClickModifyCommentConfirm = useCallback((result, commentId, content) => {
    if (!result) return mutate(cancelModifying(data));

    modifyComment(data, commentId, content)
      .then(data => mutate(data))
      .catch(err => err.message ? alert(err.message) : console.error(err));
  }, [data]);

  const onClickCreateComment = useCallback(() => {
    createComment(data, boardId, textareaRef.current.innerText)
      .then(data => mutate(data))
      .then(() => textareaRef.current.innerText = '')
      .catch(err => err.message ? alert(err.message) : console.error(err));
  }, [data]);

  return <>
    <Header>
      <TitleWrap>
        <h2>{board.title}</h2>
        <TitleButtonGroup>
          <DefaultButton>수정</DefaultButton>
          <DefaultButton>삭제</DefaultButton>
        </TitleButtonGroup>
      </TitleWrap>
      <BoardInfo>
        <div>
          <Username>{board.username}</Username>
          <CreatedDate>{board.createdDate}</CreatedDate>
        </div>
        <div>댓글수: {data?.[data.length - 1].total}</div>
      </BoardInfo>
    </Header>
    <section>
      <Content>{board.content}</Content>
      <Hr />
      {data?.map(({ body }) => body.map((comment, i) => <Comment
        key={i}
        username={user ? user.name : board.username}
        comment={comment}
        onClickDelete={onClickDeleteComment}
        onClickModify={onClickModifyComment}
        onClickModifyConfirm={onClickModifyCommentConfirm}
      />))}
      <div ref={loaderRef} />
    </section>
    <Footer>
      <StyledTextarea ref={textareaRef} placeholder='댓글을 남겨보세요.' />
      <DefaultButton onClick={onClickCreateComment}>등록</DefaultButton>
    </Footer>
  </>;
};

export default BoardDetail;