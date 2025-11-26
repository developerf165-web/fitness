import React, { useState } from 'react';

export default function CardImage({ item, wrapperBorderClass }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div 
      className={`relative w-full h-0 pt-[56.25%] rounded-xl overflow-hidden mb-3 ${wrapperBorderClass}`}
    >
      <div className="absolute inset-0 w-full h-full">
        
        {!imageError ? (
            <img 
                src={item.coverUrl} 
                alt={item.title} 
                className={`w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500`}
                onError={() => setImageError(true)}
            />
        ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">No Image</div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

        {item.badge && (
             <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md z-20">
                {item.badge}
             </div>
        )}

        <div className="absolute bottom-2 left-3 flex items-center gap-2 z-20">
            <div className="w-6 h-6 rounded-full overflow-hidden border-2 color-border-accent">
                <img src={item.trainerAvatar} alt="trainer" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-medium text-white text-shadow">
                {item.trainerName}
            </span>
        </div>
      </div>
    </div>
  );
}