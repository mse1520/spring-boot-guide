import React, { useCallback, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useSWRInfinite from 'swr/infinite'
import styled from '@emotion/styled';
import { CommentContext } from '.';
import { DefaultButton } from '../../../styles/button';
import Textarea from '../../common/Textarea';
import { cancelEditing, commentFetcher, getCommentKey, updateComment } from '../../../pages/BoardDetail/fetcher';

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

const EditingForm = () => {
  const { boardId } = useParams();
  const { data, mutate } = useSWRInfinite(getCommentKey(boardId), commentFetcher, { revalidateOnMount: false });
  const { comment } = useContext(CommentContext);
  const cotentRef = useRef();

  const onClickCancel = useCallback(() => cancelEditing(mutate, { data }), [data]);

  const onClickSave = useCallback(commentId => () =>
    updateComment(mutate, { data, commentId, content: cotentRef.current.innerText }), [data]);

  return <>
    <Wrap>
      <StyledTextarea ref={cotentRef}>{comment.content}</StyledTextarea>
      <ButtonWrap>
        <DefaultButton onClick={onClickCancel}>취소</DefaultButton>
        <DefaultButton onClick={onClickSave(comment.id)}>등록</DefaultButton>
      </ButtonWrap>
    </Wrap>
  </>;
};

export default EditingForm;