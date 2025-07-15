import React from "react";
import { MdWorkspacePremium } from "react-icons/md";
import { Link } from "react-router";

const PremiumArticleCard = ({ premiumArticle }) => {
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
  } = premiumArticle;
  return (
    <div>
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
            {premiumArticle.publisher?.label}
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
            <Link
              className="mt-3 px-6 lg:px-12 py-2 lg:py-3 rounded-sm shadow-md bg-[#16b7cc] w-full md:text-xl font-bold text-white"
              to={`/article/${_id}`}
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumArticleCard;
