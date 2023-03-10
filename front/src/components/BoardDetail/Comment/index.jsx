import React, { createContext, useCallback } from 'react';
import styled from 'styled-components';
import LeftCard from './LeftCard';
import RightCard from './RightCard';

const Wrap = styled.div`
margin: 1rem 0;
`;

export const CommentContext = createContext({
  comment: {
    commentId: null,
    username: null,
    content: null,
    createdDate: null,
    updatedDate: null
  },
  onClickDelete: commentId => { },
  onClickModify: commentId => { },
  onClickModifyConfirm: (result, commentId, content) => { }
});

const Comment = ({ username, comment, onClickDelete, onClickModify, onClickModifyConfirm }) => {
  const onClickInnerDelete = useCallback(commentId => () => onClickDelete(commentId), [onClickDelete]);
  const onClickInnerModify = useCallback(commentId => () => onClickModify(commentId), [onClickModify]);

  return <>
    <CommentContext.Provider value={{
      comment,
      onClickDelete: onClickInnerDelete,
      onClickModify: onClickInnerModify,
      onClickModifyConfirm
    }}>
      <Wrap>
        {username === comment.username ? <RightCard /> : <LeftCard />}
      </Wrap>
    </CommentContext.Provider>
  </>;
}

export default Comment;