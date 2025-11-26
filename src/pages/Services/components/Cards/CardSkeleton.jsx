import React from 'react';

const CardSkeleton = () => {
  return (
    <div className="relative rounded-2xl overflow-hidden aspect-[16/9] color-bg-mini-card animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-t from-black/98 via-black/30 to-transparent"></div>

      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-stretch pb-1 p-5">
        <span className="block w-0.5 h-4 color-bg-mini-card rounded"></span>
        <div className="pl-2 w-full space-y-2">
          <div className="h-5 w-3/4 color-bg-mini-card rounded"></div>
          <div className="h-4 w-1/2 color-bg-mini-card rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;