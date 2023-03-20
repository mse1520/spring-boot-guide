import React, { useCallback, useMemo, useRef } from 'react';
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import useSWRInfinite from 'swr/infinite'
import Comment from '../../components/BoardInfo/Comment';
import useIntersection from '../../hooks/useIntersection';
import { DefaultButton } from '../../styles/button';
import { deleteApi, getApi } from '../../utils/api';
import { commentFetcher, createComment, getKey } from './fetcher';
import { Content, CreatedDate, Header, Hr, StyledTextarea, Username, Footer, TitleWrap, TitleButtonGroup, Info } from './style';

export const loader = ({ params }) => Promise
  .all([
    getApi('/api/user/info'),
    getApi(`/api/board/info/${params.boardId}`)])
  .then(([{ user, menuList }, { body }]) => ({ user, menuList, board: body }));

const BoardInfo = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const { user, board } = useLoaderData();
  const { data, isLoading, setSize, mutate } = useSWRInfinite(getKey(boardId), commentFetcher);
  const textareaRef = useRef();
  const loaderRef = useRef();

  const isLast = useMemo(() => data?.[data.length - 1].isLast, [data]);

  useIntersection(loaderRef, ([entry]) => {
    if (!entry.isIntersecting) return;
    if (isLast) return;
    if (isLoading) return;
    setSize(size => size + 1);
  }, [isLoading, isLast]);

  const onClickCreateComment = useCallback(() => {
    createComment(mutate, { data, boardId, content: textareaRef.current.innerText, username: user.name });
    textareaRef.current.innerText = '';
  }, [data]);

  const onClickDeleteBoard = useCallback(() => {
    deleteApi(`/api/board/info/${boardId}`)
      .then(v => alert(v.message))
      .then(() => navigate('/board/list', { replace: true }))
      .catch(err => err.message ? alert(err.message) : console.error(err));
  }, []);

  return <>
    <Header>
      <TitleWrap>
        <h2>{board.title}</h2>
        <TitleButtonGroup>
          <Link to={`/board/info/${boardId}/update`}><DefaultButton>수정</DefaultButton></Link>
          <DefaultButton onClick={onClickDeleteBoard}>삭제</DefaultButton>
        </TitleButtonGroup>
      </TitleWrap>
      <Info>
        <div>
          <Username>{board.username}</Username>
          <CreatedDate>{board.createdDate}</CreatedDate>
        </div>
        <div>댓글수: {data?.[data.length - 1].total}</div>
      </Info>
    </Header>
    <section>
      <Content>{board.content}</Content>
      <Hr />
      {data?.map(({ body }) => body.map((comment, i) =>
        <Comment key={i} username={user ? user.name : board.username} comment={comment} />))}
      <div ref={loaderRef} />
    </section>
    <Footer>
      <StyledTextarea ref={textareaRef} placeholder='댓글을 남겨보세요.' />
      <DefaultButton onClick={onClickCreateComment}>등록</DefaultButton>
    </Footer>
  </>;
};

export default BoardInfo;