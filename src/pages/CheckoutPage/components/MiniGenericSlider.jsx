import React from 'react';
import Cards from '@components/Cards/ItemCard';
import MiniItemSlider from './MiniItemSlider';

export default function MiniGenericSlider({
    title,
    items,
    onItemClick,
    isLoading,
    error,
    transformItem, // Optional function to modify item before rendering (e.g. for Courses)
    skeletonClass = "w-48 aspect-[16/9]"
}) {

    const handleClick = (item) => {
        if (onItemClick) {
            onItemClick({ ...item, name: item.title || item.name });
        }
    };

    const renderItem = (item) => {
        // Apply transformation if provided (e.g., for Courses needing hideUnit: true)
        const displayItem = transformItem ? transformItem(item) : { ...item, isMini: true };

        // Ensure isMini is explicitly passed for Cards style
        // Note: Cards checks `isMini` prop passed to it, not property on item, but let's be safe.

        return (
            <div
                key={item.id}
                onClick={() => handleClick(displayItem)}
                className="shrink-0 w-48 relative"
            >
                <Cards
                    item={displayItem}
                    onEdit={() => { }}
                    onDelete={() => { }}
                    isMini={true}
                />

                {/* Discount Badge (Top Right) */}
                {item.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded z-20 shadow-md">
                        -{item.discount}%
                    </div>
                )}
            </div>
        );
    };

    return (
        <MiniItemSlider
            title={title}
            items={items}
            renderItem={renderItem}
            isLoading={isLoading}
            error={error}
            skeletonClass={skeletonClass}
            scrollAmount={250}
        />
    );
}
