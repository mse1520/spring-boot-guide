import React, { forwardRef } from 'react';
import styled from '@emotion/styled';

const StyledTextarea = styled.div`
background-color: whitesmoke;
color: rgb(30, 30, 30);
width: 100%;
box-sizing: border-box;
padding: .5rem;
border-radius: .5rem;
font-size: 1rem;
min-height: 2.4rem;
white-space: pre-wrap;
overflow-wrap: break-word;
word-break: break-all;
&[placeholder]:empty:before {
  content: attr(placeholder);
  color: dimgray;
}`;

const Textarea = forwardRef((props, ref) => <StyledTextarea contentEditable suppressContentEditableWarning ref={ref} {...props} />);

export default Textarea;