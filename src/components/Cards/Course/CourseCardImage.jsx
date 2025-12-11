import React from 'react';
import ShimmerImage from '/src/components/ui/ShimmerImage';

export default function CourseCardImage({ item, wrapperBorderClass }) {
    return (
        <div
            className={`relative w-full h-0 pt-[56.25%] rounded-xl overflow-hidden mb-3 ${wrapperBorderClass}`}
        >
            <div className="absolute inset-0 w-full h-full">

                <ShimmerImage
                    src={item.coverUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 brightness-110"
                    showShimmerOnError={false}
                    showShimmerOnEmpty={false}
                />

                {/* Градиент */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10"></div>

                <div className="absolute top-2 right-2 z-20 flex flex-col items-end gap-1">
                    {/* Discount Badge */}
                    {item.discount > 0 && (
                        <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
                            -{item.discount}%
                        </div>
                    )}

                    {/* Existing Badge */}
                    {item.badge && (
                        <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
                            {item.badge}
                        </div>
                    )}
                </div>

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
