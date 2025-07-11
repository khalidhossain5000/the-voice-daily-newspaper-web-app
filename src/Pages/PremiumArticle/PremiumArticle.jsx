import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Shared/Loading/Loading';
import PremiumArticleCard from './PremiumArticleCard';

const PremiumArticle = () => {
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure()

    const {data:premiumArticles=[],isLoading}=useQuery({
        queryKey:['premiumArticles',user?.email],
        queryFn:async()=>{
            const res=await axiosSecure.get('/articles/premium')

            return res.data
        }
    })
console.log(premiumArticles);
    if(isLoading) return <Loading/>
    return (
        <div>
            <h1 className='text-center text-5xl font-bold py-12'>Premium Articles</h1>
            {
                premiumArticles.map((pa)=><PremiumArticleCard
                key={pa._id}
                premiumArticle={pa}
                ></PremiumArticleCard>)
            }
        </div>
    );
};

export default PremiumArticle;