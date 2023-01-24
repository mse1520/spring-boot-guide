import React, { forwardRef } from 'react';
import styled from 'styled-components';
import deleteImg from '../../resources/img/x.png';

export const Img = styled.img`
filter: invert(100%);
max-width: 1.2rem;
max-height: 1.2rem;
cursor: pointer;
padding: .3rem;
border-radius: .5rem;
transition: .2s;
&:hover {
  filter: invert(0%);
  background-color: gray;
}`;

const DeleteButton = forwardRef((props, ref) => <Img ref={ref} {...props} src={deleteImg} />);

export default DeleteButton;