import React from 'react';
import { Link } from 'react-router';

const ArticelsCard = ({article}) => {
    console.log(article);
    const {articleTitle,articlePic,authorPhoto,authorName,descriptions,
tags,views,createdAt}=article
    return (
        <div className='max-w-7xl mx-auto'>
            <img src={articlePic} alt="" className='w-6/12'/>
            <h2>{articleTitle}</h2>
            <p>{descriptions}</p>
            <h3>Publisher : {article.publisher?.label}</h3>
            <div>
                {
                    tags.map((tag,i)=><button
                    key={i}
                    className='btn btn-success mx-1'
                    >Tags : {tag.label}</button>)
                }
            </div>
            <h2>Author : {authorName}</h2>
            <img src={authorPhoto} alt="" />
            <button className='btn btn-md w-3/12 btn-warning text-white text-xl'>Views : {views}</button>
            <h2>{createdAt.split('T')[0]}</h2>
            <Link to={`/article/${article._id}`} className='btn btn-xl btn-neutral '>Details</Link>
        </div>
    );
};

export default ArticelsCard;