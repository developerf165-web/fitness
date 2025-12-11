import React from 'react';
import ScrollButton from '../../../components/common/ScrollButton';
import useHorizontalScroll from '../../../hooks/useHorizontalScroll';

/**
 * Generic MiniItemSlider component.
 * Handles scrolling logic and layout.
 * @param {string} title - Section title.
 * @param {Array} items - List of items to display.
 * @param {Function} renderItem - Function to render individual item: (item) => ReactNode.
 * @param {object} listContainerStyle - Optional style/class for the list container.
 */
export default function MiniItemSlider({ title, items, renderItem, scrollAmount = 200, isLoading, error, skeletonClass = "w-32 h-40" }) {

    const { scrollRef, showLeftScroll, showRightScroll, scrollMenu, checkScroll } = useHorizontalScroll({
        scrollAmount: scrollAmount,
        dependencies: [items]
    });

    if (isLoading || error) {
        return (
            <div className="mb-6">
                <h3 className="text-sm font-medium color-accent mb-3 px-2.5">{title}</h3>

                {/* Shimmer Skeletons */}
                <div className="flex gap-3 overflow-hidden px-2.5">
                    {[1, 2, 3, 4].map(key => (
                        <div key={key} className={`flex-shrink-0 bg-[#1C1C1C] rounded-lg relative skeleton-shimmer ${skeletonClass}`}>
                            <div className="absolute bottom-2 left-2 right-2 h-3 bg-gray-700 rounded w-2/3 opacity-50"></div>
                            <div className="absolute bottom-6 left-2 right-8 h-3 bg-gray-700 rounded w-1/2 opacity-50"></div>
                        </div>
                    ))}
                </div>

                {/* Error Message (Below Shimmer, Plain Text) */}
                {error && (
                    <div className="px-2.5 py-3 text-xs text-red-500 text-center">
                        {error}
                    </div>
                )}
            </div>
        );
    }

    if (!items || items.length === 0) return null;

    return (
        <div className="mb-6">
            {/* Title */}
            <h3 className="text-sm font-medium color-accent mb-3 px-2.5">{title}</h3>

            {/* Slider Container */}
            <div className="relative">
                {/* Left Button */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
                    <ScrollButton
                        direction="left"
                        onClick={() => scrollMenu('left')}
                        isVisible={showLeftScroll}
                    />
                </div>

                {/* Scrollable Area */}
                <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="overflow-x-auto scrollbar-hide scroll-smooth pl-2.5 pr-8"
                >
                    <div className="flex gap-3">
                        {items.map((item, index) => renderItem(item, index))}
                    </div>
                </div>

                {/* Right Button */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
                    <ScrollButton
                        direction="right"
                        onClick={() => scrollMenu('right')}
                        isVisible={showRightScroll}
                    />
                </div>
            </div>
        </div>
    );
}
