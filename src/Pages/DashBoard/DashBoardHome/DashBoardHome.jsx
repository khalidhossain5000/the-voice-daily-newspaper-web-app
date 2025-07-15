import React from "react";
import PublisherChart from "../PublisherPieChart/PublisherChart";


const DashBoardHome = () => {
  
  return (
    <div className="py-12 lg:pb-20 overfliw-x-hidden">
      <div className="px-12 w-full lg:w-11/12 mx-auto rounded-2xl shadow-xl mt-3 h-48 bg-gradient-to-tr from-[#F4F6FE] via-[#E0E2F0] to-[#D4D7E3] flex items-center justify-center relative overflow-hidden ">
        <div className="text-center px-4">
          <h1 className="text-[#211F54] text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
            Welcome To Admin DashBoard
          </h1>
        </div>
        {/* Subtle overlay shapes in primary text color */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#211F54] opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#211F54] opacity-10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      
      <PublisherChart></PublisherChart>
    </div>
  );
};

export default DashBoardHome;
