import React from 'react';

const Test = () => {
  return (
    <div className="w-full h-64 md:h-80 lg:h-96 bg-gradient-to-tr from-[#F4F6FE] via-[#E0E2F0] to-[#D4D7E3] flex items-center justify-center relative overflow-hidden">
      <div className="text-center px-4">
        <h1 className="text-[#211F54] text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
          Stay Informed. Stay Ahead.
        </h1>
        <p className="text-[#211F54] text-lg md:text-xl mb-6">
          Subscribe Now and Get Unlimited Access to Premium Insights.
        </p>
        <button className="bg-[#211F54] text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition duration-300">
          Subscribe Now
        </button>
      </div>
      {/* Subtle overlay shapes in primary text color */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#211F54] opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#211F54] opacity-10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
    </div>
  );
};

export default Test;


