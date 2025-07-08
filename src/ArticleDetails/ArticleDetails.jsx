import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import Loading from "../Pages/Shared/Loading/Loading";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const ArticleDetails = () => {
  const { id } = useParams();
  const axiosSecure=useAxiosSecure()
  // 👉 Fetch article data
  const { data: article, isLoading } = useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/articles/${id}`);
      return res.data;
    },
  });

  // 👉 Increase view count (once)
  useEffect(() => {
    axiosSecure.patch(`/articles/${id}`);
    
  }, [axiosSecure,id]);

  if(isLoading) return <Loading/>
  console.log("thisis article",article);
  return (
    <div>
      <h1 className="text-2xl text-center py-12 font-bold">
        Article Details for id number : {id}
      </h1>
      <h2>{article?.articleTitle}</h2>
      <h3 className="btn btn-xl btn-error text-white font-bold">Views: {article?.views}</h3>
    </div>
  );
};

export default ArticleDetails;
