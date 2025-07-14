import React from "react";
import TrendingArticlesSlider from "../TrendingArticles/TrendingArticlesSlider";
import Publishers from "../PublisherSection/Publishers";
import Plans from "../PlansSection/Plans";
import Statistics from "../Statistics/Statistics";
import ExclusiveNews from "../ExclusiveNewsSection/ExclusiveNews/ExclusiveNews";
import LatestNews from "../LatestNews/LatestNews";
import Footer from "../../Shared/Footer/Footer";

const Home = () => {
  return (
    <div>
      <TrendingArticlesSlider />
      <div className="bg-[#f4f6fe]">
        <div>
          <Publishers />
          <Statistics />
          <Plans />
          <ExclusiveNews/>
          <LatestNews/>
          <Footer/>
        </div>
      </div>
    </div>
  );
};

export default Home;
