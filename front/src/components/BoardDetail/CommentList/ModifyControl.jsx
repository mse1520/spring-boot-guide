import React, { useCallback, useContext, useRef } from 'react';
import styled from 'styled-components';
import { CommentContext } from '.';
import { BoardDetailContext } from '../../../pages/BoardDetail';
import { DefaultButton } from '../../../styles/button';
import CommentMode from '../../../types/BoardDetail/CommentMode';
import { putApi } from '../../../utils/Api';
import Textarea from '../../common/Textarea';

const Wrap = styled.div`
display: flex;
flex-direction: column;
gap: .5rem;
`;
const StyledTextarea = styled(Textarea)`
min-height: 5rem;
border: .1rem solid dimgray;
`;
const ButtonWrap = styled.div`
display: flex;
gap: .5rem;
justify-content: end;
`;

const ModifyControl = () => {
  const { comments } = useContext(BoardDetailContext);
  const { comment } = useContext(CommentContext);
  const cotentRef = useRef();

  const onClickModifyConfirm = useCallback((result, commentId) => () => {
    if (!result) {
      const findComment = comments.state.find(comment => comment.commentId === commentId);
      findComment.mode = CommentMode.DONE;
      return comments.setState([...comments.state]);
    }

    putApi(`/api/comment/info/${commentId}`, { content: cotentRef.current.innerText })
      .then(v => v.body)
      .then(newComment => comments.setState(comments.state.map(comment => comment.commentId === newComment.commentId ? newComment : comment)))
      .catch(err => err.message ? alert(err.message) : console.error(err));
  }, [comments.state]);

  return <>
    <Wrap>
      <StyledTextarea ref={cotentRef}>{comment.content}</StyledTextarea>
      <ButtonWrap>
        <DefaultButton onClick={onClickModifyConfirm(false, comment.commentId)}>취소</DefaultButton>
        <DefaultButton onClick={onClickModifyConfirm(true, comment.commentId)}>등록</DefaultButton>
      </ButtonWrap>
    </Wrap>
  </>;
};

export default ModifyControl;