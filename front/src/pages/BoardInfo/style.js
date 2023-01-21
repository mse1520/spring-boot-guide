import styled from 'styled-components';
import { Card } from '../../styles/box';
import { DefaultButton } from '../../styles/button';
import { DefaultInput } from '../../styles/input';

export const Header = styled.header`
display: flex;
justify-content: space-between;
align-items: center;
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

export const StyledCard = styled(Card)`
box-sizing: border-box;
min-width: 19rem;
flex: 1;
position: relative;
&:hover {
  transform: translateY(-.2rem);
  box-shadow: 0 .7rem 2rem rgba(0, 0, 0, .3);
}`;

export const FakeCard = styled(StyledCard)`
opacity: 0;
`;

export const Img = styled.img`
filter: invert(100%);
max-width: 1.2rem;
max-height: 1.2rem;
cursor: pointer;
padding: .3rem;
border-radius: .5rem;
transition: .2s;
position: absolute;
top: .5rem;
right: .5rem;
&:hover {
  filter: invert(0%);
  background-color: gray;
}`;

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

export const UserName = styled.div`
color: whitesmoke;
`;