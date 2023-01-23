import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import { DefaultButton } from '../../styles/button';
import { deleteApi, getApi, postApi } from '../../utils/Api';
import {
  CommentCard, CommentCardLeft, CommentGroup, BoardContent, Date, DetailInfo, Header, Hr, StyledTextarea, UserName, WriteCommentGroup, CommentContent,
  CommentCardRight, StyledDeleteButton
} from './style';

const BoardDetail = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState();
  const [error, setError] = useState();
  const commentRef = useRef();

  useEffect(() => {
    getApi(`/api/board/info/${boardId}`)
      .then(v => setBoard(v.body))
      .catch(err => {
        console.error(err);
        setError(err);
        setBoard(null)
      });
  }, []);

  const onClickCreateComment = useCallback(() => {
    postApi('/api/comment/write', {
      boardId,
      content: commentRef.current.innerText
    })
      .then(v => v.body)
      .then(newComment => ({ ...board, comments: [...board.comments, newComment] }))
      .then(setBoard)
      .catch(err => err.message ? alert(err.message) : console.error(err));
  }, [board]);

  const onClickDeleteComment = useCallback(commentId => () => {
    deleteApi(`/api/comment/info/${commentId}`)
      .then(() => ({ ...board, comments: board.comments.filter(v => v.commentId !== commentId) }))
      .then(v => (console.log(v), v))
      .then(setBoard)
      .catch(err => err.message ? alert(err.message) : console.error(err));
  }, [board]);

  if (board === undefined) return <Loading />;
  if (!board) return <div>{error.message}</div>;

  return <>
    <Header>
      <h2>{board.title}</h2>
      <DetailInfo>
        <div>
          <UserName>{board.userName}</UserName>
          <Date>{board.createdDate}</Date>
        </div>
        <div>댓글수: {board.comments.length}</div>
      </DetailInfo>
    </Header>
    <section>
      <BoardContent>{board.content}</BoardContent>
      <Hr />
      <CommentGroup>
        {board.comments.map((comment, i) =>
          board.userName === comment.userName
            ? <CommentCardRight key={i}>
              <StyledDeleteButton onClick={onClickDeleteComment(comment.commentId)} />
              <CommentCard>
                <UserName>{comment.userName}</UserName>
                <CommentContent>{comment.content}</CommentContent>
                <Date>{comment.updatedDate}</Date>
              </CommentCard>
            </CommentCardRight>
            : <CommentCardLeft key={i}>
              <CommentCard>
                <UserName>{comment.userName}</UserName>
                <CommentContent>{comment.content}</CommentContent>
                <Date>{comment.updatedDate}</Date>
              </CommentCard>
              <StyledDeleteButton onClick={onClickDeleteComment(comment.commentId)} />
            </CommentCardLeft>
        )}
      </CommentGroup>
      <WriteCommentGroup>
        <StyledTextarea ref={commentRef} placeholder='댓글을 남겨보세요.' />
        <DefaultButton onClick={onClickCreateComment}>등록</DefaultButton>
      </WriteCommentGroup>
    </section>
  </>;
};

export default BoardDetail;