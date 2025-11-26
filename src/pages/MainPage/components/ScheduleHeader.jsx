// === FILE: /components/Schedule/ScheduleHeader.js ===

import React from 'react';
import TrainerDropdown from './TrainerDropdown';

const ScheduleHeader = () => (
  <div className="flex justify-between items-center w-full mb-6">
    <h2 className="text-2xl font-medium text-white">
      Расписание
    </h2>
    <TrainerDropdown />
  </div>
);

export default ScheduleHeader;