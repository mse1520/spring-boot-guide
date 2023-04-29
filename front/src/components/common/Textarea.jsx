import React, { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react';
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
    const childEl = wrapRef.current.querySelector('div');
    if (childEl.value === undefined) childEl.value = childEl.innerText;
    if (childEl.innerText !== (props.value ?? '')) {
      childEl.innerText = props.value;
      childEl.value = childEl.innerText;
    }
  }, [props.value]);

  const onInput = useCallback(e => {
    e.target.value = e.target.innerText;
    props.onChange?.(e);
  }, [props.onChange]);

  const initValue = useMemo(() => props.value ?? '', []);

  return <>
    <Wrap ref={wrapRef}>
      <Div {...props} contentEditable suppressContentEditableWarning ref={ref} onInput={onInput}>{initValue}</Div>
    </Wrap>
  </>;
});

export default Textarea;