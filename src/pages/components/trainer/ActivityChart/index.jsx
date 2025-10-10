import React, { useState, useMemo, useRef } from 'react';
import { PADDING_LEFT, PADDING_RIGHT, SVG_WIDTH, SVG_HEIGHT, HOVER_THRESHOLD } from './constants';
import { getYCoordinate, getXCoordinate, createSmoothPath } from './utils';

import ChartHeader from './ChartHeader';
import ActivityChartSVG from './ActivityChartSVG';
import ChartTooltip from './ChartTooltip';
import XAxis from './XAxis';
import YAxis from './YAxis';

const ActivityChart = ({ data }) => {
    const [hoveredPoint, setHoveredPoint] = useState(null);
    const chartContainerRef = useRef(null); 

    const { year, dates, yLabels, cardioData, strengthData } = data;

    const { getX, getY, allDataPoints, cardioPath, strengthPath, yGridLines, yMinCoordinate } = useMemo(() => {
        const DATA_POINTS = dates.length;
        const MAX_Y = Math.max(...yLabels);
        const MIN_Y = Math.min(...yLabels);

        const getY = (value) => getYCoordinate(value, MIN_Y, MAX_Y, SVG_HEIGHT);
        const getX = (index) => getXCoordinate(index, DATA_POINTS, SVG_WIDTH, PADDING_LEFT, PADDING_RIGHT);
        
        const yGridLines = yLabels.map(label => getY(label));
        const yMinCoordinate = getY(MIN_Y);

        const cardioPath = createSmoothPath(cardioData, getX, getY);
        const strengthPath = createSmoothPath(strengthData, getX, getY);

        const allDataPoints = dates.flatMap((date, index) => [
            { x: getX(index), y: getY(cardioData[index]), value: cardioData[index], date, type: 'Cardio', color: '#05df72' },
            { x: getX(index), y: getY(strengthData[index]), value: strengthData[index], date, type: 'Strength', color: '#e12afb' },
        ]);

        return { getX, getY, allDataPoints, cardioPath, strengthPath, yGridLines, yMinCoordinate };
    }, [data]);

    const handleMouseMove = (event) => {
        const svg = event.currentTarget;
        const pt = svg.createSVGPoint();
        pt.x = event.clientX;
        pt.y = event.clientY;
        const cursorPoint = pt.matrixTransform(svg.getScreenCTM().inverse());

        let closestPoint = null;
        let minDistance = Infinity;

        allDataPoints.forEach(p => {
            const distance = Math.hypot(p.x - cursorPoint.x, p.y - cursorPoint.y);
            if (distance < minDistance) {
                minDistance = distance;
                closestPoint = p;
            }
        });

        if (minDistance < HOVER_THRESHOLD) {
             const containerRect = chartContainerRef.current.getBoundingClientRect();
             const yInParent = (closestPoint.y / SVG_HEIGHT) * containerRect.height;
             setHoveredPoint({ ...closestPoint, yInParent });
        } else {
            setHoveredPoint(null);
        }
    };
    
    const X_AXIS_WIDTH = SVG_WIDTH - PADDING_LEFT - PADDING_RIGHT;

    return (
        <div className="flex flex-row w-full color-bg-card">
            
            <div className='w-full mx-auto p-4 pl-8 mr-8 rounded-xl shadow-2xl'>            
                <ChartHeader year={year} />

                <div className="relative" ref={chartContainerRef}>
                    <div className="relative h-64">
                        <div className="absolute top-0 left-0 h-full w-full flex">
                            <ActivityChartSVG
                                svgWidth={SVG_WIDTH}
                                svgHeight={SVG_HEIGHT}
                                paddingLeft={PADDING_LEFT}
                                paddingRight={PADDING_RIGHT}
                                yGridLines={yGridLines}
                                yMinCoordinate={yMinCoordinate}
                                cardioPath={cardioPath}
                                strengthPath={strengthPath}
                                hoveredPoint={hoveredPoint}
                                handleMouseMove={handleMouseMove}
                                handleMouseLeave={() => setHoveredPoint(null)}
                            />
                        </div>
                    </div>
                    <ChartTooltip hoveredPoint={hoveredPoint} width={X_AXIS_WIDTH}/>

                    <XAxis dates={dates} width={X_AXIS_WIDTH} />
                </div>
            </div>
            <div>
                <YAxis labels={yLabels} />
            </div>
        </div>
    );
};

export default ActivityChart;