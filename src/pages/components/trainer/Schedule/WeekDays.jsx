import React from 'react';

const WeekDays = ({ week, selectedDay, onDayClick }) => (
  <>
    {week.map((day) => (
      <div 
        key={day.day}
        onClick={() => onDayClick(day.day)} 
        className={`
          text-center pb-2 cursor-pointer transition-all duration-300
          ${day.day === selectedDay ? 'color-accent scale-110' : 'text-gray-400 hover:text-white'}
        `}
      >
        <div className="text-xs">{day.name}</div>
        <div className="text-xl font-bold">{day.day}</div>
      </div>
    ))}
  </>
);

export default WeekDays;