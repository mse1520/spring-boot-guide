import React, { useCallback } from 'react';
import styled from 'styled-components';
import DeleteButton from '../common/DeleteButton';

const Wrap = styled.div`
margin: 1rem 0;
`;
const CardLeft = styled.div`
margin: 1rem 0;
display: flex;
align-items: end;
gap: .3rem;
`;
const CardRight = styled(CardLeft)`
justify-content: end;
&>div {
  background-color: rgb(50, 50, 50);
  color: whitesmoke;
}
&>div>div:nth-child(1) {
  text-align: right;
}`;
const StyledDeleteButton = styled(DeleteButton)`
max-width: 1rem;
max-height: 1rem;
margin-bottom: .5rem;
&:hover {
  filter: invert(50%);
  background-color: transparent;
}`;
const Card = styled.div`
box-shadow: 0 0.3rem .5rem rgba(0, 0, 0, .3);
background-color: whitesmoke;
color: rgb(30, 30, 30);
font-size: .9rem;
padding: 1rem;
border-radius: 1rem;
`;
const UserName = styled.div`
font-weight: bolder;
`;
const Content = styled.div`
white-space: pre-wrap;
margin: .5rem 0;
`;
const DateTime = styled.div`
color: gray;
`;

const Comment = ({ boardUserName, comments, onClickDelete }) => {
  const onClickInnerDelete = useCallback(commentId => () => onClickDelete(commentId), [comments]);

  return <>
    <Wrap>
      {comments.map((comment, i) =>
        boardUserName === comment.userName
          ? <CardRight key={i}>
            <StyledDeleteButton onClick={onClickInnerDelete(comment.commentId)} />
            <Card>
              <UserName>{comment.userName}</UserName>
              <Content>{comment.content}</Content>
              <DateTime>{comment.updatedDate}</DateTime>
            </Card>
          </CardRight>
          : <CardLeft key={i}>
            <Card>
              <UserName>{comment.userName}</UserName>
              <Content>{comment.content}</Content>
              <DateTime>{comment.updatedDate}</DateTime>
            </Card>
            <StyledDeleteButton onClick={onClickInnerDelete(comment.commentId)} />
          </CardLeft>
      )}
    </Wrap>
  </>;
};

export default Comment;