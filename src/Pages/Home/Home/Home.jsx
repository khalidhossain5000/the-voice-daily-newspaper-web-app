import React from "react";
import TrendingArticlesSlider from "../TrendingArticles/TrendingArticlesSlider";
import Publishers from "../PublisherSection/Publishers";
import Plans from "../PlansSection/Plans";
import Statistics from "../Statistics/Statistics";

const Home = () => {
  return (
    <div>
      <TrendingArticlesSlider />
      <div className="bg-[#f4f6fe]">
        <div>
          <Publishers />
          <Statistics />
          <Plans />
        </div>
      </div>
    </div>
  );
};

export default Home;
