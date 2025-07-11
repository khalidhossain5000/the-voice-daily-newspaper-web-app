import React from 'react';

const PremiumArticleCard = ({premiumArticle}) => {
    const {articleTitle}=premiumArticle
    return (
        <div>
            <h1 className='text-center font-bold text-4xl py-24'>{articleTitle}</h1>
        </div>
    );
};

export default PremiumArticleCard;