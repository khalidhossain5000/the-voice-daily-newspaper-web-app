import React from 'react';

const LatestNewsCard = ({latestNewss}) => {
    return (
        <div className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden">
      <img
        src={latestNewss.articlePic}
        alt={latestNewss.articleTitle}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{latestNewss.articleTitle}</h3>
        <p className="text-sm text-gray-600">
          {latestNewss.descriptions}...
        </p>
      </div>
    </div>
    );
};

export default LatestNewsCard;