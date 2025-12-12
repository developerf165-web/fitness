import React from 'react';

const ProductCardSkeleton = () => {
    return (
        <div className="bg-[#1C1C1C] rounded-xl relative h-64 flex flex-col overflow-hidden">
            {/* Image Skeleton */}
            <div className="absolute inset-0 w-full h-full skeleton-shimmer"></div>

            {/* Content Skeleton */}
            <div className="relative z-10 mt-auto p-4 flex flex-col gap-2">
                {/* Title Line */}
                <div className="h-5 w-3/4 color-bg-mini-card rounded skeleton-shimmer"></div>

                {/* Price and Action Line */}
                <div className="flex items-center justify-between mt-1">
                    <div className="h-6 w-1/3 color-bg-mini-card rounded skeleton-shimmer"></div>
                    <div className="h-6 w-6 rounded-full color-bg-mini-card skeleton-shimmer"></div>
                </div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
