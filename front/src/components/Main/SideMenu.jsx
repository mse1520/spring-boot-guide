import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const IMG_WIDTH = '1.2rem';
const IMG_PADDING = '.3rem';
const LINK_PADDING = '1rem';
const IMG_SIZE = `calc(${IMG_WIDTH} + 2 * ${IMG_PADDING} + 2 * ${LINK_PADDING})`;

const open = keyframes`
from {
  width: ${IMG_SIZE};
  min-width: 0;
}
to {
  min-width: 20rem;
  width: auto;
}`;
const close = keyframes`
from {
  min-width: 20rem;
  width: auto;
}
to {
  width: ${IMG_SIZE};
  min-width: 0;
}`;
const Nav = styled.nav`
background-color: rgb(39, 39, 39);
height: 100%;
overflow: hidden;
white-space: nowrap;
animation: ${close} .2s forwards;
&.active {
  animation: ${open} .2s forwards;
}`;
const Img = styled.img`
padding: ${IMG_PADDING};
padding-right: 1.5rem;
display: block;
filter: invert(100%);
max-width: ${IMG_WIDTH};
max-height: ${IMG_WIDTH};
`;
const StyledLink = styled(NavLink)`
display: flex;
align-items: center;
padding: ${LINK_PADDING};
color: whitesmoke;
border-radius: 1rem;
font-weight: bolder;
text-decoration-line: none;
&.active,
&:hover {
  color: rgb(30, 30, 30);
  background-color: darkgray;
}
&.active img,
&:hover img {
  filter: none;
}`;

const SideMenu = ({ links, active = true }) => {
  const _active = useMemo(() => active ? 'active' : '', [active]);

  return <>
    <Nav className={_active}>
      {links.map((link, i) =>
        <StyledLink key={i} to={link.path}>
          <Img src={link.img} />
          <span>{link.text}</span>
        </StyledLink>)}
    </Nav>
  </>;
};

export default SideMenu;