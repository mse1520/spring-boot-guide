import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comment from '../../components/BoardDetail/Comment';
import Loading from '../../components/common/Loading';
import { DefaultButton } from '../../styles/button';
import CommentMode from '../../types/BoardDetail/CommentMode';
import { deleteApi, getApi, postApi } from '../../utils/Api';
import { Content, CreatedDate, BoardInfo, Header, Hr, StyledTextarea, UserName, Footer } from './style';

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
      .then(() => commentRef.current.innerText = '')
      .catch(err => err.message ? alert(err.message) : console.error(err));
  }, [board]);

  const onClickDeleteComment = useCallback(commentId => {
    deleteApi(`/api/comment/info/${commentId}`)
      .then(() => ({ ...board, comments: board.comments.filter(v => v.commentId !== commentId) }))
      .then(v => (console.log(v), v))
      .then(setBoard)
      .catch(err => err.message ? alert(err.message) : console.error(err));
  }, [board]);

  const onClickModifyComment = useCallback(commentId => {
    setBoard({
      ...board,
      comments: board.comments.map(comment => ({
        ...comment,
        mode: comment.commentId === commentId ? CommentMode.MODIFYING : CommentMode.DONE
      }))
    });
  }, [board]);

  const onClickModifyCommentConfirm = useCallback((result, commentId) => {
    if (!result) {
      const findComment = board.comments.find(comment => comment.commentId === commentId);
      findComment.mode = CommentMode.DONE;
      setBoard({ ...board });
    }
  }, [board]);

  if (board === undefined) return <Loading />;
  if (!board) return <div>{error.message}</div>;

  return <>
    <Header>
      <h2>{board.title}</h2>
      <BoardInfo>
        <div>
          <UserName>{board.userName}</UserName>
          <CreatedDate>{board.createdDate}</CreatedDate>
        </div>
        <div>댓글수: {board.comments.length}</div>
      </BoardInfo>
    </Header>
    <section>
      <Content>{board.content}</Content>
      <Hr />
      {board.comments.map((comment, i) => <Comment
        key={i}
        boardUserName={board.userName}
        comment={comment}
        onClickDelete={onClickDeleteComment}
        onClickModify={onClickModifyComment}
        onClickModifyConfirm={onClickModifyCommentConfirm}
      />)}
    </section>
    <Footer>
      <StyledTextarea ref={commentRef} placeholder='댓글을 남겨보세요.' />
      <DefaultButton onClick={onClickCreateComment}>등록</DefaultButton>
    </Footer>
  </>;
};

export default BoardDetail;