// === FILE: /components/charts/common/ChartTooltip.js ===

import React from 'react';
import { PADDING_LEFT } from './constants';

const ChartTooltip = ({ hoveredPoint, width }) => {
  if (!hoveredPoint) return null;

  const style = {
    left: `calc(${PADDING_LEFT}px + ${(hoveredPoint.x - PADDING_LEFT) / width * 100}%)`,
    top: `calc(${hoveredPoint.yInParent}px)`,
    transform: 'translate(-50%, -120%)',
    backgroundColor: 'rgba(44,44,46,1)',
    color: 'white',
    pointerEvents: 'none',
  };

  return (
    // Мо p-2.5-ро барои мувофиқат бо сурати нав илова кардем
    <div className="absolute z-10 p-2.5 text-xs rounded-lg shadow-lg" style={style}>
      
      {/* Сарлавҳаи Tooltip (Ном ва арзиши умумӣ) */}
      <div className="flex justify-between items-baseline gap-x-4 mb-1">
        <div style={{ color: hoveredPoint.color, fontWeight: 'bold' }}>
          {hoveredPoint.type}
        </div>
        <div className="font-bold text-base text-white">{hoveredPoint.value}</div>
      </div>
      
      {/* --- НАВСОЗӢ ДАР ИНҶО --- */}
      {/* Агар 'details' вуҷуд дошта бошад, рӯйхатро нишон медиҳем */}
      {hoveredPoint.details && Array.isArray(hoveredPoint.details) ? (
        <ul className="text-gray-300 space-y-0.5">
          {hoveredPoint.details.map((item, index) => (
            <li key={index} className="flex justify-between gap-x-4">
              <span>• {item.name}</span>
              <span>{item.value}</span>
            </li>
          ))}
        </ul>
      ) : (
        // Дар акси ҳол, санаро (мисли пештара) нишон медиҳем
        <div className="text-gray-300">{hoveredPoint.date}</div>
      )}
    </div>
  );
};

export default ChartTooltip;