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
    userName: null,
    content: null,
    createdDate: null,
    updatedDate: null
  },
  onClickDelete: commentId => { },
  onClickModify: commentId => { },
  onClickModifyConfirm: (result, commentId) => { }
});

const Comment = ({ boardUserName, comment, onClickDelete, onClickModify, onClickModifyConfirm }) => {
  const onClickInnerDelete = useCallback(commentId => () => onClickDelete(commentId), [comment]);
  const onClickInnerModify = useCallback(commentId => () => onClickModify(commentId), [comment]);
  const onClickInnerModifyConfirm = useCallback((result, commentId) => () => onClickModifyConfirm(result, commentId), []);

  return <>
    <CommentContext.Provider value={{
      comment,
      onClickDelete: onClickInnerDelete,
      onClickModify: onClickInnerModify,
      onClickModifyConfirm: onClickInnerModifyConfirm
    }}>
      <Wrap>
        {boardUserName === comment.userName ? <RightCard /> : <LeftCard />}
      </Wrap>
    </CommentContext.Provider>
  </>;
}

export default Comment;