import React from 'react';
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../Shared/Loading/Loading';
//bg image import
import {bgImages} from './Data/BgImg'
//swiper js
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const TrendingArticlesSlider = () => {
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure()
    const {data:trendingArticles=[],isLoading}=useQuery({
        queryKey:['trendingArticles',user?.email],
        queryFn:async ()=>{
            const res=await axiosSecure.get('/articles/trending')
            return res.data
        }
    })
    if(isLoading) return <Loading/>
    console.log(trendingArticles);
//attaching bg images to the data
const sliderData=trendingArticles.map((article,i)=>(
    {
    ...article,
    bgImage : bgImages[i]
}
))
    return (
        <Swiper slidesPerView={1} loop autoplay={{ delay: 4000 }}>
  {sliderData.map((item, i) => (
    <SwiperSlide key={i}>
      <div
        className="h-[500px] bg-cover bg-center flex items-end text-white p-8"
        style={{ backgroundImage: `url(${item.bgImage})` }}
      >
        <div className="bg-black/60 p-4 rounded-lg w-full max-w-xl">
          <h2 className="text-3xl font-bold">{item.title}</h2>
          <p className="mt-2">{item.descriptions.slice(0, 150)}...</p>
          <p className="mt-2 text-sm text-gray-300">Views: {item.views}</p>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
    );
};

export default TrendingArticlesSlider;