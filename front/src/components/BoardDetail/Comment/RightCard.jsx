import React, { useContext } from 'react';
import styled from 'styled-components';
import { CommentContext } from '.';
import CommentMode from '../../../types/BoardDetail/CommentMode';
import ModifyControl from './ModifyControl';
import {
  ButtonWrap, Card as BaseCard, Content, DateTime, StyledDeleteImg, StyledModifyImg, UserName as BaseUserName, CardWrap as BaseCardWrap
} from './style';

const CardWrap = styled(BaseCardWrap)`
justify-content: end;
`;
const Card = styled(BaseCard)`
background-color: rgb(50, 50, 50);
color: whitesmoke;
`;
const UserName = styled(BaseUserName)`
text-align: right;
`;

const RightCard = () => {
  const { comment, onClickModify, onClickDelete } = useContext(CommentContext);

  return <>
    {comment.mode === CommentMode.MODIFYING
      ? <CardWrap>
        <Card>
          <ModifyControl />
        </Card>
      </CardWrap>
      : <CardWrap>
        <ButtonWrap>
          <StyledModifyImg onClick={onClickModify(comment.commentId)} />
          <StyledDeleteImg onClick={onClickDelete(comment.commentId)} />
        </ButtonWrap>
        <Card>
          <UserName>{comment.userName}</UserName>
          <Content>{comment.content}</Content>
          <DateTime>{comment.updatedDate}</DateTime>
        </Card>
      </CardWrap>
    }
  </>;
};

export default RightCard;