import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const DefaultButton = styled.button`
display: block;
color: rgb(20, 20, 20);
padding: .5rem 1rem;
background-color: darkgray;
border-radius: .5rem;
font-weight: bolder;
text-align: center;
border: none;
&:hover {
  background-color: rgb(130, 130, 130);
}`;

export const DefaultLink = styled(Link)`
display: block;
color: rgb(20, 20, 20);
padding: .5rem 1rem;
background-color: darkgray;
border-radius: .5rem;
font-weight: bolder;
text-align: center;
text-decoration-line: none;
&:hover {
  background-color: rgb(130, 130, 130);
}`;