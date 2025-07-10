import React from 'react';

const PublisherCard = ({publisher}) => {
    const {publisherName,publisherPic}=publisher
    return (
        <div className='card '>
            <img src={publisherPic} alt="" className='w-14 h-14' />
            <h2 className='text-xl font-bold py-2'>{publisherName}</h2>
        </div>
    );
};

export default PublisherCard;