import React from 'react';

/**
 * Универсальный компонент Skeleton для shimmer loading эффекта
 * Использует Tailwind CSS animate-pulse
 * Использование: <Skeleton width="100px" height="20px" circle={false} />
 */
const Skeleton = ({
    width = '100%',
    height = '20px',
    circle = false,
    className = ''
}) => {
    const baseClasses = 'animate-pulse bg-gray-700';
    const shapeClasses = circle ? 'rounded-full' : 'rounded-md';

    const styles = {
        width,
        height,
    };

    return (
        <div
            className={`${baseClasses} ${shapeClasses} ${className}`}
            style={styles}
        />
    );
};

export default Skeleton;
