import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';

import MyArticlesTable from './MyArticlesTable';

const MyArticles = () => {
    const {user}=useAuth()
   
    const axiosSecure=useAxiosSecure()
    const {data:myArticles=[],isLoading,refetch}=useQuery({
        queryKey:['my-articles',user?.email],
        queryFn:async ()=>{
            const res=await axiosSecure.get(`/articles/my-articles?email=${user?.email}`)
            return res.data
        }
    })
    
    if(isLoading) return <Loading/>
    return (
        <div>

          <div className='py-24 bg-gradient-to-tr from-[#7e7dfd] via-white to-[#ffcfff]'>
            <h1 className='text-center text-3xl font-bold inter  py-6'>MY ARTICLES</h1>
          </div>
            

         

             <div className="overflow-x-auto rounded-box border border-gray-300 shadow-xl max-w-7xl mx-auto mt-6 lg:mt-12">
        <table className="table">
          {/* head */}
          <thead className='bg-gray-300'>
            <tr className="text-xl text-[#211f54] urbanist border-b border-b-gray-300 ">
              <th>#</th>
              <th>Article Title</th>
              <th>Article Details</th>
              <th>Status</th>
              <th>Is Premium</th>
              <th className='text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
                myArticles.map((ma,i)=><MyArticlesTable
                refetch={refetch}
                serial={i}
                key={ma._id}
                myArticle={ma}
                ></MyArticlesTable>)
            }
          </tbody>
        </table>
      </div>
                
            
        </div>
    );
};

export default MyArticles;