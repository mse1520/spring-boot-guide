import React, { useContext } from 'react';
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
height: 5rem;
border: .1rem solid dimgray;
`;
const ButtonWrap = styled.div`
display: flex;
gap: .5rem;
justify-content: end;
`;

const ModifyControl = () => {
  const { comment, onClickModifyConfirm } = useContext(CommentContext);

  return <>
    <Wrap>
      <StyledTextarea>{comment.content}</StyledTextarea>
      <ButtonWrap>
        <DefaultButton onClick={onClickModifyConfirm(false, comment.commentId)}>취소</DefaultButton>
        <DefaultButton onClick={onClickModifyConfirm(true, comment.commentId)}>등록</DefaultButton>
      </ButtonWrap>
    </Wrap>
  </>;
};

export default ModifyControl;