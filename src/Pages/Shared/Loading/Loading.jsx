import React from 'react';
import { PropagateLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div className="min-h-screen flex bg-white inset-0 justify-center items-center">
            <PropagateLoader />
        </div>
    );
};

export default Loading;