import styled from '@emotion/styled';
import DeleteImg from '../../components/common/DeleteImg';
import Textarea from '../../components/common/Textarea';

export const Header = styled.header`
border-bottom: .1rem solid dimgray;
`;

export const TitleWrap = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`;

export const TitleButtonGroup = styled.div`
display: flex;
gap: .5rem;
`;

export const Info = styled.div`
margin: 1rem 0;
font-size: .9rem;
display: flex;
justify-content: space-between;
align-items: end;
`;

export const Username = styled.div`
font-weight: bolder;
`;

export const CreatedDate = styled.div`
color: gray;
`;

export const Section = styled.section`
margin: 1rem 0;
`;

export const Content = styled.div`
white-space: pre-wrap;
margin: 1rem 0;
min-height: 10rem;
`;

export const Hr = styled.hr`
margin: 1rem 0;
border: none;
border-bottom: .1rem solid dimgray;
`;

export const StyledDeleteImg = styled(DeleteImg)`
max-width: 1rem;
max-height: 1rem;
margin-bottom: .5rem;
&:hover {
  filter: invert(50%);
  background-color: transparent;
}`;

export const StyledTextarea = styled(Textarea)`
height: 5rem;
`;

export const Footer = styled.footer`
display: flex;
flex-direction: column;
align-items: end;
gap: .5rem;
position: sticky;
bottom: -1rem;
margin: -1rem;
padding: 1rem;
background-color: rgb(30, 30, 30);
`;