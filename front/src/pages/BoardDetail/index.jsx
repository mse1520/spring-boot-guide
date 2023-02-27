import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import Comment from '../../components/BoardDetail/Comment';
import Loading from '../../components/common/Loading';
import useIntersection from '../../hooks/useIntersection';
import { DefaultButton } from '../../styles/button';
import CommentMode from '../../types/BoardDetail/CommentMode';
import { deleteApi, getApi, putApi, postApi } from '../../utils/Api';
import { Content, CreatedDate, BoardInfo, Header, Hr, StyledTextarea, Username, Footer } from './style';

export const loader = () => getApi('/api/member/info');

const BoardDetail = () => {
  const { member } = useLoaderData();
  const { boardId } = useParams();
  const [board, setBoard] = useState();
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState();
  const textareaRef = useRef();
  const loaderRef = useRef();

  const loadComments = useCallback((boardId, page, comments) =>
    getApi(`/api/comment/${boardId}/info`, { page })
      .then(v => (setTotal(v.total), v))
      .then(v => (setIsLast(v.isLast), v))
      .then(v => (setPage(page + 1), v.body))
      .then(v => setComments([...comments, ...v]))
      .catch(console.error),
    []);

  useIntersection(loaderRef, ([entry]) => {
    if (!entry.isIntersecting) return;
    if (isLast) return;

    loadComments(boardId, page, comments);
  }, [loaderRef.current, comments, page]);

  useEffect(() => {
    getApi(`/api/board/${boardId}/info`)
      .then(v => setBoard(v.body))
      .catch(err => {
        console.error(err);
        setError(err);
        setBoard(null)
      });

    loadComments(boardId, page, comments);
  }, []);

  const onClickCreateComment = useCallback(() =>
    postApi('/api/comment/write', {
      boardId,
      content: textareaRef.current.innerText
    })
      .then(v => v.body)
      .then(v => setComments([...comments, v]))
      .then(() => textareaRef.current.innerText = '')
      .catch(err => err.message ? alert(err.message) : console.error(err)),
    [comments]);

  const onClickDeleteComment = useCallback(commentId =>
    deleteApi(`/api/comment/${commentId}/info`)
      .then(() => comments.filter(v => v.commentId !== commentId))
      .then(setComments)
      .catch(err => err.message ? alert(err.message) : console.error(err)),
    [comments]);

  const onClickModifyComment = useCallback(commentId => {
    const newComments = comments.map(comment => ({
      ...comment,
      mode: comment.commentId === commentId ? CommentMode.MODIFYING : CommentMode.DONE
    }));

    setComments(newComments);
  }, [comments]);

  const onClickModifyCommentConfirm = useCallback((result, commentId, content) => {
    if (!result) {
      const findComment = comments.find(comment => comment.commentId === commentId);
      findComment.mode = CommentMode.DONE;
      return setComments([...comments]);
    }

    putApi(`/api/comment/${commentId}/info`, { content })
      .then(v => v.body)
      .then(newComment => setComments(comments.map(comment => comment.commentId === newComment.commentId ? newComment : comment)))
      .catch(err => err.message ? alert(err.message) : console.error(err));
  }, [comments]);

  if (board === undefined) return <Loading />;
  if (!board) return <div>{error.message}</div>;

  return <>
    <Header>
      <h2>{board.title}</h2>
      <BoardInfo>
        <div>
          <Username>{board.username}</Username>
          <CreatedDate>{board.createdDate}</CreatedDate>
        </div>
        <div>댓글수: {total}</div>
      </BoardInfo>
    </Header>
    <section>
      <Content>{board.content}</Content>
      <Hr />
      {comments.map((comment, i) => <Comment
        key={i}
        username={member ? member.username : board.username}
        comment={comment}
        onClickDelete={onClickDeleteComment}
        onClickModify={onClickModifyComment}
        onClickModifyConfirm={onClickModifyCommentConfirm}
      />)}
      <div ref={loaderRef} />
    </section>
    <Footer>
      <StyledTextarea ref={textareaRef} placeholder='댓글을 남겨보세요.' />
      <DefaultButton onClick={onClickCreateComment}>등록</DefaultButton>
    </Footer>
  </>;
};

export default BoardDetail;