import React, { useContext } from 'react';
import styled from 'styled-components';
import { CommentContext } from '.';
import CommentMode from '../../../types/BoardDetail/CommentMode';
import ModifyForm from './ModifyForm';
import {
  ButtonWrap, Card as BaseCard, Content, DateTime, StyledDeleteImg, StyledModifyImg, Username as BaseUsername, CardWrap as BaseCardWrap
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
  const { comment, onClickModify, onClickDelete } = useContext(CommentContext);

  return <>
    {comment.mode === CommentMode.MODIFYING
      ? <CardWrap>
        <Card>
          <ModifyForm />
        </Card>
      </CardWrap>
      : <CardWrap>
        <ButtonWrap>
          <StyledModifyImg onClick={onClickModify(comment.id)} />
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