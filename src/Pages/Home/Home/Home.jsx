import React from 'react';
import TrendingArticlesSlider from '../TrendingArticles/TrendingArticlesSlider';
import Publishers from '../PublisherSection/Publishers';

const Home = () => {
    return (
        <div>
            <TrendingArticlesSlider/>
            <Publishers/>
        </div>
    );
};

export default Home;