import React from 'react';
import TrendingArticlesSlider from '../TrendingArticles/TrendingArticlesSlider';
import Publishers from '../PublisherSection/Publishers';
import Plans from '../PlansSection/Plans';

const Home = () => {
    return (
        <div>
            <TrendingArticlesSlider/>
            <Publishers/>
            <Plans/>
        </div>
    );
};

export default Home;