import React from 'react';
import { CircleLoader } from 'react-spinners';

const FormLoading = () => {
    return (
     
            <div className=" flex bg-white inset-0 justify-center items-center">
            <CircleLoader />
        </div>
      
    );
};

export default FormLoading;