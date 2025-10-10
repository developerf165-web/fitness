import React from 'react';
import { PADDING_LEFT } from './constants';

const ChartTooltip = ({ hoveredPoint, width }) => {
    if (!hoveredPoint) return null;

    const style = {
        left: `calc(${PADDING_LEFT}px + ${(hoveredPoint.x - PADDING_LEFT) / width * 100}%)`,
        top: `calc(${hoveredPoint.yInParent}px)`, // Инро мо аз index.js мефиристем
        transform: 'translate(-50%, -120%)',
        backgroundColor: 'rgba(44,44,46,1)',
        color: 'white',
        pointerEvents: 'none',
    };

    return (
        <div className="absolute z-10 p-2 text-xs rounded-lg shadow-lg" style={style}>
            <div style={{ color: hoveredPoint.color, fontWeight: 'bold' }}>{hoveredPoint.type}</div>
            <div>{hoveredPoint.date}</div>
            <div>{hoveredPoint.value} </div>
        </div>
    );
};

export default ChartTooltip;