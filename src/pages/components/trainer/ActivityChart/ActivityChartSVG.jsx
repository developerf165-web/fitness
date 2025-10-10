import React from 'react';

const HoverIndicator = ({ point, yMinCoordinate }) => (
    <>
        <circle
            cx={point.x}
            cy={point.y}
            r="8"
            fill={point.color}
            stroke="#121212"
            strokeWidth="3"
            opacity="0.7"
        />
        <circle cx={point.x} cy={point.y} r="3" fill="white" />
        <line
            x1={point.x}
            y1={yMinCoordinate}
            x2={point.x}
            y2={point.y}
            stroke={point.color}
            strokeWidth="1"
            strokeDasharray="5, 5"
            opacity="0.6"
        />
    </>
);

const ActivityChartSVG = ({
    svgWidth,
    svgHeight,
    paddingLeft,
    paddingRight,
    yGridLines,
    yMinCoordinate,
    cardioPath,
    strengthPath,
    hoveredPoint,
    handleMouseMove,
    handleMouseLeave
}) => {
    return (
        <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="flex-grow h-full"
            preserveAspectRatio="none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {yGridLines.map((y, index) => (
                <line
                    key={index}
                    x1={paddingLeft}
                    y1={y}
                    x2={svgWidth - paddingRight}
                    y2={y}
                    stroke="#2d2d2d"
                    strokeWidth="1"
                />
            ))}

            <line
                x1={paddingLeft}
                y1={yMinCoordinate}
                x2={svgWidth - paddingRight}
                y2={yMinCoordinate}
                stroke="#374151"
                strokeWidth="2"
            />

            <path d={cardioPath} fill="none" stroke="#05df72" strokeWidth="3" strokeLinecap="round" />
            <path d={strengthPath} fill="none" stroke="#e12afb" strokeWidth="3" strokeLinecap="round" />

            {hoveredPoint && <HoverIndicator point={hoveredPoint} yMinCoordinate={yMinCoordinate} />}
        </svg>
    );
};

export default ActivityChartSVG;