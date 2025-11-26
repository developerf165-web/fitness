// === FILE: /components/charts/HallOccupancyChart/HallOccupancyHeader.js ===

import React from 'react';

// Компоненти хурд барои ҳар як омор
const StatItem = ({ time, label, isPeak = false }) => {
  // Ин ҷо шарт барои ранги динамикӣ
  const timeColor =
    isPeak
      ? 'text-red-500' // агар isPeak бошад — сурх
      : time === '08:00' || time === '15:00'
      ? 'color-accent' // агар 08:00 ё 15:00 бошад — зард
      : 'text-white'; // дигар вақтҳо — сафед

  return (
    <div className="text-right">
      <span className={`block text-2xl font-bold ${timeColor}`}>
        {time}
      </span>
      <span className="text-xs text-gray-400">{label}</span>
    </div>
  );
};

const HallOccupancyHeader = () => (
  <div className="flex flex-col sm:flex-row justify-between sm:items-start w-full mb-6 gap-4">
    <h2 className="text-xl font-bold text-white whitespace-nowrap">
      Загруженность зала
    </h2>
    <div className="flex justify-end gap-x-4 sm:gap-x-6">
      <StatItem time="08:00" label="Мин. нагруженность" />
      <StatItem time="15:00" label="Сред. нагруженность" />
      <StatItem time="13:00" label="Пиковое время" isPeak={true} />
    </div>
  </div>
);

export default HallOccupancyHeader;
