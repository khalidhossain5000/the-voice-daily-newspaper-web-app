import React from 'react';

const ArticelsCard = ({article}) => {
    const {articleTitle}=article
    return (
        <div>
            <h2 className='text-xl font-bold text-black text-center'>{articleTitle}</h2>
        </div>
    );
};

export default ArticelsCard;