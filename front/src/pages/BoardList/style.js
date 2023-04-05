import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import DeleteImg from '../../components/common/DeleteImg';
import { Card } from '../../styles/box';
import { DefaultButton } from '../../styles/button';
import { DefaultInput } from '../../styles/input';

export const Header = styled.header`
display: flex;
justify-content: space-between;
align-items: center;
border-bottom: .1rem solid dimgray;
margin-bottom: 1rem;
`;

export const SearchGroup = styled.div`
display: flex;
flex: 1;
max-width: 20rem;
gap: .5rem;
`;

export const StyledInput = styled(DefaultInput)`
flex: 1;
`;

export const StyledButton = styled(DefaultButton)`
width: 4rem;
`;

export const Section = styled.section`
display: flex;
flex-wrap: wrap;
gap: 1rem;
`;

export const StyledLink = styled(Link)`
display: block;
flex: 1;
`;

export const StyledCard = styled(Card)`
box-sizing: border-box;
min-width: 19rem;
position: relative;
cursor: pointer;
&:hover {
  transform: translateY(-.2rem);
  box-shadow: 0 .7rem 2rem rgba(0, 0, 0, .3);
}`;

export const FakeCard = styled.div`
opacity: 0;
display: block;
flex: 1;
min-width: 19rem;
`;

export const StyledDeleteImg = styled(DeleteImg)`
position: absolute;
top: .5rem;
right: .5rem;
`;

export const Title = styled.h3`
margin: 1rem 0;
`;

export const ContentWrap = styled.div`
font-size: .9rem;
color: gray;
`;

export const Content = styled.div`
height: 9.7rem;
white-space: pre-line;
overflow: hidden;
text-overflow: ellipsis;
margin: 1rem 0;
`;

export const Username = styled.div`
color: whitesmoke;
`;