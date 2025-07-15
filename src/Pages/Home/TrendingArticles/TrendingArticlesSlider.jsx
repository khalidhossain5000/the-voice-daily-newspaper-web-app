import React from "react";

import { Link  } from 'react-router';
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../Shared/Loading/Loading";

import { bgImages } from "./Data/BgImg";

import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import useAxios from "../../../Hooks/useAxios";
import { FaGripfire } from "react-icons/fa";


const TrendingArticlesSlider = () => {
  const { user } = useAuth();
  const axionsInstance = useAxios()
  const { data: trendingArticles = [], isPending } = useQuery({
    queryKey: ["trendingArticles", user?.email],
    queryFn: async () => {
      const res = await axionsInstance.get("/articles/trending");
      return res.data;
    },
  });
   

 


  if (isPending) return <Loading />;


  // console.log(trendingArticles);
  //attaching bg images to the data
  const sliderData = trendingArticles.map((article, i) => ({
    ...article,
    bgImage: bgImages[i],
  }));
  return (
    <Swiper 
        modules={[Navigation, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        loop={true}
        autoplay={{ delay: 5000 }}
    >
      {sliderData.map((item, i) => (
        <SwiperSlide key={i}>
          <div
            className="h-[100vh] lg:h-[calc(100vh-80px)] bg-cover bg-center  text-white p-4 md:p-9 lg:px-24 pb-24"
            style={{ backgroundImage: `url(${item.bgImage})` }}
          >
            <div className="shadow-xl shadow-blue-300 lg:ml-36 w-full lg:w-[600px] bg-white p-5 md:p-9 rounded-xl ">
              <div className="w-22 badgete bg-red-600 shadow-2xl rounded-xl p-1 lg:max-w-36 text-center">
                <h2 className="lg:text-xl font-medium inter md:font-bold">Trending</h2>
                
              </div>
              <div className="crd">
                  <div className="author-info text-gray-600 flex justify-between md:justify-between gap-3 py-2 md:py-3">
                    <p className="md:text-xl font-medium md:font-bold">{item?.createdAt.split('T')[0]}</p>
                    <h2 className="text-cyan-500 md:text-xl font-medium md:font-bold">By {item?.authorName}</h2>
                  </div>
                  <div className="imgs w-full ">
                    <img src={item?.articlePic} className="mx-auto w-full lg:w-full shadow-xl rounded-xl h-[300px]" alt="" />
                  </div>
                  <div className="contents playfair-display">
                    <h1 className="truncate md:text-2xl font-bold text-gray-900 py-2 lg:py-3">{item?.articleTitle}</h1>

                    <p className="text-gray-600 font-bold md:font-medium md:text-xl line-clamp-2">{item?.descriptions}</p>
                    {/* publsiher and view count show */}
                    <div className="publisherviews py-3 lg:py-5 flex items-center justify-between ">
                      <h3 className="text-[#f00] font-medium flex items-center urbanist text-[13px] md:text-sm"><FaGripfire className="text-xl text-[#f00]"/>{item?.views}Views</h3>
                      <h3 className="text-gray-700 md:text-xl font-medium urbanist">Publisher : {item?.publisher.label}</h3>
                    </div>
                  {/* tags show
                  <div className="space-x-6 flex items-center py-6">
                    <p className="text-cyan-500 font-bold text-2xl">Tags:</p>
                    {
                      item?.tags.map((tag,i)=><button
                      key={i}
                      className="btn btn-md btn-warning font-bold text-black"
                      > {tag.label}</button>)
                    }
                  </div> */}
                  <div className="mx-auto text-center">
                    <Link className="mt-3 px-6 lg:px-12 py-2 lg:py-3 rounded-sm shadow-md bg-[#16b7cc] w-full md:text-xl font-bold text-white" to={`/article/${item?._id}`}>Read More</Link>
                  </div>
                  </div>
                </div>
            </div>
          </div>
        </SwiperSlide>
        
      ))}
    </Swiper>
  );
};

export default TrendingArticlesSlider;
