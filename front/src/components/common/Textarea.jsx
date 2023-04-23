import React, { forwardRef, useCallback, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

const Wrap = styled.div`
width: 100%;
`;
const Div = styled.div`
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

const Textarea = forwardRef((props, ref) => {
  const wrapRef = useRef();

  useEffect(() => {
    const wrapEl = wrapRef.current.querySelector('div');
    if (wrapEl.innerText !== (props.value ?? '')) wrapEl.innerText = props.value;
  }, [props.value]);

  const onInput = useCallback(e => {
    e.target.value = e.target.innerText;
    props.onChange?.(e);
  }, [props.onChange]);

  return <>
    <Wrap ref={wrapRef}>
      <Div {...props} contentEditable suppressContentEditableWarning ref={ref} onInput={onInput} defaultValue={props.value} />
    </Wrap>
  </>;
});

export default Textarea;