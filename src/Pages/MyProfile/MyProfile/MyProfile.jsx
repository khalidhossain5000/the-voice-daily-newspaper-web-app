import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Shared/Loading/Loading";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: currentUserFromDbData, isLoading } = useQuery({
    queryKey: ["log-in-user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user?.email}`);
      return res.data;
    },
  });
  //   const isPremiumUser=currentUserFromDbData?.premiumInfo
  //   console.log(isPremiumUser);
  if (isLoading) return <Loading />
  return (
    <div className="w-full mx-auto bg-[#e4ebeb] rounded-2xl shadow-2xl pb-12">
      <div className="relative z-10 bg-[url('assets/background/another-bg.jpg')] bg-no-repeat bg-cover h-[200px] md:h-[500px] bg-top-right"></div>

      <div className="info bg-white max-w-7xl shadow-2xl rounded-2xl mx-auto  relative p-6 pb-12 lg:pb-20 lg:px-12">
        <div className="imgname flex flex-col lg:flex-row items-center gap-6">
          <img
            src={user?.photoURL}
            alt=""
            className="lg:-mt-24 lg:z-30 relative w-24 shadow-md rounded-full lg:w-64 lg:rounded-[100px] p-2 lg:p-5 bg-transparent"
          />
          <div>
            <h1 className="text-center py-3 lg:text-3xl text-[#030214] font-bold">
              {user?.displayName}
            </h1>
            <h2 className="text-xl font-bold text-green">
              Email: {user?.email}
            </h2>
          </div>
        </div>

        
        <div className="mt-12 space-y-2 bg-white/90 p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col lg:flex-row items-center justify-around">
          <h2 className="text-lg lg:text-xl font-semibold text-[#211f54] tracking-wide">
            Role:{" "}
            <span className="font-bold text-gray-900">
              {currentUserFromDbData?.role}
            </span>
          </h2>

          <h2 className="text-sm lg:text-base font-semibold text-[#211f54] tracking-wide">
            Premium Status:{" "}
            <span
              className={`ml-1 font-bold px-3 py-1 rounded-full text-white text-xs ${
                currentUserFromDbData?.premiumInfo
                  ? "bg-gradient-to-r from-[#211f54] to-[#4b61d1]"
                  : "bg-red-600"
              }`}
            >
              {currentUserFromDbData?.premiumInfo || "Not Taken yet"}
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
