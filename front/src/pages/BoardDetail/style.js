import styled from 'styled-components';
import DeleteButton from '../../components/DeleteButton';
import Textarea from '../../components/Textarea';

export const Header = styled.header`
border-bottom: .1rem solid dimgray;
margin-bottom: 1rem;
`;

export const DetailInfo = styled.div`
margin: 1rem 0;
font-size: .9rem;
display: flex;
justify-content: space-between;
align-items: end;
`;

export const UserName = styled.div`
font-weight: bolder;
`;

export const Date = styled.div`
color: gray;
`;

export const BoardContent = styled.div`
white-space: pre-wrap;
margin: 1rem 0;
min-height: 10rem;
`;

export const Hr = styled.hr`
margin: 1rem 0;
border: none;
border-bottom: .1rem solid dimgray;
`;

export const CommentGroup = styled.div`
margin: 1rem 0;
`;

export const CommentCardLeft = styled.div`
margin: 1rem 0;
display: flex;
align-items: end;
gap: .3rem;
`;

export const CommentCardRight = styled(CommentCardLeft)`
justify-content: end;
&>div {
  background-color: rgb(50, 50, 50);
  color: whitesmoke;
}
&>div>div:nth-child(1) {
  text-align: right;
}`;

export const StyledDeleteButton = styled(DeleteButton)`
max-width: 1rem;
max-height: 1rem;
margin-bottom: .5rem;
&:hover {
  filter: invert(50%);
  background-color: transparent;
}`;

export const CommentCard = styled.div`
box-shadow: 0 0.3rem .5rem rgba(0, 0, 0, .3);
background-color: whitesmoke;
color: rgb(30, 30, 30);
font-size: .9rem;
padding: 1rem;
border-radius: 1rem;
`;

export const CommentContent = styled.div`
white-space: pre-wrap;
margin: .5rem 0;
`;

export const WriteCommentGroup = styled.div`
display: flex;
flex-direction: column;
align-items: end;
gap: .5rem;
`;

export const StyledTextarea = styled(Textarea)`
height: 5rem;
`;