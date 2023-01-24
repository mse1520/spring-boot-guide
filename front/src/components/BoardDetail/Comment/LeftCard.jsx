import React, { useContext } from 'react';
import { CommentContext } from '.';
import CommentMode from '../../../types/BoardDetail/CommentMode';
import ModifyControl from './ModifyControl';
import { ButtonWrap, Card, Content, DateTime, StyledDeleteImg, StyledModifyImg, UserName, CardWrap } from './style';

const LeftCard = () => {
  const { comment, onClickModify, onClickDelete } = useContext(CommentContext);

  return <>
    {comment.mode === CommentMode.MODIFYING
      ? <CardWrap>
        <Card>
          <ModifyControl />
        </Card>
      </CardWrap>
      : <CardWrap>
        <Card>
          <UserName>{comment.userName}</UserName>
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