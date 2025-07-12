import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../Shared/Loading/Loading';

const MyProfile = () => {
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure()
     const { data:currentUserFromDbData, isLoading } = useQuery({
    queryKey:['log-in-user',user?.email],
    queryFn:async ()=>{
        const res=await axiosSecure.get(`/user?email=${user?.email}`)
        return res.data
    }
  })
//   const isPremiumUser=currentUserFromDbData?.premiumInfo
//   console.log(isPremiumUser);
  if (isLoading) return <Loading/>
    return (
        <div className='w-5xl mx-auto bg-gray-200 rounded-2xl shadow-2xl p-9'>
            <img src={user?.photoURL} alt="" className='w-56 rounded-xl p-5 ' />
            <h1 className='text-center py-12 text-3xl font-bold'>{user?.displayName}</h1>
            <h2 className='text-xl font-bold text-green'>Email: {user?.email}</h2>
            <h2 className='text-xl font-bold text-black'>Role: {currentUserFromDbData?.role}</h2>
            <h2 className='py-2 text-blue-600 font-bold'>Premium Status : {currentUserFromDbData?.premiumInfo || 'null'}</h2>
        </div>
    );
};

export default MyProfile;