import React, { useState } from 'react';

const chartData = {
    year: "2023 г.",
    dates: ["01.12", "02.12", "03.12", "04.12", "05.12", "06.12", "07.12"],
    yLabels: [0, 10, 20, 30, 40, 50],
    cardioData: [15, 35, 20, 45, 10, 30, 50],
    strengthData: [50, 40, 30, 20, 30, 40, 35],
};


const PADDING_LEFT = 10; 
const PADDING_RIGHT = 50; 
const SVG_WIDTH = 900;
const SVG_HEIGHT = 600;

const MAX_Y = Math.max(...chartData.yLabels);
const MIN_Y = Math.min(...chartData.yLabels);
const DATA_POINTS = chartData.dates.length;

const getY = (value) => {
    return SVG_HEIGHT - ((value - MIN_Y) / (MAX_Y - MIN_Y)) * SVG_HEIGHT;
};

const getX = (index) => {
    const availableWidth = SVG_WIDTH - PADDING_LEFT - PADDING_RIGHT;
    const X_STEP = availableWidth / (DATA_POINTS - 1);
    return PADDING_LEFT + index * X_STEP;
};

const createSmoothPathD = (data) => {
    if (data.length < 2) return "";

    let path = `M${getX(0)},${getY(data[0])}`;
    
    const smoothing = 0.25; 
    const availableWidth = SVG_WIDTH - PADDING_LEFT - PADDING_RIGHT;
    const X_STEP = availableWidth / (DATA_POINTS - 1);

    for (let i = 0; i < data.length - 1; i++) {
        const p0 = { x: getX(i), y: getY(data[i]) };
        const p1 = { x: getX(i + 1), y: getY(data[i + 1]) };

        const cp1x = p0.x + X_STEP * smoothing;
        const cp1y = p0.y;
        const cp2x = p1.x - X_STEP * smoothing;
        const cp2y = p1.y;

        path += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p1.x},${p1.y}`;
    }

    return path;
};

const ActivityChart = () => {
    const [hoveredPoint, setHoveredPoint] = useState(null); 

    const cardioPath = createSmoothPathD(chartData.cardioData);
    const strengthPath = createSmoothPathD(chartData.strengthData);

    const yGridLines = chartData.yLabels.map((_, index) => {
        return getY(chartData.yLabels[index]);
    });

    const allDataPoints = chartData.dates.flatMap((date, index) => [
        { 
            x: getX(index), 
            y: getY(chartData.cardioData[index]), 
            value: chartData.cardioData[index], 
            date, 
            type: 'Cardio', 
            color: '#05df72' 
        },
        { 
            x: getX(index), 
            y: getY(chartData.strengthData[index]), 
            value: chartData.strengthData[index], 
            date, 
            type: 'Strength', 
            color: '#e12afb' 
        },
    ]);

    const handleMouseMove = (event) => {
        const svg = event.currentTarget;
        const pt = svg.createSVGPoint();
        pt.x = event.clientX;
        pt.y = event.clientY;
        const cursorPoint = pt.matrixTransform(svg.getScreenCTM().inverse());

        const THRESHOLD = 30;
        
        let closestPoint = null;
        let minDistance = Infinity;

        allDataPoints.forEach(p => {
            const distance = Math.sqrt(Math.pow(p.x - cursorPoint.x, 2) + Math.pow(p.y - cursorPoint.y, 2));
            if (distance < minDistance) {
                minDistance = distance;
                closestPoint = p;
            }
        });

        if (minDistance < THRESHOLD) {
            setHoveredPoint(closestPoint);
        } else {
            setHoveredPoint(null);
        }
    };

    const X_LABEL_WIDTH = SVG_WIDTH - PADDING_LEFT - PADDING_RIGHT;

    return (
        <div className="w-full mx-auto color-bg-card p-4 px-15 rounded-xl shadow-2xl">
            
            <div className="flex justify-between w-[90%] items-center mb-4">
                <div className="flex space-x-4 text-sm font-medium">
                    <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-green-400 mr-1.5"></span>
                        Кардио нагрузки
                    </div>
                    <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-fuchsia-500 mr-1.5"></span>
                        Силовые нагрузки
                    </div>
                </div>
                <div className="text-xl font-bold color-accent">
                    {chartData.year}
                </div>
            </div>

            <div className="relative h-64">
                <div className="absolute top-0 left-0 h-full w-full flex">
                    
                    <svg 
                        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} 
                        className="flex-grow h-full" 
                        preserveAspectRatio="none"
                        onMouseMove={handleMouseMove} 
                        onMouseLeave={() => setHoveredPoint(null)} 
                    >

                        {yGridLines.map((y, index) => (
                            <line
                                key={index}
                                x1={PADDING_LEFT} 
                                y1={y}
                                x2={SVG_WIDTH - PADDING_RIGHT} // То охири график меравад
                                y2={y}
                                stroke="#2d2d2d"
                                strokeWidth="1"
                            />
                        ))}

                        <line 
                            x1={PADDING_LEFT} 
                            y1={getY(MIN_Y)} 
                            x2={SVG_WIDTH - PADDING_RIGHT} 
                            y2={getY(MIN_Y)} 
                            stroke="#374151" 
                            strokeWidth="2" 
                        />

                        <path
                            d={cardioPath}
                            fill="none"
                            stroke="#05df72"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />

                        <path
                            d={strengthPath}
                            fill="none"
                            stroke="#e12afb"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />

                        {hoveredPoint && (
                            <>
                                <circle
                                    cx={hoveredPoint.x}
                                    cy={hoveredPoint.y}
                                    r="8"
                                    fill={hoveredPoint.color}
                                    stroke="#121212"
                                    strokeWidth="3"
                                    opacity="0.7"
                                />
                                <circle
                                    cx={hoveredPoint.x}
                                    cy={hoveredPoint.y}
                                    r="3" 
                                    fill="white"
                                />
                                <line
                                    x1={hoveredPoint.x}
                                    y1={getY(MIN_Y)}
                                    x2={hoveredPoint.x}
                                    y2={hoveredPoint.y}
                                    stroke={hoveredPoint.color}
                                    strokeWidth="1"
                                    strokeDasharray="5, 5"
                                    opacity="0.6"
                                />
                            </>
                        )}
                    </svg>

                    <div 
                        style={{ width: `${PADDING_RIGHT}px` }} 
                        className={`h-full flex flex-col justify-between items-start text-sm text-gray-400 pl-2 pt-2 pb-2`}
                    >

                        {chartData.yLabels.slice().reverse().map((label, index) => (
                            <div key={index} className="translate-y-1/2"> 
                                {label}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            
            {hoveredPoint && (
                <div 
                    className="absolute z-10 p-2 text-xs rounded-lg shadow-lg"
                    style={{ 

                        left: `calc(${PADDING_LEFT}px + ${(hoveredPoint.x - PADDING_LEFT) / X_LABEL_WIDTH * 100}%)`, 
                        top: `calc(100% - ${SVG_HEIGHT - hoveredPoint.y}px + 16px)`, // 16px барои padding top/bottom дар контейнери асосӣ
                        transform: 'translate(-50%, -100%)', 
                        backgroundColor: '#1f2937', 
                        color: 'white',
                        pointerEvents: 'none',
                    }}
                >
                    <div style={{ color: hoveredPoint.color, fontWeight: 'bold' }}>{hoveredPoint.type}</div>
                    <div>{hoveredPoint.date}: {hoveredPoint.value} ед.</div>
                </div>
            )}

            <div 
                className="flex justify-between items-center mt-2 text-sm text-gray-400"
                style={{ 
                    marginLeft: `${PADDING_LEFT}px`, 
                    width: `${X_LABEL_WIDTH}px`
                }}
            >
                {chartData.dates.map((date, index) => (
                    <span key={index} className="text-xs">
                        {date}
                    </span>
                ))}
            </div>

        </div>
    );
};

export default ActivityChart;