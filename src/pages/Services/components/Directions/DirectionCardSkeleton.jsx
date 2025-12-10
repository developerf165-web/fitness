import React from 'react';

/**
 * Компоненти скелетон барои DirectionCard
 * Истифодаи стили skeleton-shimmer аз index.css
 */
export default function DirectionCardSkeleton() {
    return (
        <div className="relative flex flex-col justify-between p-5 rounded-2xl skeleton-shimmer h-full border border-transparent">
            <div className="flex items-start justify-between mb-3">
                <div className="w-full">
                    {/* Skeleton барои title */}
                    <div className="h-6 w-3/4 color-bg-mini-card rounded mb-2"></div>

                    {/* Skeleton барои description - 3 сатр */}
                    <div className="h-4 w-full color-bg-mini-card rounded"></div>
                    <div className="h-4 w-5/6 color-bg-mini-card rounded mt-1"></div>
                    <div className="h-4 w-4/6 color-bg-mini-card rounded mt-1"></div>
                </div>
            </div>
        </div>
    );
}
