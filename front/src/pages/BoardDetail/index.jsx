import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import CommentList from '../../components/BoardDetail/CommentList';
import Loading from '../../components/common/Loading';
import useIntersection from '../../hooks/useIntersection';
import { DefaultButton } from '../../styles/button';
import { getApi, postApi } from '../../utils/Api';
import { Content, CreatedDate, BoardInfo, Header, Hr, StyledTextarea, Username, Footer } from './style';

export const loader = () => getApi('/api/user/info');

export const BoardDetailContext = createContext({
  comments: { state: [], setState: () => { } },
  total: { state: [], setState: () => { } },
  username: '',
});

const BoardDetail = () => {
  const { user } = useLoaderData();
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
    getApi(`/api/comment/info/${boardId}`, { page })
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
    getApi(`/api/board/info/${boardId}`)
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
      .then(() => setTotal(total + 1))
      .then(() => textareaRef.current.innerText = '')
      .catch(err => err.message ? alert(err.message) : console.error(err)),
    [comments]);

  if (board === undefined) return <Loading />;
  if (!board) return <div>{error.message}</div>;

  return <>
    <BoardDetailContext.Provider value={{
      comments: { state: comments, setState: setComments },
      total: { state: total, setState: setTotal },
      username: user ? user.name : board.username,
    }}>
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
        <CommentList />
        <div ref={loaderRef} />
      </section>
      <Footer>
        <StyledTextarea ref={textareaRef} placeholder='댓글을 남겨보세요.' />
        <DefaultButton onClick={onClickCreateComment}>등록</DefaultButton>
      </Footer>
    </BoardDetailContext.Provider>
  </>;
};

export default BoardDetail;