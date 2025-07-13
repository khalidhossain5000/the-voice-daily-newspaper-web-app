import React from "react";
import { Link  } from 'react-router';
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Shared/Loading/Loading";
//bg image import
import { bgImages } from "./Data/BgImg";
//swiper js
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
const TrendingArticlesSlider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: trendingArticles = [], isLoading } = useQuery({
    queryKey: ["trendingArticles", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/articles/trending");
      return res.data;
    },
  });
  if (isLoading) return <Loading />;
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
            className="h-[100vh] lg:h-[calc(100vh-80px)] bg-cover bg-center  text-white p-9 lg:px-24 pb-24"
            style={{ backgroundImage: `url(${item.bgImage})` }}
          >
            <div className="shadow-xl shadow-blue-300 lg:ml-36 max-w-3xl lg:w-[600px] bg-white p-9 rounded-xl ">
              <div className="badgete bg-red-600 shadow-2xl rounded-xl p-1 max-w-36 text-center">
                <h2 className="text-xl font-bold">Trending</h2>
              </div>
              <div className="crd">
                  <div className="author-info text-gray-600 flex gap-3 py-3">
                    <p className="text-xl font-bold">{item?.createdAt.split('T')[0]}</p>
                    <h2 className="text-cyan-500 text-xl font-bold">By {item?.authorName}</h2>
                  </div>
                  <div className="imgs border w-full ">
                    <img src={item?.articlePic} className="mx-auto max-w-9/12 lg:w-full shadow-xl rounded-xl" alt="" />
                  </div>
                  <div className="contents">
                    <h1 className="truncate text-2xl font-bold text-gray-900 py-2 lg:py-3">{item?.articleTitle}</h1>

                    <p className="text-gray-600 font-medium text-xl line-clamp-2">{item?.descriptions}</p>
                    {/* publsiher and view count show */}
                    <div className="publisherviews py-3 lg:py-5 flex items-center justify-between ">
                      <button className="btn btn-md btn-warning font-bold text-black">Views : {item?.views}</button>
                      <button className="btn btn-md btn-warning font-bold text-black">Publisher : {item?.publisher.label}</button>
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
                  <Link className="btn btn-xl w-full text-xl font-bold text-black btn-info " to={`/article/${item?._id}`}>Read More</Link>
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
