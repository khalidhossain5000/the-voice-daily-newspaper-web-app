import React from 'react';

import { useQuery } from "@tanstack/react-query";


import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Loading from '../Shared/Loading/Loading';
import ArticelsCard from './ArticelsCard';


const PublicAllArticles = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: atricles = [], isLoading } = useQuery({
    queryKey: ["articles", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/articles/approved");
      return res.data;
    },
  });
  
 
  if (isLoading) return <Loading />;
    return (
        <div>
            <div>
                {
                    atricles.map((article)=><ArticelsCard
                    key={article._id}
                    article={article}
                    ></ArticelsCard>)
                }
            </div>
        </div>
    );
};

export default PublicAllArticles;