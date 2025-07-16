import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import Loading from "../Shared/Loading/Loading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaFire } from "react-icons/fa";

const ArticleDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  // Fetch article data
  const {
    data: article,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/articles/${id}`);
      return res.data;
    },
  });

  //  Increase view count (once)
  useEffect(() => {
    axiosSecure
      .patch(`/articles/view/${id}`)
      .then(() => {})
      .then(() => refetch());
  }, [axiosSecure, id, refetch]);

  if (isLoading) return <Loading />;
console.log(article?.publisher?.label);
  // console.log("thisis article",article);
  return (
    <div>
      {/* <h1 className="text-2xl text-center py-12 font-bold">
        Article Details for id number : {id}
      </h1> */}
      <div className="bg-[#f4f7ff] p-12 lg:p-20">
        <div className="imgandtitle max-w-7xl lg:max-w-[1500px]  flex flex-col lg:flex-row items-center justify-center mx-auto">
          <div className="flex-1">
            <div className="border-l-3 border-l-cyan-500 px-3 lg:ml-2  my-6 lg:my-14 ">
              <div className="flex items-center justify-center lg:justify-start">
                <h2 className="text-gray-900 lg:text-xl font-bold">
                By : {article.authorName} On{" "}
              </h2>
              <h2 className="text-gray-700 font-bold mx-2 text-[17px]">
                {new Date(article?.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h2>
              </div>

              <h3 className="text-xl flex items-center justify-center lg:justify-start font-bold text-red-600 mt-3 lg:mt-6"><FaFire className="text-xl mx-2"/> Views: {article?.views}</h3>
            </div>
            <h2 className="inter font-extrabold text-2xl text-center lg:text-left mb-6 lg:mb-0 lg:text-6xl text-[#211f54]">
              {article?.articleTitle}
            </h2>
          </div>
          <img
            src={article?.articlePic}
            className="flex-1 w-full shadow-xl"
            alt=""
          />
        </div>
      </div>
     

      <div className="setails bg-[#031d35] p-3 lg:p-20 ">
        <div className=" lg:p-12 max-w-7xl mx-auto gap-3 lg:gap-6 text-white flex flex-col lg:flex-row ">
          <div className="lg:flex-2 descripitosn bg-[#1c2c59] p-6 w-full">
            <h2 className="text-xl font-bold  mb-3 text-cyan-400">Descriptions : </h2>
            <p className="text-xl">{article?.descriptions}</p>
          </div>
          <div className="lg:flex-1 tagspubs clear-start bg-[#0a2b4a] rounded-md shadow-2xl max-h-96">
            <div className="tgs p-6 lg:px-9 text-cener">
              <h2 className="text-xl font-bold text-white mb-3">Tags</h2>

              {article?.tags.map((tag, i) => (
                <span
                  key={i}
                  className="
        inline-flex items-center
        px-3 py-1.5
        rounded-full
        bg-white/20
        text-white
        font-medium text-sm
        tracking-wide
        border border-white/30
        hover:bg-white/30
        transition
        duration-200
        cursor-pointer
      "
                >
                  #{tag.label}
                </span>
              ))}
            </div>
            <div className="pubgs p-6 lg:px-9">
              <h2 className="text-xl font-bold text-white mb-3">Publisher</h2>
              
              <button className="bg-gradient-to-br from-[#facc15] via-[#fbbf24] to-[#d97706] px-6 py-3 text-black font-bold rounded-xl">{article?.publisher?.label}</button>
              

            </div>

            
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default ArticleDetails;
