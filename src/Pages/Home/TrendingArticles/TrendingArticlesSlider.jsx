import React from "react";
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
  console.log(trendingArticles);
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
          <divgit a
            className="h-[100vh] lg:h-[calc(100vh-100px)] bg-cover bg-center flex items-end text-white p-9 lg:p-24"
            style={{ backgroundImage: `url(${item.bgImage})` }}
          >
            <div className="bg-white py-[35px] px-[30px] max-w-full lg:max-w-[450px] lg:ml-20 shadow-2xl lg:h-[460px]">
                
              <h2 className="lg:text-3xl text-[#1a1a1a] font-bold">{item.articleTitle}</h2>
              <img src={item?.articlePic} className="w-5/12 lg:w-5/12 rounded-md" alt="" />
              <h2 className="lg:text-xl font-bold text-red-600">Publisher:{item?.publisher?.label}</h2>
              <h3>Tags: {item?.tags.map((tag,i)=><button
              className='btn btn-warning btn-md mx-1'
              key={i}
              >{tag?.label}</button>)}</h3>
              <p className="mt-2 text-blue-600">{item?.descriptions.slice(0, 150)}...</p>
              <p className="mt-2 text-sm text-red-600">Views: {item.views}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TrendingArticlesSlider;
