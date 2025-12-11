import React from 'react';
import Cards from '@components/Cards/ItemCard';
import MiniItemSlider from './MiniItemSlider';

export default function MiniServiceSlider({ title, services, items, onServiceClick, onItemClick, isLoading, error }) {
    const actualServices = items || services;
    const actualOnClick = onItemClick || onServiceClick;

    const handleClick = (service) => {
        if (actualOnClick) {
            actualOnClick({ ...service, name: service.title || service.name });
        }
    };

    const renderService = (service) => (
        <div
            key={service.id}
            onClick={() => handleClick(service)}
            className="shrink-0 w-48 relative"
        >
            <Cards
                item={service}
                onEdit={() => { }}
                onDelete={() => { }}
                isMini={true}
            />

            {/* Discount Badge (Top Right) */}
            {service.discount > 0 && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded z-20 shadow-md">
                    -{service.discount}%
                </div>
            )}
        </div>
    );

    return (
        <MiniItemSlider
            title={title}
            items={actualServices}
            renderItem={renderService}
            isLoading={isLoading}
            error={error}
            skeletonClass="w-48 aspect-[16/9]"
        />
    );
}
