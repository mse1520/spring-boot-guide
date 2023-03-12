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
min-height: 2.4rem;
&:autofill {
  box-shadow: 0 0 0 1.5rem whitesmoke inset; 
  -webkit-text-fill-color: rgb(30, 30, 30);
}`;