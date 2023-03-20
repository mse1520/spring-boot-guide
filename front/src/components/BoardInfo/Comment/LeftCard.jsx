import React, { useContext } from 'react';
import { CommentContext } from '.';
import CommentMode from '../../../types/BoardDetail/CommentMode';
import EditingForm from './EditingForm';
import { ButtonWrap, Card, Content, DateTime, StyledDeleteImg, StyledEditingImg, Username, CardWrap } from './style';

const LeftCard = () => {
  const { comment, onClickEditing, onClickDelete } = useContext(CommentContext);

  return <>
    {comment.mode === CommentMode.EDITING
      ? <CardWrap>
        <Card>
          <EditingForm />
        </Card>
      </CardWrap>
      : <CardWrap>
        <Card>
          <Username>{comment.username}</Username>
          <Content>{comment.content}</Content>
          <DateTime>{comment.updatedDate}</DateTime>
        </Card>
        <ButtonWrap>
          <StyledEditingImg onClick={onClickEditing(comment.id)} />
          <StyledDeleteImg onClick={onClickDelete(comment.id)} />
        </ButtonWrap>
      </CardWrap>
    }
  </>;
};

export default LeftCard;