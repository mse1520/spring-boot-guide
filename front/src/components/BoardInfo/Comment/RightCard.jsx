import React, { useContext } from 'react';
import styled from 'styled-components';
import { CommentContext } from '.';
import CommentMode from '../../../types/BoardDetail/CommentMode';
import EditingForm from './EditingForm';
import {
  ButtonWrap, Card as BaseCard, Content, DateTime, StyledDeleteImg, StyledEditingImg, Username as BaseUsername, CardWrap as BaseCardWrap
} from './style';

const CardWrap = styled(BaseCardWrap)`
justify-content: end;
`;
const Card = styled(BaseCard)`
background-color: rgb(50, 50, 50);
color: whitesmoke;
`;
const Username = styled(BaseUsername)`
text-align: right;
`;

const RightCard = () => {
  const { comment, onClickEditing, onClickDelete } = useContext(CommentContext);

  return <>
    {comment.mode === CommentMode.EDITING
      ? <CardWrap>
        <Card>
          <EditingForm />
        </Card>
      </CardWrap>
      : <CardWrap>
        <ButtonWrap>
          <StyledEditingImg onClick={onClickEditing(comment.id)} />
          <StyledDeleteImg onClick={onClickDelete(comment.id)} />
        </ButtonWrap>
        <Card>
          <Username>{comment.username}</Username>
          <Content>{comment.content}</Content>
          <DateTime>{comment.updatedDate}</DateTime>
        </Card>
      </CardWrap>
    }
  </>;
};

export default RightCard;