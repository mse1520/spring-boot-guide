import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const DefaultButton = styled.button`
display: block;
color: rgb(30, 30, 30);
padding: .5rem 1rem;
background-color: darkgray;
border-radius: .5rem;
font-weight: bolder;
text-align: center;
border: none;
font-size: 1rem;
&:hover {
  background-color: dimgray;
}`;

export const DefaultLink = styled(Link)`
display: block;
color: rgb(30, 30, 30);
padding: .5rem 1rem;
background-color: darkgray;
border-radius: .5rem;
font-weight: bolder;
text-align: center;
text-decoration-line: none;
font-size: 1rem;
&:hover {
  background-color: dimgray;
}`;