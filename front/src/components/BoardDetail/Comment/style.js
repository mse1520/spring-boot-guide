import styled from 'styled-components';
import DeleteImg from '../../common/DeleteImg';
import ModifyImg from '../../common/ModifyImg';

export const CardWrap = styled.div`
margin: 1rem 0;
display: flex;
align-items: end;
gap: .3rem;
`;

export const ButtonWrap = styled.div`
margin-bottom: .5rem;
`;

export const StyledModifyImg = styled(ModifyImg)`
max-width: 1rem;
max-height: 1rem;
&:hover {
  filter: invert(50%);
  background-color: transparent;
}`;

export const StyledDeleteImg = styled(DeleteImg)`
max-width: 1rem;
max-height: 1rem;
&:hover {
  filter: invert(50%);
  background-color: transparent;
}`;

export const Card = styled.div`
box-shadow: 0 0.3rem .5rem rgba(0, 0, 0, .3);
background-color: whitesmoke;
color: rgb(30, 30, 30);
font-size: .9rem;
padding: 1rem;
border-radius: 1rem;
`;

export const Username = styled.div`
font-weight: bolder;
`;

export const Content = styled.div`
white-space: pre-wrap;
margin: .5rem 0;
`;

export const DateTime = styled.div`
color: gray;
`;