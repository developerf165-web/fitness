import React from 'react';
import ActivityChart from '../ActivityChart/index';
// 2. Сарлавҳаи фармоишии худро ворид мекунем
import HallOccupancyHeader from './HallOccupancyHeader';
// 3. Маълумоти ин графикро ворид мекунем
import { hallOccupancyData } from './data';

const HallOccupancyChart = () => {
  return (
    <ActivityChart
      data={hallOccupancyData}
      headerComponent={<HallOccupancyHeader />} // <- Мо сарлавҳаи фармоиширо ҳамчун prop мефиристем
    />
  );
};

export default HallOccupancyChart;