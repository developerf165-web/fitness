import React from 'react';

// Компоненти HoverIndicator-и шумо дар ҳамин ҷо (бе тағйир)
const HoverIndicator = ({ point, yMinCoordinate }) => (
  <>
    <circle
      cx={point.x}
      cy={point.y}
      r="8"
      fill={point.color}
      stroke="#121212" // Ранги заминаи торик
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
  paths, // <- Тағйироти асосӣ: акнун ин массив аст
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
      {/* Хатҳои шабакаи Y (Grid lines) - Коди шумо (хеле хуб аст) */}
      {yGridLines.map((y, index) => (
        <line
          key={index}
          x1={paddingLeft}
          y1={y}
          x2={svgWidth - paddingRight}
          y2={y}
          stroke="#2d2d2d" // Ранги хуб барои заминаи торик
          strokeWidth="1"
        />
      ))}

      {/* Хатти поёни меҳвари X - Коди шумо */}
      <line
        x1={paddingLeft}
        y1={yMinCoordinate}
        x2={svgWidth - paddingRight}
        y2={yMinCoordinate}
        stroke="#374151"
        strokeWidth="2"
      />

      {/* ТАҒЙИРОТИ АСОСӢ: Ҳамаи хатҳоро бо 'map' месозем */}
      {paths.map((path) => (
        <path
          key={path.name}
          d={path.d}
          fill="none"
          stroke={path.color}
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}

      {/* Нишондиҳандаи hover (бе тағйир) */}
      {hoveredPoint && <HoverIndicator point={hoveredPoint} yMinCoordinate={yMinCoordinate} />}
    </svg>
  );
};

export default ActivityChartSVG;