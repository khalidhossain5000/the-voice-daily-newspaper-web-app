import React from "react";
import { Link } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../Shared/Loading/Loading";

const ArticelsCard = ({ article }) => {
//   console.log(article);
  const {
    articleTitle,
    articlePic,
    authorPhoto,
    authorName,
    descriptions,
    tags,
    views,
    createdAt,
  } = article;
  const axiosSecure=useAxiosSecure()
  const { user } = useAuth();
  //fetch current logged in user data from mongodb FOR CHECKING PREMIUM STATS
  const { data:currentLogInUserDbData, isLoading } = useQuery({
    queryKey:['log-in-user',user?.email],
    queryFn:async ()=>{
        const res=await axiosSecure.get(`/user?email=${user?.email}`)
        return res.data
    }
  })
   
  if(isLoading) return <Loading/>
  // Check if user has active subscription
  const isUserPremium = currentLogInUserDbData?.premiumInfo && new Date(currentLogInUserDbData.premiumInfo) > new Date();

  // Check if article is premium
  const isArticlePremium = article?.isPremium === true;

  // Disable details button if article is premium but user is not premium
  const disableDetailsLink = isArticlePremium && !isUserPremium;


  return (
    <div className="bg-gray-200 rounded-xl shadow-2xl">
      <img src={articlePic} alt="" className="w-6/12" />
      <h2>{articleTitle}</h2>
      <p>{descriptions}</p>
      <h3>Publisher : {article.publisher?.label}</h3>
      <div>
        {tags.map((tag, i) => (
          <button key={i} className="btn btn-success font-bold text-black mx-1">
            Tags : {tag.label}
          </button>
        ))}
      </div>
      <h2>Author : {authorName}</h2>
      <img src={authorPhoto} alt="" />
      <button className="btn btn-md btn-warning text-black font-bold text-xl">
        Views : {views}
      </button>
      <h2>{createdAt.split("T")[0]}</h2>
      {/* <Link to={`/article/${article._id}`} className="btn btn-xl btn-neutral ">
        <button disabled={disableDetailsButton}>Details</button>
      </Link> */}
      {disableDetailsLink ? (
        <button
          disabled
          className="bg-gray-400 cursor-not-allowed px-4 py-2 rounded"
          title="Please subscribe to access this premium article"
        >
          Details
        </button>
      ) : (
        <Link
          to={`/article/${article._id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Details
        </Link>
      )}
    </div>
  );
};

export default ArticelsCard;
