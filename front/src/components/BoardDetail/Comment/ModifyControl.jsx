import React, { useCallback, useContext, useRef } from 'react';
import styled from 'styled-components';
import { CommentContext } from '.';
import { DefaultButton } from '../../../styles/button';
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
  const { comment, onClickModifyConfirm } = useContext(CommentContext);
  const cotentRef = useRef();

  const onClick = useCallback((result, commentId) => () => onClickModifyConfirm(result, commentId, cotentRef.current.innerText), []);

  return <>
    <Wrap>
      <StyledTextarea ref={cotentRef}>{comment.content}</StyledTextarea>
      <ButtonWrap>
        <DefaultButton onClick={onClick(false, comment.commentId)}>취소</DefaultButton>
        <DefaultButton onClick={onClick(true, comment.commentId)}>등록</DefaultButton>
      </ButtonWrap>
    </Wrap>
  </>;
};

export default ModifyControl;