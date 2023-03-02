import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
background-color: rgb(39, 39, 39);
width: 20rem;
`;
const StyledLink = styled(NavLink)`
display: block;
padding: 1rem;
color: whitesmoke;
border-radius: 1rem;
font-weight: bolder;
text-decoration-line: none;
&.active,
&:hover {
  color: rgb(30, 30, 30);
  background-color: darkgray;
}`;

const SideMenu = ({ links }) => {
  return <>
    <Nav>
      {links.map((v, i) => <StyledLink key={i} to={v.path}>{v.text}</StyledLink>)}
    </Nav>
  </>;
};

export default SideMenu;