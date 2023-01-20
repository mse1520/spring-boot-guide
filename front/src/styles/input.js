import styled from 'styled-components';

export const DefaultInput = styled.input`
display: block;
width: 100%;
box-sizing: border-box;
padding: .5rem;
border-radius: .5rem;
border: none;
font-size: 1rem;
background-color: whitesmoke;
`;

export const DefaultTextarea = styled.div`
background-color: whitesmoke;
color: rgb(30, 30, 30);
width: 100%;
box-sizing: border-box;
padding: .5rem;
border-radius: .5rem;
font-size: 1rem;
margin: 1rem 0;
min-height: 20rem;
&[placeholder]:empty:before {
  content: attr(placeholder);
  color: dimgray;
}`;