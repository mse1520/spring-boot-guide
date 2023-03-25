import React, { useState } from 'react';

const Test = () => {
    const [state, setState] = useState(0);
    const onClick = () => {
        setState(state + 1);
    };

    return <>
        <div>테스트페이지 {state}</div>
        <button onClick={onClick}>버튼</button>
    </>;
};

export default Test;