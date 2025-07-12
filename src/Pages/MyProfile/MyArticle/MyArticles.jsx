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
    gi
    if(isLoading) return <Loading/>
    return (
        <div>
            <h1 className='text-center text-3xl font-bold py-12'>MY ARTICLES</h1>

            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-full">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Article Title</th>
              <th>Article Details</th>
              <th>Status</th>
              <th>Is Premium</th>
              <th>Actions</th>
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