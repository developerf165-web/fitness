// YAxis.js (Ислоҳшуда)
import React from 'react';
import { PADDING_RIGHT } from './constants';

const YAxis = ({ labels }) => (
  <div
    style={{ width: `${PADDING_RIGHT}px` }}
    // Ранги сурхро гирифтем ва padding-ро дуруст кардем
    className={`flex flex-col items-center h-full justify-between text-sm text-gray-400 pr-8 pl-2 pt-12 pb-16`}
  >
    {labels.slice().reverse().map((label, index) => (
      <div key={index} className="translate-y-1/2">
        {label}
      </div>
    ))}
  </div>
);

export default YAxis;