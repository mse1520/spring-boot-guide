import React, { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import DeleteImg from '../common/DeleteImg';

const Button = styled.button`
position: absolute;
top: 0;
margin: 1rem;
`;
const Nav = styled.nav`
background-color: rgb(39, 39, 39);
min-width: 20rem;
height: 100%;
transition: .2s;
overflow: hidden;
white-space: nowrap;
&.active {
  min-width: 3.2rem;
  width: 3.2rem;
}`;
const StyledDeleteImg = styled(DeleteImg)`
padding: 0;
padding-right: 1rem;
`;
const StyledLink = styled(NavLink)`
display: flex;
align-items: center;
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
  const [active, setActive] = useState('');

  const onClickActive = useCallback(() => setActive(active === 'active' ? '' : 'active'), [active]);

  return <>
    <Button onClick={onClickActive}>테스트</Button>
    <Nav className={active}>
      {links.map((v, i) =>
        <StyledLink key={i} to={v.path}>
          <StyledDeleteImg />
          <span>{v.text}</span>
        </StyledLink>)}
    </Nav>
  </>;
};

export default SideMenu;