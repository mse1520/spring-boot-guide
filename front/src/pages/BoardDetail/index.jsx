import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import Comment from '../../components/BoardDetail/Comment';
import useIntersection from '../../hooks/useIntersection';
import { DefaultButton } from '../../styles/button';
import { getApi, postApi } from '../../utils/Api';
import { Content, CreatedDate, BoardInfo, Header, Hr, StyledTextarea, Username, Footer } from './style';

export const loader = ({ request }) => {
  const url = new URL(request.url);
  const pathnames = url.pathname.split('/');
  const boardId = pathnames[pathnames.length - 1];

  return Promise.all([
    getApi('/api/user/info'),
    getApi(`/api/board/info/${boardId}`)
  ]).then(([{ user, menuList }, { body }]) => ({ user, menuList, board: body }))
};

const BoardDetail = () => {
  const { user, board } = useLoaderData();
  const { boardId } = useParams();
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [total, setTotal] = useState(0);
  const textareaRef = useRef();
  const loaderRef = useRef();

  const loadComments = useCallback((boardId, page, comments) =>
    getApi(`/api/comment/info/${boardId}`, { page })
      .then(v => (setTotal(v.total), v))
      .then(v => (setIsLast(v.isLast), v))
      .then(v => (setPage(page + 1), v.body))
      .then(v => setComments([...comments, ...v]))
      .catch(console.error),
    []);

  useEffect(() => {
    loadComments(boardId, page, comments);
  }, []);

  useIntersection(loaderRef, ([entry]) => {
    if (!entry.isIntersecting) return;
    if (isLast) return;

    loadComments(boardId, page, comments);
  }, [loaderRef.current, comments, page]);

  const onClickDeleteComment = useCallback(commentId =>
    deleteApi(`/api/comment/info/${commentId}`)
      .then(() => comments.filter(v => v.commentId !== commentId))
      .then(setComments)
      .then(() => setTotal(total - 1))
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

    putApi(`/api/comment/info/${commentId}`, { content })
      .then(v => v.body)
      .then(newComment => setComments(comments.map(comment => comment.commentId === newComment.commentId ? newComment : comment)))
      .catch(err => err.message ? alert(err.message) : console.error(err));
  }, [comments]);

  const onClickCreateComment = useCallback(() =>
    postApi('/api/comment/write', {
      boardId,
      content: textareaRef.current.innerText
    })
      .then(v => v.body)
      .then(v => setComments([...comments, v]))
      .then(() => setTotal(total + 1))
      .then(() => textareaRef.current.innerText = '')
      .catch(err => err.message ? alert(err.message) : console.error(err)),
    [comments]);

  return <>
    <Header>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>{board.title}</h2>
        <div style={{ display: 'flex', gap: '.5rem' }}>
          <DefaultButton>수정</DefaultButton>
          <DefaultButton>삭제</DefaultButton>
        </div>
      </div>
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
        username={user ? user.name : board.username}
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