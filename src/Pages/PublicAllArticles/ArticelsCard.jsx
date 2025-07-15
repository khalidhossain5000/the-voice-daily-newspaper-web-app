import React from "react";
import { Link } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../Shared/Loading/Loading";
import { MdWorkspacePremium } from "react-icons/md";

const ArticelsCard = ({ article }) => {
  //   console.log(article);
  const {
    articleTitle,
    articlePic,
    // authorPhoto,
    authorName,
    descriptions,
    // tags,
    // views,
    createdAt,
    _id,
  } = article;
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  //fetch current logged in user data from mongodb FOR CHECKING PREMIUM STATS
  const { data: currentLogInUserDbData, isPending } = useQuery({
    queryKey: ["log-in-user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user?.email}`);
      return res.data;
    },
  });

  if (isPending) return <Loading />;
  // Check if user has active subscription
  const isUserPremium =
    currentLogInUserDbData?.premiumInfo &&
    new Date(currentLogInUserDbData.premiumInfo) > new Date();

  // Check if article is premium
  const isArticlePremium = article?.isPremium === true;

  // Disable details button if article is premium but user is not premium
  const disableDetailsLink = isArticlePremium && !isUserPremium;

  return (
    <div>
      {isArticlePremium ? (
        <div className="h-full bg-gradient-to-br from-[#facc15] via-[#fbbf24] to-[#d97706] text-[#211f54] shadow-2xl w-full mx-auto relative overflow-hidden border border-yellow-400 hover:scale-105 transition-transform duration-300">
          <div className="absolute top-4 left-4">
            <div className="bg-[#211f54] text-yellow-300 px-3 py-1 text-xs font-bold rounded-full shadow-lg uppercase tracking-wider ring-2 ring-yellow-400 flex items-center">
              <MdWorkspacePremium className="text-xl" /> Premium
            </div>
          </div>
          <img
            src={articlePic}
            className="max-h-60 lg:h-96 w-full"
            alt={articleTitle}
          />
          <div className="contentds p-6 urbanist mt-6">
            <h3 className="text-[#211f54]  text-xl font-medium">
              <span className="font-bold">Publisher</span> :{" "}
              {article.publisher?.label}
            </h3>
            <h2 className="text-[#211f54] font-bold  text-xl  py-2 lg:py-4 playfair-display">
              {articleTitle}
            </h2>
            <p className="line-clamp-3 text-md text-gray-800 font-normal">
              {descriptions}
            </p>

            <div className="dateandauthor flex items-center justify-between py-2 lg:py-5">
              <h2 className="text-gray-900 font-bold">By {authorName}</h2>
              <h2 className="text-gray-900 font-bold">
                {new Date(createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h2>
            </div>
            <div className="mx-auto text-center">
              {disableDetailsLink ? (
                <button
                  disabled
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed select-none border border-gray-600  transition text-black font-bold"
                  title="Please subscribe to access this premium article text-black"
                >
                  Details
                </button>
              ) : (
                <Link
                  className="mt-3 px-6 lg:px-12 py-2 lg:py-3 rounded-sm shadow-md bg-[#16b7cc] w-full md:text-xl font-bold text-white"
                  to={`/article/${_id}`}
                >
                  Read More
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-200 rounded-xl shadow-2xl h-full flex flex-col shadow-gray-600 ">
          <img
            src={articlePic}
            className="max-h-60 lg:h-96"
            alt={articleTitle}
          />

          <div className="contentds p-6 urbanist mt-6 flex flex-col justify-between flex-grow">
            <div>
              <h3 className="text-[#211f54]  text-xl font-medium">
                <span className="font-bold">Publisher</span> :{" "}
                {article.publisher?.label}
              </h3>
              <h2 className="text-[#211f54]  text-xl font-medium py-2 lg:py-4 playfair-display">
                {articleTitle}
              </h2>
              <p className="line-clamp-3 text-md text-gray-800 font-normal">
                {descriptions}
              </p>

              <div className="dateandauthor flex items-center justify-between py-2 lg:py-5">
                <h2 className="text-gray-600 font-bold">By {authorName}</h2>
                <h2 className="text-gray-600 font-bold">
                  {new Date(createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h2>
              </div>
            </div>

            <div className="mx-auto text-center pb-3">
              {disableDetailsLink ? (
                <button
                  disabled
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed select-none border border-gray-600  transition text-black font-bold"
                  title="Please subscribe to access this premium article text-black"
                >
                  Details
                </button>
              ) : (
                <Link
                  className="mt-3 px-6 lg:px-12 py-2 lg:py-3 rounded-sm shadow-md bg-[#16b7cc] w-full md:text-xl font-bold text-white"
                  to={`/article/${_id}`}
                >
                  Read More
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MAIN PREMIUM CARD */}
    </div>
  );
};

export default ArticelsCard;
