import React, { useContext } from 'react';
import { CommentContext } from '.';
import CommentMode from '../../../types/BoardDetail/CommentMode';
import ModifyForm from './ModifyForm';
import { ButtonWrap, Card, Content, DateTime, StyledDeleteImg, StyledModifyImg, Username, CardWrap } from './style';

const LeftCard = () => {
  const { comment, onClickModify, onClickDelete } = useContext(CommentContext);

  return <>
    {comment.mode === CommentMode.MODIFYING
      ? <CardWrap>
        <Card>
          <ModifyForm />
        </Card>
      </CardWrap>
      : <CardWrap>
        <Card>
          <Username>{comment.username}</Username>
          <Content>{comment.content}</Content>
          <DateTime>{comment.updatedDate}</DateTime>
        </Card>
        <ButtonWrap>
          <StyledModifyImg onClick={onClickModify(comment.commentId)} />
          <StyledDeleteImg onClick={onClickDelete(comment.commentId)} />
        </ButtonWrap>
      </CardWrap>
    }
  </>;
};

export default LeftCard;