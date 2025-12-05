import React from 'react';

/**
 * Skeleton для UserProfileCard (TrainerPage)
 * Истифодаи ҳамон услуби shimmer ки дар TableRowSkeleton
 */
const UserProfileCardSkeleton = () => {
    return (
        <div className="w-full mx-auto text-white shadow-2xl relative">
            {/* Cover image skeleton */}
            <div className="h-80 rounded-3xl m-0 relative overflow-hidden color-bg-card">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-gray-500/30 to-transparent"></div>
            </div>

            {/* Avatar skeleton */}
            <div className="absolute top-60 left-15 z-20">
                <div className="w-30 h-30 rounded-full overflow-hidden color-bg-card relative">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-gray-500/30 to-transparent"></div>
                </div>
            </div>

            {/* Card content skeleton */}
            <div className="mt-16 color-bg-card rounded-2xl">
                <div className="px-10 pt-8 min-h-32 space-y-4 pb-6">
                    {/* Name skeleton */}
                    <div className="relative overflow-hidden rounded-md h-7 w-64">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-gray-500/30 to-transparent"></div>
                    </div>

                    {/* Title skeleton */}
                    <div className="relative overflow-hidden rounded-md h-5 w-48">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-gray-500/30 to-transparent"></div>
                    </div>

                    {/* Bottom row */}
                    <div className="flex justify-between items-center pt-2">
                        <div className="relative overflow-hidden rounded-md h-5 w-28">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-gray-500/30 to-transparent"></div>
                        </div>
                        <div className="relative overflow-hidden rounded-md h-5 w-40">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-gray-500/30 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileCardSkeleton;
