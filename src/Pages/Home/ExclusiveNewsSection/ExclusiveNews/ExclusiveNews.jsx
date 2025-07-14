import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../../../Hooks/useAxios";
import Loading from "../../../Shared/Loading/Loading";
import ExclusiveCardBig from "../ExclusiveNewsCard/ExclusiveCardBig";
import ExclusiveCardMini from "../ExclusiveNewsCard/ExclusiveCardMini";

const ExclusiveNews = () => {
  const axiosInstance = useAxios();
  const { data: exclusiveNews = [], isLoading } = useQuery({
    queryKey: ["exclusiveNews"],
    queryFn: async () => {
      const res = await axiosInstance.get("/articles/exclusive");
      return res.data;
    },
  });

  const mainNews = exclusiveNews[0];
  const sideNews = exclusiveNews.slice(1, 5);
  if (isLoading) return <Loading />;
  return (
    <div className="py-24 bg-[#ffffff]">
      <h1 className="text-5xl lg:text-6xl text-center font-bold text-[#211f54]">
        Exclusive News
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 max-w-[1500px] mx-auto my-12 lg:my-22 shadow-xl p-3 lg:p-5">
        {/* Left Side Big Card */}
        <div className="lg:flex-1 bg-white">
          <ExclusiveCardBig news={mainNews} />
        </div>

        {/* Right Side Small Cards */}
        <div className="lg:flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {sideNews.map((news) => (
            <ExclusiveCardMini key={news._id} news={news} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExclusiveNews;
