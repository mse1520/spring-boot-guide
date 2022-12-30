import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
background-color: darkgray;
width: 20rem;
`;
const StyledLink = styled(Link)`
display: block;
padding: 1rem;
color: rgb(20, 20, 20);
border-radius: 1rem;
font-weight: bolder;
text-decoration-line: none;
&.active,
&:hover {
  background-color: rgb(130, 130, 130);
}`;

const Links = [
  { path: '/', text: '홈' },
  { path: '/board', text: '게시글' },
];

const SideMene = () => {
  const [path, setPath] = useState('/');

  const activeClass = useCallback(_path => _path === path ? 'active' : '', [path]);

  const onClickLink = useCallback(path => () => setPath(path), []);

  return <>
    <Nav>
      {Links.map((v, i) => <StyledLink key={i} className={activeClass(v.path)} to={v.path} onClick={onClickLink(v.path)}>{v.text}</StyledLink>)}
    </Nav>
  </>;
};

export default SideMene;