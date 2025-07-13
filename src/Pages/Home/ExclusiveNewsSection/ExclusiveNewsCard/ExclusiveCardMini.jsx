import React from "react";
import { Link } from "react-router";

const ExclusiveCardMini = ({ news }) => {
  return (
    <Link to={`/article/${news?._id}`}>
      <div className="flex flex-col">
        <img
          src={news.articlePic}
          className="w-full h-[200px] object-cover "
          alt={news.articleTitle}
        />
        <p className="text-xl my-3 mt-2 font-semibold uppercase text-gray-900">
          {news.publisher?.label}
        </p>
        <h3 className="font-bold text-md leading-5 mt-1">
          <span className="bg-red-600 text-white text-md px-2 py-[1px] rounded mr-1">
            EXCLUSIVE
          </span>
          {news.articleTitle}
        </h3>
      </div>
    </Link>
  );
};

export default ExclusiveCardMini;
