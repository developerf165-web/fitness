// === FILE: /components/charts/common/ActivityChart.js ===

import React, { useState, useMemo, useRef } from 'react';
import { PADDING_LEFT, PADDING_RIGHT, SVG_WIDTH, SVG_HEIGHT, HOVER_THRESHOLD } from './constants';
import { getYCoordinate, getXCoordinate, createSmoothPath } from './utils';

import ChartHeader from './ChartHeader'; // Сарлавҳаи пешфарз
import ActivityChartSVG from './ActivityChartSVG';
import ChartTooltip from './ChartTooltip';
import XAxis from './XAxis';
import YAxis from './YAxis';

// --- НАВСОЗӢ ДАР ИНҶО: 'headerComponent' prop-и нав ---
const ActivityChart = ({ data, headerComponent }) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const chartContainerRef = useRef(null);

  const { title, xLabels, yLabels, series } = data;

  const { getX, getY, allDataPoints, paths, yGridLines, yMinCoordinate } = useMemo(() => {
    const DATA_POINTS = xLabels.length;
    const MAX_Y = Math.max(...yLabels);
    const MIN_Y = Math.min(...yLabels);

    const getY = (value) => getYCoordinate(value, MIN_Y, MAX_Y, SVG_HEIGHT);
    const getX = (index) => getXCoordinate(index, DATA_POINTS, SVG_WIDTH, PADDING_LEFT, PADDING_RIGHT);

    const yGridLines = yLabels.map(label => getY(label));
    const yMinCoordinate = getY(MIN_Y);

    // 'createSmoothPath' акнун ба шарофати 'utils' -и навшуда кор мекунад
    const paths = series.map(s => ({
      name: s.name,
      color: s.color,
      d: createSmoothPath(s.data, getX, getY)
    }));

    // --- НАВСОЗӢ ДАР ИНҶО: 'allDataPoints' 'details'-ро мехонад ---
    const allDataPoints = series.flatMap(s =>
      s.data.map((dataPoint, index) => {
        // Мо 'value' ва 'details'-ро ҷудо мекунем
        const value = (typeof dataPoint === 'object' && dataPoint !== null) ? dataPoint.value : dataPoint;
        const details = (typeof dataPoint === 'object' && dataPoint !== null) ? dataPoint.details : null;

        return {
          x: getX(index),
          y: getY(value),
          value: value,
          details: details, // 'details'-ро ба tooltip мефиристем
          date: xLabels[index],
          type: s.name,
          color: s.color,
        };
      })
    );

    return { getX, getY, allDataPoints, paths, yGridLines, yMinCoordinate };
  }, [data, xLabels, yLabels, series]);

  
  // handleMouseMove (Бе тағйир)
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
    <div className="flex flex-row w-full bg-[#1a1a1a] text-gray-300 rounded-xl shadow-2xl overflow-hidden">
      <div className='w-full mx-auto p-4 md:p-6'>
        
        {/* --- НАВСОЗӢ ДАР ИНҶО: Интихоби Сарлавҳа --- */}
        {headerComponent ? (
          headerComponent // Агар 'headerComponent' дода шуда бошад, онро истифода мебарем
        ) : (
          <ChartHeader title={title} series={series} /> // Дар акси ҳол, сарлавҳаи пешфарзро (легенда)
        )}

        <div className="relative" ref={chartContainerRef}>
          <div className="relative h-64">
            <div className="absolute top-0 left-0 h-full w-full flex">
              <ActivityChartSVG
                svgWidth={SVG_WIDTH}
                svgHeight={SVG_HEIGHT}
                paddingLeft={PADDING_LEFT}
                paddingRight={PADDING_RIGHT}
                yGridLines={yGridLines} // Барои графики нав, ин бояд массивӣ холӣ бошад
                yMinCoordinate={yMinCoordinate}
                paths={paths}
                hoveredPoint={hoveredPoint}
                handleMouseMove={handleMouseMove}
                handleMouseLeave={() => setHoveredPoint(null)}
              />
            </div>
          </div>
          <ChartTooltip hoveredPoint={hoveredPoint} width={X_AXIS_WIDTH} />
          <XAxis dates={xLabels} width={X_AXIS_WIDTH} />
        </div>
      </div>
      <div>
        <YAxis labels={yLabels} />
      </div>
    </div>
  );
};

export default ActivityChart;