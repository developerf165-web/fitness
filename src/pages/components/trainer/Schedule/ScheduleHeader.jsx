import React from 'react';

// <-- Ислоҳ: onPrev ва onNext аз props гирифта мешаванд
const ScheduleHeader = ({ month, onPrev, onNext }) => (
  <div className="flex justify-between items-center mb-6">
    <div className="flex items-center text-xl font-bold">
      {/* <-- Ислоҳ: Барои svg функсияи onClick илова карда шуд */}
      <svg 
        onClick={onPrev} 
        className="w-5 h-5 color-accent mr-2 cursor-pointer" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
      </svg>
      
      {month}
      
      {/* <-- Ислоҳ: Барои svg функсияи onClick илова карда шуд */}
      <svg 
        onClick={onNext} 
        className="w-5 h-5 color-accent ml-2 cursor-pointer" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </div>
  </div>
);

export default ScheduleHeader;