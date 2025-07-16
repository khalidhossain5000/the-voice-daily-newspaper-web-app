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
        <div className='bg-[#e8efef] py-12'>
             <h1 className="text-center text-3xl lg:text-5xl font-bold text-[#211f54] py-12 ">Premium Articles</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto py-12 gap-6'>
                {
                premiumArticles.map((pa)=><PremiumArticleCard
                key={pa._id}
                premiumArticle={pa}
                ></PremiumArticleCard>)
            }
            </div>
        </div>
    );
};

export default PremiumArticle;