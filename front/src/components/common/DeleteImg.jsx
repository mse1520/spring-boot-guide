import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import deleteImg from '../../resources/img/x';

export const Img = styled.img`
display: block;
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

const DeleteImg = forwardRef((props, ref) => <Img ref={ref} {...props} src={deleteImg} />);

export default DeleteImg;