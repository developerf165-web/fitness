import React from 'react';

const CourseCardSkeleton = () => {
    return (
        <div className="flex flex-col h-full">
            {/* Image Area - Distinct block with margin */}
            <div className="relative w-full pt-[56.25%] overflow-hidden rounded-xl skeleton-shimmer mb-3">
                {/* Gradient overlay simulation */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50"></div>
            </div>

            {/* Details Area - Distinct block with card background */}
            <div className="flex flex-col justify-between flex-grow p-3 gap-3 bg-[#1A1A1A] rounded-xl">
                {/* Title and Status Line */}
                <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2 w-full">
                        {/* Status Line */}
                        <div className="w-1 h-4 rounded-sm bg-gray-700/50"></div>
                        {/* Title - Random widths for realism */}
                        <div className="h-4 bg-gray-700/50 rounded w-3/4 skeleton-shimmer"></div>
                    </div>
                </div>

                {/* Bottom Row: Users, Price, Menu */}
                <div className="flex items-center justify-between mt-auto pt-2">
                    {/* Users Icon & Count */}
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-4 bg-gray-700/50 rounded skeleton-shimmer"></div>
                        <div className="w-6 h-4 bg-gray-700/50 rounded skeleton-shimmer"></div>
                    </div>

                    {/* Price Icon & Amount */}
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-700/50 rounded skeleton-shimmer"></div>
                        <div className="w-10 h-4 bg-gray-700/50 rounded skeleton-shimmer"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCardSkeleton;
