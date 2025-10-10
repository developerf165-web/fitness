import React from 'react';

const ReviewCard = ({ review }) => {
  const scoreColor = review.score >= 4.0 ? 'color-bg-accent' : 'pt-1.5 bg-red-500';

  return (
    <div className="color-bg-mini-card p-4 rounded-xl shadow-lg flex flex-col justify-between h-full">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <img 
            src={review.avatarUrl} 
            alt={review.name} 
            className="w-12 h-12 rounded-full mr-3"
          />
          <span className="text-white font-semibold">{review.name}</span>
        </div>
        
        <div className="flex items-center justify-center text-xs">
          <span className={`px-4 py-1 pt-1.5 mb-0.5  rounded-2xl flex items-center justify-center font-bold text-black mr-2 ${scoreColor}`}>
            {review.score.toFixed(1)}
          </span>
          <span className="text-gray-400 flex items-center justify-center">{review.date}</span>
        </div>
      </div>
      
      <p className="text-sm text-gray-300 flex-grow mb-3">
        {review.text}
      </p>
      
      <div className="text-right">
        <svg className="w-4 h-4 text-gray-500 inline-block cursor-pointer hover:text-white" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="1.5"></circle>
            <circle cx="19" cy="12" r="1.5"></circle>
            <circle cx="5" cy="12" r="1.5"></circle>
        </svg>
      </div>
    </div>
  );
};

export default ReviewCard;