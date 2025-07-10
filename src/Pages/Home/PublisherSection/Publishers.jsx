import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import PublisherCard from './PublisherCard';

const Publishers = () => {
    const axiosSecure=useAxiosSecure()
      const {user}=useAuth()
      //getting publisher data from db 
        const { data: publishers = [], isLoading } = useQuery({
        queryKey: ["publishers",user?.email],
        queryFn: async () => {
          const res = await axiosSecure.get("/publishers");
          return res.data;
        },
      });
      if(isLoading) return <h2>Loaidnggggggg......</h2>
    return (
        <div>
            <h2 className='text-center text-3xl font-bold py-24'>All Publishers</h2>
            <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6'>
                {
                    publishers.map((publisher)=><PublisherCard
                    key={publisher._id}
                    publisher={publisher}
                    ></PublisherCard>)
                }
            </div>
        </div>
    );
};

export default Publishers;