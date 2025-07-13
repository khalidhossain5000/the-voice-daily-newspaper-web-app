import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Publishers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  //getting publisher data from db
  const { data: publishers = [], isLoading } = useQuery({
    queryKey: ["publishers", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/publishers");
      return res.data;
    },
  });
  if (isLoading) return <h2>Loaidnggggggg......</h2>;
  return (
    <div className="py-24">
      <h2 className="text-center text-3xl font-bold py-12">All Publishers</h2>
      <div className="my-8 px-4">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {publishers.map((publisher) => (
            <SwiperSlide key={publisher._id}>
              <div className="bg-white shadow-md rounded-lg flex flex-col items-center p-4 gap-2">
                <img
                  src={publisher?.publisherPic}
                  alt={publisher.name}
                  className="w-20 h-20 object-contain"
                />
                <h2 className="text-center font-semibold">
                  {publisher?.publisherName}
                </h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Publishers;
