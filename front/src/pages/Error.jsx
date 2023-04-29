import React from 'react';
import { useLocation } from 'react-router-dom';

const Error = () => {
    const location = useLocation();
    console.log(location)
    return <div>Error page</div>;
};

export default Error;