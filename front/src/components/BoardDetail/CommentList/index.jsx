import React, { createContext, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { BoardDetailContext } from '../../../pages/BoardDetail';
import CommentMode from '../../../types/BoardDetail/CommentMode';
import { deleteApi } from '../../../utils/Api';
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

const CommentList = () => {
  const { comments, total, username } = useContext(BoardDetailContext);

  const onClickDelete = useCallback(commentId => () => {
    deleteApi(`/api/comment/info/${commentId}`)
      .then(() => comments.state.filter(v => v.commentId !== commentId))
      .then(comments.setState)
      .then(() => total.setState(total.state - 1))
      .catch(err => err.message ? alert(err.message) : console.error(err));
  }, [comments.state]);

  const onClickModify = useCallback(commentId => () => {
    const newComments = comments.state.map(comment => ({
      ...comment,
      mode: comment.commentId === commentId ? CommentMode.MODIFYING : CommentMode.DONE
    }));

    comments.setState(newComments);
  }, [comments.state]);

  return <>
    {comments.state.map((comment, i) =>
      <CommentContext.Provider key={i} value={{ comment, onClickDelete, onClickModify }}>
        <Wrap>
          {username === comment.username ? <RightCard /> : <LeftCard />}
        </Wrap>
      </CommentContext.Provider>
    )}
  </>;
}

export default CommentList;