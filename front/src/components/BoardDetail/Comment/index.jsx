import React, { createContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useSWRInfinite from 'swr/infinite'
import styled from 'styled-components';
import LeftCard from './LeftCard';
import RightCard from './RightCard';
import { commentFetcher, deleteComment, enableModifying, getKey } from '../../../pages/BoardDetail/fetcher';

const Wrap = styled.div`
margin: 1rem 0;
`;

export const CommentContext = createContext({
  comment: {
    id: null,
    username: null,
    content: null,
    createdDate: null,
    updatedDate: null
  }
});

const Comment = ({ username, comment }) => {
  const { boardId } = useParams();
  const { data, mutate } = useSWRInfinite(getKey(boardId), commentFetcher);

  const onClickDelete = useCallback(commentId => () => deleteComment(mutate, { data, commentId }), [data]);
  const onClickModify = useCallback(commentId => () => enableModifying(mutate, { data, commentId }), [data]);

  return <>
    <CommentContext.Provider value={{ comment, onClickDelete, onClickModify }}>
      <Wrap>
        {username === comment.username ? <RightCard /> : <LeftCard />}
      </Wrap>
    </CommentContext.Provider>
  </>;
}

export default Comment;