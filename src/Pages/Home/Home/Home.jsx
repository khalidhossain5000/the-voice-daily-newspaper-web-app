import React from 'react';
import TrendingArticlesSlider from '../TrendingArticles/TrendingArticlesSlider';
import Publishers from '../PublisherSection/Publishers';
import Plans from '../PlansSection/Plans';
import Statistics from '../Statistics/Statistics';

const Home = () => {
    return (
        <div>
            <TrendingArticlesSlider/>
            <Publishers/>
            <Plans/>
            <Statistics/>
        </div>
    );
};

export default Home;