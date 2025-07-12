import React from 'react';
import { Link } from 'react-router';

const ArticelsCard = ({article}) => {
    console.log(article);
    const {articleTitle,articlePic,authorPhoto,authorName,descriptions,
tags,views,createdAt}=article
    return (
        <div className='bg-gray-200 rounded-xl shadow-2xl'>
            <img src={articlePic} alt="" className='w-6/12'/>
            <h2>{articleTitle}</h2>
            <p>{descriptions}</p>
            <h3>Publisher : {article.publisher?.label}</h3>
            <div>
                {
                    tags.map((tag,i)=><button
                    key={i}
                    className='btn btn-success font-bold text-black mx-1'
                    >Tags : {tag.label}</button>)
                }
            </div>
            <h2>Author : {authorName}</h2>
            <img src={authorPhoto} alt="" />
            <button className='btn btn-md btn-warning text-black font-bold text-xl'>Views : {views}</button>
            <h2>{createdAt.split('T')[0]}</h2>
            <Link to={`/article/${article._id}`} className='btn btn-xl btn-neutral '>Details</Link>
        </div>
    );
};

export default ArticelsCard;